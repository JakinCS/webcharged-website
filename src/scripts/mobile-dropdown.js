// Script for mobile dropdown menu

function openMobileDropdown(dropdownParent) {
  const trigger = dropdownParent.querySelector('[data-mobile-dropdown-trigger]');
  const trigger2 = dropdownParent.querySelector('[data-mobile-dropdown-close]');
  const menu    = dropdownParent.querySelector('[data-mobile-dropdown-menu]');

  dropdownParent.setAttribute('data-open', '');

  // Sync ARIA
  trigger?.setAttribute('aria-expanded', 'true');
  trigger2?.setAttribute('aria-expanded', 'true');
  menu?.setAttribute('aria-hidden', 'false');
}

function closeMobileDropdown(dropdownParent) {
  const trigger = dropdownParent.querySelector('[data-mobile-dropdown-trigger]');
  const trigger2 = dropdownParent.querySelector('[data-mobile-dropdown-close]');
  const menu = dropdownParent.querySelector('[data-mobile-dropdown-menu]');

  dropdownParent.removeAttribute('data-open');

  // Sync ARIA
  trigger?.setAttribute('aria-expanded', 'false');
  trigger2?.setAttribute('aria-expanded', 'false');
  trigger?.focus();
  menu?.setAttribute('aria-hidden', 'true');
}

function closeAllMobileDropdowns() {
  document.querySelectorAll('[data-mobile-dropdown-parent][data-open]')
    .forEach(d => closeMobileDropdown(d));
}


// Wire up each dropdown
document.querySelectorAll('[data-mobile-dropdown-parent]').forEach(dropdownParent => {
  const trigger = dropdownParent.querySelector('[data-mobile-dropdown-trigger]');

  // Click — toggle (for touch devices and keyboard users)
  trigger?.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = dropdownParent.hasAttribute('data-open');
    closeAllMobileDropdowns();
    if (!isOpen) openMobileDropdown(dropdownParent);
  });

  const trigger2 = dropdownParent.querySelector('[data-mobile-dropdown-close]');

  // Click — toggle (for touch devices and keyboard users)
  trigger2?.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = dropdownParent.hasAttribute('data-open');
    closeAllMobileDropdowns();
  });

  // Escape key — close
  dropdownParent.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileDropdown(dropdownParent);
      trigger?.focus(); // return focus to trigger
    }
  });
});