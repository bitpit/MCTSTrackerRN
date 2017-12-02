// @flow

export function lazyDict<T>(objs: T[], objMemberKey: $Keys<T>): () => { [k: string]: T } {
  let dict: ?{ [k: string]: T };
  return (): { [k: string]: T } => {
    if (null == dict) {
      dict = {};
      for (let i = 0; i < objs.length; ++i) {
        const obj: T = objs[i];
        // todo - spend more time figuring out how to prevent this nastiness
        const key = (obj: any)[(objMemberKey: any)];
        dict[key] = obj;
      }
    }
    return dict;
  };
}
