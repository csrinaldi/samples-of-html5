/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.logikas.gwt.localstorage.client;

import com.google.gwt.core.client.EntryPoint;
import elemental.client.Browser;
import elemental.dom.Document;
import elemental.events.Event;
import elemental.events.EventListener;
import elemental.html.Console;
import elemental.html.DOMFileSystem;
import elemental.html.DirectoryReader;
import elemental.html.EntriesCallback;
import elemental.html.Entry;
import elemental.html.EntryArray;
import elemental.html.ErrorCallback;
import elemental.html.FileError;
import elemental.html.FileSystemCallback;
import elemental.html.IDBDatabase;
import elemental.html.IDBFactory;
import elemental.html.IDBRequest;
import elemental.html.Window;

/**
 *
 * @author cristian
 */
public class LocalStorage implements EntryPoint {

    Console console;
    Window window;
    Document doc;
    IDBDatabase db = null;
    DOMFileSystem fs = null;
    
    
    private class CustomErrorCallback implements ErrorCallback{

        @Override
        public boolean onErrorCallback(FileError error) {
            String msg = "";
                switch (error.getCode()) {
                    case FileError.QUOTA_EXCEEDED_ERR:
                        msg += "QUOTA_EXCEEDED_ERR";
                        break;
                    case FileError.NOT_FOUND_ERR:
                        msg += "NOT_FOUND_ERR";
                        break;
                    case FileError.SECURITY_ERR:
                        msg += "SECURITY_ERR";
                        break;
                    case FileError.INVALID_MODIFICATION_ERR:
                        msg += "INVALID_MODIFICATION_ERR";
                        break;
                    case FileError.INVALID_STATE_ERR:
                        msg += "INVALID_STATE_ERR";
                        break;
                    default:
                        msg += "Unknown Error";
                        break;
                }
                console.log("Error open FileSystem: "+msg);
                return false;
        }
    }
    
    CustomErrorCallback errorCallback = new CustomErrorCallback();

    public LocalStorage() {
        window = Browser.getWindow();
        doc = window.getDocument();
        console = window.getConsole();

    }

    @Override
    public void onModuleLoad() {
        doc.getElementById("files").addEventListener("change", new EventListener() {
            @Override
            public void handleEvent(Event evt) {
                console.log(evt.getTarget());
            }
        }, false);
        
        
        
        final IDBFactory factory = Browser.getWindow().getWebkitIndexedDB();
        final IDBRequest openRequest = factory.open("myDatabase");
        
        openRequest.addEventListener("success", new EventListener() {
            @Override
            public void handleEvent(Event evt) {
                db = (IDBDatabase) openRequest.getResult();

                db.setOnversionchange(new EventListener() {
                    @Override
                    public void handleEvent(Event evt) {
                        console.log(evt);
                    }
                });

                /*int idx = 0;
                 boolean contains = false;
                 while (idx < db.getObjectStoreNames().length()) {
                 contains = ((String) db.getObjectStoreNames().at(idx)).equals("person");
                 if (contains) {
                 break;
                 }
                 }
                 */
                /* if ( !contains ){
                 IDBObjectStore person = db.createObjectStore("person");
                 console.log(person);
                    
                 }*/

            }
        }, false);

        openRequest.addEventListener("error", new EventListener() {
            @Override
            public void handleEvent(Event evt) {
                console.log(evt);
            }
        }, false);


        window.webkitRequestFileSystem(Window.TEMPORARY, 1024 * 1024, new FileSystemCallback() {
            @Override
            public boolean onFileSystemCallback(DOMFileSystem fileSystem) {
                fs = fileSystem;
                loadFs();
                return true;
            }
        }, errorCallback );


    }

    public void loadFs(){
        DirectoryReader reader = fs.getRoot().createReader();
        reader.readEntries(new EntriesCallback() {
            @Override
            public boolean onEntriesCallback(EntryArray entries) {
                for (int i = 0; i < entries.getLength(); i++) {
                    Entry e = entries.item(i);
                    
                }
                
                return true;
                
            }
        }, errorCallback); 
    }
}
