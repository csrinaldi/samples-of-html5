package com.logikas.gwt.examples.shared.place;

import com.google.gwt.place.impl.AbstractPlaceHistoryMapper;
import com.logikas.gwt.examples.shared.place.TwoPlaceHistoryMapper;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;
import com.google.gwt.place.impl.AbstractPlaceHistoryMapper.PrefixAndToken;
import com.google.gwt.core.client.GWT;

public class TwoPlaceHistoryMapperImpl extends AbstractPlaceHistoryMapper<Void> implements TwoPlaceHistoryMapper {
  
  protected PrefixAndToken getPrefixAndToken(Place newPlace) {
    if (newPlace instanceof com.logikas.gwt.examples.shared.place.ClinicPlace) {
      com.logikas.gwt.examples.shared.place.ClinicPlace place = (com.logikas.gwt.examples.shared.place.ClinicPlace) newPlace;
      PlaceTokenizer<com.logikas.gwt.examples.shared.place.ClinicPlace> t = GWT.create(com.logikas.gwt.examples.shared.place.ClinicPlace.Tokenizer.class);
      return new PrefixAndToken("ClinicPlace", t.getToken((com.logikas.gwt.examples.shared.place.ClinicPlace) place));
    }
    return null;
  }
  
  protected PlaceTokenizer<?> getTokenizer(String prefix) {
    if ("ClinicPlace".equals(prefix)) {
      return GWT.create(com.logikas.gwt.examples.shared.place.ClinicPlace.Tokenizer.class);
    }
    return null;
  }

}
