
// @flow

export function memoizeOne<T, U>(fn: (arg: T) => U): (arg: T) => U {
  let memo = {};
  return (arg: T) => {
    if ((arg: any) in memo) {
      return memo[(arg: any)];
    }
    const val = fn(arg);
    memo[(arg: any)] = val;
    return val;
  };
}
