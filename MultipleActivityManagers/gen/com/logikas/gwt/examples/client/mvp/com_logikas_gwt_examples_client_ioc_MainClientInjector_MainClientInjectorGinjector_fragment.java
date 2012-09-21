package com.logikas.gwt.examples.client.mvp;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  public void com$logikas$gwt$examples$client$mvp$OneActivityMapper_oneActivity_fieldInjection(com.logikas.gwt.examples.client.mvp.OneActivityMapper injectee, com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.OneActivity> value) {
    injectee.oneActivity = value;
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityMapper$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.OneActivityMapper injectee) {
    com$logikas$gwt$examples$client$mvp$OneActivityMapper_oneActivity_fieldInjection(injectee, injector.getFragment_com_logikas_gwt_examples_client_mvp_activity().get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$mvp$activity$OneActivity$$_annotation$$none$$());
    
    
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityManager$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.OneActivityManager injectee) {
    
  }
  
  public void com$logikas$gwt$examples$client$mvp$TwoActivityMapper_twoActivity_fieldInjection(com.logikas.gwt.examples.client.mvp.TwoActivityMapper injectee, com.google.inject.Provider<com.logikas.gwt.examples.client.mvp.activity.TwoActivity> value) {
    injectee.twoActivity = value;
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityMapper$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.TwoActivityMapper injectee) {
    com$logikas$gwt$examples$client$mvp$TwoActivityMapper_twoActivity_fieldInjection(injectee, injector.getFragment_com_logikas_gwt_examples_client_mvp_activity().get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$mvp$activity$TwoActivity$$_annotation$$none$$());
    
    
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityManager$_annotation$$none$$(com.logikas.gwt.examples.client.mvp.TwoActivityManager injectee) {
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.OneActivityMapper declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.mvp.OneActivityMapper
   */
  public com.logikas.gwt.examples.client.mvp.OneActivityMapper get_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityMapper$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.mvp.OneActivityMapper.class);
    assert created instanceof com.logikas.gwt.examples.client.mvp.OneActivityMapper;
    com.logikas.gwt.examples.client.mvp.OneActivityMapper result = (com.logikas.gwt.examples.client.mvp.OneActivityMapper) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityMapper$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.OneActivityManager declared at:
   *   Implicit binding for com.logikas.gwt.examples.client.mvp.OneActivityManager
   */
  public com.logikas.gwt.examples.client.mvp.OneActivityManager get_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityManager$_annotation$$none$$() {
    com.logikas.gwt.examples.client.mvp.OneActivityManager result = com$logikas$gwt$examples$client$mvp$OneActivityManager_com$logikas$gwt$examples$client$mvp$OneActivityManager_methodInjection(get_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityMapper$_annotation$$none$$(), injector.getFragment_com_google_web_bindery_event_shared().get_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$());
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityManager$_annotation$$none$$(result);
    
    return result;
    
  }
  
  public com.logikas.gwt.examples.client.mvp.OneActivityManager com$logikas$gwt$examples$client$mvp$OneActivityManager_com$logikas$gwt$examples$client$mvp$OneActivityManager_methodInjection(com.logikas.gwt.examples.client.mvp.OneActivityMapper _0, com.google.web.bindery.event.shared.EventBus _1) {
    return new com.logikas.gwt.examples.client.mvp.OneActivityManager(_0, _1);
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.TwoActivityMapper declared at:
   *   Implicit GWT.create binding for com.logikas.gwt.examples.client.mvp.TwoActivityMapper
   */
  public com.logikas.gwt.examples.client.mvp.TwoActivityMapper get_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityMapper$_annotation$$none$$() {
    Object created = GWT.create(com.logikas.gwt.examples.client.mvp.TwoActivityMapper.class);
    assert created instanceof com.logikas.gwt.examples.client.mvp.TwoActivityMapper;
    com.logikas.gwt.examples.client.mvp.TwoActivityMapper result = (com.logikas.gwt.examples.client.mvp.TwoActivityMapper) created;
    
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityMapper$_annotation$$none$$(result);
    
    return result;
    
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.mvp.TwoActivityManager declared at:
   *   Implicit binding for com.logikas.gwt.examples.client.mvp.TwoActivityManager
   */
  public com.logikas.gwt.examples.client.mvp.TwoActivityManager get_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityManager$_annotation$$none$$() {
    com.logikas.gwt.examples.client.mvp.TwoActivityManager result = com$logikas$gwt$examples$client$mvp$TwoActivityManager_com$logikas$gwt$examples$client$mvp$TwoActivityManager_methodInjection(get_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityMapper$_annotation$$none$$(), injector.getFragment_com_google_web_bindery_event_shared().get_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$());
    memberInject_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityManager$_annotation$$none$$(result);
    
    return result;
    
  }
  
  public com.logikas.gwt.examples.client.mvp.TwoActivityManager com$logikas$gwt$examples$client$mvp$TwoActivityManager_com$logikas$gwt$examples$client$mvp$TwoActivityManager_methodInjection(com.logikas.gwt.examples.client.mvp.TwoActivityMapper _0, com.google.web.bindery.event.shared.EventBus _1) {
    return new com.logikas.gwt.examples.client.mvp.TwoActivityManager(_0, _1);
  }
  
  
  /**
   * Field for the enclosing injector.
   */
  private final com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector;
  public com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment(com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector) {
    this.injector = injector;
  }
  
}
