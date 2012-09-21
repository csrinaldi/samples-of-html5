package com.logikas.gwt.examples.client.ioc;

import javax.inject.Inject;
import javax.inject.Named;

<<<<<<< HEAD
<<<<<<< HEAD
=======
import com.google.gwt.core.client.GWT;
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
=======
>>>>>>> a20a45d889eaa6f60029a77606fedb444fad5736
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
<<<<<<< HEAD

<<<<<<< HEAD
		if ( newPlace == Place.NOWHERE )
			return;
		if (newPlace == null ) {
=======
		if (newPlace == null || newPlace.equals(Place.NOWHERE)) {
			GWT.log("Place "+newPlace.toString());
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
=======
		if (newPlace == null || newPlace.equals(Place.NOWHERE)) {
>>>>>>> a20a45d889eaa6f60029a77606fedb444fad5736
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
