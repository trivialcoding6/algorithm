import { solution } from "./index";

describe("동영상 재생기 테스트", () => {
  it("첫 번째 테스트 케이스: next, prev 명령어 실행", () => {
    const result = solution("34:33", "13:00", "00:55", "02:55", [
      "next",
      "prev",
    ]);

    expect(result).toBe("13:00");
  });

  it("두 번째 테스트 케이스: prev, next, next 명령어 실행", () => {
    const result = solution("10:55", "00:05", "00:15", "06:55", [
      "prev",
      "next",
      "next",
    ]);

    expect(result).toBe("06:55");
  });

  it("세 번째 테스트 케이스: next 명령어 실행", () => {
    const result = solution("07:22", "04:05", "00:15", "04:07", ["next"]);

    expect(result).toBe("04:17");
  });

  it("오프닝 구간에 진입하면 자동으로 오프닝 끝으로 이동", () => {
    const result = solution("15:00", "00:10", "00:15", "00:30", ["next"]);
    expect(result).toBe("00:30");
  });

  it("오프닝 구간 내에서 시작하면 즉시 오프닝 끝으로 이동", () => {
    const result = solution("15:00", "00:20", "00:15", "00:30", []);
    expect(result).toBe("00:30");
  });

  it("동영상 길이를 초과하지 않음", () => {
    const result = solution("01:00", "00:55", "00:10", "00:20", ["next"]);
    expect(result).toBe("01:00");
  });

  it("0초 이하로 이동하지 않음", () => {
    const result = solution("15:00", "00:05", "00:10", "00:20", ["prev"]);
    expect(result).toBe("00:00");
  });
});
