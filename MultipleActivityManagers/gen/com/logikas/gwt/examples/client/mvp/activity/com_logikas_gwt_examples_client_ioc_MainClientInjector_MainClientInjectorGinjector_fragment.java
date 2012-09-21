package com.logikas.gwt.examples.client.mvp.activity;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  public void com$logikas$gwt$examples$client$mvp$activity$OneActivity_personView_fieldInjection(com.logikas.gwt.examples.client.mvp.activity.OneActivity injectee, com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView> value) {
    injectee.personView = value;
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$activity$OneActivity$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.activity.OneActivity injectee) {
    com$logikas$gwt$examples$client$mvp$activity$OneActivity_personView_fieldInjection(injectee, injector.getFragment_com_logikas_gwt_examples_client_view().get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$view$PersonView$$_annotation$$none$$());
    
    
  }
  
  public void com$logikas$gwt$examples$client$mvp$activity$TwoActivity_clinicView_fieldInjection(com.logikas.gwt.examples.client.mvp.activity.TwoActivity injectee, com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView> value) {
    injectee.clinicView = value;
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.activity.TwoActivity injectee) {
    com$logikas$gwt$examples$client$mvp$activity$TwoActivity_clinicView_fieldInjection(injectee, injector.getFragment_com_logikas_gwt_examples_client_view().get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$view$ClinicView$$_annotation$$none$$());
    
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.activity.OneActivity declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.mvp.activity.OneActivity
   */
  public com.logikas.gwt.examples.client.mvp.activity.OneActivity get_Key$type$com$logikas$gwt$examples$client$mvp$activity$OneActivity$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.mvp.activity.OneActivity.class);
    assert created instanceof com.logikas.gwt.examples.client.mvp.activity.OneActivity;
    com.logikas.gwt.examples.client.mvp.activity.OneActivity result = (com.logikas.gwt.examples.client.mvp.activity.OneActivity) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$activity$OneActivity$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Binding for com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity> declared at:
   *   Implicit provider for com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity>
   */
  public com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity> get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$mvp$activity$OneActivity$$_annotation$$none$$() {
    com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity> result = new com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity>() { 
      public com.logikas.gwt.examples.client.mvp.activity.OneActivity get() { 
        return get_Key$type$com$logikas$gwt$examples$client$mvp$activity$OneActivity$_annotation$$none$$();
      }
    };
    return result;
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.activity.TwoActivity declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.mvp.activity.TwoActivity
   */
  public com.logikas.gwt.examples.client.mvp.activity.TwoActivity get_Key$type$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.mvp.activity.TwoActivity.class);
    assert created instanceof com.logikas.gwt.examples.client.mvp.activity.TwoActivity;
    com.logikas.gwt.examples.client.mvp.activity.TwoActivity result = (com.logikas.gwt.examples.client.mvp.activity.TwoActivity) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Binding for com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity> declared at:
   *   Implicit provider for com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity>
   */
  public com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity> get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$$_annotation$$none$$() {
    com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity> result = new com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity>() { 
      public com.logikas.gwt.examples.client.mvp.activity.TwoActivity get() { 
        return get_Key$type$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$_annotation$$none$$();
      }
    };
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
