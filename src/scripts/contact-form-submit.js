const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitButton = document.querySelector('#contact-form button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  if (submitButton) submitButton.disabled = true;

  const data = {
    name: form.fullname.value,
    email: form.email.value,
    contact_method: form.contact_method.value,
    phone: (form.contact_method.value === 'phone' ? form.phone.value : undefined),
    contact_reason: form.contact_reason.value,
    message: form.message.value,
    policy_agreement: form.policy_agreement.checked,
    company_name: form.company_name.value,
  };

  try {
    const res = await fetch('https://contact-form-worker.webcharged.workers.dev/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      status.textContent = '✓ Message sent! We\'ll get back to you soon.';
      form.reset();
      hidePhoneField();
    } else {
      status.textContent = result.error || 'Something went wrong. Please try again.';
    }
    if (submitButton) submitButton.disabled = false;
  } catch (error) {
    console.error('Error:', error);
    status.textContent = 'Network error. Please try again.';
    if (submitButton) submitButton.disabled = false;
  }
});

const hidePhoneField = () => {
  const phoneField = document.querySelector('div:has(> #phone'); // the wrapper div
  const phoneInput = document.getElementById('phone');

  phoneField.style.display = 'none';
  phoneInput.disabled = true;
  phoneInput.required = false;
}