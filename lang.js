// One URL per document, two languages inside it — App Store Connect takes a single
// privacy policy link, so the Korean version cannot live at a separate address.
(function () {
  var KEY = 'pixiefits.site.lang';
  function apply(lang) {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.langbar button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }
  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var start = saved || ((navigator.language || 'en').slice(0, 2) === 'ko' ? 'ko' : 'en');
  document.addEventListener('DOMContentLoaded', function () {
    apply(start);
    document.querySelectorAll('.langbar button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.set); });
    });
    // reveal-on-scroll, respecting a reduced-motion preference
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('seen'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    items.forEach(function (el) { io.observe(el); });
  });
})();
