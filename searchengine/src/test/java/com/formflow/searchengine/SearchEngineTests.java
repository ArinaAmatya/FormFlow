package com.formflow.searchengine;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;

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
    ParsedQuery pq = se.parseFrontendQuery("projectID=123");
    String sqlString = pq.getSQLString();
    HashMap<String, String> h = pq.getHashMap();
    assertEquals(sqlString.replace("\n", "").replace("\r", "").replace(" ", ""), "SELECT proposal_info.project_id, attach_type.description, proj_info.project_name, proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name, attachment_file.file_path FROM attach_proposal INNER JOIN proposal_info ON attach_proposal.proposal_id = proposal_info.proposal_id INNER JOIN attachment_file ON attach_proposal.attachment_id = attachment_file.attachment_id INNER JOIN attach_type ON attach_proposal.attachment_type = attach_type.attachment_type INNER JOIN proj_info ON proposal_info.project_id = proj_info.project_id INNER JOIN proj_type ON proposal_info.project_type = proj_type.project_type INNER JOIN res_info ON proposal_info.resource_id = res_info.resource_id INNER JOIN auc_info ON proposal_info.auction_id = auc_info.auction_id INNER JOIN auc_type ON auc_info.auction_type = auc_type.auction_type INNER JOIN res_type ON res_info.resource_type = res_type.resource_type INNER JOIN cust_info ON proposal_info.customer_id = cust_info.customer_id INNER JOIN period_info ON auc_info.auction_period_id = period_info.period_id WHERE (proposal_info.project_id = :proposal_info.project_id0)".replace("\n", "").replace("\r", "").replace(" ", ""));
    assertEquals("123", h.get("proposal_info.project_id0"));
  }

  @Test
  void parseFrontendQuery2() {
    ParsedQuery pq = se.parseFrontendQuery("customerName=John Doe");
    String sqlString = pq.getSQLString();
    HashMap<String, String> h = pq.getHashMap();
    assertEquals(sqlString.replace("\n", "").replace("\r", "").replace(" ", ""), "SELECT proposal_info.project_id, attach_type.description, proj_info.project_name, proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name, attachment_file.file_path FROM attach_proposal INNER JOIN proposal_info ON attach_proposal.proposal_id = proposal_info.proposal_id INNER JOIN attachment_file ON attach_proposal.attachment_id = attachment_file.attachment_id INNER JOIN attach_type ON attach_proposal.attachment_type = attach_type.attachment_type INNER JOIN proj_info ON proposal_info.project_id = proj_info.project_id INNER JOIN proj_type ON proposal_info.project_type = proj_type.project_type INNER JOIN res_info ON proposal_info.resource_id = res_info.resource_id INNER JOIN auc_info ON proposal_info.auction_id = auc_info.auction_id INNER JOIN auc_type ON auc_info.auction_type = auc_type.auction_type INNER JOIN res_type ON res_info.resource_type = res_type.resource_type INNER JOIN cust_info ON proposal_info.customer_id = cust_info.customer_id INNER JOIN period_info ON auc_info.auction_period_id = period_info.period_id WHERE (cust_info.customer_name = :cust_info.customer_name0)".replace("\n", "").replace("\r", "").replace(" ", ""));
    assertEquals("John Doe", h.get("cust_info.customer_name0"));
  }

  @Test
  void parseFrontendQuery3() {
    ParsedQuery pq = se.parseFrontendQuery("dateEnd=2021-01-01");
    String sqlString = pq.getSQLString();
    HashMap<String, String> h = pq.getHashMap();
    assertEquals(sqlString.replace("\n", "").replace("\r", "").replace(" ", ""), "SELECT proposal_info.project_id, attach_type.description, proj_info.project_name, proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name, attachment_file.file_path FROM attach_proposal INNER JOIN proposal_info ON attach_proposal.proposal_id = proposal_info.proposal_id INNER JOIN attachment_file ON attach_proposal.attachment_id = attachment_file.attachment_id INNER JOIN attach_type ON attach_proposal.attachment_type = attach_type.attachment_type INNER JOIN proj_info ON proposal_info.project_id = proj_info.project_id INNER JOIN proj_type ON proposal_info.project_type = proj_type.project_type INNER JOIN res_info ON proposal_info.resource_id = res_info.resource_id INNER JOIN auc_info ON proposal_info.auction_id = auc_info.auction_id INNER JOIN auc_type ON auc_info.auction_type = auc_type.auction_type INNER JOIN res_type ON res_info.resource_type = res_type.resource_type INNER JOIN cust_info ON proposal_info.customer_id = cust_info.customer_id INNER JOIN period_info ON auc_info.auction_period_id = period_info.period_id WHERE (period_info.begin_date <= :dateEnd) AND (period_info.end_date >= :dateBegin)".replace("\n", "").replace("\r", "").replace(" ", ""));
    assertEquals("2021-01-01", h.get("dateEnd"));
    assertEquals("0001-01-01", h.get("dateBegin"));
  }

  @Test
  void parseFrontendQuery4() {
    ParsedQuery pq = se.parseFrontendQuery("dateEnd=2021-01-01&dateBegin=2020-01-01");
    String sqlString = pq.getSQLString();
    HashMap<String, String> h = pq.getHashMap();
    assertEquals(sqlString.replace("\n", "").replace("\r", "").replace(" ", ""), "SELECT proposal_info.project_id, attach_type.description, proj_info.project_name, proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name, attachment_file.file_path FROM attach_proposal INNER JOIN proposal_info ON attach_proposal.proposal_id = proposal_info.proposal_id INNER JOIN attachment_file ON attach_proposal.attachment_id = attachment_file.attachment_id INNER JOIN attach_type ON attach_proposal.attachment_type = attach_type.attachment_type INNER JOIN proj_info ON proposal_info.project_id = proj_info.project_id INNER JOIN proj_type ON proposal_info.project_type = proj_type.project_type INNER JOIN res_info ON proposal_info.resource_id = res_info.resource_id INNER JOIN auc_info ON proposal_info.auction_id = auc_info.auction_id INNER JOIN auc_type ON auc_info.auction_type = auc_type.auction_type INNER JOIN res_type ON res_info.resource_type = res_type.resource_type INNER JOIN cust_info ON proposal_info.customer_id = cust_info.customer_id INNER JOIN period_info ON auc_info.auction_period_id = period_info.period_id WHERE (period_info.begin_date <= :dateEnd) AND (period_info.end_date >= :dateBegin)".replace("\n", "").replace("\r", "").replace(" ", ""));
    assertEquals("2021-01-01", h.get("dateEnd"));
    assertEquals("2020-01-01", h.get("dateBegin"));
  }

  @Test
  void parseFrontendQuery5() {
    ParsedQuery pq = se.parseFrontendQuery("dateEnd=2021-01-01&dateBegin=2020-01-01&projectID=123&customerName=John Doe");
    String sqlString = pq.getSQLString();
    HashMap<String, String> h = pq.getHashMap();
    assertEquals(sqlString.replace("\n", "").replace("\r", "").replace(" ", ""), "SELECT proposal_info.project_id, attach_type.description, proj_info.project_name, proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name, attachment_file.file_path FROM attach_proposal INNER JOIN proposal_info ON attach_proposal.proposal_id = proposal_info.proposal_id INNER JOIN attachment_file ON attach_proposal.attachment_id = attachment_file.attachment_id INNER JOIN attach_type ON attach_proposal.attachment_type = attach_type.attachment_type INNER JOIN proj_info ON proposal_info.project_id = proj_info.project_id INNER JOIN proj_type ON proposal_info.project_type = proj_type.project_type INNER JOIN res_info ON proposal_info.resource_id = res_info.resource_id INNER JOIN auc_info ON proposal_info.auction_id = auc_info.auction_id INNER JOIN auc_type ON auc_info.auction_type = auc_type.auction_type INNER JOIN res_type ON res_info.resource_type = res_type.resource_type INNER JOIN cust_info ON proposal_info.customer_id = cust_info.customer_id INNER JOIN period_info ON auc_info.auction_period_id = period_info.period_id WHERE (proposal_info.project_id = :proposal_info.project_id0) AND (cust_info.customer_name = :cust_info.customer_name0) AND (period_info.begin_date <= :dateEnd) AND (period_info.end_date >= :dateBegin)".replace("\n", "").replace("\r", "").replace(" ", ""));
    assertEquals("123", h.get("proposal_info.project_id0"));
    assertEquals("John Doe", h.get("cust_info.customer_name0"));
    assertEquals("2021-01-01", h.get("dateEnd"));
    assertEquals("2020-01-01", h.get("dateBegin"));
  }
}
