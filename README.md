# lambda - Youth Journalism Platform

A barebones 2000s-style static website for youth journalism articles.

## How to Add New Articles

1. **Open `articles.json`** - This file contains all articles
2. **Add a new article object** to the `"articles"` array following this template:

```json
{
  "id": "unique-article-id",
  "title": "Your Article Title",
  "category": "Essay",
  "date": "2025-12-03",
  "excerpt": "A brief summary of your article (1-2 sentences)",
  "content": "Your full article content here.\n\nUse \\n\\n for paragraph breaks.\n\nYou can use **bold** and *italic* markdown formatting."
}
```

### Categories
Use one of these exact values for the `category` field:
- `"Essay"`
- `"Report"`
- `"Opinion"`

### Article ID
- Must be unique
- Use lowercase letters and hyphens
- Example: `"climate-change-report"` or `"tech-privacy-2025"`

### Date Format
- Use ISO format: `"YYYY-MM-DD"`
- Example: `"2025-12-03"`

### Example Article Entry

```json
{
  "id": "climate-action-essay",
  "title": "Climate Action in Our Community",
  "category": "Essay",
  "date": "2025-12-03",
  "excerpt": "Exploring how young people can make a difference in fighting climate change at the local level.",
  "content": "Climate change is not just a global issue—it's happening right here in our community.\n\nEvery small action counts. From organizing recycling drives to advocating for bike lanes, youth voices are making a real impact.\n\nThis essay explores practical steps we can take today."
}
```

## Important Notes

- **No Python needed!** This is a static site that runs entirely with HTML, CSS, and JavaScript
- Perfect for GitHub Pages hosting
- Add a comma after each article object (except the last one)
- Make sure your JSON syntax is valid
- The site will automatically display new articles when you update `articles.json`

## File Structure

```
iris-articles/
├── index.html          # Main page with article list
├── article.html        # Individual article page
├── app.js             # JavaScript for loading and filtering
├── articles.json      # All articles stored here (EDIT THIS TO ADD ARTICLES)
└── README.md          # This file
```

## Testing Locally

Due to browser security (CORS), you need to run a local server to test:

**Python (if installed):**
```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000`

## Deploying to GitHub Pages

1. Push all files to your repository
2. Go to Settings → Pages
3. Select your branch (usually `main`)
4. Your site will be live at: `https://yourusername.github.io/repository-name/`

That's it! No build process, no complicated setup—just edit the JSON and push!
