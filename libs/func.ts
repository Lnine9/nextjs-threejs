export function debounce<T>(
  fn: Function,
  wait: number,
  immediate: boolean = false
) {
  let timer;
  let invoking;

  const debouncedFn = function (...args) {
    // 取消上一次的定时器
    if (timer) clearTimeout(timer);

    // 立即执行
    if (immediate && !invoking) {
      // @ts-ignore
      fn.apply(this, args);
      invoking = true;
    } else {
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, args);
        invoking = false;
        timer = null;
      }, wait);
    }
  };
  // 取消操作
  debouncedFn.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    invoking = false;
  };

  return debouncedFn;
}

export function throttle(
  fn: Function,
  interval: number,
  trailing: boolean = false
) {
  let lastTime;
  let timer;

  const throttledFn = function (...args) {
    const nowTime = new Date().getTime();
    if (!lastTime) lastTime = nowTime;
    //   |-------|---------------|
    //   |last   |now  remain    |interval
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // @ts-ignore
      fn.apply(this, args);
      lastTime = nowTime;
    } else {
      // 最后一次是否执行
      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = 0;
          // @ts-ignore
          fn.apply(this, args);
        }, remainTime);
      }
    }
  };

  throttledFn.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return throttledFn;
}
