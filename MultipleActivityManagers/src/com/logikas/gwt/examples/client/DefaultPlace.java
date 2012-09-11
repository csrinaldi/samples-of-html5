/*
 * To change this template, choose Tools | Templates and open the template in the editor.
 */
package com.logikas.gwt.examples.client;

import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceTokenizer;

/**
 * 
 * @author csrinaldi
 */
public class DefaultPlace extends Place {

  public static class Tokenizer implements PlaceTokenizer<DefaultPlace> {

    @Override
    public DefaultPlace getPlace(String token) {
      return new DefaultPlace();
    }

    @Override
    public String getToken(DefaultPlace place) {
      return "home";
    }
  }

}
