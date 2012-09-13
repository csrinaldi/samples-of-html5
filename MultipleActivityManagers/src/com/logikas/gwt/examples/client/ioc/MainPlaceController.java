package com.logikas.gwt.examples.client.ioc;

import javax.inject.Inject;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.web.bindery.event.shared.EventBus;

public class MainPlaceController extends PlaceController {

	@Inject
	public MainPlaceController(EventBus eventBus) {
		super(eventBus);
	}

	public void goTo(Place newPlace) {

		if ( newPlace == Place.NOWHERE )
			return;
		if (newPlace == null ) {
			return;
		}

		super.goTo(newPlace);
	}

}
