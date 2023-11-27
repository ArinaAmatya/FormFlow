package com.formflow.searchengine;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class SearchEngineTests {
  SearchEngine se = new SearchEngine();

  @Test
  void isNumeric1() {
    assertTrue(se.isNumeric("0"));
  }

  @Test
  void isNumeric2() {
    assertTrue(se.isNumeric("103847"));
  }

  @Test
  void isNumeric3() {
    assertTrue(!se.isNumeric("hello"));
  }
  
  @Test
  void isNumeric4() {
    assertTrue(se.isNumeric("-14"));
  }

  @Test
  void isNumeric5() {
    assertTrue(se.isNumeric("1.5"));
  }

  @Test
  void isNumeric6() {
    assertTrue(se.isNumeric("-1.5"));
  }

  @Test
  void isNumeric7() {
    assertTrue(!se.isNumeric("1.5abc"));
  }

  @Test 
  void hasDateFilters1() {
    String[] query = new String[]{"dateBegin=XXXXXX"};
    assertTrue(se.hasDateFilters(query));
  }

  @Test 
  void hasDateFilters2() {
    String[] query = new String[]{"dateEnd=XXXXXX"};
    assertTrue(se.hasDateFilters(query));
  }

  @Test 
  void hasDateFilters3() {
    String[] query = new String[]{"name=XXXXXX"};
    assertTrue(!se.hasDateFilters(query));
  }

  @Test 
  void hasDateFilters4() {
    String[] query = new String[]{"name=XXXXXX", "dateEnd=XXXXXX"};
    assertTrue(se.hasDateFilters(query));
  }

  @Test
  void hasDateFilters5() {
    String[] query = new String[]{"name=XXXXXX", "dateEnd=XXXXXX", "dateBegin=XXXXXX"};
    assertTrue(se.hasDateFilters(query));
  }

  @Test
  void parseFrontendQuery1() {
    String p = se.parseFrontendQuery("projectID=123").getParameterValue(0).toString();
    assertEquals("123", "123");
  }
}
