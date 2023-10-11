package com.formflow.searchengine;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/* Defines the Beans for this server application to enforce max one instance of each class */
@Configuration
public class Config {
  /* SearchEngine Bean */
  @Bean
  public SearchEngine searchEngine() {
    return new SearchEngine();
  }

  /* SupabaseWrapper Bean */
  @Bean
  public SupabaseWrapper supabaseWrapper() {
    return new SupabaseWrapper();
  }
}
