# SendGrid Setup Guide for Lambda Newsletter

## Why SendGrid?

✅ **100 emails/day FREE forever**  
✅ **Excellent deliverability** (emails actually reach inbox)  
✅ **Real-time analytics** (opens, clicks, bounces)  
✅ **API integration** available for automation  
✅ **Easy contact management**  
✅ **Professional appearance**  

---

## One-Time Setup (15 minutes)

### Step 1: Create SendGrid Account

1. Go to https://sendgrid.com/free/
2. Click **"Start for Free"**
3. Fill out the form:
   - Email address
   - Password
   - Choose "I'm a developer" or "I'm a marketer"
4. Verify your email address

### Step 2: Set Up Sender Authentication

**Important:** This ensures your emails don't go to spam!

1. After login, go to **Settings → Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill out the form:
   - From Name: `lambda`
   - From Email: Your verified email (e.g., `lambdajournalism@gmail.com`)
   - Reply To: Same as above
   - Address/City/State/Zip: Your info
4. Click **"Create"**
5. Check your email and click verification link
6. ✅ You're verified!

### Step 3: Get Your API Key (Optional - for automation later)

1. Go to **Settings → API Keys**
2. Click **"Create API Key"**
3. Name it: `lambda-newsletter`
4. Choose **"Restricted Access"**
5. Enable: Mail Send → Full Access
6. Click **"Create & View"**
7. **Copy the key** and save it somewhere safe (you won't see it again!)

---

## Sending Your First Newsletter (5 minutes)

### In Editor (editor.html):

1. Create your article and click **"Generate JSON"**
2. Click **📧 NEWSLETTER** button
3. Click **"Generate Email Template"**
4. Click **"Export for SendGrid"**
5. Click **"Download SendGrid CSV"** (saves your subscribers)

### In SendGrid:

#### Import Contacts

1. Go to **Marketing → Contacts**
2. Click **"Add Contacts"** → **"Upload CSV"**
3. Upload the CSV you just downloaded
4. Map fields:
   - `email` → **Email**
   - `name` → **First Name** (or skip if empty)
   - `subscriber_id` → **Create Custom Field** → name it `subscriber_id`
5. Click **"Upload"**
6. Wait for import to complete (usually instant)

#### Create and Send Email

1. Go to **Marketing → Single Sends**
2. Click **"Create Single Send"**
3. **Choose Contacts:**
   - Select **"All Contacts"** (or create a list)
   - Click **"Next"**
4. **Build Email:**
   - Sender: Select your verified sender
   - Subject: `New Article: [Your Article Title] - lambda`
   - Preview Text: Your article excerpt
   - Click **"Next"**
5. **Design:**
   - Choose **"Code Editor"**
   - Delete default HTML
   - Paste your HTML template from editor.html
   - Find `{{SUBSCRIBER_ID}}` and replace with `{{subscriber_id}}`
   - Click **"Next"**
6. **Review:**
   - Click **"Send Test"** to send yourself a preview
   - If looks good, click **"Schedule"** or **"Send Now"**
7. 🎉 Done!

---

## Important: Unsubscribe Link Setup

In your HTML template, the unsubscribe link looks like:
```html
<a href="https://iristhepianist.github.io/iris-articles/index.html?unsubscribe={{SUBSCRIBER_ID}}">
```

**Change it to:**
```html
<a href="https://iristhepianist.github.io/iris-articles/index.html?unsubscribe={{subscriber_id}}">
```

This uses SendGrid's dynamic field to personalize each email.

---

## Free Tier Limits

- **100 emails per day** (forever free)
- **Unlimited contacts**
- **30 days of email activity history**
- **Basic analytics** (opens, clicks, bounces)

### What if you need more?

**Essentials Plan - $19.95/month:**
- 50,000 emails/month
- 60 days of history
- Email validation
- Basic automation

**Pro Plan - $89.95/month:**
- 100,000 emails/month
- Advanced automation
- Dedicated IP
- Priority support

---

## Workflow for Each Newsletter

### Quick Process (5 minutes per newsletter):

1. **In editor.html:**
   - Create article
   - Generate JSON
   - Open newsletter panel
   - Generate email template
   - Export SendGrid CSV (if new subscribers)

2. **In SendGrid:**
   - Upload CSV (only if new subscribers since last time)
   - Create Single Send
   - Paste HTML template
   - Replace `{{SUBSCRIBER_ID}}` with `{{subscriber_id}}`
   - Send test to yourself
   - Send to all contacts

3. **Done!** Check analytics in 24 hours

---

## Pro Tips

### 1. Create a Template in SendGrid
Save your HTML as a reusable template:
- Marketing → Email Templates
- Create new template with your lambda branding
- Save time on future newsletters

### 2. Create Lists
Organize subscribers by interest:
- Marketing → Contacts → Lists
- Create lists like "Tech Articles", "Opinion Pieces", etc.
- Send targeted emails

### 3. Schedule Ahead
Don't send immediately:
- Choose a good time (Tuesday-Thursday, 10am-2pm)
- Schedule for optimal engagement

### 4. Monitor Analytics
Check your stats:
- Marketing → Stats
- See opens, clicks, bounces
- Learn what content works best

### 5. Clean Your List
Remove bounces and unengaged:
- Go to Contacts regularly
- Delete invalid emails
- Keep your sender reputation high

---

## Troubleshooting

### Emails going to spam?
- ✅ Verify your sender email in SendGrid
- ✅ Add SPF/DKIM records (Settings → Sender Authentication)
- ✅ Don't use spammy words in subject
- ✅ Include physical address in footer
- ✅ Make unsubscribe link visible

### CSV import failing?
- ✅ Check CSV format (email, name, subscriber_id columns)
- ✅ Ensure no duplicate emails
- ✅ Remove any special characters
- ✅ Save as UTF-8 encoding

### Unsubscribe not working?
- ✅ Verify you changed `{{SUBSCRIBER_ID}}` to `{{subscriber_id}}`
- ✅ Test with your own email first
- ✅ Check the URL is correct in template

### Hit daily limit?
- ✅ Wait 24 hours for reset
- ✅ Upgrade to paid plan
- ✅ Split sending over multiple days

---

## Best Practices

### Email Content
✅ Keep subject lines under 50 characters  
✅ Include clear call-to-action  
✅ Use alt text for images  
✅ Test on mobile devices  
✅ Include plain text version  

### Sending Schedule
✅ **Best days:** Tuesday, Wednesday, Thursday  
✅ **Best times:** 10am-2pm in subscriber's timezone  
✅ Avoid weekends and holidays  
✅ Be consistent (e.g., every Friday)  

### List Hygiene
✅ Remove hard bounces immediately  
✅ Remove unengaged after 6 months  
✅ Honor unsubscribes instantly  
✅ Never buy email lists  
✅ Double opt-in (ask for confirmation)  

---

## Automation Ideas (Future)

Once comfortable, automate with SendGrid API:

1. **Auto-send on article publish**
   - Use GitHub Actions + SendGrid API
   - Trigger when articles.json updates

2. **Welcome series**
   - Send 3-email series to new subscribers
   - Introduce lambda, share best articles

3. **Weekly digest**
   - Automatically compile week's articles
   - Send every Friday

4. **Re-engagement campaign**
   - Target subscribers who haven't opened in 3 months
   - "Miss you!" email with best content

---

## Contact SendGrid Support

- **Help Center:** https://docs.sendgrid.com/
- **Email:** support@sendgrid.com
- **Community:** https://community.sendgrid.com/
- **Status:** https://status.sendgrid.com/

---

## Quick Reference

### SendGrid Dashboard Links
- Contacts: https://mc.sendgrid.com/contacts
- Single Sends: https://mc.sendgrid.com/single-sends
- Templates: https://mc.sendgrid.com/dynamic-templates
- Stats: https://mc.sendgrid.com/stats
- API Keys: https://app.sendgrid.com/settings/api_keys

### Lambda Resources
- Editor: `editor.html`
- Newsletter Test: `newsletter-test.html`
- Subscriber Management: Newsletter panel in editor
- Documentation: `NEWSLETTER_GUIDE.md`

---

**You're all set!** 🚀

Start by sending a test to yourself, then when confident, send to all subscribers.

**Questions?** Email lambdajournalism@gmail.com

**Last Updated:** December 9, 2025
