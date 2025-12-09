# Newsletter Feature Documentation

## Overview
The lambda newsletter system allows visitors to subscribe to receive notifications about new articles and updates. This is a client-side implementation using localStorage for data persistence.

## Features

### For Subscribers
- **Email Subscription**: Simple form on all major pages (index, about, article)
- **Optional Name Field**: Subscribers can optionally provide their name
- **Email Validation**: Client-side validation ensures valid email formats
- **Unsubscribe Option**: Every email includes an unsubscribe link
- **Privacy-First**: All data stored locally in browser (no external services)

### For Editors
- **Subscriber Management**: View all subscribers in the editor panel
- **Export Options**: Download subscriber list as CSV or JSON
- **Email Template Generator**: Automatically create HTML email templates for new articles
- **Subscriber Count**: Real-time count of newsletter subscribers

## How It Works

### Subscription Flow
1. Visitor enters email (and optional name) in newsletter form
2. JavaScript validates the email format
3. If valid and not duplicate, subscriber is added to localStorage
4. Confirmation message shown to user
5. Data persists across browser sessions

### Data Storage
Subscribers are stored in the browser's localStorage under the key `lambda_newsletter_subscribers`. Each subscriber object contains:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "subscribedAt": "2025-12-09T10:30:00.000Z",
  "id": "unique-hash-id"
}
```

### Email Notification Process
1. Editor creates a new article using the Article Editor
2. Click "📧 NEWSLETTER" button to open newsletter panel
3. Click "Generate Email Template" to create HTML email
4. **Choose a sending method:**
   - **Send via Email Client** - Opens your default email app with all subscribers in BCC (best for <50 subscribers)
   - **Generate Individual Emails** - Creates clickable mailto links for each subscriber with personalized unsubscribe
   - **Export for Mailchimp** - Shows instructions for importing to Mailchimp
   - **Export for SendGrid** - Downloads SendGrid-compatible CSV and shows setup instructions
5. Emails are sent with personalized unsubscribe links for each subscriber

## Usage Guide

### For Visitors
#### Subscribe to Newsletter
1. Scroll to the newsletter section (yellow box at bottom of pages)
2. Enter your email address
3. Optionally enter your name
4. Click "Subscribe"
5. You'll see a confirmation message

#### Unsubscribe
Click the "Unsubscribe" link in any newsletter email you receive, or visit `index.html?unsubscribe=YOUR_ID`

### For Editors
#### View Subscribers
1. Go to `editor.html`
2. Click the "📧 NEWSLETTER (X)" button in the header
3. View the list of all subscribers with their details

#### Export Subscriber List
1. Open the newsletter panel in editor
2. Click "Export as CSV" or "Export as JSON"
3. File will download automatically

#### Send Newsletter for New Article
1. Create article using the Article Editor form
2. Click "Generate JSON" to prepare the article
3. Open the newsletter panel (📧 NEWSLETTER button)
4. Click "Generate Email Template"
5. **Choose your sending method:**

**Method 1: Email Client (Quick & Easy)**
- Click "Send via Email Client"
- Your default email app opens with all subscribers in BCC
- Review and send
- ✅ Best for: <50 subscribers, quick sending

**Method 2: Individual Emails (Personalized)**
- Click "Generate Individual Emails"
- Get a list of clickable mailto links, one per subscriber
- Each email has personalized greeting and unsubscribe link
- Click each link to compose individual emails
- ✅ Best for: Personal touch, small lists

**Method 3: Mailchimp (Professional)**
- Click "Export for Mailchimp"
- Download subscribers as CSV (button above)
- Import CSV to Mailchimp audience
- Create campaign and paste HTML template
- Replace `{{SUBSCRIBER_ID}}` with `*|UNIQID|*`
- ✅ Best for: Large lists, tracking, professional campaigns

**Method 4: SendGrid (Advanced)**
- Click "Export for SendGrid"
- Download SendGrid-compatible CSV
- Import to SendGrid contacts
- Create Single Send with HTML template
- Replace `{{SUBSCRIBER_ID}}` with `{{subscriber_id}}`
- ✅ Best for: APIs, automation, large scale

## Files

### `newsletter.js`
Main JavaScript file containing:
- `NewsletterManager` class
- Subscribe/unsubscribe functions
- Data validation and storage
- Export functionality (CSV, JSON)

### Modified Files
- `index.html` - Added newsletter form and script
- `about.html` - Added newsletter form and script
- `article.html` - Added newsletter form and script
- `editor.html` - Added newsletter management panel and email template generator

## Email Template
The generated email template includes:
- Responsive HTML design matching lambda branding
- Article title, excerpt, and category
- Direct link to full article
- Unsubscribe link
- Mobile-friendly layout
- Compatible with major email clients

## Privacy & Data Management

### Data Storage
- All subscriber data is stored locally in the user's browser
- No external databases or third-party services
- Data persists until browser storage is cleared

### Limitations
- Subscribers are browser-specific (clearing cache removes subscriptions)
- No cross-device synchronization
- Editor must manually send emails (no automation)
- Subscriber data only accessible from the browser where they subscribed

### GDPR Compliance
- Users can unsubscribe at any time
- No tracking or analytics by default
- Data stored locally (user controls deletion)
- Clear opt-in process

## Email Service Integration

### Recommended Sending Methods

#### Quick Send (Built-in) - FREE ✅
**Best for:** Small teams, <50 subscribers, immediate sending

1. Click "Send via Email Client" in editor
2. Your default email app opens
3. All subscribers added to BCC automatically
4. Review subject and body
5. Click send!

**Pros:**
- Instant, no setup
- Free, no external service
- Works with any email provider

**Cons:**
- BCC limits vary by provider (Gmail: 500/day, Outlook: 500/day)
- No tracking or analytics
- Less professional appearance
- Manual process for each newsletter

#### Individual Emails (Built-in) - FREE ✅
**Best for:** Personal touch, small subscriber base

1. Click "Generate Individual Emails"
2. Get personalized mailto links for each subscriber
3. Click each link to compose
4. Each has personalized greeting and unique unsubscribe

**Pros:**
- Personal, one-to-one feel
- Unique unsubscribe per user
- Name personalization if provided
- No external service needed

**Cons:**
- Time-consuming for large lists
- Manual sending required
- No bulk tracking

#### Mailchimp - FREE Tier Available
1. Export subscribers as CSV
2. Import to Mailchimp audience
3. Create campaign with generated HTML template
4. Send to imported audience

#### SendGrid
1. Export subscribers as CSV
2. Add contacts to SendGrid
3. Create Single Send with HTML template
4. Replace `{{SUBSCRIBER_ID}}` with merge tags

#### Email Octopus
1. Import CSV of subscribers
2. Create campaign with HTML
3. Use custom fields for personalization

#### Manual (Gmail/Outlook) - Small Lists Only
1. Use BCC for privacy
2. Paste HTML into email body
3. Manually replace unsubscribe IDs
4. **Note**: Only for <50 subscribers

## Future Enhancements

### Possible Improvements
- Server-side storage with API
- Automated email sending
- Subscription confirmation (double opt-in)
- Email preferences (frequency, topics)
- Analytics (open rates, click tracking)
- RSS feed generation
- Browser notification support

## Troubleshooting

### Subscription Not Working
- Check browser console for JavaScript errors
- Verify `newsletter.js` is loaded
- Clear browser cache and try again
- Ensure localStorage is enabled

### Subscribers Not Showing in Editor
- Subscribers are browser-specific
- Check if using same browser/device
- Verify localStorage isn't cleared
- Try refreshing the subscriber list

### Email Template Not Generating
- Ensure article form is filled out
- Click "Generate JSON" first
- Check that title, excerpt, and ID are provided

## Support
For issues or questions:
- Email: lambdajournalism@gmail.com
- Discord: https://discord.gg/mC7kJnRNEe

---

**Version**: 1.0  
**Last Updated**: December 9, 2025
