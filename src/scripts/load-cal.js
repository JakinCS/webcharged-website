let calLoaded = false;
let handleFunctionRan = false;

function loadCalEmbed() {
  console.log("running the load cal embed function")
  console.log("calLoaded variable is:", calLoaded)
  if (calLoaded) {
    console.log("exiting!")
    return
  };
  calLoaded = true;

  console.log("proceeding to un-hide and load the calendar")

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


// This function checks whether the users preferences allow the loading of Cal.
// Then, if all is good, it will run the loadCalEmbed() function.
const handleLoadCal = () => {
  console.log("running handle load cal function")
  console.log("value of handleFunctionRan variable:", handleFunctionRan);
  // if (handleFunctionRan == true) {console.log("exiting handle function"); return;}
  handleFunctionRan = true;

  if (typeof zaraz !== "undefined") {
    console.log("zaraz is good (not undefined)")
    const consentGiven = zaraz?.consent?.get("wQid");
    console.log("Here is the value of the Zaraz consent:", consentGiven)
    if (consentGiven === undefined) {
      console.log("Zaraz consent is undefined. Running handle function again in 1s")
      setTimeout(() => {
        handleLoadCal();
      }, 1000);
      return;
    }
    if (consentGiven) {
      console.log("consent is good. Running load function")
      loadCalEmbed();
      return;
    } else {
      console.log("no consent. un-hiding cookie error")
      document.getElementById('cal-facade')?.remove();
      document.getElementById("cal-load-error").classList.remove("hidden");
    }
  } else {
    console.log("zaraz is undefined. un-hiding error message")
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
      console.log("firing handle function - is visible")
      handleLoadCal();
      observer.disconnect();
    }
  },
  { rootMargin: margin } // start loading before it's visible
);

observer.observe(document.querySelector('.cal-facade-wrapper'));

setTimeout(() => {
  console.log("firing handle function after 5s")
  handleLoadCal();
}, 5000);
