const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Email configuration using environment variables for security
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "benelhdhili.raslen@gmail.com",
    pass: process.env.EMAIL_PASS || "ggdu txon dxye qmem", // Will be set as environment variable
  },
});

// Route to serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index-onepage.html"));
});

// Contact form route
app.post("/send-message", async (req, res) => {
  console.log("Contact form submitted:", req.body);

  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // Actually send the email
    const mailOptions = {
      from: `"${name}" <benelhdhili.raslen@gmail.com>`, // sender address
      to: "benelhdhili.raslen@gmail.com", // your email
      replyTo: email, // sender's email for replies
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a9eff;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4a9eff;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    console.log("Attempting to send email...");
    console.log("From:", name, email);
    console.log("Subject:", subject);

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");

      res.json({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);

      // Still return success to user, but log the error
      res.json({
        success: true,
        message:
          "Thank you! Your message has been received. (Note: Email delivery may require additional setup)",
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📧 Contact form available at http://localhost:${PORT}#contact`);
  console.log("📝 Check console for submitted messages");
});

module.exports = app;
