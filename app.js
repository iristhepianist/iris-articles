// Articles data embedded directly to work without a server
const articlesData = {
  "articles": [
    {
      "id": "ai-in-2025-opinion",
      "title": "AI in 2025",
      "category": "Essay",
      "date": "2025-11-19",
      "excerpt": "A personal critique of the omnipresence of AI in modern workflows, questioning whether adoption is truly a net benefit for ordinary users, workers, and the broader tech ecosystem.",
      "content": "What do you think when you think of the technological advancements that happened this year?\n\nNow think. How many of them have been AI-related in some way?\n\nExactly.\n\nWe all use a little AI in all our workflows, believe it or not. I know many a person who seem to be against GenAI on the outside, but secretly use ChatGPT to make their searching a little easier.\n\nThis utility that AI has for us is not a tool, but it is a leech. Companies like Microsoft and OpenAI believe that, because of these niche applications of AI, they could earn more money by shoving it into every nook and cranny of their goddamn ecosystem.\nAsk any Windows 11 user and you'll probably get to know the average user's experience with something like Copilot.\n\nAI has boosted the Global GDP, yes- there's no doubt in that. AI adoption is projected to deliver a 12–15% boost to global GDP over the next decade, equal to between $7 and $15.7 trillion in additional output. Rapid automation of routine tasks and optimization of logistics, manufacturing, and services have driven efficiency and supported broad sector growth. But at what cost? Labor markets have become more volatile, as the jobs around AI are much fewer in number than traditional white collar jobs. Additionally, the old sanctity of the workplace is diminished by the cold automation done by these companies. This may seem silly to hear, but I fear having to work around AI automated servers is like having a really stupid junior engineer who's sole merit is doing things quickly, but who needs hyperspecific instructions for even basic tasks. Rubbish, honestly!\n\nHowever may the big firms say \"upskilling\" is necessary, using AI still depends largely on the tool itself. And as we are nearing the popping of the AI bubble, the skills we worked so hard to acquire might become as useless as IT degrees are now, in countries like India. It would be a relic of a bygone time.\n\nAdditionally, AI usage for the consumer is hardly optimized either. It is shoved into every app, every website, every OS- (not you, Linux!) only because it is another buzzword to add to the pile of slop these companies already produce. Useless AI applications, where humans more than excel already, and where AI is basically useless for the consumer, are growing day by day, making our life harder as well as the worker's.\n\nOutside of software, the AI bubble is making the hardware market experience a sharp decline in availability of parts. RAM has more than tripled in price, mostly because AI firms are buying massive amounts of RAM to run their LLMs, and it is a very bad time to buy most hardware- GPU companies like NVidia are earning way more from AI firms, so they are not incentivised to work for the consumer. SSDs and HDDs for storage, also have had an increase in price, which means an annoying uptick to anyone wanting to make a build in 2025.\n\nHow do we use AI safely? Well, like all good things in life, there are FOSS alternatives. FOSS is a concept that means FREE, OPEN SOURCE, SOFTWARE. People with good gpus can run local AIs, and experiment with them too, while keeping privacy secure (Ooh, that is a good topic for the future!) in this age of publicity.\n\nIn my personal opinion, the working class of white collar workers need to unionise. Many of them possess skills in management, programming, and other fields, which are a boon in software development, but are chained by the bounds of corporate life. Their passion and love for code, for computers, evaporates in contact with corporate life; Some enjoy the job, some don't. However, a union of white collar workers could fuel this young flame within each other again; they will protect each other from the bounds of corporate life, and encourage a new wave of innovation, for programmers by programmers.\n\nMany projects like this exist already- Linux Kernel, KDE, etc. all work unionised, not as a company, and whoever feels passionate and can contribute is free to do so. That is the beauty of FOSS, and why closed source corporate software will never match the beauty of FOSS.\n\nI feel non-profit oriented programming should work best for us in this era, closing the age of subscription based services and bringing a new flame of free, open source alternatives, to which anyone can contribute and do their part, for the good of both the user, the developer, and the software.\n\nThanks for reading my first article! I'll expand on the topics of privacy and white-collar unions more in a later essay, as I feel this one is getting a bit too wordy. I'll see you in the next one!\n\n- iris"
    }
  ]
};

// State management
let currentSort = 'newest';
let currentFilter = 'all';
let searchQuery = '';
let allArticles = [];

// Load and display articles
function loadArticles() {
    try {
        console.log('Articles loaded:', articlesData);
        
        // Store all articles
        allArticles = [...articlesData.articles];
        
        // Apply initial sort and filter
        displayFilteredArticles();
        
        // Set up event listeners for sort/filter buttons
        setupSortFilterListeners();
        
        // Set up search listener
        setupSearchListener();
    } catch (error) {
        console.error('Error loading articles:', error);
        const container = document.getElementById('articles-container');
        if (container) {
            container.innerHTML = '<p style="color: #888; text-align: center; font-style: italic;">Error loading articles.</p>';
        }
    }
}

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase();
            displayFilteredArticles();
        });
    }
}

function setupSortFilterListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            displayFilteredArticles();
        });
    });
    
    // Sort buttons
    const sortButtons = document.querySelectorAll('.sort-btn-sidebar');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            displayFilteredArticles();
        });
    });
}

function displayFilteredArticles() {
    let filteredArticles = [...allArticles];
    
    // Apply search filter
    if (searchQuery) {
        filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery)
        );
    }
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredArticles = filteredArticles.filter(article => 
            article.category.toLowerCase() === currentFilter.toLowerCase()
        );
    }
    
    // Apply sort
    if (currentSort === 'newest') {
        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSort === 'oldest') {
        filteredArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (currentSort === 'alpha') {
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Display articles
    const container = document.getElementById('articles-container');
    
    if (container) {
        if (filteredArticles.length > 0) {
            displayArticles(filteredArticles, container);
        } else {
            container.innerHTML = '<p style="color: #666; text-align: center; font-style: italic;">No articles found matching your search or filter.</p>';
        }
    }
}

function displayArticles(articles, container) {
    container.innerHTML = articles.map(article => `
        <div class="article-item" onclick="window.location.href='article.html?id=${article.id}'">
            <div class="article-meta">
                <span>${article.category}</span>
                <span>${formatDate(article.date)}</span>
            </div>
            <h3>${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    }).toUpperCase();
}

// Load articles when page loads
if (document.getElementById('recent-articles')) {
    loadArticles();
}

// Load articles when page loads
if (document.getElementById('articles-container')) {
    loadArticles();
}

// Article detail page functionality
function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        document.getElementById('article-content').innerHTML = 
            '<p style="text-align: center; color: #666;">Article not found.</p>';
        return;
    }
    
    try {
        const article = articlesData.articles.find(a => a.id === articleId);
        
        if (!article) {
            document.getElementById('article-content').innerHTML = 
                '<p style="text-align: center; color: #666;">Article not found.</p>';
            return;
        }
        
        // Update page title
        document.title = `${article.title} - nowhere writer`;
        
        // Display article
        const container = document.getElementById('article-content');
        container.innerHTML = `
            <div class="article-header">
                <div class="article-meta">
                    <span>${article.category}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
                <h1>${article.title}</h1>
            </div>
            <div class="article-body">
                ${convertMarkdownToHTML(article.content)}
            </div>
            <div class="article-footer">
                <a href="index.html" class="back-link">← BACK TO HOME</a>
            </div>
        `;
    } catch (error) {
        console.error('Error loading article:', error);
    }
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (!para.startsWith('<h') && para.trim()) {
            return `<p>${para}</p>`;
        }
        return para;
    }).join('\n');
    
    return html;
}

// Load article detail if on article page
if (document.getElementById('article-content')) {
    loadArticleDetail();
}
