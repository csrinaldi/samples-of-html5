package com.logikas.gwt.examples.client.mvp.activity;

import javax.inject.Inject;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.inject.Provider;
import com.logikas.gwt.examples.client.view.PersonView;

public class OneActivity extends AbstractActivity{

	@Inject
	Provider<PersonView> personView;
	
	@Override
	public void start(AcceptsOneWidget panel, EventBus eventBus) {
		GWT.log("OneActivity - start");
		panel.setWidget(personView.get());
		
	}

}
