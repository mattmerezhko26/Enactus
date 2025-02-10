import { fetchSanityData } from './common.js';

document.addEventListener('DOMContentLoaded', async () => {
  const departmentSelect = document.querySelector('#department');

  // Function to populate departments from Sanity CMS
  async function populateDepartments() {
    try {
      const departments = await fetchSanityData('*[_type == "department"]');
      departments.sort((a, b) => a.title.localeCompare(b.title));

      departmentSelect.innerHTML = '<option value="" disabled selected>Select a department</option>';

      departments.forEach((dept) => {
        const option = document.createElement('option');
        option.value = dept.slug?.current || dept.title;
        option.textContent = dept.title;
        departmentSelect.appendChild(option);
      });
    } catch (err) {
      console.error('Error loading departments:', err);
    }
  }

  await populateDepartments();

  // Initialize EmailJS with public key
  emailjs.init({
    publicKey: 'YIa1f3wKQOM1r-2fJ',
  });

  const form = document.querySelector('#applyForm');
  const submitButton = form.querySelector('#applyFormBtn');

  // Event listener for form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleFormSubmit(event);
  });

  // Function to handle form submission
  async function handleFormSubmit(event) {
    const { target } = event;
    const formData = new FormData(target);
  
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const department = formData.get('department');
    const linkedin = formData.get('linkedin');
    const resumeUrl = formData.get('resume_url');
  
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
  
    // Prepare the email parameters
    const emailParams = {
      name,
      email,
      phone,
      message,
      department,
      linkedin,
      resume_url: resumeUrl,  // Send the resume URL directly
    };
  
    try {
      // Send the form data via EmailJS (pass the form directly)
      const res = await emailjs.sendForm(
        'service_j53ph2j',            // Service ID
        'template_g6jj7zm',           // Template ID
        form,                         // Pass the form directly here
        'YIa1f3wKQOM1r-2fJ'           // User ID
      );
  
      if (res.status === 200) {
        alert('Your application has been submitted!');
        form.reset();
      } else {
        throw new Error(`Submission failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to submit your application: ${error.text || error.message}`);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    }
  }
});