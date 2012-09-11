package com.logikas.gwt.examples.client.mvp;

import javax.inject.Inject;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.google.inject.Provider;
import com.logikas.gwt.examples.client.mvp.activity.OneActivity;
import com.logikas.gwt.examples.shared.place.PersonPlace;

public class OneActivityMapper implements ActivityMapper{

	@Inject
	Provider<OneActivity> oneActivity;
	
	@Override
	public Activity getActivity(Place place) {
		if ( place instanceof PersonPlace)
			return oneActivity.get();
		return null;
	}

}
