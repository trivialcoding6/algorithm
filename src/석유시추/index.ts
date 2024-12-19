function iterativeDFS(
  land: number[][],
  startI: number,
  startJ: number,
  columns: Set<number>
): number {
  const stack = [[startI, startJ]];
  let size = 0;

  while (stack.length > 0) {
    const [i, j] = stack.pop()!;
    if (
      i < 0 ||
      i >= land.length ||
      j < 0 ||
      j >= land[i].length ||
      land[i][j] === 0
    ) {
      continue;
    }

    // 현재 위치를 방문했음을 표시
    land[i][j] = 0;
    size++;
    // 현재 열 번호를 기록
    columns.add(j);

    // 상하좌우만 탐색
    stack.push([i - 1, j]); // 위
    stack.push([i + 1, j]); // 아래
    stack.push([i, j - 1]); // 왼쪽
    stack.push([i, j + 1]); // 오른쪽
  }

  return size;
}

export function solution(land: number[][]) {
  const landCopy = land.map((row) => [...row]);
  const resultMap = new Map<number, number>();

  for (let i = 0; i < land.length; i++) {
    for (let j = 0; j < land[0].length; j++) {
      if (landCopy[i][j] === 1) {
        const columns = new Set<number>();
        const size = iterativeDFS(landCopy, i, j, columns);

        // 이 석유 덩어리가 포함된 모든 열에 크기를 더함
        for (const col of columns) {
          resultMap.set(col, (resultMap.get(col) || 0) + size);
        }
      }
    }
  }

  // 최대 석유량 반환
  return resultMap.size > 0 ? Math.max(...resultMap.values()) : 0;
}

// result: 9
console.log(
  solution([
    [0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 1],
  ])
);
