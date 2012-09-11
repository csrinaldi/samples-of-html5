package com.logikas.gwt.examples.client;

import javax.inject.Named;

import com.google.gwt.inject.client.AbstractGinModule;
import com.google.gwt.place.shared.Place;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.place.shared.PlaceHistoryHandler;
import com.google.gwt.place.shared.PlaceHistoryMapper;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.google.inject.name.Names;
import com.google.web.bindery.event.shared.EventBus;

public class ClientModule extends AbstractGinModule {

    @Override
    protected void configure() {
        
    }

    @Provides
    @Singleton
    @Named("onePlaceHandler")
    public PlaceHistoryHandler getHistoryHandlerOne(PlaceController placeController,
            @Named("one") PlaceHistoryMapper historyMapper, EventBus eventBus) {

        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(placeController, eventBus, new DefaultPlace());
        return historyHandler;
    }
    
    @Provides
    @Singleton
    @Named("twoPlaceHandler")
    public PlaceHistoryHandler getHistoryHandlerTwo(PlaceController placeController,
            @Named("one") PlaceHistoryMapper historyMapper, EventBus eventBus) {

        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(placeController, eventBus, Place.NOWHERE);
        return historyHandler;
    }

}
