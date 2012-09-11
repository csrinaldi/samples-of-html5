package com.logikas.gwt.examples.shared.place;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;

public class PersonPlace extends Place {

	public static class Tokenizer implements PlaceTokenizer<PersonPlace> {

		@Override
		public PersonPlace getPlace(String token) {
			return new PersonPlace();
		}

		@Override
		public String getToken(PersonPlace place) {
			return "";
		}
	}

}
