function* GenUniversalCounter(): Generator<number> {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const UniversalCounter = GenUniversalCounter();

export const useUniversalCounter = () => {
  const next = () => UniversalCounter.next().value;
  return { next };
};
