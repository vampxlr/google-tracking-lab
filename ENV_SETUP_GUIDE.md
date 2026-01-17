# 🔐 Environment Variables Setup Guide

## ✅ `.env.example` File Created!

I've created a comprehensive `.env.example` file in your GTL root directory with all required and optional environment variables.

---

## 📋 Required Variables

### 1. **NEXT_PUBLIC_GA4_MEASUREMENT_ID**
- **Description**: Your GA4 Measurement ID (starts with G-)
- **Type**: Public (client-side accessible)
- **Example**: `G-XXXXXXXXXX`
- **Where to find**:
  1. Go to [Google Analytics](https://analytics.google.com/)
  2. Admin → Data Streams
  3. Select your stream
  4. Copy the Measurement ID

### 2. **GA4_API_SECRET**
- **Description**: API Secret for Measurement Protocol
- **Type**: Server-side only (NEVER expose to client)
- **Example**: `a1b2c3d4e5f6g7h8i9j0`
- **Where to find**:
  1. GA4 Admin → Data Streams → Select Stream
  2. Scroll to "Measurement Protocol API secrets"
  3. Click "Create"
  4. Give it a nickname (e.g., "GTL Test Lab")
  5. Copy the secret (you can only see it once!)

---

## 🔧 Optional Variables

### 3. **NEXT_PUBLIC_SITE_URL**
- **Description**: Your site URL for server-side tracking
- **Type**: Public
- **Default**: `http://localhost:3000` (dev)
- **Example**: `https://your-tracking-lab.vercel.app`

### 4. **NEXT_PUBLIC_TEST_EVENT_CODE**
- **Description**: Test event code for GA4 DebugView
- **Type**: Public
- **Example**: `test_12345`
- **Where to find**: GA4 Admin → DebugView

---

## 🚀 Quick Setup

### For Local Development:

1. **Copy the example file**:
   ```bash
   cd "GTL Google Tracking Lab"
   copy .env.example .env.local
   ```

2. **Edit `.env.local`**:
   - Open in your text editor
   - Fill in your actual values
   - Save the file

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

### For Vercel Deployment:

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings → Environment Variables**
4. **Add each variable**:
   - Name: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`
   - Environment: Production, Preview, Development ✓
   
   - Name: `GA4_API_SECRET`
   - Value: `your_secret_here`
   - Environment: Production, Preview, Development ✓

5. **Redeploy** (Vercel will auto-deploy if connected to Git)

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Use `NEXT_PUBLIC_*` prefix for client-side variables only
- Keep `GA4_API_SECRET` server-side only
- Commit `.env.example` to Git as a template
- Rotate API secrets regularly

### ❌ DON'T:
- Don't commit `.env.local` to Git
- Don't expose `GA4_API_SECRET` to the browser
- Don't share secrets in screenshots or logs
- Don't use production secrets in development

---

## 🧪 Testing Your Setup

### 1. **Check Configuration Status**
Visit the playground: `http://localhost:3000/playground`

You should see:
- ✅ Green badge: "READY" - Configuration is correct
- ❌ Red badge: "NOT CONFIGURED" - Check your .env.local

### 2. **Test in GA4 DebugView**
1. Add `NEXT_PUBLIC_TEST_EVENT_CODE` to `.env.local`
2. Restart dev server
3. Go to `/playground`
4. Select **TEST** mode
5. Send a test event
6. Open GA4 Admin → DebugView
7. You should see your event in real-time!

### 3. **Test Measurement Protocol**
1. Go to `/playground`
2. Select **FIXED** mode
3. Fill in event parameters
4. Click "Send Test Event"
5. Check the response tab for success (200/204)

---

## 📊 Environment Variable Types

| Variable | Type | Exposed to Browser | When to Use |
|----------|------|-------------------|-------------|
| `NEXT_PUBLIC_*` | Public | ✅ Yes | Client-side tracking, public IDs |
| No prefix | Private | ❌ No | API secrets, server-side only |

---

## 🔍 Troubleshooting

### "NOT CONFIGURED" Error
**Problem**: Playground shows red badge

**Solutions**:
1. Check `.env.local` exists in project root
2. Verify variable names are exact (case-sensitive)
3. Restart dev server after adding variables
4. Check for typos in Measurement ID (must start with `G-`)

### "Invalid API Secret" Error
**Problem**: Events fail with 401/403

**Solutions**:
1. Verify API secret is copied correctly (no spaces)
2. Generate a new secret in GA4
3. Ensure secret matches the correct GA4 property

### Events Not Appearing in GA4
**Problem**: Events sent but not visible

**Solutions**:
1. Use TEST mode with DebugView for immediate feedback
2. In production, events may take 24-48 hours
3. Check Realtime reports (events appear within minutes)
4. Verify Measurement ID matches your GA4 property

---

## 📁 File Structure

```
GTL Google Tracking Lab/
├── .env.example          ✅ Template (commit to Git)
├── .env.local            ❌ Your secrets (DO NOT commit)
├── .gitignore            ✅ Already configured
└── ENV_SETUP_GUIDE.md    ✅ This guide
```

---

## ✅ Checklist

- [ ] Copied `.env.example` to `.env.local`
- [ ] Added `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- [ ] Added `GA4_API_SECRET`
- [ ] Restarted dev server
- [ ] Verified configuration in `/playground`
- [ ] Tested event sending
- [ ] Added variables to Vercel (if deploying)

---

## 🎉 You're All Set!

Your GTL Google Tracking Lab is now properly configured with environment variables. Visit `/playground` to start testing GA4 events!

**Next Steps**:
1. Test the playground
2. Try different event types
3. Use DebugView for real-time testing
4. Deploy to Vercel when ready

🚀 Happy tracking!
