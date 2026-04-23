document.querySelectorAll('.toggle-group').forEach((group) => {
  group.querySelectorAll('summary').forEach((summary) => {
    const detail = summary.parentElement;
    summary.addEventListener('click', (e) => {
      const isOpen = detail?.hasAttribute('open');
      e.preventDefault();

      // Close all
      group.querySelectorAll('details[open]').forEach((other) => {
        other.removeAttribute('open');
      });

      // If it wasn't open before, open it now
      if (!isOpen) detail?.setAttribute('open', '');
    });
  });
});