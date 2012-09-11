package com.logikas.gwt.examples.shared.place;

import javax.inject.Named;

import com.google.gwt.place.shared.PlaceHistoryMapper;
import com.google.gwt.place.shared.WithTokenizers;

@Named("two")
@WithTokenizers({ClinicPlace.Tokenizer.class})
public interface TwoPlaceHistoryMapper extends PlaceHistoryMapper{

}
