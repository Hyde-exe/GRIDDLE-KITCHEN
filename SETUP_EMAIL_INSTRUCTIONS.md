# Griddle Kitchen - Email Reservation Setup Guide

## ✉️ How to Set Up Email Reservations

The reservation form is now configured to send emails to your Gmail account when customers submit reservations. Follow these steps to make it work:

---

## Step 1: Create a Free EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Create an account using your email address
4. Verify your email address

---

## Step 2: Add Gmail Service

1. Log in to your EmailJS dashboard
2. Go to **"Integrations"** in the left sidebar
3. Click **"Gmail"** option
4. Click **"Connect Account"**
5. Select your Gmail account (or the Gmail account where you want to receive reservations)
6. Authorize EmailJS to access your Gmail
7. Click **"Create Service"**
8. Copy your **Service ID** (looks like: `service_xxxxxxxxxxxxxx`)

---

## Step 3: Create Email Template

1. In EmailJS dashboard, go to **"Manage Email Templates"**
2. Click **"Create New Template"**
3. Set the template name as: **"Griddle Kitchen Reservation"**
4. In the **"To Email"** field, enter your Gmail: `{{to_email}}`
5. In the **"Subject"** field, enter: `New Reservation from {{guest_name}}`
6. In the **"Content"** field, paste the following:

```
Hello Admin,

A new reservation has been received for Griddle Kitchen!

---GUEST DETAILS---
Name: {{guest_name}}
Email: {{guest_email}}
Phone: {{guest_phone}}
Number of Guests: {{guest_number}}

---RESERVATION DETAILS---
Date: {{reservation_date}}
Time: {{reservation_time}}
Occasion: {{occasion}}
Special Requests: {{special_requests}}

---

Please confirm this reservation by contacting the guest at:
Email: {{guest_email}}
Phone: {{guest_phone}}

Thank you!
Griddle Kitchen Management System
```

7. Click **"Save"**
8. Copy your **Template ID** (looks like: `template_xxxxxxxxxxxxxx`)

---

## Step 4: Get Your Public Key

1. In EmailJS dashboard, click on your **username** (top right)
2. Go to **"Account"**
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

---

## Step 5: Update the Website Code

Now you have three pieces of information:
- **Public Key** - for EmailJS authentication
- **Service ID** - for Gmail service
- **Template ID** - for email template

Open the file `script.js` in your website folder and find these three lines (around line 2-5 and line 34):

### Line 1-5: Add your Public Key
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

Replace `YOUR_PUBLIC_KEY_HERE` with your actual Public Key:
```javascript
emailjs.init('xxxxxxxxxxxxxxxxxxxxxxxx');
```

### Line 34: Add your Gmail address
```javascript
to_email: 'YOUR_GMAIL_HERE@gmail.com',
```

Replace `YOUR_GMAIL_HERE@gmail.com` with the Gmail address that will receive reservations:
```javascript
to_email: 'admin@griddlekitchen.com',
```

### Line 39: Add your Service ID
```javascript
emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', emailParams)
```

Replace `YOUR_SERVICE_ID_HERE` with your Service ID:
```javascript
emailjs.send('service_xxxxxxxxxxxxxx', 'YOUR_TEMPLATE_ID_HERE', emailParams)
```

### Replace YOUR_TEMPLATE_ID_HERE with your Template ID:
```javascript
emailjs.send('service_xxxxxxxxxxxxxx', 'template_xxxxxxxxxxxxxx', emailParams)
```

---

## Step 6: Test It!

1. Go to your website
2. Fill out the reservation form
3. Click **"Confirm Reservation"**
4. You should see a success message
5. Check your Gmail account for the reservation email

---

## 🔒 Security Notes

- Your EmailJS Public Key is safe to include in your website code (it's meant to be public)
- EmailJS handles all the security for sending emails
- Never share your EmailJS Secret Key

---

## ❓ Troubleshooting

**Email not being sent?**
- Make sure you copied the keys correctly (check for extra spaces)
- Verify the Service ID and Template ID match exactly
- Check your browser console (F12 → Console) for error messages

**Emails going to spam?**
- Add your domain to EmailJS's trusted senders
- Customize the email template sender name

---

## 📧 Example Email

When a customer submits a reservation, you'll receive an email like:

```
Subject: New Reservation from John Smith

Hello Admin,

A new reservation has been received for Griddle Kitchen!

---GUEST DETAILS---
Name: John Smith
Email: john@example.com
Phone: 0501234567
Number of Guests: 4

---RESERVATION DETAILS---
Date: Thursday, April 18, 2026
Time: 19:00
Occasion: Birthday
Special Requests: Need window seat if possible

---

Please confirm this reservation by contacting the guest at:
Email: john@example.com
Phone: 0501234567
```

---

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/faq/

Enjoy your automated reservation system! 🎉