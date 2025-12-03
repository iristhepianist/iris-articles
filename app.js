let articlesData = null;
let currentSort = 'newest';
let currentFilter = 'all';
let currentTagFilters = []; // Changed to array for multi-select
let searchQuery = '';
let allArticles = [];
let allTags = [];
let currentPage = 1;
const articlesPerPage = 5;

async function loadArticles() {
    try {
        // Fetch articles from JSON file
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error('Failed to load articles');
        }
        articlesData = await response.json();
        
        console.log('Articles loaded:', articlesData);
        
        allArticles = [...articlesData.articles];
        
        // Collect unique tags
        allTags = [...new Set(allArticles.flatMap(article => article.tags || []))].sort();
        
        displayFilteredArticles();
        
        setupSortFilterListeners();
        
        setupTagFilterListeners();
        
        setupSearchListener();
    } catch (error) {
        console.error('Error loading articles:', error);
        const container = document.getElementById('articles-container');
        if (container) {
            container.innerHTML = '<p style="color: #888; text-align: center; font-style: italic;">Error loading articles. Please check articles.json file.</p>';
        }
    }
}

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase();
            currentPage = 1; // Reset to first page when searching
            displayFilteredArticles();
        });
    }
}

function setupTagFilterListeners() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // Count articles per tag
    const tagCounts = {};
    allTags.forEach(tag => {
        tagCounts[tag] = allArticles.filter(article => article.tags && article.tags.includes(tag)).length;
    });

    // Add tags section
    const tagsSection = document.createElement('div');
    tagsSection.innerHTML = `
        <h2 style="margin-top: 15px;">Tags (click multiple)</h2>
        <button class="filter-btn tag-filter-btn" data-tag="all">Clear All</button>
        ${allTags.map(tag => `<button class="filter-btn tag-filter-btn" data-tag="${tag}">${tag} <span style='color:#888;'>(${tagCounts[tag]})</span></button>`).join('')}
    `;
    sidebar.appendChild(tagsSection);
    
    // Add event listeners for multi-select
    const tagButtons = document.querySelectorAll('.tag-filter-btn');
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.dataset.tag;
            
            if (tag === 'all') {
                // Clear all selections
                currentTagFilters = [];
                tagButtons.forEach(btn => btn.classList.remove('active'));
            } else {
                // Toggle this tag
                const index = currentTagFilters.indexOf(tag);
                if (index > -1) {
                    currentTagFilters.splice(index, 1);
                    this.classList.remove('active');
                } else {
                    currentTagFilters.push(tag);
                    this.classList.add('active');
                }
            }
            
            currentPage = 1;
            displayFilteredArticles();
        });
    });
}

function setupSortFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            currentPage = 1; // Reset to first page when filtering
            displayFilteredArticles();
        });
    });
    
    const sortButtons = document.querySelectorAll('.sort-btn-sidebar');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            currentPage = 1; // Reset to first page when sorting
            displayFilteredArticles();
        });
    });
}

function displayFilteredArticles() {
    let filteredArticles = [...allArticles];
    
    if (searchQuery) {
        filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        );
    }
    
    if (currentFilter !== 'all') {
        filteredArticles = filteredArticles.filter(article => {
            const category = article.category.toLowerCase();
            const filter = currentFilter.toLowerCase();
            // Match exact or if category starts with filter (e.g., "essay" matches "Essay")
            return category === filter || category.startsWith(filter);
        });
    }
    
    // Filter by tags (match any selected tag)
    if (currentTagFilters.length > 0) {
        filteredArticles = filteredArticles.filter(article => 
            article.tags && article.tags.some(tag => currentTagFilters.includes(tag))
        );
    }
    
    if (currentSort === 'newest') {
        filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSort === 'oldest') {
        filteredArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (currentSort === 'alpha') {
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    const container = document.getElementById('articles-container');
    
    if (container) {
        if (filteredArticles.length > 0) {
            displayArticlesWithPagination(filteredArticles, container);
        } else {
            container.innerHTML = '<p style="color: #666; text-align: center; font-style: italic;">No articles found matching your search or filter.</p>';
        }
    }
}

function displayArticlesWithPagination(articles, container) {
    // Remove old pagination if it exists
    const oldPagination = document.querySelector('.pagination');
    if (oldPagination) {
        oldPagination.remove();
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = articles.slice(startIndex, endIndex);
    
    // Display articles
    displayArticles(paginatedArticles, container);
    
    // Add pagination controls
    const paginationHTML = `
        <div class="pagination" style="text-align: center; margin-top: 20px; padding: 10px; background: #EEEEEE; border: 1px solid #CCCCCC;">
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} style="padding: 5px 10px; margin: 0 5px; cursor: pointer; background: #DDDDDD; border: 1px solid #000; font-size: 11px;">← PREV</button>
            <span style="margin: 0 10px; font-size: 11px;">Page ${currentPage} of ${totalPages} (${articles.length} articles)</span>
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} style="padding: 5px 10px; margin: 0 5px; cursor: pointer; background: #DDDDDD; border: 1px solid #000; font-size: 11px;">NEXT →</button>
        </div>
    `;
    container.insertAdjacentHTML('afterend', paginationHTML);
}

function changePage(page) {
    const totalFilteredArticles = [...allArticles];
    let filtered = totalFilteredArticles;
    
    if (searchQuery) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery) ||
            article.content.toLowerCase().includes(searchQuery) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        );
    }
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(article => {
            const category = article.category.toLowerCase();
            const filter = currentFilter.toLowerCase();
            return category === filter || category.startsWith(filter);
        });
    }
    
    if (currentTagFilters.length > 0) {
        filtered = filtered.filter(article => 
            article.tags && article.tags.some(tag => currentTagFilters.includes(tag))
        );
    }
    
    const totalPages = Math.ceil(filtered.length / articlesPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        // Remove old pagination
        const oldPagination = document.querySelector('.pagination');
        if (oldPagination) {
            oldPagination.remove();
        }
        displayFilteredArticles();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function displayArticles(articles, container) {
    container.innerHTML = articles.map(article => `
        <div class="article-item" onclick="window.location.href='article.html?id=${article.id}'">
            <div class="article-meta">
                <span>${article.category}</span>
                <span>${formatDate(article.date)}</span>
                ${article.tags ? `<span class='article-tags'>tags: ${article.tags.join(', ')}</span>` : ''}
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

if (document.getElementById('recent-articles')) {
    loadArticles();
}

if (document.getElementById('articles-container')) {
    loadArticles();
}

function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        document.getElementById('article-content').innerHTML = 
            '<p style="text-align: center; color: #666;">Article not found.</p>';
        return;
    }
    
    // Load articles from JSON first, then display
    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles.find(a => a.id === articleId);
            
            if (!article) {
                document.getElementById('article-content').innerHTML = 
                    '<p style="text-align: center; color: #666;">Article not found.</p>';
                return;
            }
            
            document.title = `${article.title} - lambda`;
            
            const container = document.getElementById('article-content');
            container.innerHTML = `
                <div class="article-header">
                    <div class="article-meta">
                        <span>${article.category}</span>
                        <span>${formatDate(article.date)}</span>
                        ${article.tags ? `<span class='article-tags'>tags: ${article.tags.join(', ')}</span>` : ''}
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
        })
        .catch(error => {
            console.error('Error loading article:', error);
            document.getElementById('article-content').innerHTML = 
                '<p style="text-align: center; color: #666;">Error loading article.</p>';
        });
}

function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
    
    html = html.split('\n\n').map(para => {
        if (!para.startsWith('<h') && para.trim()) {
            return `<p>${para}</p>`;
        }
        return para;
    }).join('\n');
    
    return html;
}

if (document.getElementById('article-content')) {
    loadArticleDetail();
}
