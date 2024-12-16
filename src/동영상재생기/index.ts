function timeToSeconds(time: string): number {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
}

function secondsToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export function solution(
  video_len: string,
  pos: string,
  op_start: string,
  op_end: string,
  commands: string[]
): string {
  let currentPosition = timeToSeconds(pos);
  const videoLength = timeToSeconds(video_len);
  const opStartTime = timeToSeconds(op_start);
  const opEndTime = timeToSeconds(op_end);

  if (currentPosition >= opStartTime && currentPosition <= opEndTime) {
    currentPosition = opEndTime;
  }

  for (const command of commands) {
    if (command === "next") {
      currentPosition = Math.min(currentPosition + 10, videoLength);
    } else if (command === "prev") {
      currentPosition = Math.max(currentPosition - 10, 0);
    }

    if (currentPosition >= opStartTime && currentPosition <= opEndTime) {
      currentPosition = opEndTime;
    }
  }

  return secondsToTime(currentPosition);
}
