const cookieSettingsLink = document.getElementById("cookie-settings-link");

cookieSettingsLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (typeof zaraz !== 'undefined') {
    zaraz?.showConsentModal();
  } 
  return false
});