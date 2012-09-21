package com.logikas.gwt.examples.client.ioc;

import javax.inject.Inject;
import javax.inject.Named;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.web.bindery.event.shared.EventBus;

public class MainPlaceController extends PlaceController {

	Place oldPlace = null;

	@Inject
	public MainPlaceController(@Named("one") EventBus eventBus) {
		super(eventBus);
	}

	public void goTo(Place newPlace) {
		if (newPlace == null || newPlace.equals(Place.NOWHERE)) {
			return;
		} else {
			if (oldPlace != null && oldPlace.equals(newPlace))
				return;
			else {
				oldPlace = newPlace;
				super.goTo(newPlace);
			}
		}

	}

}
