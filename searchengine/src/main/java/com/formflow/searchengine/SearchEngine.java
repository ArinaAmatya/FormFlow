package com.formflow.searchengine;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.Calendar;
import java.util.Date;
import java.util.Dictionary;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import com.formflow.searchengine.Models.ResultMapping;

/**
 * Performs main searching functionality for documents, metadata, and user profiles.
 * @author David Gerard
 * @author Siddhartha Jaiswal
 * @author Tyler George
 * @version 1.0.0
 */
public class SearchEngine {

  /**
   * The entity manager generated automatically by Spring Boot
   */
  @PersistenceContext
  private EntityManager entityManager;

  /**
   * Fetches the file object found in the database at a given path and sends
   * the file to the frontend
   * @param path The string path for the file in the database
   * @param destinationDirectory The String directory at which to send the file on the frontend server
   * @return String The name of the file for reference by the frontend
   * @throws IOException
   */
  public String getFileObject(String path, String destinationDirectory) throws IOException {
    String GET_URL = "https://qrdodpfmxnaayhniehnt.supabase.co/storage/v1/object/public/TestBucket/Star db.sql?download";
    
    URL obj = new URL(GET_URL);
    HttpURLConnection httpURLConnection = (HttpURLConnection) obj.openConnection();
    // httpURLConnection.setRequestMethod("GET");
    int responseCode = httpURLConnection.getResponseCode();
    System.out.println("GET Response Code :: " + responseCode);
    //SET TIMEOUT
    if (responseCode == HttpURLConnection.HTTP_OK) { // success
        BufferedReader in = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in .readLine()) != null) {
            response.append(inputLine);
        } in .close();
        System.out.println("Stuff happens here");
        File myfile = new File("D:/School/fullscript.py");
        if (myfile.createNewFile()){
            System.out.println("File created: " + myfile.getName());
            //FIGURE OUT HOW THE FUCK TO WRITE TO A FILE HERE!
                
        } else {
            System.out.println("Error");
        } 


    } else {
        System.out.println("GET request not worked");
    }

  }

  /**
   * Fetches the file metadata corresponding to a frontend styled query selection
   * @param query The string query received from the frontend
   * @return List<ResultMapping> A list of result mappings that represent the JSON object containing all rows 
   *         of information from the file metadata database that matches the selections 
   *         from the input query
   */
  public List<ResultMapping> getFileMetadata(String frontendQuery) {
    Query sqlQuery = this.parseFrontendQuery(frontendQuery);
    
    if (sqlQuery == null) {
      return null;
    }

    @SuppressWarnings("unchecked")
    List<ResultMapping> jsonMapping = sqlQuery.getResultList();
    return jsonMapping;
  }

  /**
   * Parses a frontend styled query that was embedded within the GET request link to safely
   * build the corresponding MySQL query.
   * @param frontendQuery The String query
   * @return Query object of MySQL to query the database
   */
  private Query parseFrontendQuery(String frontendQuery) {
    // Parse the frontend query
    
    String sqlQueryString = """
      SELECT 
      proposal_info.project_id, attach_type.description, proj_info.project_name, 
      proposal_info.proposal_label, proposal_info.proposal_id, proposal_info.auction_id, 
      proposal_info.period_id, cust_info.customer_id, cust_info.customer_name, res_info.resource_id, 
      res_info.resource_type, period_info.begin_date, period_info.end_date, attachment_file.file_name,
      attachment_file.file_path
      FROM attach_proposal 
      INNER JOIN 
      proposal_info
      ON attach_proposal.proposal_id = proposal_info.proposal_id
      INNER JOIN
      attachment_file
      ON attach_proposal.attachment_id = attachment_file.attachment_id
      INNER JOIN
      attach_type
      ON attach_proposal.attachment_type = attach_type.attachment_type
      INNER JOIN
      proj_info
      ON proposal_info.project_id = proj_info.project_id
      INNER JOIN
      proj_type
      ON proposal_info.project_type = proj_type.project_type
      INNER JOIN
      res_info
      ON proposal_info.resource_id = res_info.resource_id
      INNER JOIN
      auc_info
      ON proposal_info.auction_id = auc_info.auction_id
      INNER JOIN
      auc_type
      ON auc_info.auction_type = auc_type.auction_type
      INNER JOIN
      res_type
      ON res_info.resource_type = res_type.resource_type
      INNER JOIN
      cust_info
      ON proposal_info.customer_id = cust_info.customer_id
      INNER JOIN
      period_info
      ON auc_info.auction_period_id = period_info.period_id
    """;

    HashMap<String, String> parameterNameToValueMap = new HashMap<String, String>();
    String[] filters = frontendQuery.split("&");
    String parameterName;

    if (filters.length > 0) {
      sqlQueryString += " WHERE ";
    }

    Dictionary<String, String> filterDict= new Hashtable<>();
    filterDict.put("projectName", "proj_info.project_name");
    filterDict.put("projectID", "proposal_info.project_id");
    filterDict.put("fileType", "attach_type.description");
    filterDict.put("fileName", "attachment_file.file_name"); // new
    filterDict.put("filePath", "attachment_file.file_path"); //new
    filterDict.put("proposalName", "proposal_info.proposal_label");
    filterDict.put("proposalID", "proposal_info.proposal_id");
    filterDict.put("auctionID", "proposal_info.auction_id");
    filterDict.put("periodID", "proposal_info.period_id");
    filterDict.put("customerID", "cust_info.customer_id");
    filterDict.put("customerName", "cust_info.customer_name");
    filterDict.put("resourceID", "res_info.resource_id");
    filterDict.put("resourceType", "res_info.resource_type");
    filterDict.put("dateBegin", "period_info.begin_date");
    filterDict.put("dateEnd", "period_info.end_date");

    for (int j = 0; j < filters.length; j++) {
      String[] keyValuePair = filters[j].split("=");
      if (keyValuePair.length != 2) {
        continue;
      }
      String filterName = filterDict.get(keyValuePair[0]);
      String[] values = keyValuePair[1].split(",");
      // skip the period_info.begin_date and period_info.end_date filters
      if (filterName.equals("period_info.begin_date") || filterName.equals("period_info.end_date")) {
        continue;
      }
      sqlQueryString += "(";
      for (int i = 0; i < values.length - 1; i++) {
        parameterName = filterName + i;
        sqlQueryString += filterName + " = :" + parameterName + " OR ";
        parameterNameToValueMap.put(parameterName, values[i]);
      }
      parameterName = filterName + (values.length - 1);
      sqlQueryString += filterName + " = :" + parameterName;
      parameterNameToValueMap.put(parameterName, values[values.length - 1]);

      if (j < filters.length - 1) {
        sqlQueryString += ") AND ";
      } else {
        sqlQueryString += ") ";
      }
    }

    // TODO: We might want to change from Date to java.time stuff.

    // Add the date filters
    if (hasDateFilters(filters)) {
      // set default beginDate and endDate
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      Calendar cal = Calendar.getInstance(); 
      cal.set(0000, Calendar.JANUARY, 1);
      Date beginDate = cal.getTime();
      Date endDate = new Date();
      int dateFilterCount = 0;

      String parameterNameBegin = "dateBegin";
      String parameterNameEnd = "dateEnd";

      for (String filter : filters) {
        if (filter.split("=")[0].equals(parameterNameBegin)) {
          dateFilterCount++;
          String value = filter.split("=")[1];
          try {
            beginDate = value.matches("\\d{4}-\\d{2}-\\d{2}") ? sdf.parse(value) : beginDate;
          } catch (java.text.ParseException e) {
            return null;
          }
        }
        else if (filter.split("=")[0].equals(parameterNameEnd)) {
          dateFilterCount++;
          String value = filter.split("=")[1];
          try {
            endDate = value.matches("\\d{4}-\\d{2}-\\d{2}") ? sdf.parse(value) : endDate;
          } catch (java.text.ParseException e) {
            return null;
          }
        }
      }
      
      // Add an AND if there are other filters
      if (filters.length > dateFilterCount) {
        sqlQueryString += "AND ";
      }
      sqlQueryString += "(period_info.begin_date <= :" + parameterNameEnd + ") AND (period_info.end_date >= :" + parameterNameBegin + ") ";
      parameterNameToValueMap.put(parameterNameBegin, sdf.format(beginDate));
      parameterNameToValueMap.put(parameterNameEnd, sdf.format(endDate));
    }

    // Create the query out of the String and map it to the ResultMapping class for API response
    Query q = this.entityManager.createNativeQuery(sqlQueryString, "ResultMapping");

    // Now, inject the parameters into the sql statement safely using the EntityManager
    for (Map.Entry<String, String> entry : parameterNameToValueMap.entrySet()) {
      // 3 types of parameters currently exist here for our purposes: Integer, String, Date
      // Find way to do this cleaner
      if (this.isNumeric(entry.getValue())) {
        q.setParameter(entry.getKey(), Integer.parseInt(entry.getValue()));
      } else if (entry.getValue().matches("\\d{4}-\\d{2}-\\d{2}")) {
        try {
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
          Date convertedDate = sdf.parse(entry.getValue());
          q.setParameter(entry.getKey(), convertedDate);
        } catch (java.text.ParseException e) {
          return null;
        }
      } else {
        q.setParameter(entry.getKey(), entry.getValue());
      }
    }

    return q;
  }

  /**
   * Checks if the list of filters found in the query has date range-related information
   * @param filter The list of all the filters that are being used to query data
   * @return Boolean that is true if the filters include a date filter otherwise false
   */
  private Boolean hasDateFilters(String[] filters) {
    for (String filter : filters) {
      if (filter.split("=")[0].equals("dateBegin") || filter.split("=")[0].equals("dateEnd")) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if a String is an integer
   * @param s The input String
   * @return Boolean that is true if the String represents and integer and false otherwise
   */
  private Boolean isNumeric(String s) {
    Pattern pattern = Pattern.compile("-?\\d+(\\.\\d+)?");
    if (s == null) {
      return false; 
    }
    return pattern.matcher(s).matches();
  }
}
