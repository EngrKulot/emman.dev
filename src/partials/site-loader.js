(() => {
  const root = document.documentElement;
  const siteLoader = document.querySelector('[data-site-loader]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!siteLoader) return;

  const initializedAt = performance.now();
  const minimumDuration = reduceMotion ? 0 : 650;
  let loaderFinishing = false;

  const finishSiteLoader = () => {
    if (loaderFinishing) return;
    loaderFinishing = true;
    const remaining = Math.max(0, minimumDuration - (performance.now() - initializedAt));

    window.setTimeout(() => {
      siteLoader.classList.add('is-dismissing');
      window.setTimeout(() => {
        siteLoader.remove();
        root.classList.remove('has-site-loader');
      }, reduceMotion ? 0 : 280);
    }, remaining);
  };

  if (document.readyState === 'complete') finishSiteLoader();
  else window.addEventListener('load', finishSiteLoader, { once: true });
  window.setTimeout(finishSiteLoader, 1400);
})();
