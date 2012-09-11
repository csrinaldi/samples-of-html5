/*
 * To change this template, choose Tools | Templates and open the template in the editor.
 */
package com.logikas.gwt.examples.client;

import javax.inject.Inject;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Style;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.AcceptsOneWidget;
import com.google.gwt.user.client.ui.IsWidget;
import com.google.gwt.user.client.ui.LayoutPanel;
import com.google.gwt.user.client.ui.ScrollPanel;
import com.google.gwt.user.client.ui.Widget;

/**
 * 
 * @author Cristian Rinaldi
 */
public class LayoutWidget implements LayoutView {

	/**
	 * Representa el ancho de la region oeste de la pantalla
	 */
	private final int MENU_WITH = 100;
	/**
	 * Representa el margen entre la region oeste y la region central
	 */
	private final int MENU_MARGIN = 5;
	/**
	 * Representa el alto de la region del norte de la pantalla
	 */
	private final int NORTH_HEIGHT = 80;

	/**
	 * Representa el alto del menu de modulos
	 */
	private final int MENU_MODULE_HEIGHT = 50;

	private static LayoutWidgetUiBinder uiBinder = GWT
			.create(LayoutWidgetUiBinder.class);

	interface LayoutWidgetUiBinder extends UiBinder<LayoutPanel, LayoutWidget> {
	}

	@UiField
	ScrollPanel center;

	private LayoutPanel root;
	private PlaceController controller;

	@Inject
	public LayoutWidget(PlaceController controller) {
		root = uiBinder.createAndBindUi(this);
		this.controller = controller;
	}

	@Override
	public Widget asWidget() {
		return root;
	}

	@Override
	public AcceptsOneWidget getCenterRegion() {
		return new AcceptsOneWidget() {
			@Override
			public void setWidget(IsWidget w) {
				Widget widget = Widget.asWidgetOrNull(w);
				center.setWidget(widget);
			}
		};
	}

	@Override
	public void setDefaultLayout() {

		root.setWidgetLeftWidth(center, MENU_WITH + MENU_MARGIN, Style.Unit.PX,
				(Window.getClientWidth() - (MENU_WITH + MENU_MARGIN)),
				Style.Unit.PX);
		root.setWidgetTopHeight(center, NORTH_HEIGHT + 5 + MENU_MODULE_HEIGHT,
				Style.Unit.PX, (Window.getClientHeight() - (NORTH_HEIGHT
						+ (5 * 2) + MENU_MODULE_HEIGHT)), Style.Unit.PX);

		root.animate(500);
	}
}
