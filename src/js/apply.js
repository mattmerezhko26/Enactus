document.addEventListener("DOMContentLoaded", function () {
  
  emailjs.init("YIa1f3wKQOM1r-2fJ");  

  const form = document.getElementById("applyForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    handleFormSubmit(event); 
  });

  function handleFormSubmit(event) {
    
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const message = event.target.message.value;
    const department = event.target.department.value;

    console.log({ name, email, phone, message, department });

   
    emailjs.sendForm('service_j53ph2j', 'template_g6jj7zm', event.target)
      .then(response => {
        console.log('Success:', response);
        alert('Your application has been submitted!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit your application');
      });
  }
});