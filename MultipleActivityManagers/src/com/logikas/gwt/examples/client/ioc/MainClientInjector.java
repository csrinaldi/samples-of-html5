package com.logikas.gwt.examples.client.ioc;

import com.google.gwt.inject.client.GinModules;
import com.google.gwt.inject.client.Ginjector;
import com.logikas.gwt.examples.client.Bootstrap;

@GinModules({MainClientModule.class})
public interface MainClientInjector extends Ginjector {
	Bootstrap getBootstrap();
}
