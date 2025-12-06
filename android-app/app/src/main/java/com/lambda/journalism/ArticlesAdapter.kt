package com.lambda.journalism

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.lambda.journalism.databinding.ItemArticleBinding
import java.text.SimpleDateFormat
import java.util.*

class ArticlesAdapter(
    private val onArticleClick: (Article) -> Unit
) : ListAdapter<Article, ArticlesAdapter.ArticleViewHolder>(ArticleDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ArticleViewHolder {
        val binding = ItemArticleBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ArticleViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ArticleViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class ArticleViewHolder(
        private val binding: ItemArticleBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        fun bind(article: Article) {
            binding.titleText.text = article.title
            binding.excerptText.text = article.excerpt
            binding.categoryText.text = article.category
            binding.dateText.text = formatDate(article.date)
            
            if (!article.tags.isNullOrEmpty()) {
                binding.tagsText.text = "Tags: ${article.tags.joinToString(", ")}"
            } else {
                binding.tagsText.text = ""
            }
            
            binding.root.setOnClickListener {
                onArticleClick(article)
            }
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
    }

    class ArticleDiffCallback : DiffUtil.ItemCallback<Article>() {
        override fun areItemsTheSame(oldItem: Article, newItem: Article): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Article, newItem: Article): Boolean {
            return oldItem == newItem
        }
    }
}
