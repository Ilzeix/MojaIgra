// Hitrost premikanja igralca v slikovnih pikah na sekundo
export const PLAYER_SPEED = 367;

// Zidovi / ovire na platnu (koordinate x, y ter širina w in višina h)
export const walls = [
  { x: 100, y: 100, w: 120, h: 40 } // To je naša prva ovira (koordinate in velikost)
];

// Nastavitve za izstrelke
export const BULLET_SPEED = 567;      // Hitrost krogle v slikovnih pikah na sekundo
export const BULLET_COOLDOWN = 0.20;  // Čas med posameznimi streli (v sekundah)
export const BULLET_SIZE = 6;         // Velikost izstrelka v slikovnih pikah

// Nastavitve življenja in škode igralca
export const PLAYER_MAX_HP = 5;          // Največje število življenjskih točk igralca
export const HURT_COOLDOWN = 1.0;        // Skupni čas nedotakljivosti po zadetku (v sekundah)
export const HURT_FLASH_DURATION = 0.2;  // Kako hitro izgine rdeča barva po zadetku (v sekundah)
export const CONTACT_DAMAGE = 1;         // Škodo, ki jo igralec prejme ob dotiku s sovražnikom