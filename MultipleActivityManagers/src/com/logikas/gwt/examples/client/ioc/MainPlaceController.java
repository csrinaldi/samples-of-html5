package com.logikas.gwt.examples.client.ioc;

import javax.inject.Inject;

<<<<<<< HEAD
=======
import com.google.gwt.core.client.GWT;
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.web.bindery.event.shared.EventBus;

public class MainPlaceController extends PlaceController {

	@Inject
	public MainPlaceController(EventBus eventBus) {
		super(eventBus);
	}

	public void goTo(Place newPlace) {

<<<<<<< HEAD
		if ( newPlace == Place.NOWHERE )
			return;
		if (newPlace == null ) {
=======
		if (newPlace == null || newPlace.equals(Place.NOWHERE)) {
			GWT.log("Place "+newPlace.toString());
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
			return;
		}

		super.goTo(newPlace);
	}

}
