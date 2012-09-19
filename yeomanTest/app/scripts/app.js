define(["gapi!plus,v1"], function(gapi) {
  
	var Authentication = function(){
		var clientId = '';
		var apiKey = '';
		var scopes = new Array();

		function Authentication(clientId, apiKey){
			//TODO
			this.clientId = clientId;
			this.apiKey = apiKey;
		}

		Authentication.prototype.addScope = function(scope){
			//TODO validate for URL
			this.scopes.push(scope);
		}

		Authentication.prototype.authorize = function(){
			if ( clientId != null ){

				

				gapi.auth.authorize(
					{
						client_id: this.clientId, 
						scope: this.scopes, immediate: true
					}, 
					this.handleAuthResult);
			}
		}

		Authentication.prototype.handleAuthResult = function(result){
			var authorizeButton = document.getElementById('authorize-button');
  			if (authResult && !authResult.error) {
    			authorizeButton.style.visibility = 'hidden';
    			makeApiCall();
  			} else {
    			authorizeButton.style.visibility = '';
    			authorizeButton.onclick = handleAuthClick;
  			}
		}

	}


	return {Auth : Authentication};
});