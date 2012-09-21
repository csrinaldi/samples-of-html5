package com.logikas.gwt.examples.client;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.user.client.ui.AcceptsOneWidget;

public class OneActivity extends AbstractActivity{

	@Override
	public void start(AcceptsOneWidget panel, EventBus eventBus) {
		GWT.log("OneActivity");		
	}

}
