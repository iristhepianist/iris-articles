package com.lambda.journalism

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.SearchView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.lambda.journalism.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var repository: ArticleRepository
    private lateinit var adapter: ArticlesAdapter
    private var allArticles: List<Article> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        repository = ArticleRepository(this)
        
        setupRecyclerView()
        setupSwipeRefresh()
        setupSearch()
        setupNavigation()
        
        loadArticles(false)
    }

    private fun setupNavigation() {
        binding.navAbout.setOnClickListener {
            startActivity(Intent(this, AboutActivity::class.java))
        }
        binding.navChangelog.setOnClickListener {
            startActivity(Intent(this, ChangelogActivity::class.java))
        }
    }

    private fun setupRecyclerView() {
        adapter = ArticlesAdapter { article ->
            val intent = Intent(this, ArticleDetailActivity::class.java)
            intent.putExtra("article_id", article.id)
            intent.putExtra("article_title", article.title)
            intent.putExtra("article_content", article.content)
            intent.putExtra("article_date", article.date)
            intent.putExtra("article_category", article.category)
            intent.putExtra("article_tags", article.tags?.joinToString(", ") ?: "")
            startActivity(intent)
        }
        
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = adapter
    }

    private fun setupSwipeRefresh() {
        binding.swipeRefresh.setOnRefreshListener {
            loadArticles(true)
        }
    }

    private fun setupSearch() {
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                filterArticles(query)
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                filterArticles(newText)
                return true
            }
        })
    }

    private fun loadArticles(forceRefresh: Boolean) {
        binding.swipeRefresh.isRefreshing = true
        binding.errorView.visibility = View.GONE
        
        lifecycleScope.launch {
            repository.getArticles(forceRefresh).fold(
                onSuccess = { articles ->
                    allArticles = articles
                    adapter.submitList(articles)
                    binding.swipeRefresh.isRefreshing = false
                    binding.errorView.visibility = View.GONE
                    binding.recyclerView.visibility = View.VISIBLE
                },
                onFailure = { error ->
                    binding.swipeRefresh.isRefreshing = false
                    if (allArticles.isEmpty()) {
                        binding.errorView.visibility = View.VISIBLE
                        binding.recyclerView.visibility = View.GONE
                        binding.errorText.text = "Failed to load articles.\n${error.message}"
                    } else {
                        Toast.makeText(this@MainActivity, "Using cached articles", Toast.LENGTH_SHORT).show()
                    }
                }
            )
        }
    }

    private fun filterArticles(query: String?) {
        if (query.isNullOrBlank()) {
            adapter.submitList(allArticles)
        } else {
            // Parse search filters (tags:ai category:essays, etc.)
            val filters = parseSearchFilters(query)
            
            val filtered = allArticles.filter { article ->
                var matches = true
                
                // Apply tag filters
                if (filters.tags.isNotEmpty()) {
                    matches = matches && filters.tags.all { tag ->
                        article.tags?.any { it.equals(tag, ignoreCase = true) } == true
                    }
                }
                
                // Apply category filter
                if (filters.category != null) {
                    matches = matches && article.category.equals(filters.category, ignoreCase = true)
                }
                
                // Apply general search text
                if (filters.searchText.isNotEmpty()) {
                    matches = matches && (
                        article.title.contains(filters.searchText, ignoreCase = true) ||
                        article.excerpt.contains(filters.searchText, ignoreCase = true) ||
                        article.content.contains(filters.searchText, ignoreCase = true)
                    )
                }
                
                matches
            }
            adapter.submitList(filtered)
        }
    }
    
    private fun parseSearchFilters(query: String): SearchFilters {
        val tags = mutableListOf<String>()
        var category: String? = null
        val remainingText = mutableListOf<String>()
        
        // Split query into tokens
        val tokens = query.split("\\s+".toRegex())
        
        for (token in tokens) {
            when {
                token.startsWith("tags:", ignoreCase = true) -> {
                    val tagValue = token.substring(5).trim()
                    if (tagValue.isNotEmpty()) {
                        tags.add(tagValue)
                    }
                }
                token.startsWith("tag:", ignoreCase = true) -> {
                    val tagValue = token.substring(4).trim()
                    if (tagValue.isNotEmpty()) {
                        tags.add(tagValue)
                    }
                }
                token.startsWith("category:", ignoreCase = true) -> {
                    val catValue = token.substring(9).trim()
                    if (catValue.isNotEmpty()) {
                        category = catValue
                    }
                }
                else -> {
                    if (token.isNotEmpty()) {
                        remainingText.add(token)
                    }
                }
            }
        }
        
        return SearchFilters(
            tags = tags,
            category = category,
            searchText = remainingText.joinToString(" ")
        )
    }
    
    private data class SearchFilters(
        val tags: List<String>,
        val category: String?,
        val searchText: String
    )

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_refresh -> {
                loadArticles(true)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
