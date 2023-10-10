package com.formflow.searchengine;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebAppController {

  @RequestMapping("/hello")
  public String hello() {
    return "Hello World";
  }
  
}
