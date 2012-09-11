package com.logikas.gwt.examples.client.mvp.activity;

import javax.inject.Inject;

import com.google.gwt.activity.shared.AbstractActivity;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.shared.EventBus;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.inject.Provider;
import com.logikas.gwt.examples.client.view.ClinicView;

public class TwoActivity extends AbstractActivity{

	@Inject
	Provider<ClinicView> clinicView;
	
	@Override
	public void start(AcceptsOneWidget panel, EventBus eventBus) {
		GWT.log("TwoActivity - start");
		panel.setWidget(clinicView.get());
		
	}

}
