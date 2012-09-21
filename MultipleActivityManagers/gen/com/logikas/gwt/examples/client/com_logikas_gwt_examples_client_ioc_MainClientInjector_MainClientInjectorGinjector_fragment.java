package com.logikas.gwt.examples.client;

import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector;

public class com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment {
  public void memberInject_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$(com.logikas.gwt.examples.client.BootstrapImpl injectee) {
    
  }
  
  public void memberInject_Key$type$com$logikas$gwt$examples$client$LayoutWidget$_annotation$$none$$(com.logikas.gwt.examples.client.LayoutWidget injectee) {
    
  }
  
  private com.logikas.gwt.examples.client.Bootstrap singleton_Key$type$com$logikas$gwt$examples$client$Bootstrap$_annotation$$none$$ = null;
  
  public com.logikas.gwt.examples.client.Bootstrap get_Key$type$com$logikas$gwt$examples$client$Bootstrap$_annotation$$none$$() {
    
    if (singleton_Key$type$com$logikas$gwt$examples$client$Bootstrap$_annotation$$none$$ == null) {
    com.logikas.gwt.examples.client.Bootstrap result = get_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$();
        singleton_Key$type$com$logikas$gwt$examples$client$Bootstrap$_annotation$$none$$ = result;
    }
    return singleton_Key$type$com$logikas$gwt$examples$client$Bootstrap$_annotation$$none$$;
    
  }
  
  private com.logikas.gwt.examples.client.LayoutView singleton_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$ = null;
  
  public com.logikas.gwt.examples.client.LayoutView get_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$() {
    
    if (singleton_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$ == null) {
    com.logikas.gwt.examples.client.LayoutView result = get_Key$type$com$logikas$gwt$examples$client$LayoutWidget$_annotation$$none$$();
        singleton_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$ = result;
    }
    return singleton_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$;
    
  }
  
  private com.logikas.gwt.examples.client.BootstrapImpl singleton_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$ = null;
  
  public com.logikas.gwt.examples.client.BootstrapImpl get_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$() {
    
    if (singleton_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$ == null) {
    com.logikas.gwt.examples.client.BootstrapImpl result = com$logikas$gwt$examples$client$BootstrapImpl_com$logikas$gwt$examples$client$BootstrapImpl_methodInjection(injector.getFragment_com_logikas_gwt_examples_client_ioc().get_Key$type$com$google$gwt$place$shared$PlaceHistoryHandler$_annotation$$com$google$inject$name$Named$value$onePlaceHandler$$(), injector.getFragment_com_logikas_gwt_examples_client_ioc().get_Key$type$com$google$gwt$place$shared$PlaceHistoryHandler$_annotation$$com$google$inject$name$Named$value$twoPlaceHandler$$(), get_Key$type$com$logikas$gwt$examples$client$LayoutView$_annotation$$none$$(), injector.getFragment_com_logikas_gwt_examples_client_mvp().get_Key$type$com$logikas$gwt$examples$client$mvp$OneActivityManager$_annotation$$none$$(), injector.getFragment_com_logikas_gwt_examples_client_mvp().get_Key$type$com$logikas$gwt$examples$client$mvp$TwoActivityManager$_annotation$$none$$());
    memberInject_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$(result);
    
        singleton_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$ = result;
    }
    return singleton_Key$type$com$logikas$gwt$examples$client$BootstrapImpl$_annotation$$none$$;
    
  }
  
  public com.logikas.gwt.examples.client.BootstrapImpl com$logikas$gwt$examples$client$BootstrapImpl_com$logikas$gwt$examples$client$BootstrapImpl_methodInjection(com.google.gwt.place.shared.PlaceHistoryHandler _0, com.google.gwt.place.shared.PlaceHistoryHandler _1, com.logikas.gwt.examples.client.LayoutView _2, com.logikas.gwt.examples.client.mvp.OneActivityManager _3, com.logikas.gwt.examples.client.mvp.TwoActivityManager _4) {
    return new com.logikas.gwt.examples.client.BootstrapImpl(_0, _1, _2, _3, _4);
  }
  
  
  /**
   * Binding for com.logikas.gwt.examples.client.LayoutWidget declared at:
   *   Implicit binding for com.logikas.gwt.examples.client.LayoutWidget
   */
  public com.logikas.gwt.examples.client.LayoutWidget get_Key$type$com$logikas$gwt$examples$client$LayoutWidget$_annotation$$none$$() {
    com.logikas.gwt.examples.client.LayoutWidget result = com$logikas$gwt$examples$client$LayoutWidget_com$logikas$gwt$examples$client$LayoutWidget_methodInjection(injector.getFragment_com_logikas_gwt_examples_shared_place().get_Key$type$com$logikas$gwt$examples$shared$place$OnePlaceHistoryMapper$_annotation$$none$$(), injector.getFragment_com_logikas_gwt_examples_shared_place().get_Key$type$com$logikas$gwt$examples$shared$place$TwoPlaceHistoryMapper$_annotation$$none$$());
    memberInject_Key$type$com$logikas$gwt$examples$client$LayoutWidget$_annotation$$none$$(result);
    
    return result;
    
  }
  
  public com.logikas.gwt.examples.client.LayoutWidget com$logikas$gwt$examples$client$LayoutWidget_com$logikas$gwt$examples$client$LayoutWidget_methodInjection(com.logikas.gwt.examples.shared.place.OnePlaceHistoryMapper _0, com.logikas.gwt.examples.shared.place.TwoPlaceHistoryMapper _1) {
    return new com.logikas.gwt.examples.client.LayoutWidget(_0, _1);
  }
  
  
  /**
   * Field for the enclosing injector.
   */
  private final com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector;
  public com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector_fragment(com_logikas_gwt_examples_client_ioc_MainClientInjector_MainClientInjectorGinjector injector) {
    this.injector = injector;
  }
  
}
