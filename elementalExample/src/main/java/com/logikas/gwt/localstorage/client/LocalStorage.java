/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.logikas.gwt.localstorage.client;

import com.google.gwt.core.client.EntryPoint;
import elemental.client.Browser;
import elemental.dom.Document;
import elemental.dom.Element;
import elemental.events.Event;
import elemental.events.EventListener;
import elemental.html.Console;
import elemental.html.DOMFileSystem;
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


        window.webkitRequestFileSystem(Window.PERSISTENT, 1024 * 1024, new FileSystemCallback() {
            @Override
            public boolean onFileSystemCallback(DOMFileSystem fileSystem) {
                fs = fileSystem;
                console.log("FileSystem Open");
                return true;
            }
        }, new ErrorCallback() {
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
        });


    }

    void handleSuccessOpenRequest(Event event) {
        //db = event.getTarget();
    }
}
