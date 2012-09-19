package com.logikas.gwt.examples.client.ioc;

import javax.inject.Named;
import javax.inject.Singleton;

import com.google.gwt.inject.client.AbstractGinModule;
<<<<<<< HEAD
=======
import com.google.gwt.place.shared.Place;
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.place.shared.PlaceHistoryHandler;
import com.google.inject.Provides;
import com.google.web.bindery.event.shared.EventBus;
import com.google.web.bindery.event.shared.SimpleEventBus;
import com.logikas.gwt.examples.client.Bootstrap;
import com.logikas.gwt.examples.client.BootstrapImpl;
import com.logikas.gwt.examples.client.LayoutView;
import com.logikas.gwt.examples.client.LayoutWidget;
import com.logikas.gwt.examples.client.view.ClinicView;
import com.logikas.gwt.examples.client.view.PersonView;
import com.logikas.gwt.examples.client.widget.ClinicWidget;
import com.logikas.gwt.examples.client.widget.PersonWidget;
import com.logikas.gwt.examples.shared.place.OnePlaceHistoryMapper;
import com.logikas.gwt.examples.shared.place.TwoPlaceHistoryMapper;

<<<<<<< HEAD


=======
>>>>>>> 6f5b12fc12a6b93bceacab9e94af2da85801090e
public class MainClientModule extends AbstractGinModule{

	@Override
	protected void configure() {
		bind(EventBus.class).to(SimpleEventBus.class).in(com.google.inject.Singleton.class);
		bind(Bootstrap.class).to(BootstrapImpl.class).in(Singleton.class);
		bind(LayoutView.class).to(LayoutWidget.class).in(Singleton.class);
		bind(PersonView.class).to(PersonWidget.class).in(Singleton.class);
		bind(ClinicView.class).to(ClinicWidget.class).in(Singleton.class);
		
	}
	
	@Provides
    @Singleton
    public PlaceController getPlaceController(EventBus eventBus) {
        return new MainPlaceController(eventBus);
    }
	
	@Provides
    @Singleton
    @Named("onePlaceHandler")
    public PlaceHistoryHandler getOneHistoryHandler(PlaceController placeController,
            OnePlaceHistoryMapper historyMapper, EventBus eventBus) {

        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(placeController, eventBus, null);
        return historyHandler;
    }
	
	@Provides
    @Singleton
    @Named("twoPlaceHandler")
    public PlaceHistoryHandler getTwoHistoryHandler(PlaceController placeController,
            TwoPlaceHistoryMapper historyMapper, EventBus eventBus) {

        PlaceHistoryHandler historyHandler = new PlaceHistoryHandler(historyMapper);
        historyHandler.register(placeController, eventBus, null);
        return historyHandler;
    }

}