package com.logikas.gwt.examples.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Element;
import com.google.gwt.safehtml.client.SafeHtmlTemplates;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.safehtml.shared.SafeHtmlUtils;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiBinderUtil;
import com.google.gwt.user.client.ui.LayoutPanel;

public class LayoutWidget_LayoutWidgetUiBinderImpl implements UiBinder<com.google.gwt.user.client.ui.LayoutPanel, com.logikas.gwt.examples.client.LayoutWidget>, com.logikas.gwt.examples.client.LayoutWidget.LayoutWidgetUiBinder {

  interface Template extends SafeHtmlTemplates {
    @Template("<span id='{0}'></span> <span id='{1}'></span>")
    SafeHtml html1(String arg0, String arg1);
     
  }

  Template template = GWT.create(Template.class);

  public com.google.gwt.user.client.ui.LayoutPanel createAndBindUi(final com.logikas.gwt.examples.client.LayoutWidget owner) {

    com.logikas.gwt.examples.client.LayoutWidget_LayoutWidgetUiBinderImpl_GenBundle clientBundleFieldNameUnlikelyToCollideWithUserSpecifiedFieldOkay = (com.logikas.gwt.examples.client.LayoutWidget_LayoutWidgetUiBinderImpl_GenBundle) GWT.create(com.logikas.gwt.examples.client.LayoutWidget_LayoutWidgetUiBinderImpl_GenBundle.class);
    com.logikas.gwt.examples.client.LayoutWidget_LayoutWidgetUiBinderImpl_GenCss_style style = clientBundleFieldNameUnlikelyToCollideWithUserSpecifiedFieldOkay.style();
    java.lang.String domId0 = com.google.gwt.dom.client.Document.get().createUniqueId();
    com.google.gwt.user.client.ui.Hyperlink person = owner.person;
    java.lang.String domId1 = com.google.gwt.dom.client.Document.get().createUniqueId();
    com.google.gwt.user.client.ui.Hyperlink clinic = owner.clinic;
    com.google.gwt.user.client.ui.HTMLPanel menu = new com.google.gwt.user.client.ui.HTMLPanel(template.html1(domId0, domId1).asString());
    com.google.gwt.user.client.ui.ScrollPanel center = (com.google.gwt.user.client.ui.ScrollPanel) GWT.create(com.google.gwt.user.client.ui.ScrollPanel.class);
    com.google.gwt.user.client.ui.LayoutPanel f_LayoutPanel1 = (com.google.gwt.user.client.ui.LayoutPanel) GWT.create(com.google.gwt.user.client.ui.LayoutPanel.class);

    f_LayoutPanel1.add(menu);
    f_LayoutPanel1.add(center);

    UiBinderUtil.TempAttachment attachRecord0 = UiBinderUtil.attachToDom(menu.getElement());
    com.google.gwt.user.client.Element domId0Element = com.google.gwt.dom.client.Document.get().getElementById(domId0).cast();
    com.google.gwt.user.client.Element domId1Element = com.google.gwt.dom.client.Document.get().getElementById(domId1).cast();
    attachRecord0.detach();
    menu.addAndReplaceElement(person, domId0Element);
    menu.addAndReplaceElement(clinic, domId1Element);


    owner.center = center;
    owner.menu = menu;
    clientBundleFieldNameUnlikelyToCollideWithUserSpecifiedFieldOkay.style().ensureInjected();

    return f_LayoutPanel1;
  }
}
