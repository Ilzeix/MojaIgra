export function aabbOverlap(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

export function moveWithWalls(entity, dx, dy, walls) {
// Premik in preverjanje trkov po osi X
 entity.x += dx;
 for (let wall of walls) {
  if (aabbOverlap(entity, wall)) {
   entity.x -= dx; // Če zadene zid, razveljavimo premik po X
   break;
   }
 }

 // Premik in preverjanje trkov po osi Y
 entity.y += dy;
  for (let wall of walls) {
   if (aabbOverlap(entity, wall)) {
    entity.y -= dy; // Če zadene zid, razveljavimo premik po Y
    break;
   }
  }
} 