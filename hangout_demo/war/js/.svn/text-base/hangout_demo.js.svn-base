	function LocationApp() {
		this.map = null; // Mapa donde se visualizarán las localizaciones de
							// los participantes
		this.latlng = {}; // Localizaciones actuales de los participantes
		this.locations = {}; // Localizaciones de los participantes
		this.api_key = "AIzaSyBXW3ct9U5L1guh9LdCpYVK4ZCeaV_vw3w";// Key:
																	// Proporcionada
																	// por el
																	// API
																	// Console

		// gapi.hangout.onApiReady.add(this.onApiReady.bind(this));// Esperando
		// por
																// el API de
																// Hangout
		
		/**
		 * Levanta Google Maps Javascript API v3
		 */
		google.load( 
				"maps", "3", {
					other_params : "key=" + this.api_key + "&sensor=false",
					callback : this.mapsReady.bind(this) 	
		});
	}

	
	
	LocationApp.prototype.mapsReady = function () {	
	    this.prepareMap();	
	    // Autenticacion:
	    /*
		 * var scopes; this.prepareMap();
		 * 
		 * scopes = [ "https://www.googleapis.com/auth/plus.me", // OAuth scopes //
		 * necessary for the // Hangouts API
		 * "https://www.googleapis.com/auth/hangout.av", .
		 * "https://www.googleapis.com/auth/hangout.participants",
		 * "https://www.googleapis.com/auth/latitude.current.city" // OAuth //
		 * scope for // accessing // Latitude ];
		 */
	    	
	    /**
		 * The client will automatically use the API Key associated with the
		 * Hangout App project
		 */
	    // gapi.client.setApiKey(null);
	    	
	    /**
		 * this will authenticate the client using the ClientID associated with
		 * the Hangout App project to access the data, the user already has
		 * granted permission to use, and will call our function once the OAuth
		 * workflow
		 * 
		 */
	    /*
		 * gapi.auth.authorize({ client_id: null, scope: scopes, immediate: true },
		 * this.handleAuthResult.bind(this)); }; has finished in the background
		 * 
		 * LocationApp.prototype.handleAuthResult = function (authResult) { if
		 * (authResult) {
		 * 
		 * /** This loads the necessary information to access the Latitude API
		 * and calls our function once ready.
		 */
	/*
	 * gapi.client.load( 'latitude', 'v1', this.loadLocation.bind(this) ); }
	 * else { document.getElementById("current_location").innerHTML = "Can't
	 * determine location: not authorized"; }
	 */
	};	
	
	LocationApp.prototype.loadLocation = function () {	
	    var request;	
	    request = gapi.client.latitude.currentLocation.get(	 // Here we
																// create a
																// request to
																// get
	      {"granularity": "city"}	                         // the user's
																// current city
																// location.
	    );													 // See the
																// Latitude API
																// documentation
																// for details.
	    	
	    request.execute(function (loc) {	                 // Executing the
																// request will
																// return a JSON
																// object
	      var wp;	
	      if (loc.error) {	
	        document.getElementById("current_location").innerHTML =	
	          "Can't determine location: " + loc.error.message;	
	      } else {	
	        document.getElementById("current_location").innerHTML =	
	          "Current location: " + loc.latitude + " " + loc.longitude;
	        	
	        this.latlng.lat = loc.latitude;	
	        this.latlng.lng = loc.longitude;
	        	
	        wp = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);	// Here
																			// we
																			// construct
																			// a
																			// Google
																			// maps
																			// marker
	        this.locations[gapi.hangout.getParticipantId()] =	            // to
																			// display
																			// the
																			// current
																			// location
	          new google.maps.Marker({position: wp, map: this.map});	    // to
																			// the
																			// user.
	      }	
	    }.bind(this));	
	  };
	  	
	LocationApp.prototype.prepareMap = function () {	
	    var latlng, myOptions;	
	    latlng = new google.maps.LatLng(0, 0);	
	    myOptions = {	// some options as to how the map is displayed
	      zoom: 0,	// see the Maps API documentation for details
	      center: latlng,	
	      disableDefaultUI: true,	
	      zoomControl: true,	
	      mapTypeId: google.maps.MapTypeId.ROADMAP	
	    };	
	  	
	    this.map = new google.maps.Map(	
	      document.getElementById("map"),
	    );
	}

