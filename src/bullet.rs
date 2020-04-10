use crate::bullet_spawner::Vector;

pub struct Bullet {
    location: Vector,
    direction: Vector,
    speed: f64,
    pub active: bool,
}

impl Bullet {
    pub fn new() -> Bullet {
        Bullet {
            location: Vector::zero(),
            direction: Vector::zero(),
            speed: 800.0,
            active: false,
        }
    }

    pub fn tick(&mut self, delta_time: f64) {
        if !self.active {return}
        self.location.add(&&self.direction.scale(self.speed * delta_time));
    }

    pub fn activate(&mut self) {
        self.active = true;
        self.direction.y = -1.0;
    }
}
