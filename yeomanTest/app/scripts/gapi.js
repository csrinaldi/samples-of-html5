define(['vendor/async'], function (async) {

    var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;

    function parseName(name){
        var match = rParts.exec(name),
            data = {
                moduleName : match[1],
                version : match[2] || '1'
            };
        //data.settings = propertyParser.parseProperties(match[3]);
        return data;
    }

    
    return {
    	load : function(name, req, load, config){
			var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;
			var match = rParts.exec(name),
        	data = {
            	    moduleName : match[1],
                	version : match[2] || '1'
        	};   

        	if ( config.isBuild ){
         		load(null);
        	}else{

          		req(['vendor/async!https://apis.google.com/js/client.js?onload=OnLoadCallback'], function(){

        			
        		});
        	}
    	},

    	OnLoadCallback : function(event){
    		console.log("HOLA");
      		/*gapi.client.load(data.moduleName, data.version, function(){
        		req([data.moduleName], function(value){
        			load(value);
        		})
        	})*/

    	}

    }
});