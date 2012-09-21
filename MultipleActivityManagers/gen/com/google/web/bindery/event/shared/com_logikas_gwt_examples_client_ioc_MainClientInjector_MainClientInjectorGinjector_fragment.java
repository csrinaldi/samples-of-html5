package com.google.web.bindery.event.shared;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  public void memberInject_Key$type$com$google$web$bindery$event$shared$SimpleEventBus$_annotation$$none$$(com.google.web.bindery.event.shared.SimpleEventBus injectee) {
    
  }
  
  private com.google.web.bindery.event.shared.EventBus singleton_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$ = null;
  
  public com.google.web.bindery.event.shared.EventBus get_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$() {
    
    if (singleton_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$ == null) {
    com.google.web.bindery.event.shared.EventBus result = get_Key$type$com$google$web$bindery$event$shared$SimpleEventBus$_annotation$$none$$();
        singleton_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$ = result;
    }
    return singleton_Key$type$com$google$web$bindery$event$shared$EventBus$_annotation$$com$google$inject$name$Named$value$one$$;
    
  }
  
  
  /**
   * Binding for com.google.web.bindery.event.shared.SimpleEventBus declared at:
   *   Implicit GWT.create binding for com.google.web.bindery.event.shared.SimpleEventBus
   */
  public com.google.web.bindery.event.shared.SimpleEventBus get_Key$type$com$google$web$bindery$event$shared$SimpleEventBus$_annotation$$none$$() {
    Object created = GWT.create(com.google.web.bindery.event.shared.SimpleEventBus.class);
    assert created instanceof com.google.web.bindery.event.shared.SimpleEventBus;
    com.google.web.bindery.event.shared.SimpleEventBus result = (com.google.web.bindery.event.shared.SimpleEventBus) created;
    
    memberInject_Key$type$com$google$web$bindery$event$shared$SimpleEventBus$_annotation$$none$$(result);
    
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
