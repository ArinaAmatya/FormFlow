package com.formflow.searchengine;
import java.util.HashMap;

public class ParsedQuery {
  private String sqlString;
  private HashMap<String, String> hashMap;

  public ParsedQuery(String sqlString, HashMap<String, String> hashMap) {
    this.sqlString = sqlString;
    this.hashMap = hashMap;
  }
  
  public HashMap<String, String> getHashMap() {
    return hashMap;
  }

  public String getSQLString() {
    return sqlString;
  }
}
