import { fetchSanityData } from './common.js';

document.addEventListener('DOMContentLoaded', async () => {
  const departmentSelect = document.querySelector('#department');
  
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

  // Initialize EmailJS with your public key
  emailjs.init('YIa1f3wKQOM1r-2fJ'); // Replace with your actual EmailJS public key

  const form = document.querySelector('#applyForm');
  const submitButton = form.querySelector('#applyFormBtn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    await handleFormSubmit(event);
  });

  async function handleFormSubmit(event) {
    const { target } = event;
    const formData = new FormData(target);
  
    // Explicitly append data to formData
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const department = formData.get('department');
  
    // Append missing data to formData
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('department', department);
  
    // Convert resume file to Base64 if it exists
    const resumeFile = formData.get('resume');
    if (resumeFile && resumeFile.size > 0) {
      try {
        const resumeBase64 = await fileToBase64(resumeFile);
        formData.append('resume_base64', resumeBase64);
      } catch (error) {
        console.error('Error converting file:', error);
        alert('Failed to process the resume file.');
        return;
      }
    }
  
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

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
});
