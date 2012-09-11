package com.logikas.gwt.examples.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.logikas.gwt.examples.client.ioc.MainClientInjector;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class MultipleActivityManagers implements EntryPoint {
	
	public void onModuleLoad() {
		
		MainClientInjector injector = GWT.create(MainClientInjector.class);
		injector.getBootstrap().start();
		
	}
}
