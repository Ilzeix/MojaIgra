import { canvas, ctx, W, H, player, keys, world } from "./world.js";
import { PLAYER_SPEED, PLAYER_MAX_HP } from "./config.js";
import { bindInput } from "./input.js";
import { updatePlayer } from "./player.js";
import { draw } from "./render.js";
import { shoot, updateBullets } from "./bullets.js";

// Ponastavi igro v začetno stanje
export function resetGame() {
  // Povrnemo polno zdravje in ponastavimo časovnik poškodbe
  player.hp = PLAYER_MAX_HP;
  player.maxHp = PLAYER_MAX_HP;
  player.hurtTimer = 0;

  // Vrnemo igralca na začetni položaj na sredini platna
  player.x = W / 2 - 16;
  player.y = H / 2 - 16;

  // Počistimo vse aktivne izstrelke na platnu
  world.bullets.length = 0;

  // Ponastavimo zastavici in vrnemo stanje v aktivno igranje
  world.needsReset = false;
  world.needsGameOver = false;
  world.state = "PLAYING";
}

// Preklopi igro v trajno stanje GAME_OVER, dokler uporabnik ne ponastavi igre
function triggerGameOver() {
  player.hp = 0;
  world.needsGameOver = false;
  world.state = "GAME_OVER";
}

(function () {
  "use strict";

  // Vklopimo poslušanje tipkovnice in miške
  bindInput();

  let lastTime = 0;

  function update(dt) {
    // Če je zahtevana ponastavitev igre, ponastavimo stanje
    if (world.needsReset) {
      resetGame();
      return;
    }

    // Če je bil pritisnjen R med igro ali pa je HP igralca padel na 0 ali manj, sprožimo GAME_OVER
    if (world.needsGameOver || player.hp <= 0) {
      triggerGameOver();
    }

    // Ko je igra v stanju GAME_OVER, ustavimo posodabljanje igre in ohranimo stanje
    if (world.state === "GAME_OVER") {
      return;
    }

    updatePlayer(dt);
    shoot(); // preveri & po potrebi izstreli nov projektil proti miški
    updateBullets(dt);
  }

  function loop(timestamp) {
    if (!lastTime) lastTime = timestamp;

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (dt > 0.05) dt = 0.05;

    update(dt);
    draw();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();