import { player, world, keys, W, H } from "./world.js";
import { moveWithWalls } from "./collision.js";
import {
  walls,
  CONTACT_DAMAGE,
  HURT_COOLDOWN,
  HURT_FLASH_DURATION
} from "./config.js";

// Ločen časovnik za hitrejši rdeč utrip, medtem ko hurtTimer varuje pred ponovnim zadetkom
let hurtFlashTimer = 0;

// Preveri prekrivanje dveh pravokotnikov (AABB trk)
function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// Preveri trke igralca s sovražniki in ob dotiku odšteje življenje ter nastavi časovnika
function checkEnemyCollisions() {
  // Če je igralec še v času nedotakljivosti, nove škode ob dotiku ne prejme
  if (player.hurtTimer > 0) {
    return;
  }

  for (const enemy of world.enemies) {
    if (isColliding(player, enemy)) {
      player.hp -= CONTACT_DAMAGE;
      player.hurtTimer = HURT_COOLDOWN;
      hurtFlashTimer = HURT_FLASH_DURATION;
      break;
    }
  }
}

export function updatePlayer(dt) {
  // Odštevamo čas nedotakljivosti po zadnjem zadetku
  if (player.hurtTimer > 0) {
    player.hurtTimer -= dt;
    if (player.hurtTimer < 0) {
      player.hurtTimer = 0;
    }
  }

  // Odštevamo kratek utrip in uskladimo player.hurtTimer za izris rdeče barve v render.js
  if (hurtFlashTimer > 0) {
    hurtFlashTimer -= dt;
    if (hurtFlashTimer < 0) {
      hurtFlashTimer = 0;
    }
  }
  player.hurtTimer = hurtFlashTimer;

  let dx = 0;
  let dy = 0;

  if (keys.w) dy -= 1;
  if (keys.s) dy += 1;
  if (keys.a) dx -= 1;
  if (keys.d) dx += 1;

  // Diagonalno premikanje: normaliziraj, da ni hitrejše
  if (dx !== 0 || dy !== 0) {
    const len = Math.hypot(dx, dy);
    dx /= len;
    dy /= len;
  }

  // Izračunamo premik
  let moveX = dx * player.speed * dt;
  let moveY = dy * player.speed * dt;

  // Uporabimo funkcijo za trke z zidovi
  moveWithWalls(player, moveX, moveY, walls);

  // Omejitev na platno (clamp)
  player.x = Math.max(0, Math.min(W - player.w, player.x));
  player.y = Math.max(0, Math.min(H - player.h, player.y));

  // Preverimo še trke s sovražniki po premiku igralca
  checkEnemyCollisions();
}