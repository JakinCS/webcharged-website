let calLoaded = false;
let handleFunctionRan = false;
let handleFunctionNeedsToRun = true;

function loadCalEmbed() {
  if (calLoaded) {
    return
  };
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
    config: { 
      layout: "month_view", 
      useSlotsViewOnSmallScreen: "true",
      marketingconsent: String(zaraz?.consent?.get("NtIl") ?? false)
    },
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

  // Listen for successful booking and fire Zaraz tracking
  // This is originally implemented and used for the Google Ads integration
  Cal.ns["project-planning-call"]("on", {
    action: "bookingSuccessful",
    callback: (e) => {
      zaraz?.track("client_cal_booking");
    }
  });

}


// This function checks whether the users preferences allow the loading of Cal.
// Then, if all is good, it will run the loadCalEmbed() function.
const handleLoadCal = () => {
  if (handleFunctionNeedsToRun === false) return;
  handleFunctionNeedsToRun = false;

  if (typeof zaraz !== "undefined") {
    const consentGiven = zaraz?.consent?.get("wQid");
    if (consentGiven === undefined) {
      console.log("Zaraz consent is undefined. Running handle function again in 1s")
      handleFunctionNeedsToRun = true;
      setTimeout(() => {
        handleLoadCal();
      }, 1000);
      return;
    }
    if (consentGiven) {
      loadCalEmbed();
      return;
    } else {
      document.getElementById('cal-facade')?.remove();
      document.getElementById("cal-load-error").classList.remove("hidden");
    }
  } else {
    document.getElementById('cal-facade')?.remove();
    document.getElementById("cal-load-error-2").classList.remove("hidden");
  }
}


let margin = '0px';
if (window.location.pathname.includes('website-design')) margin = '1000px'

// Trigger load when the wrapper scrolls into view
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      handleLoadCal();
      observer.disconnect();
    }
  },
  { rootMargin: margin } // start loading before it's visible
);

observer.observe(document.querySelector('.cal-facade-wrapper'));

setTimeout(() => {
  handleLoadCal();
}, 5000);
