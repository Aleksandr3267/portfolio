
let release;

export const siteReady = new Promise((resolve) => {
  release = resolve;
});

export const markSiteReady = () => release();
