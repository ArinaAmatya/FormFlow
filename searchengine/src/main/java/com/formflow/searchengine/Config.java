package com.formflow.searchengine;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
  @Bean
  public SearchEngine searchEngine() {
    return new SearchEngine();
  }

  @Bean
  public SupabaseWrapper supabaseWrapper() {
    return new SupabaseWrapper();
  }
}
