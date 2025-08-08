# 🚀 DigitalOcean Deployment Guide

## Deploy Raslen's Portfolio to DigitalOcean App Platform

### 📋 Prerequisites

- DigitalOcean account
- GitHub account (for code repository)
- Your project files ready

### 🔧 Deployment Steps

#### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Create a new repository named `raslen-portfolio`
3. Upload all your project files to this repository

#### 2. Deploy to DigitalOcean App Platform

1. **Go to DigitalOcean Dashboard**

   - Visit [cloud.digitalocean.com](https://cloud.digitalocean.com)
   - Click "Create" → "Apps"

2. **Connect Your Repository**

   - Choose "GitHub" as source
   - Select your `raslen-portfolio` repository
   - Choose `main` branch
   - Select "Autodeploy code changes" ✅

3. **Configure Your App**

   - **App Name:** `raslen-portfolio`
   - **Service Type:** Web Service
   - **Environment:** Node.js
   - **Build Command:** `npm install`
   - **Run Command:** `npm start`
   - **HTTP Port:** 3000

4. **Set Environment Variables**

   - Add these environment variables:

   ```
   EMAIL_USER = benelhdhili.raslen@gmail.com
   EMAIL_PASS = ggdu txon dxye qmem
   ```

5. **Choose Plan**

   - Select "Basic" plan ($5/month)
   - Or "Development" plan (free for personal projects)

6. **Deploy!**
   - Click "Create Resources"
   - Wait 5-10 minutes for deployment

### 🌐 Your Live Website

After deployment, you'll get a URL like:
`https://raslen-portfolio-xxxxx.ondigitalocean.app`

### ✅ Testing Your Live Site

1. Visit your live URL
2. Test the contact form
3. Check that emails are received at `benelhdhili.raslen@gmail.com`

### 🔧 Custom Domain (Optional)

To use a custom domain like `raslenfilm.com`:

1. Buy domain from any registrar
2. In DigitalOcean App settings → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 🛠 Troubleshooting

- **Build fails:** Check Node.js version (should be 18+)
- **Emails not working:** Verify environment variables
- **Site not loading:** Check logs in DigitalOcean dashboard

### 💰 Cost

- Basic Plan: $5/month
- Development Plan: Free (with limitations)
- Bandwidth: Included in plan

---

## 🎯 Quick Deploy Checklist

- [ ] Code uploaded to GitHub
- [ ] DigitalOcean app created
- [ ] Environment variables set
- [ ] App deployed successfully
- [ ] Contact form tested
- [ ] Custom domain configured (optional)

**Your portfolio will be live and professional! 🎉**
