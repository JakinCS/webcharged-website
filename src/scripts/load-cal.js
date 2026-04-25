let calLoaded = false;

function loadCalEmbed() {
  if (calLoaded) return;
  calLoaded = true;

  document.getElementById('cal-facade')?.remove();
  document.getElementById('my-cal-inline-project-planning-call').style.display = 'block';

  // Dynamically inject the Cal.com script
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1]; api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]);
        } else p(cal, ar); return;
      } p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "project-planning-call", { origin: "https://app.cal.com" });

  Cal.ns["project-planning-call"]("inline", {
    elementOrSelector: "#my-cal-inline-project-planning-call",
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    calLink: "jakinstahl/project-planning-call",
  });

  Cal.ns["project-planning-call"]("ui", {
    cssVarsPerTheme: {
      light: { "cal-brand": "#222F2F" },
      dark: { "cal-brand": "#FFF7EB" }
    },
    hideEventTypeDetails: true,
    layout: "month_view"
  });
}

let margin = '0px';
if (window.location.pathname.includes('website-design')) margin = '1000px'

// Trigger load when the wrapper scrolls into view
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadCalEmbed();
      observer.disconnect();
    }
  },
  { rootMargin: margin } // start loading before it's visible
);

observer.observe(document.querySelector('.cal-facade-wrapper'));

setTimeout(() => {
  loadCalEmbed();
}, 5000);
