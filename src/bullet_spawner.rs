use wasm_bindgen::prelude::*;
use crate::bullet::Bullet;
// use crate::log;

#[wasm_bindgen]
pub struct Spawner {
    pool: Vec<Bullet>,
    bullet_count: u32,
    count: u32,
}

#[wasm_bindgen]
impl Spawner {
    #[wasm_bindgen(constructor)]
    pub fn new(bullet_count: u32) -> Spawner {
        let mut spawner = Spawner {
            pool: Vec::with_capacity(bullet_count as usize),
            bullet_count,
            count: 0
        };
        spawner.init_pool();
        spawner
    }

    pub fn tick(&mut self, delta_time: f64) {
        let fire = self.count % 10; // fire every 10 frames
        self.count += 1;
        
        for i in 0..self.pool.len() {
            self.pool[i].tick(delta_time);
        }

        for i in 0..self.pool.len() {
            if self.pool[i].active == true {continue;} // skip already active bullets

            if fire == 0 {
                self.pool[i].activate();
                return;
            }
        }
    }

    fn init_pool(&mut self) {
        for _i in 0..self.bullet_count {
            self.pool.push(Bullet::new());
        }
    }

    pub fn bullets(&self) -> *const Bullet {
        self.pool.as_ptr()
    }
}

pub struct Vector {
    pub x: f64,
    pub y: f64,
}

impl Vector {
    pub fn zero() -> Vector {
        Vector {
            x: 0.0, y: 0.0
        }
    }

    pub fn scale(&mut self, scalar: f64) -> Vector {
        Vector {
            x: self.x * scalar,
            y: self.y * scalar,
        }
    }

    pub fn add(&mut self, v: &Vector) {
        self.x += v.x;
        self.y += v.y;
    }
}
