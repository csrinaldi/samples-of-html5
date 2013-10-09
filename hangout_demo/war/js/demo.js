function LocationApp() {
	this.map = null; 
	this.latlng = {}; 
	this.locations = {};
	this.api_key = "AIzaSyBXW3ct9U5L1guh9LdCpYVK4ZCeaV_vw3w";// Key:
	
	/**
	 * Levanta Google Maps Javascript API v3
	 */
	google.load("maps", "3", {
		other_params : "key=" + this.api_key + "&sensor=false",
		callback : this.mapsReady.bind(this)
	});
}