package com.logikas.gwt.examples.client.widget;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.uibinder.client.UiHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.Widget;
import com.logikas.gwt.examples.client.view.ClinicView;

public class ClinicWidget implements ClinicView {

	private static ClinicWidgetUiBinder uiBinder = GWT
			.create(ClinicWidgetUiBinder.class);

	interface ClinicWidgetUiBinder extends UiBinder<HTMLPanel, ClinicWidget> {
	}
	
	private HTMLPanel root;

	public ClinicWidget() {
		root = uiBinder.createAndBindUi(this);
	}

	@UiField
	Button button;

	@UiHandler("button")
	void onClick(ClickEvent e) {
		Window.alert("Hello!");
	}

	@Override
	public Widget asWidget() {
		return root;
	}
}
