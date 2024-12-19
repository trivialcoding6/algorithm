interface Point {
  r: number;
  c: number;
}

interface Position {
  r: number;
  c: number;
  time: number;
}

function calculateRobotPath(route: number[], pointMap: Point[]): Position[] {
  const positions: Position[] = [];
  let time = 0;
  let current = pointMap[route[0] - 1];

  positions.push({ r: current.r, c: current.c, time: time });

  for (let i = 1; i < route.length; i++) {
    const next = pointMap[route[i] - 1];
    const newPositions = moveRobot(current, next, time);
    positions.push(...newPositions);
    current = next;
    time = newPositions[newPositions.length - 1].time;
  }

  return positions;
}

function moveRobot(current: Point, next: Point, startTime: number): Position[] {
  const positions: Position[] = [];
  let { r, c } = current;
  let time = startTime;

  // r 좌표 이동
  while (r !== next.r) {
    r += r < next.r ? 1 : -1;
    time++;
    positions.push({ r, c, time });
  }

  // c 좌표 이동
  while (c !== next.c) {
    c += c < next.c ? 1 : -1;
    time++;
    positions.push({ r, c, time });
  }

  return positions;
}

export function solution(points: number[][], routes: number[][]) {
  const pointMap: Point[] = points.map(([r, c]) => ({ r, c }));
  console.log("pointMap", pointMap);

  // 모든 로봇의 이동 경로에서 위치-시간 정보 수집
  const timeMap = new Map<string, number>();
  console.log("timeMap", timeMap);

  routes.forEach((route) => {
    const positions = calculateRobotPath(route, pointMap);
    console.log("positions", positions);
    positions.forEach(({ r, c, time }) => {
      const key = `${r},${c},${time}`;
      timeMap.set(key, (timeMap.get(key) || 0) + 1);
    });
  });
  console.log("timeMap", timeMap);

  // 충돌 위험 계산
  return Array.from(timeMap.values()).filter((count) => count > 1).length;
}

// result: 1
console.log(
  solution(
    [
      [3, 2],
      [6, 4],
      [4, 7],
      [1, 4],
    ],
    [
      [4, 2],
      [1, 3],
      [2, 4],
    ]
  )
);

// result: 9
console.log(
  solution(
    [
      [3, 2],
      [6, 4],
      [4, 7],
      [1, 4],
    ],
    [
      [4, 2],
      [1, 3],
      [4, 2],
      [4, 3],
    ]
  )
);

// result: 0
console.log(
  solution(
    [
      [2, 2],
      [2, 3],
      [2, 7],
      [6, 6],
      [5, 2],
    ],
    [
      [2, 3, 4, 5],
      [1, 3, 4, 5],
    ]
  )
);
