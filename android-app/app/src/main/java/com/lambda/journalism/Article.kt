package com.lambda.journalism

import com.google.gson.annotations.SerializedName

data class Article(
    @SerializedName("id") val id: String,
    @SerializedName("title") val title: String,
    @SerializedName("category") val category: String,
    @SerializedName("date") val date: String,
    @SerializedName("tags") val tags: List<String>? = null,
    @SerializedName("excerpt") val excerpt: String,
    @SerializedName("content") val content: String
)

data class ArticlesResponse(
    @SerializedName("articles") val articles: List<Article>
)
