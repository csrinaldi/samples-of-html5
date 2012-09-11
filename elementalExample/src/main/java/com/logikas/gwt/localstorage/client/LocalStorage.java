/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.logikas.gwt.localstorage.client;

import com.google.gwt.core.client.EntryPoint;
import elemental.client.Browser;
import elemental.events.Event;
import elemental.events.EventListener;
import elemental.html.Console;
import elemental.html.IDBDatabase;
import elemental.html.IDBFactory;
import elemental.html.IDBObjectStore;
import elemental.html.IDBRequest;
import elemental.html.IDBVersionChangeRequest;
import elemental.js.util.JsMappable;
import elemental.util.Mappable;

/**
 *
 * @author cristian
 */
public class LocalStorage implements EntryPoint{

    Console console;
    IDBDatabase db = null;
    
    public LocalStorage() {
        console = Browser.getWindow().getConsole();
    }
 
    @Override
    public void onModuleLoad() {
        IDBFactory factory = Browser.getWindow().getWebkitIndexedDB();
        final IDBRequest openRequest = factory.open("myDatabase");
        
        openRequest.addEventListener("success", new EventListener() {
            @Override
            public void handleEvent(Event evt) {
                db = (IDBDatabase) openRequest.getResult();
                
                console.log(db);
                
                
                
                /*db.setOnversionchange(new EventListener() {
                    @Override
                    public void handleEvent(Event evt) {
                        console.log(evt);
                    }
                });
                
                int idx = 0;
                boolean contains = false;
                while (idx < db.getObjectStoreNames().length()) {                    
                    contains = ((String)db.getObjectStoreNames().at(idx)).equals("person");
                    if (contains) {
                        break;
                    }
                }*/
                
                
                
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
    }
    
    void handleSuccessOpenRequest(Event event){
        //db = event.getTarget();
    }
}
