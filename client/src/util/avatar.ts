function randomNumBoth(min: number, max: number): number {
  const range = max - min;
  const rand = Math.random();
  const num = min + Math.round(rand * range);
  return num;
}

function avatar(): string {
  const w = randomNumBoth(30, 120);
  const h = w;
  return `https://unsplash.it/${w}/${h}?random`;
}

export default avatar;
