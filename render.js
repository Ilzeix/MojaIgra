import { ctx, W, H, player, world } from "./world.js";
import { walls } from "./config.js";

export function draw() {
  // Počisti platno (temno ozadje — dopolnjuje CSS)
  ctx.fillStyle = "#1e1a23";
  ctx.fillRect(0, 0, W, H);

  // Igralec — rdeča barva (#ff4800) se prikaže le, ko je aktiven hurtTimer (ob dotiku s sovražnikom)
  if (player.hurtTimer > 0) {
    ctx.fillStyle = "#ff4800";
  } else {
    ctx.fillStyle = player.color;
  }
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Majhen "obraz" / smer igralca (narisan nad telesom, da ostane viden)
  ctx.fillStyle = "#69a4e7";
  ctx.strokeStyle = "#e0f2fe";
  ctx.lineWidth = 1;

  ctx.fillRect(player.x + 8, player.y + 8, 6, 6);
  ctx.strokeRect(player.x + 8, player.y + 8, 6, 6);

  ctx.fillRect(player.x + 18, player.y + 8, 6, 6);
  ctx.strokeRect(player.x + 18, player.y + 8, 6, 6);

  // Zidovi
  ctx.fillStyle = "#7a3029";
  ctx.strokeStyle = "#640000";
  ctx.lineWidth = 2;
  for (let wall of walls) {
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
    ctx.strokeRect(wall.x, wall.y, wall.w, wall.h);
  }

  // HP Player - spodaj sredina
  const barW = 150;
  const barH = 10;
  const barX = 325;
  const barY = 430;

  // Temno ozadje palice
  ctx.fillStyle = "#111111";
  ctx.fillRect(barX, barY, barW, barH);

  // Zeleni del (glede na preostali HP)
  const hpRatio = Math.max(0, player.hp / player.maxHp);
  const currentHpW = barW * hpRatio;
  ctx.fillStyle = "#33b362";
  ctx.fillRect(barX, barY, currentHpW, barH);

  // Obroba vrstice življenja
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barW, barH);

  // Sovražniki
  for (let enemy of world.enemies) {
    // 1. Telo sovražnika
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);

    // 2. Levi in desni rog
    ctx.fillRect(enemy.x + 4, enemy.y - 4, 3, 4);
    ctx.fillRect(enemy.x + enemy.w - 7, enemy.y - 4, 3, 4);

    // 3. Oči
    ctx.fillStyle = "#f74600";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    ctx.fillRect(enemy.x + 8, enemy.y + 8, 6, 6);
    ctx.strokeRect(enemy.x + 8, enemy.y + 8, 6, 6);

    ctx.fillRect(enemy.x + 18, enemy.y + 8, 6, 6);
    ctx.strokeRect(enemy.x + 18, enemy.y + 8, 6, 6);

    // 4. Usta - OSTAJAJO NESPREMENJENA (fiksna črna barva)
    ctx.fillStyle = "#000000";
    ctx.fillRect(enemy.x + 10, enemy.y + 20, 12, 3);
    ctx.fillRect(enemy.x + 9, enemy.y + 22, 3, 3);
    ctx.fillRect(enemy.x + 20, enemy.y + 22, 3, 3);
  }

  // Projektili / krogle
  ctx.fillStyle = "#9da0a1";
  for (let b of world.bullets) {
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }

  // Izris zaslona GAME OVER, ko je igra v tem stanju
  if (world.state === "GAME_OVER") {
    // Polprosojna temna plast čez celotno platno za boljšo berljivost besedila
    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.fillRect(0, 0, W, H);

    // Velik osrednji napis GAME OVER
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", W / 2, H / 2 - 20);

    // Podnapis z navodilom za ponovni zagon prek tipke R
    ctx.font = "20px sans-serif";
    ctx.fillText("Pritisni R za ponovni začetek", W / 2, H / 2 + 25);
  }
}