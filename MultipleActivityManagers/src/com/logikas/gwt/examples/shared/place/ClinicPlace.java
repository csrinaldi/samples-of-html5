package com.logikas.gwt.examples.shared.place;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;

public class ClinicPlace extends Place {

	public static class Tokenizer implements PlaceTokenizer<ClinicPlace> {

		@Override
		public ClinicPlace getPlace(String token) {
			return new ClinicPlace();
		}

		@Override
		public String getToken(ClinicPlace place) {
			return "";
		}
	}

}
