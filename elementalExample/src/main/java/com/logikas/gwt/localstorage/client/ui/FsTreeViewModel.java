/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.logikas.gwt.localstorage.client.ui;

import com.google.gwt.cell.client.AbstractCell;
import com.google.gwt.safehtml.shared.SafeHtmlBuilder;
import com.google.gwt.view.client.TreeViewModel;
import elemental.html.Entry;
import elemental.html.FileEntry;

/**
 *
 * @author cristian
 */
public class FsTreeViewModel implements TreeViewModel {

    private static class EntryCell extends AbstractCell<Entry> {

        @Override
        public void render(com.google.gwt.cell.client.Cell.Context context,
                Entry value, SafeHtmlBuilder sb) {
            if (value != null) {
                //TODO ver
                //sb.appendEscaped(value.getName() + ", " + value.getSurname());
            }
        }
    }

    @Override
    public <T> NodeInfo<?> getNodeInfo(T value) {
        //NodeInfo<Entry> info = new DefaultNodeInfo<Entry>
    }

    @Override
    public boolean isLeaf(Object value) {
        return (value instanceof FileEntry);
    }
}
