package com.formflow.searchengine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/* Controller to expose the REST API endpoints for the server */
@RestController
public class FrontendController {

  @Autowired
  public SearchEngine searchEngine;

  /* 
   * Fetch file metadata rows based on a search query originating from the frontend
   * @param query The query originating from the frontend web application
   * */
  @GetMapping("/getFileMetadata?{query}")
  public String getFileMetadata(@PathVariable("query") String query) {
    return searchEngine.getFileMetadata(query);
  }

  /* 
   * Fetch file object based on a search query originating from the frontend
   * @param filePath The path of the object in the file store database
   * */
  @GetMapping("/getFileObject/{filePath}")
  public String getFileObject(@PathVariable("filePath") String filePath) {
    return "Fetching File Object...";
  }

  /* 
   * Received information on the current state of frontend web application
   * @param state The updated state of the web application
   * */
  @PostMapping(path="/postApplicationState",
    consumes = {"application/json"})
  public String postApplicationState(@RequestBody String state) {
    return "Posting application state data...";
  }

}
