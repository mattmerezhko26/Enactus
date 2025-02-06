document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS with your public key
  emailjs.init('YIa1f3wKQOM1r-2fJ'); // Replace with your actual EmailJS public key

  const form = document.querySelector('#applyForm');
  const submitButton = form.querySelector('#applyFormBtn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    await handleFormSubmit(event);
  });

  async function handleFormSubmit(event) {
    // Get form data from the event's target (form)
    const { target } = event;
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    // console.log(formObject);

    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      const res = await emailjs.sendForm('service_j53ph2j', 'template_g6jj7zm', target);

      if (res.status === 200) {
        alert('Your application has been submitted!');
        form.reset(); // Reset form instead of reloading
      } else {
        throw new Error(`Submission failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit your application: ${error.text || error.message}`);
    } finally {
      // Restore button state
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    }
  }
});