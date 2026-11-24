import { world, player } from "./world.js";
import { BULLET_SPEED, BULLET_COOLDOWN, BULLET_SIZE, walls } from "./config.js";

// Funkcija za izstrelitev projektila proti miški
export function shoot() {
  if (world.mouse.down && world.shotTimer <= 0) {
    const playerCenterX = player.x + player.w / 2;
    const playerCenterY = player.y + player.h / 2;

    const dx = world.mouse.x - playerCenterX;
    const dy = world.mouse.y - playerCenterY;
    const distance = Math.hypot(dx, dy);

    if (distance > 1) {
      const vx = dx / distance;
      const vy = dy / distance;

      const bulletX = playerCenterX - BULLET_SIZE / 2;
      const bulletY = playerCenterY - BULLET_SIZE / 2;

      world.bullets.push({
        x: bulletX,
        y: bulletY,
        w: BULLET_SIZE,
        h: BULLET_SIZE,
        vx: vx,
        vy: vy
      });

      world.shotTimer = BULLET_COOLDOWN;
    }
  }
}

// funkcija za premikanje projectila, flash, brisanje
export function updateBullets(dt) {
  if (world.shotTimer > 0) {
    world.shotTimer -= dt;
  }

  // povrnjena barva enemiju
  for (let e of world.enemies) {
    if (e.isFlashing) {
      e.color = e.originalColor || e.color;
      e.isFlashing = false;
    }
  }

  // obrnjhena zanka za brisanje krogel
  for (let i = world.bullets.length - 1; i >= 0; i--) {
    let b = world.bullets[i];

    // Premik ptrojectila
    b.x += b.vx * BULLET_SPEED * dt;
    b.y += b.vy * BULLET_SPEED * dt;

    let bulletHit = false;

    // trki z zidovi
    if (walls) {
      for (let w of walls) {
        if (
          b.x < w.x + w.w &&
          b.x + b.w > w.x &&
          b.y < w.y + w.h &&
          b.y + b.h > w.y
        ) {
          bulletHit = true; 
          break;
        }
      }
    }

    // trk z enemy + white flash
    if (!bulletHit) {
      for (let j = 0; j < world.enemies.length; j++) {
        let e = world.enemies[j];

        if (
          b.x < e.x + e.w &&
          b.x + b.w > e.x &&
          b.y < e.y + e.h &&
          b.y + b.h > e.y
        ) {
          bulletHit = true; // Krogla zadene sovražnika -> krogla izgine

          // Shrani originalno barvo in obarvaj telo/rogove belo za ta frejm
          if (!e.originalColor) {
            e.originalColor = e.color;
          }
          e.color = "#ffffff"; 
          e.isFlashing = true;

          break;
        }
      }
    }

    // 5. Brisanje krogle, če je zadela zid, sovražnika ali odletela izven zaslona
    if (bulletHit || b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) {
      world.bullets.splice(i, 1);
    }
  }
}