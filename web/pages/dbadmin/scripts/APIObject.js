
/**
 * @class hris.server.models.APIObject
 * @parent hris.server.models
 *
 *  This is an object to manage the interaction with the hris.APIObjects service.
 */


(function () {
	  var onServer = false;
	  if (typeof exports !== 'undefined') {
	  // exports are defined on the server side node modules
	      onServer = true;
	  }


	  if (!onServer) {

		  var attr = {
		      // Client Definitions
				_adModule:'hris',
				_adResource:'APIObject',	// singular
//				_adModel: [ModelName]   // <-- if the data returned is associated with a diff Model obj, provide it's name here:  _adModel:site.Label,
				labelKey:'object_key',
				id:'object_id'  // the field that is the id of the data
		  };

		  AD.Service.extend("hris.APIObject",
    		  attr,
    		  {
    		  // define instance methods here.
    		  });
	  }
})()
