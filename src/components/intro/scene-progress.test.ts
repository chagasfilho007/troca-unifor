import { describe, expect, it } from "vitest";

import { getSceneProgress } from "./scene-progress";

describe("getSceneProgress", () => {
  it("clamps the progress at both ends", () => {
    expect(getSceneProgress(-0.2, 0, 7)).toBe(0);
    expect(getSceneProgress(1.2, 6, 7)).toBe(1);
  });

  it("returns progress within a scene interval", () => {
    expect(getSceneProgress(1 / 14, 0, 7)).toBeCloseTo(0.5);
    expect(getSceneProgress(1 / 7, 0, 7)).toBe(1);
    expect(getSceneProgress(1 / 7, 1, 7)).toBe(0);
  });
});
