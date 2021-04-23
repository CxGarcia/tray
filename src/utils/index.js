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
