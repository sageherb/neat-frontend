const debounce = (callback, delay) => {
  let timer;

  const debounced = function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  };

  return debounced;
};

export default debounce;
