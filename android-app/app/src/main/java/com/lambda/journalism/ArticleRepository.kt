package com.lambda.journalism

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class ArticleRepository(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("articles_cache", Context.MODE_PRIVATE)
    private val gson = Gson()
    private val apiService = ArticleService.create()

    suspend fun getArticles(forceRefresh: Boolean = false): Result<List<Article>> = withContext(Dispatchers.IO) {
        try {
            if (forceRefresh) {
                // Fetch from network
                val response = apiService.getArticles()
                // Cache the result
                cacheArticles(response.articles)
                Result.success(response.articles)
            } else {
                // Try cache first
                val cached = getCachedArticles()
                if (cached != null) {
                    Result.success(cached)
                } else {
                    // Fallback to network
                    val response = apiService.getArticles()
                    cacheArticles(response.articles)
                    Result.success(response.articles)
                }
            }
        } catch (e: Exception) {
            // If network fails, try cache
            val cached = getCachedArticles()
            if (cached != null) {
                Result.success(cached)
            } else {
                Result.failure(e)
            }
        }
    }

    private fun cacheArticles(articles: List<Article>) {
        val json = gson.toJson(articles)
        prefs.edit().putString("articles_data", json).apply()
        prefs.edit().putLong("cache_timestamp", System.currentTimeMillis()).apply()
    }

    private fun getCachedArticles(): List<Article>? {
        val json = prefs.getString("articles_data", null) ?: return null
        return try {
            val articlesArray = gson.fromJson(json, Array<Article>::class.java)
            articlesArray.toList()
        } catch (e: Exception) {
            null
        }
    }
}
