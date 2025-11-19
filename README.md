# How to Add New Articles to Your Blog

Welcome! This guide will show you how to easily add new articles to your portfolio/blog site.

## Quick Start

To add a new article, you only need to edit **ONE FILE**: `app.js`

## Step-by-Step Instructions

### 1. Open `app.js`

At the very top of this file, you'll see the `articlesData` object that contains all your articles.

### 2. Add Your New Article

Find the `"articles": [` line and add your new article at the **top** of the array (right after the opening `[`):

```json
{
  "id": "your-article-url-name",
  "title": "Your Article Title",
  "category": "Essay",
  "date": "2025-11-19",
  "excerpt": "A brief description of your article that appears on the home page.",
  "content": "# Your Article Title\n\nYour article content goes here.\n\n## Section Heading\n\nWrite your paragraphs here.\n\n**Bold text** and *italic text* work too."
},
```

### 3. Fill in the Details

- **id**: A unique URL-friendly name (lowercase, no spaces, use hyphens)
  - Example: `"my-first-article"` or `"thoughts-on-writing"`
  
- **title**: Your article's full title
  - Example: `"My First Article"`
  
- **category**: Pick one: `"Essay"`, `"Investigation"`, `"Short Fiction"`, `"Experimental"`, or create your own
  
- **date**: Format: `"YYYY-MM-DD"`
  - Example: `"2025-11-19"`
  
- **excerpt**: 1-2 sentences that appear on the home page
  
- **content**: Your full article using simple markdown formatting

### 4. Writing Your Content

The `content` field uses simple markdown. Here's what you can use:

#### Headers
```
# Main Title (biggest)
## Section Heading (medium)
### Subsection (smaller)
```

#### Text Formatting
```
**Bold text**
*Italic text*
```

#### Paragraphs
Just separate paragraphs with `\n\n` (two line breaks):
```
"First paragraph.\n\nSecond paragraph."
```

#### Links
```
[Link text](https://example.com)
```

### 5. Save the File

That's it! Just open `index.html` in your browser (double-click it) and your new article will appear on the home page.

**No web server needed!** It works as a simple HTML file.

## Full Example

Here's a complete example of adding a new article:

```json
{
  "id": "my-new-article",
  "title": "My Thoughts on Digital Privacy",
  "category": "Essay",
  "date": "2025-11-19",
  "excerpt": "Why privacy matters more than ever in our connected world.",
  "content": "# My Thoughts on Digital Privacy\n\nPrivacy isn't just about having something to hide.\n\n## Why It Matters\n\nEvery day, we trade our personal information for convenience. But at what cost?\n\n## What We Can Do\n\nHere are some steps:\n\n**1. Use encrypted messaging**\n*Signal* and *WhatsApp* offer end-to-end encryption.\n\n**2. Browse privately**\nConsider using a VPN and privacy-focused browsers.\n\n## Conclusion\n\nThe fight for privacy is the fight for freedom."
},
{
  "id": "gooning",
  "title": "I love gooning!",
  ...
```

Note: Don't forget the comma after the closing `}` of your article (unless it's the last article in the array).

## Tips

1. **Keep it organized**: Most recent articles should be at the top
2. **Unique IDs**: Make sure each article has a different `id`
3. **Date format**: Always use `YYYY-MM-DD` format
4. **Test your code**: If something breaks, check for missing commas or quotes in `app.js`
5. **Backup**: Keep a copy of `app.js` before making big changes
6. **Works offline**: Just double-click `index.html` - no server needed!

## Categories You Can Use

- `Investigation` - Journalistic pieces, research
- `Essay` - Opinion pieces, think pieces
- `Short Fiction` - Creative writing, stories
- `Experimental` - Unusual formats, experiments
- Or make your own!

## Need Help?

If your site stops working:
1. Check that all quotes `"` and braces `{}` are properly closed
2. Make sure commas `,` separate each article
3. Verify the date format is correct
4. Check that the `id` doesn't have spaces or special characters

## Advanced: Markdown Features

You can use these in your `content` field:

```
# H1 heading
## H2 heading  
### H3 heading

**bold text**
*italic text*

[link text](url)

Paragraphs separated by \n\n
```

---

**That's all you need to know!** Just edit the `articlesData` object in `app.js` and your articles will appear. No server, no complicated setup—just write your content and open the HTML file!
