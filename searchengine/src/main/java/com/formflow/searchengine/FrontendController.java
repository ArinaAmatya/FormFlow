package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.MergedAnnotations.Search;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FrontendController {

  @Autowired
  public SearchEngine searchEngine;

  @GetMapping("/getFileMetadata")
  public String getFileMetadata() {
    return searchEngine.getFileMetadata("TEST");
  }

  @GetMapping("/getFileObject/{filePath}")
  public String getFileObject(@PathVariable("filePath") String filePath) {
    return "Fetching File Object...";
  }

  @PostMapping("/postApplicationMetadata")
  public String postFile(@PathVariable("filePath") String filePath) {
    return "Fetching File Object...";
  }

}
