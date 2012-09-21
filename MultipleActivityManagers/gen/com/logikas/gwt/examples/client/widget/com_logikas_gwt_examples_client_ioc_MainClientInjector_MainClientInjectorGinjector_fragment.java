package com.logikas.gwt.examples.client.widget;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  public void memberInject_Key$type$com$logikas$gwt$examples$client$widget$PersonWidget$_annotation$$none$$(com.logikas.gwt.examples.client.widget.PersonWidget injectee) {
    
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$widget$ClinicWidget$_annotation$$none$$(com.logikas.gwt.examples.client.widget.ClinicWidget injectee) {
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.widget.PersonWidget declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.widget.PersonWidget
   */
  public com.logikas.gwt.examples.client.widget.PersonWidget get_Key$type$com$logikas$gwt$examples$client$widget$PersonWidget$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.widget.PersonWidget.class);
    assert created instanceof com.logikas.gwt.examples.client.widget.PersonWidget;
    com.logikas.gwt.examples.client.widget.PersonWidget result = (com.logikas.gwt.examples.client.widget.PersonWidget) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$widget$PersonWidget$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.widget.ClinicWidget declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.widget.ClinicWidget
   */
  public com.logikas.gwt.examples.client.widget.ClinicWidget get_Key$type$com$logikas$gwt$examples$client$widget$ClinicWidget$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.widget.ClinicWidget.class);
    assert created instanceof com.logikas.gwt.examples.client.widget.ClinicWidget;
    com.logikas.gwt.examples.client.widget.ClinicWidget result = (com.logikas.gwt.examples.client.widget.ClinicWidget) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$widget$ClinicWidget$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Field for the enclosing injector.
   */
  private final com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector;
  public com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment(com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector) {
    this.injector = injector;
  }
  
}
