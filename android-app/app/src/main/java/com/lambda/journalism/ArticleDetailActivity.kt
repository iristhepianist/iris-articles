package com.lambda.journalism

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.lambda.journalism.databinding.ActivityArticleDetailBinding
import io.noties.markwon.Markwon
import java.text.SimpleDateFormat
import java.util.*

class ArticleDetailActivity : AppCompatActivity() {
    private lateinit var binding: ActivityArticleDetailBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityArticleDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val title = intent.getStringExtra("article_title") ?: "Article"
        val content = intent.getStringExtra("article_content") ?: ""
        val date = intent.getStringExtra("article_date") ?: ""
        val category = intent.getStringExtra("article_category") ?: ""
        val tags = intent.getStringExtra("article_tags") ?: ""

        supportActionBar?.title = title

        binding.titleText.text = title
        binding.categoryText.text = category
        binding.dateText.text = formatDate(date)
        
        if (tags.isNotEmpty()) {
            binding.tagsText.text = "Tags: $tags"
        }

        // Render markdown content
        val markwon = Markwon.create(this)
        markwon.setMarkdown(binding.contentText, content)
    }

    private fun formatDate(dateString: String): String {
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)
            val outputFormat = SimpleDateFormat("MMM dd, yyyy", Locale.US)
            val date = inputFormat.parse(dateString)
            date?.let { outputFormat.format(it).uppercase(Locale.US) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
