# Newsletter Email Sending Guide

## 📧 How to Send Newsletters to Subscribers

When you publish a new article, you have **4 ways** to notify your subscribers. Each method is integrated into the editor.

---

## Method 1: Send via Email Client ⚡ (FASTEST)

**Best for:** Quick announcements, small lists (<50 subscribers)

### Steps:
1. Open `editor.html`
2. Create your article and click "Generate JSON"
3. Click **📧 NEWSLETTER** button
4. Click **"Generate Email Template"**
5. Click **"Send via Email Client"**
6. Your default email app opens with:
   - All subscribers in BCC (privacy-protected)
   - Pre-written subject and body
   - Article link included
7. Review and click Send!

### Pros:
✅ Instant - no setup required  
✅ Free - uses your existing email  
✅ Private - BCC protects subscriber emails  
✅ Works with Gmail, Outlook, Apple Mail, etc.

### Cons:
❌ Daily send limits (Gmail: 500/day)  
❌ No open/click tracking  
❌ Generic unsubscribe link (not personalized)

### Limits by Provider:
- **Gmail:** 500 emails/day
- **Outlook:** 300-500 emails/day
- **Yahoo:** 500 emails/day
- **ProtonMail:** Varies by plan

---

## Method 2: Individual Emails 👤 (MOST PERSONAL)

**Best for:** Small, engaged audience where personal touch matters

### Steps:
1. In editor, click **📧 NEWSLETTER**
2. Click **"Generate Email Template"**
3. Click **"Generate Individual Emails"**
4. You'll see a list of clickable email links
5. Click each subscriber's email link
6. Email client opens with:
   - Personalized greeting (uses their name if provided)
   - Unique unsubscribe link just for them
   - Pre-filled subject and body
7. Send each email individually

### Pros:
✅ Personalized greetings  
✅ Unique unsubscribe per subscriber  
✅ One-to-one communication feel  
✅ No external service needed

### Cons:
❌ Time-consuming for large lists  
❌ Manual sending for each subscriber  
❌ No automation or tracking

### When to Use:
- Fewer than 20 subscribers
- Important announcements
- Building close community
- First-time newsletter launch

---

## Method 3: Mailchimp 📊 (PROFESSIONAL)

**Best for:** Growing lists, professional newsletters, analytics

### Setup (One-time):
1. Create free Mailchimp account at mailchimp.com
2. Verify your email
3. Set up your first audience

### Sending Process:
1. In editor: **"Export for Mailchimp"**
2. Read the instructions displayed
3. Download subscriber CSV (button in panel)
4. **In Mailchimp:**
   - Go to Audience → Import Contacts
   - Upload your CSV file
   - Map fields (email, name)
5. Create New Campaign → Regular Email
6. Select imported audience
7. Design step → Choose **"Code your own"**
8. Paste HTML template from editor
9. Find `{{SUBSCRIBER_ID}}` and replace with `*|UNIQID|*`
10. Preview and test
11. Schedule or send immediately!

### Pros:
✅ Free up to 500 subscribers  
✅ Open and click tracking  
✅ Professional templates  
✅ Automated campaigns  
✅ Scheduling  
✅ A/B testing  
✅ Detailed analytics  
✅ Mobile-optimized

### Cons:
❌ Requires account setup  
❌ Learning curve  
❌ Mailchimp branding on emails (free tier)

### Pricing:
- **Free:** Up to 500 subscribers, 1,000 sends/month
- **Essentials:** $13/month - 500 contacts, remove branding
- **Standard:** $20/month - Advanced features

---

## Method 4: SendGrid 🚀 (ADVANCED)

**Best for:** Large lists, API integration, developers

### Setup (One-time):
1. Create free SendGrid account
2. Verify sender email address
3. Get API key (if using automation)

### Sending Process:
1. In editor: **"Export for SendGrid"**
2. Click **"Download SendGrid CSV"**
3. **In SendGrid:**
   - Marketing → Contacts → Add Contacts
   - Upload CSV
   - Map fields:
     - `email` → Email Address
     - `name` → First Name
     - `subscriber_id` → Custom Field
4. Marketing → Single Sends → Create Single Send
5. Choose uploaded contact list
6. Design → Code Editor
7. Paste HTML template
8. Replace `{{SUBSCRIBER_ID}}` with `{{subscriber_id}}`
9. Preview and send!

### Pros:
✅ Free tier: 100 emails/day forever  
✅ API for automation  
✅ Excellent deliverability  
✅ Real-time analytics  
✅ Template management  
✅ Webhooks for events

### Cons:
❌ More technical setup  
❌ Daily limit on free tier  
❌ Requires email verification

### Pricing:
- **Free:** 100 emails/day forever
- **Essentials:** $19.95/month - 50,000 emails
- **Pro:** $89.95/month - 100,000 emails

---

## Quick Comparison

| Method | Setup Time | Cost | Best For | Tracking | Limit |
|--------|------------|------|----------|----------|-------|
| **Email Client** | 0 min | Free | <50 subs | ❌ | 500/day |
| **Individual** | 0 min | Free | <20 subs | ❌ | Manual |
| **Mailchimp** | 30 min | Free* | 50-500 subs | ✅ | 1,000/month |
| **SendGrid** | 30 min | Free | 100+ subs | ✅ | 100/day |

*Free tiers available

---

## Recommendations by List Size

### 1-20 Subscribers
→ Use **Individual Emails** for personal touch  
→ Or **Email Client** for speed

### 21-50 Subscribers
→ Use **Email Client** (BCC method)  
→ Consider Mailchimp if you want analytics

### 51-500 Subscribers
→ Use **Mailchimp** (free tier)  
→ Professional and scalable

### 500+ Subscribers
→ Use **Mailchimp Paid** or **SendGrid**  
→ Essential for deliverability and compliance

---

## Testing Your Setup

1. Open `newsletter-test.html`
2. Add 2-3 test email addresses (yours and friends)
3. Fill in test article details
4. Try each sending method
5. Verify emails arrive correctly
6. Test unsubscribe links work
7. Clear test subscribers when done

---

## Troubleshooting

### Email client doesn't open
- Check if you have default email app set
- Try different browser
- Manually copy mailto link from console

### BCC limit reached
- Switch to Mailchimp or SendGrid
- Send in batches (split subscriber list)
- Wait 24 hours for limit reset

### Subscribers not showing
- Check browser localStorage isn't cleared
- Verify newsletter.js is loaded
- Try refreshing subscriber list in editor

### Unsubscribe not working
- Verify subscriber ID is correct
- Check URL format is valid
- Test in incognito window

---

## Privacy & Compliance

### Email Client & Individual Methods:
- Subscriber emails stored locally only
- No third-party access
- BCC protects privacy
- Manual unsubscribe handling

### Mailchimp & SendGrid:
- You're uploading data to third-party
- They have their own privacy policies
- GDPR compliant (with proper settings)
- Automatic unsubscribe management

### Best Practices:
1. Only email people who subscribed
2. Include clear unsubscribe link
3. Don't share subscriber data
4. Delete data when requested
5. Be transparent about data usage

---

## Next Steps

1. **Choose your method** based on list size
2. **Test with yourself** first
3. **Send to 1-2 friends** for feedback
4. **Document your process** for future reference
5. **Track what works** (open rates, clicks)
6. **Iterate and improve**

---

**Need help?** Check `NEWSLETTER_GUIDE.md` for complete documentation or contact lambdajournalism@gmail.com

**Last Updated:** December 9, 2025
