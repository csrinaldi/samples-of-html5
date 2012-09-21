package com.logikas.gwt.examples.client.widget;

public class ClinicWidget_ClinicWidgetUiBinderImpl_TemplateImpl implements com.logikas.gwt.examples.client.widget.ClinicWidget_ClinicWidgetUiBinderImpl.Template {
  
  public com.google.gwt.safehtml.shared.SafeHtml html1(java.lang.String arg0) {
    StringBuilder sb = new java.lang.StringBuilder();
    sb.append("Hello Clinic, <span id='");
    sb.append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0));
    sb.append("'></span>");
return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
}
}
