// Simple Contact Form Script for Node.js Server
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Contact form script loaded");

  // Get form element
  const form = document.getElementById("contactForm");
  const submitButton = form.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById("msgSubmit");

  if (!form) {
    console.error("❌ Contact form not found!");
    return;
  }

  console.log("✅ Contact form found, adding event listener");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("📨 Form submitted");

    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name) {
      showMessage(false, "Please enter your name");
      return;
    }

    if (!email) {
      showMessage(false, "Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      showMessage(false, "Please enter a valid email");
      return;
    }

    if (!subject) {
      showMessage(false, "Please enter a subject");
      return;
    }

    if (!message) {
      showMessage(false, "Please enter a message");
      return;
    }

    console.log("✅ Validation passed, sending to server");

    // Show loading
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Send to Node.js server
    fetch("/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    })
      .then((response) => {
        console.log("📡 Response received:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("📬 Server response:", data);

        if (data.success) {
          showMessage(true, data.message);
          form.reset();
        } else {
          showMessage(false, data.message);
        }
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        showMessage(
          false,
          "Sorry, there was an error sending your message. Please try again."
        );
      })
      .finally(() => {
        // Restore button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
  });

  // Show message function
  function showMessage(isSuccess, message) {
    messageDiv.style.display = "block";
    messageDiv.style.padding = "15px";
    messageDiv.style.borderRadius = "8px";
    messageDiv.style.marginTop = "15px";
    messageDiv.style.fontSize = "14px";
    messageDiv.style.fontWeight = "500";

    if (isSuccess) {
      messageDiv.style.backgroundColor = "#d4edda";
      messageDiv.style.color = "#155724";
      messageDiv.style.border = "1px solid #c3e6cb";
    } else {
      messageDiv.style.backgroundColor = "#f8d7da";
      messageDiv.style.color = "#721c24";
      messageDiv.style.border = "1px solid #f5c6cb";
    }

    messageDiv.innerHTML = message;

    // Auto hide after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 5000);
  }

  // Clear messages when user starts typing
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      messageDiv.style.display = "none";
    });
  });
});

console.log("🎯 Contact form script ready!");
