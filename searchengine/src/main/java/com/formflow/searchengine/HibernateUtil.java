package com.formflow.searchengine;

import org.hibernate.SessionFactory;
import org.hibernate.Session;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
  private final SessionFactory sessionFactory = buildSessionFactory();

  private SessionFactory buildSessionFactory() throws ExceptionInInitializerError {
    try {
      // Create the SessionFactory from hibernate.cfg.xml
      return new Configuration().configure().buildSessionFactory();
    } catch (Throwable ex) {
      // Make sure you log the exception, as it might be swallowed
      System.err.println("Initial SessionFactory creation failed." + ex);
      throw new ExceptionInInitializerError(ex);
    }
  }

  public Session openSession() {
    return sessionFactory.openSession();
  }
}