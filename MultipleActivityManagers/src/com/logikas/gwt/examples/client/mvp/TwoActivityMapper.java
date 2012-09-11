package com.logikas.gwt.examples.client.mvp;

import javax.inject.Inject;

import com.google.gwt.activity.shared.Activity;
import com.google.gwt.activity.shared.ActivityMapper;
import com.google.gwt.place.shared.Place;
import com.google.inject.Provider;
import com.logikas.gwt.examples.client.mvp.activity.TwoActivity;
import com.logikas.gwt.examples.shared.place.ClinicPlace;

public class TwoActivityMapper implements ActivityMapper{

	@Inject
	Provider<TwoActivity> twoActivity;
	
	@Override
	public Activity getActivity(Place place) {
		if ( place instanceof ClinicPlace)
			return twoActivity.get();
		return null;
	}

}
