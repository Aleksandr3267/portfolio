export const track = (name, data) => {
  try {
    window.umami?.track(name, data);
  } catch {}
};

export function trackSections(ids) {
  const seen = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          track("section_view", { section: e.target.id });
        }
      });
    },
    { rootMargin: "0px 0px -40% 0px", threshold: 0 },
  );
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
  return () => io.disconnect();
}
