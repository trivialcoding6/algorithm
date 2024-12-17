function calculateTotalTime(
  diffs: number[],
  times: number[],
  limit: number,
  level: number
): number {
  let totalTime = 0;
  let prevTime = 0;

  for (let i = 0; i < diffs.length; i++) {
    if (diffs[i] <= level) {
      totalTime += times[i];
      prevTime = times[i];
    } else {
      const failures = diffs[i] - level;
      totalTime += (prevTime + times[i]) * failures + times[i];
      prevTime = times[i];
    }

    if (totalTime > limit) return Infinity;
  }
  return totalTime;
}

export function solution(
  diffs: number[],
  times: number[],
  limit: number
): number {
  if (diffs[0] !== 1) {
    return -1;
  }

  let left = 1;
  let right = diffs.reduce((max, curr) => Math.max(max, curr), 1);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const totalTime = calculateTotalTime(diffs, times, limit, mid);

    if (totalTime <= limit) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// 3
console.log(solution([1, 5, 3], [2, 4, 7], 30));
// 2
console.log(solution([1, 4, 4, 2], [6, 3, 8, 2], 59));
//294
console.log(solution([1, 328, 467, 209, 54], [2, 7, 1, 4, 3], 1723));
// 39354
console.log(
  solution([1, 99999, 100000, 99995], [9999, 9001, 9999, 9001], 3456789012)
);
