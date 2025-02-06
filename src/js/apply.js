document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your public key
  emailjs.init("YIa1f3wKQOM1r-2fJ");  // Replace with your actual EmailJS public key

  const form = document.querySelector('#applyForm');
  const submitButton = form.querySelector('#applyFormBtn');

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    handleFormSubmit(event); // Pass the event to handleFormSubmit
  });

  function handleFormSubmit(event) {
    // Get form data from the event's target (form)
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const message = event.target.message.value;
    const department = event.target.department.value;

    console.log({ name, email, phone, message, department });

    // Send the form data using EmailJS
    emailjs.sendForm('service_j53ph2j', 'template_g6jj7zm', event.target)
      .then(response => {
        console.log('Success:', response);
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