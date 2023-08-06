export const pickOne = (choices: T[]): T => {
  return choices[Math.floor(Math.random()) * choices.length];
};

export const lerp = (a: number, b: number, f: number): number => {
  return a + (b - a) * f;
};

export const invertEnum = (T: any): Record<string, keyof typeof T> => {
  return Object.keys(T).reduce(
    (acc, key) => ({ ...acc, [T[key as keyof typeof T]]: key }),
    {},
  );
};
