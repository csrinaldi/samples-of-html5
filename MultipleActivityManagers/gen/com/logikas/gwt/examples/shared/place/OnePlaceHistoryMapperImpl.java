package com.logikas.gwt.examples.shared.place;

import com.google.gwt.place.impl.AbstractPlaceHistoryMapper;
import com.logikas.gwt.examples.shared.place.OnePlaceHistoryMapper;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;
import com.google.gwt.place.impl.AbstractPlaceHistoryMapper.PrefixAndToken;
import com.google.gwt.core.client.GWT;

public class OnePlaceHistoryMapperImpl extends AbstractPlaceHistoryMapper<Void> implements OnePlaceHistoryMapper {
  
  protected PrefixAndToken getPrefixAndToken(Place newPlace) {
    if (newPlace instanceof com.logikas.gwt.examples.shared.place.PersonPlace) {
      com.logikas.gwt.examples.shared.place.PersonPlace place = (com.logikas.gwt.examples.shared.place.PersonPlace) newPlace;
      PlaceTokenizer<com.logikas.gwt.examples.shared.place.PersonPlace> t = GWT.create(com.logikas.gwt.examples.shared.place.PersonPlace.Tokenizer.class);
      return new PrefixAndToken("PersonPlace", t.getToken((com.logikas.gwt.examples.shared.place.PersonPlace) place));
    }
    return null;
  }
  
  protected PlaceTokenizer<?> getTokenizer(String prefix) {
    if ("PersonPlace".equals(prefix)) {
      return GWT.create(com.logikas.gwt.examples.shared.place.PersonPlace.Tokenizer.class);
    }
    return null;
  }

}
