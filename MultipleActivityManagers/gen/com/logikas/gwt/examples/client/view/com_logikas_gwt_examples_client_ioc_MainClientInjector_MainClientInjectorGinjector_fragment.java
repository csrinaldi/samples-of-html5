package com.logikas.gwt.examples.client.view;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  private com.logikas.gwt.examples.client.view.PersonView singleton_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$ = null;
  
  public com.logikas.gwt.examples.client.view.PersonView get_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$() {
    
    if (singleton_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$ == null) {
    com.logikas.gwt.examples.client.view.PersonView result = injector.getFragment_com_logikas_gwt_examples_client_widget().get_Key$type$com$logikas$gwt$examples$client$widget$PersonWidget$_annotation$$none$$();
        singleton_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$ = result;
    }
    return singleton_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$;
    
  }
  
  private com.logikas.gwt.examples.client.view.ClinicView singleton_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$ = null;
  
  public com.logikas.gwt.examples.client.view.ClinicView get_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$() {
    
    if (singleton_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$ == null) {
    com.logikas.gwt.examples.client.view.ClinicView result = injector.getFragment_com_logikas_gwt_examples_client_widget().get_Key$type$com$logikas$gwt$examples$client$widget$ClinicWidget$_annotation$$none$$();
        singleton_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$ = result;
    }
    return singleton_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$;
    
  }
  
  
  /**
   * Binding for com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView> declared at:
   *   Implicit provider for com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView>
   */
  public com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView> get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$view$PersonView$$_annotation$$none$$() {
    com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView> result = new com.google.inject.Provider<com.logikas.gwt.examples.client.view.PersonView>() { 
      public com.logikas.gwt.examples.client.view.PersonView get() { 
        return get_Key$type$com$logikas$gwt$examples$client$view$PersonView$_annotation$$none$$();
      }
    };
    return result;
    
  }
  
  
  /**
   * Binding for com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView> declared at:
   *   Implicit provider for com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView>
   */
  public com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView> get_Key$type$com$google$inject$Provider$com$logikas$gwt$examples$client$view$ClinicView$$_annotation$$none$$() {
    com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView> result = new com.google.inject.Provider<com.logikas.gwt.examples.client.view.ClinicView>() { 
      public com.logikas.gwt.examples.client.view.ClinicView get() { 
        return get_Key$type$com$logikas$gwt$examples$client$view$ClinicView$_annotation$$none$$();
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
