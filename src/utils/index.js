export const deepClone = (source) => {
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  if (Array.isArray(source)) {
    const copyArr = source.map((el) => {
      return deepClone(el);
    });
    return copyArr;
  }

  const copy = {};

  for (var key in source) {
    copy[key] = deepClone(source[key]);
  }

  return copy;
};

export const debounce = (fn, timeout = 1000) => {
  let timeoutRef = null;

  return (...args) => {
    if (timeoutRef) clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      if (!fn) return args;
      else return fn(...args);
    }, timeout);
  };
};
