import 'vitest'

type CustomMatchers = {
  toMatchImageSnapshot: (options?: MatchImageSnapshotOptions) => {
    message: () => string;
    pass: boolean;
  }
}

declare module 'vitest' {
  type Assertion = CustomMatchers;
  type AsymmetricMatchersContaining = CustomMatchers;
}