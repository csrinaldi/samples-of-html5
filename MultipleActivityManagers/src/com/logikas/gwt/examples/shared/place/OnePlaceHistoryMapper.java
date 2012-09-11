package com.logikas.gwt.examples.shared.place;

import javax.inject.Named;

import com.google.gwt.place.shared.PlaceHistoryMapper;
import com.google.gwt.place.shared.WithTokenizers;


@Named("one")
@WithTokenizers({PersonPlace.Tokenizer.class})
public interface OnePlaceHistoryMapper extends PlaceHistoryMapper{

}
