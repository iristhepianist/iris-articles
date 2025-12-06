package com.lambda.journalism

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

interface ArticleService {
    @GET("articles.json")
    suspend fun getArticles(): ArticlesResponse

    companion object {
        private const val BASE_URL = "https://iristhepianist.github.io/iris-articles/"

        fun create(): ArticleService {
            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ArticleService::class.java)
        }
    }
}
