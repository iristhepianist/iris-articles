async function loadChangelog() {
    try {
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error('Failed to load articles');
        }
        const data = await response.json();
      
        const sortedArticles = [...data.articles].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        

        const groupedByDate = {};
        sortedArticles.forEach(article => {
            if (!groupedByDate[article.date]) {
                groupedByDate[article.date] = [];
            }
            groupedByDate[article.date].push(article);
        });
        
        const changelogContainer = document.getElementById('changelog-entries');
        const changelogHTML = Object.keys(groupedByDate).map(date => {
            const articles = groupedByDate[date];
            const formattedDate = formatDate(date);
            
            const articlesHTML = articles.map(article => `
                <div class="changelog-item">
                    <div class="changelog-item-title" onclick="window.location.href='article.html?id=${article.id}'">
                        ${article.title}
                    </div>
                    <div class="changelog-item-meta">
                        ${article.category}
                        ${article.author ? ` • by ${article.author}` : ''}
                        ${article.tags ? ` • tags: ${article.tags.join(', ')}` : ''}
                    </div>
                </div>
            `).join('');
            
            return `
                <div class="changelog-entry">
                    <div class="changelog-date">${formattedDate}</div>
                    ${articlesHTML}
                </div>
            `;
        }).join('');
        
        changelogContainer.innerHTML = changelogHTML;
        
    } catch (error) {
        console.error('Error loading changelog:', error);
        document.getElementById('changelog-entries').innerHTML = 
            '<p style="text-align: center; color: #666;">Error loading changelog.</p>';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    }).toUpperCase();
}


loadChangelog();
