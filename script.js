// JavaScript contact page 

    (function () {
  emailjs.init("I9YBnz_SHWhhU7vE1"); // public key
})();

document.addEventListener("DOMContentLoaded", function () {
 const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form || !statusEl) return;

  form.addEventListener("submit", function (event) {
      event.preventDefault();

 const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };
    
    if (!data.name || !data.email || !data.message) {
      statusEl.textContent = "Please fill in your name, email and message.";
      statusEl.className = "form-status form-status--error";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(data.email)) {
      statusE1.textContent = "Please enter a valid email address";
      statusEl.className = "form-status form-status--error";
      return;
    }
    
    statusEl.textContent = "Sending your message...";
    statusEl.className = "form-status form-status--pending";
  emailjs
      .send("service_4oiyaib", "template_f9nf9lr", data) //service key and template key
      .then(function () {
        statusEl.textContent = "Message sent successfully!"; //to know if the message is sent successfullu
        statusEl.className = "form-status form-status--success";
        form.reset();
      })
      .catch(function (error) {
      console.error("EmailJS error:", error); //shows error if it does not go through
        statusEl.textContent ="Oops, something went wrong.";
        statusEl.className = "form-status form-status--error";
      });
  });
});

