package com.logikas.gwt.examples.client;

import javax.inject.Named;

import com.google.gwt.core.client.GWT;
import com.google.gwt.place.shared.PlaceChangeRequestEvent;
import com.google.gwt.place.shared.PlaceHistoryHandler;
import com.google.gwt.user.client.ui.RootLayoutPanel;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.web.bindery.event.shared.EventBus;
import com.logikas.gwt.examples.client.mvp.OneActivityManager;
import com.logikas.gwt.examples.client.mvp.TwoActivityManager;


@Singleton
public class BootstrapImpl implements Bootstrap, PlaceChangeRequestEvent.Handler{

	private final LayoutView mainLayout;
	
	private final PlaceHistoryHandler oneHistoryHandler;
	private final PlaceHistoryHandler twoHistoryHandler;

	@Inject
	BootstrapImpl(@Named("onePlaceHandler")PlaceHistoryHandler onePlaceHistoryHandler, 
				  @Named("twoPlaceHandler")PlaceHistoryHandler twoPlaceHistoryHandler,
			     LayoutView mainLayout, OneActivityManager oneActivityManager,TwoActivityManager twoActivityManager,
			     EventBus eventBus) {
		this.mainLayout = mainLayout;
		this.oneHistoryHandler = onePlaceHistoryHandler;
		this.twoHistoryHandler = twoPlaceHistoryHandler;
		oneActivityManager.setDisplay(mainLayout.getCenterRegion());
		twoActivityManager.setDisplay(mainLayout.getCenterRegion());
		
		
		eventBus.addHandler(PlaceChangeRequestEvent.TYPE, this);

	}

	@Override
	public void start() {
		RootLayoutPanel.get().add(mainLayout.asWidget());
		mainLayout.setDefaultLayout();
		//this.oneHistoryHandler.handleCurrentHistory();
		//this.twoHistoryHandler.handleCurrentHistory();
	}

	@Override
	public void onPlaceChangeRequest(PlaceChangeRequestEvent event) {
		GWT.log("Llamado de Place "+event.getNewPlace().toString());
	}
}

