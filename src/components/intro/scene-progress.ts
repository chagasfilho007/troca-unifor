export function getSceneProgress(progress: number, sceneIndex: number, sceneCount: number): number {
  if (
    !Number.isFinite(progress) ||
    !Number.isInteger(sceneIndex) ||
    !Number.isInteger(sceneCount) ||
    sceneCount < 1 ||
    sceneIndex < 0 ||
    sceneIndex >= sceneCount
  ) {
    return 0;
  }

  return Math.min(1, Math.max(0, progress * sceneCount - sceneIndex));
}
