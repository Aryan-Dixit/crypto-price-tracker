export function calculateDepth(levels: { price: number; size: number }[]) {
  let total = 0;

  return levels.map((level) => {
    total += level.size;
    return {
      ...level,
      cumulative: total,
    };
  });
}