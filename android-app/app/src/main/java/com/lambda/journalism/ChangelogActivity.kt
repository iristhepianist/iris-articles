package com.lambda.journalism

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.lambda.journalism.databinding.ActivityChangelogBinding

class ChangelogActivity : AppCompatActivity() {
    private lateinit var binding: ActivityChangelogBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChangelogBinding.inflate(layoutInflater)
        setContentView(binding.root)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Changelog"
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
