/*
 * To change this template, choose Tools | Templates and open the template in the editor.
 */
package com.logikas.gwt.examples.client;

import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.IsWidget;

/**
 * 
 * @author csrinaldi
 */
public interface LayoutView extends IsWidget {
    
  AcceptsOneWidget getCenterRegion();

  void setDefaultLayout();

}
