import { PLAYER_SPEED } from "./config.js";

// Referenca na HTML platno
export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

// Širina in višina platna
export const W = canvas.width;
export const H = canvas.height;

export const player = {
  x: W / 2 - 16,
  y: H / 2 - 16,
  w: 32,
  h: 32,
  speed: PLAYER_SPEED,
  color: "#0b5ca8",
  hp: 5,       
  maxHp: 5,     
  hurtTimer: 0 
};

export const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

export const world = {
  state: "PLAYING",      // Trenutno stanje igre (npr. "PLAYING" ali "GAME_OVER")
  needsReset: false,     // Zastavica za ponovni zagon igre ob pritisku tipke R
  enemies: [
    { x: 500, y: 150, w: 32, h: 32, color: "#920909" }
  ],
  bullets: [],           // Seznam aktivnih izstrelkov
  shotTimer: 0,          // Odštevalnik med posameznimi streli
  mouse: { x: 0, y: 0, down: false } // Položaj miške na platnu in stanje levega gumba
};