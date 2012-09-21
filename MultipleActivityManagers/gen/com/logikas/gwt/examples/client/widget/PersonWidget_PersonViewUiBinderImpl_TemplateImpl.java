package com.logikas.gwt.examples.client.widget;

public class PersonWidget_PersonViewUiBinderImpl_TemplateImpl implements com.logikas.gwt.examples.client.widget.PersonWidget_PersonViewUiBinderImpl.Template {
  
  public com.google.gwt.safehtml.shared.SafeHtml html1(java.lang.String arg0) {
    StringBuilder sb = new java.lang.StringBuilder();
    sb.append("Hello Person, <span id='");
    sb.append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0));
    sb.append("'></span>");
return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
}
}
