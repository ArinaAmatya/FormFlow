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

import com.formflow.searchengine.SearchEngine;
import com.formflow.searchengine.Models.ResultMapping;

/**
 * Controller to expose the REST API endpoints for the server
 * @author David Gerard
 * @author Siddhartha Jaiswal
 * @author Tyler George
 * @version 1.0.0
 */
@RestController
public class FrontendController {

  /**
   * The search engine singleton
   */
  @Autowired
  public SearchEngine searchEngine;

  /**
   * Fetch file metadata rows based on a search query originating from the frontend
   * @param query The query originating from the frontend web application
   * @return String that holds the JSON file metadata
   * */
  @GetMapping("/getFileMetadata/{query}")
  public ResponseEntity<List<ResultMapping>> getFileMetadata(@PathVariable String query) {
    try {
      List<ResultMapping> metadata = this.searchEngine.getFileMetadata(query);

      if (metadata == null) {
        return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
      }

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
   * Fetch file objects based on a search query originating from the frontend
   * @param filePaths The paths of the objects in the file store database concatenated together with "&"
   * @return Response entity with the list of strings that were moved to the frontend
   * */
  @GetMapping("/getFiles/{filePaths}")
  public ResponseEntity<ArrayList<String>> getFiles(@PathVariable("filePaths") String filePaths) {
    try {
      System.out.println(filePaths);
      ArrayList<String> fileName = this.searchEngine.getFileObjects(filePaths.split("&"));

      if (fileName == null) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return new ResponseEntity<>(fileName, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /* 
   * Fetch zipped file objects based on a search query originating from the frontend
   * @param filePaths The paths of the objects in the file store database concatenated together with "&"
   * @return Response entity with the name of the zipped file that was moved to the frontend
   * */
  @GetMapping("/getZippedFiles/{filePaths}")
  public ResponseEntity<String> getZippedFiles(@PathVariable("filePaths") String filePaths) {
    try {
      String fileName = this.searchEngine.getZippedFileObjects(filePaths.split("&"));

      if (fileName == null) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return new ResponseEntity<>(fileName, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * This is just a template for if this sort of functionality is needed in the future
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
