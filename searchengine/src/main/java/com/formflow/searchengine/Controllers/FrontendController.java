package com.formflow.searchengine.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.formflow.searchengine.RepositoryInterface;
import com.formflow.searchengine.SearchEngine;
import com.formflow.searchengine.Models.AttachProposals;
import com.formflow.searchengine.Models.ResultMapping;

/* Controller to expose the REST API endpoints for the server */
@RestController
public class FrontendController {

  /* The search engine singleton */
  @Autowired
  public SearchEngine searchEngine;

  @Autowired
	RepositoryInterface repositoryInterface;

  @GetMapping("/testConnection")
  public ResponseEntity<List<AttachProposals>> testConnection() {
    try {
			List<AttachProposals> tutorials = new ArrayList<AttachProposals>();

			repositoryInterface.findAll().forEach(tutorials::add);

			if (tutorials.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(tutorials, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
  }

  /* 
   * Fetch file metadata rows based on a search query originating from the frontend
   * @param query The query originating from the frontend web application
   * @return String that holds the JSON file metadata
   * */
  @GetMapping("/getFileMetadata/{query}")
  public ResponseEntity<List<ResultMapping>> getFileMetadata(@PathVariable String query) {
    try {
      List<ResultMapping> metadata = this.searchEngine.getFileMetadata(query);

      if (metadata.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

      return new ResponseEntity<>(metadata, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /* 
   * Fetch file object based on a search query originating from the frontend
   * @param filePath The path of the object in the file store database
   * @return File object that was fetched
   * */
  @GetMapping("/getFileObject/{filePath}")
  public String getFileObject(@PathVariable("filePath") String filePath) {
    return "Fetching File Object...";
  }

  /* 
   * Received information on the current state of frontend web application
   * @param state The updated state of the web application
   * @return Status code indicating the result of processing the message body information
   * */
  @PostMapping(path="/postApplicationState",
    consumes = {"application/json"})
  public String postApplicationState(@RequestBody String state) {
    return "Posting application state data...";
  }

}
