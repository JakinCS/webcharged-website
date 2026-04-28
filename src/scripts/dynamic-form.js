const radioButtons = document.querySelectorAll('input[name="contact_method"]');
const phoneField = document.querySelector('div:has(> #phone'); // the wrapper div
const phoneInput = document.getElementById('phone');

radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    const isPhone = radio.value === 'phone' && radio.checked;

    phoneField.style.display = isPhone ? 'block' : 'none';

    // Toggle BOTH disabled and required together
    phoneInput.disabled = !isPhone;
    phoneInput.required = isPhone;
  });
});