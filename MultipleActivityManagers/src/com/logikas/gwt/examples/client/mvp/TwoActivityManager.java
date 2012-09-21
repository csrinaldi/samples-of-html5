package com.logikas.gwt.examples.client.mvp;

import javax.inject.Inject;
import javax.inject.Named;

import com.google.gwt.activity.shared.ActivityManager;
import com.google.web.bindery.event.shared.EventBus;

public class TwoActivityManager extends ActivityManager{

	@Inject
	public TwoActivityManager(TwoActivityMapper mapper, @Named("one")EventBus eventBus) {
		super(mapper, eventBus);
	}

}
