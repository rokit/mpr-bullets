// number of floats in rust Bullet struct
// location vector with x and y
// direction vector with x and y
// speed
// active (bool gets upgraded to 8 bytes)
// = 6
const B_DATA_COUNT = 6;

var BulletSpawner = function (scene) {
  this.bulletCount = 25000;

  this.spawner = new Spawner(this.bulletCount);

  this.bulletSpriteManager = new BABYLON.SpriteManager("bullets", "../sprites/point.png", this.bulletCount, 128, scene);
  this.bulletSpriteManager.renderingGroupId = 3;
  this.bulletSprites = [];

  this.bulletsPtr = this.spawner.bullets();
  this.bulletsLen = this.bulletCount * B_DATA_COUNT;

  for (let i = 0; i < this.bulletCount; i++) {
    this.bulletSprites.push(new BABYLON.Sprite(i, this.bulletSpriteManager));
    this.bulletSprites[i].size = 128;
    this.bulletSprites[i].color = new BABYLON.Color4(1,0.3,0.2,1);
    this.bulletSprites[i].position = new BABYLON.Vector3.Zero;
  }
  this.bcells = new Float64Array(memory.buffer, this.bulletsPtr, this.bulletsLen);
}

BulletSpawner.prototype.tick = function (deltaTime) {
  for (let i = 0; i < this.bulletCount; i++) {
    let offset = B_DATA_COUNT * i;
    this.bulletSprites[i].position.y = this.bcells[offset + 1];
  }
  this.spawner.tick(deltaTime);
}

export default BulletSpawner;