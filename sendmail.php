<?php
// Simple and Reliable Contact Form Script
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type
header('Content-Type: text/plain');

// Debug mode - remove this in production
$debug = true;

if ($debug) {
    error_log("Contact form accessed - " . date('Y-m-d H:i:s'));
    error_log("POST data: " . print_r($_POST, true));
}

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method not allowed";
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Basic validation
if (empty($name)) {
    http_response_code(400);
    echo "Name is required";
    exit;
}

if (empty($email)) {
    http_response_code(400);
    echo "Email is required";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Invalid email address";
    exit;
}

if (empty($subject)) {
    http_response_code(400);
    echo "Subject is required";
    exit;
}

if (empty($message)) {
    http_response_code(400);
    echo "Message is required";
    exit;
}

// Security check - prevent email injection
$pattern = "/(content-type|bcc:|cc:|to:)/i";
if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $message)) {
    http_response_code(400);
    echo "Security violation detected";
    exit;
}

// Email configuration
$to = "mouhamedaminkraiem08@gmail.com";
$subject_line = "Portfolio Contact: " . $subject;

// Create email body
$email_body = "New contact form submission:\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Subject: " . $subject . "\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "Sent from portfolio website on " . date('Y-m-d H:i:s');

// Email headers
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if ($debug) {
    error_log("Attempting to send email to: " . $to);
    error_log("Subject: " . $subject_line);
    error_log("Headers: " . $headers);
}

// Send email
$mail_sent = mail($to, $subject_line, $email_body, $headers);

if ($mail_sent) {
    if ($debug) {
        error_log("Email sent successfully");
    }
    echo "success";
} else {
    if ($debug) {
        error_log("Email failed to send");
    }
    http_response_code(500);
    echo "Failed to send email";
}
?>