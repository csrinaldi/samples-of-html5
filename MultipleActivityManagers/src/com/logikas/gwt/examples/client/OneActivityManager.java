package com.logikas.gwt.examples.client;

import javax.inject.Inject;

import com.google.gwt.activity.shared.ActivityManager;
import com.google.web.bindery.event.shared.EventBus;

public class OneActivityManager extends ActivityManager{

	@Inject
	public OneActivityManager(OneActivityMapper mapper, EventBus eventBus) {
		super(mapper, eventBus);
	}

}
