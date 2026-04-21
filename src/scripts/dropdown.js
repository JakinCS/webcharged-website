// Helper functions to keep open/close logic DRY
function openDropdown(dropdown) {
  const trigger = dropdown.querySelector('[data-dropdown-trigger]');
  const menu    = dropdown.querySelector('[data-dropdown-menu]');

  dropdown.setAttribute('data-open', '');

  // Sync ARIA
  trigger?.setAttribute('aria-expanded', 'true');
  menu?.setAttribute('aria-hidden', 'false');
}

function closeDropdown(dropdown) {
  const trigger = dropdown.querySelector('[data-dropdown-trigger]');
  const menu    = dropdown.querySelector('[data-dropdown-menu]');

  dropdown.removeAttribute('data-open');

  // Sync ARIA
  trigger?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-hidden', 'true');
}

function closeAllDropdowns() {
  document.querySelectorAll('[data-dropdown][data-open]')
    .forEach(d => closeDropdown(d));
}

// Wire up each dropdown
document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
  const trigger = dropdown.querySelector('[data-dropdown-trigger]');

  // Click — toggle (for touch devices and keyboard users)
  trigger?.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = dropdown.hasAttribute('data-open');
    closeAllDropdowns();
    if (!isOpen) openDropdown(dropdown);
  });

  // Escape key — close
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown(dropdown);
      trigger?.focus(); // return focus to trigger
    }
  });
});

// Click outside — close all
document.addEventListener('click', (e) => {
  if (!e.target?.closest('[data-dropdown]')) {
    closeAllDropdowns();
  }
});