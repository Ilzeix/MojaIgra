import { canvas, world, keys } from "./world.js";

// Funkcija za preračun koordinat miške glede na velikost platna
function mouseOnCanvas(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}

export function bindInput() {
  // Poslušalci za tipkovnico (W, A, S, D ter tipka R)
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    // Ob pritisku tipke R:
    // - če je igra že v stanju GAME_OVER, zahtevamo ponastavitev igre
    // - sicer zahtevamo preklop v stanje GAME_OVER
    if (key === "r") {
      if (world.state === "GAME_OVER") {
        world.needsReset = true;
      } else {
        world.needsGameOver = true;
      }
      return;
    }

    switch (key) {
      case "w": keys.w = true; break;
      case "a": keys.a = true; break;
      case "s": keys.s = true; break;
      case "d": keys.d = true; break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
      case "w": keys.w = false; break;
      case "a": keys.a = false; break;
      case "s": keys.s = false; break;
      case "d": keys.d = false; break;
    }
  });

  // Poslušalci za miško
  window.addEventListener("mousemove", (e) => {
    const pos = mouseOnCanvas(e);
    world.mouse.x = pos.x;
    world.mouse.y = pos.y;
  });

  window.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      world.mouse.down = true;
      const pos = mouseOnCanvas(e);
      world.mouse.x = pos.x;
      world.mouse.y = pos.y;
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
      world.mouse.down = false;
    }
  });
}