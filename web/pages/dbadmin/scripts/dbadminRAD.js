//// Template Replace:
//   hris     : the name of this page's module: (lowercase)
//   dbadmin  : the name of this page :  (lowercase)
//   Dbadmin  : the name of this page :  (Uppercase)

/**
 *  
 *  @class hris.client.pages.Dbadmin.RADSetup
 *  @parent hris.client.pages.Dbadmin
 *  
 *  appRAD generated setup script for the Dbadmin Page container. 
 *
 *  The job of this code is to make sure the HTML DOM content required
 *  for the hrisDbadminSetup() is generated before it is called.
 */



// Keep all variables and functions inside an encapsulated scope
(function() {

    ////[appRad] --  setup object definitions here:
    var hrisDbadminRADSetup = function() {
        // This will be called after all the javascript libraries are loaded
        // using the steal.js dependency manager.
        // 
        // Use this area to add any additional DOM setups that need to be in
        // place before the hrisDbadminSetup() is called.
        
        
        
        // 1) Setup Our On Page Labels
        //      - scan for any currently embedded labels
        //      - fire off any label load requests queued up by 
        //        our labels.js script.
        var initProcess = AD.Lang.Labels.initLabels();


        //// IDEA:
        // 2) Load the Site Settings for use by our application:
        // AD.Settings.loadSettings({ key:value, key2:value2, ... keyN,valueN });
        // usage: AD.Settings['defaultURL']; // returns str: '/page/temp/viewer'
        
        
        //// IDEA:
        // Load a Viewer object for our application
        // Viewer object is responsible for reporting what 
        // preferences/permissions the current viewer of the page has.
        // AD.Viewer = new Viewer({});
        // usage:  AD.Viewer.hasPermission('canXlate');  // returns True/False

        
        // when our Initialization Process is complete, then pass control 
        // to the programmer's setup() function.
        $.when(initProcess).done(function () {
        
            // keep this last:
            // publish a notification it's time to run hrisDbadminSetup()
            AD.Comm.Notification.publish("ad.hris.dbadmin.setup", {});
            
            // note: since anyone can publish a key, we want to prevent 
            // running this a second time:
            AD.Comm.Notification.unsubscribe(subscriptionID);
        });
        
    }
    var subscriptionID = AD.Comm.Notification.subscribe('ad.hris.dbadmin.radsetup',hrisDbadminRADSetup);


    $(document).ready(function () {

        // by the time this is called, we should have all our HTML loaded
        // from the server, but no guarantee that all our javascript
        // includes are loaded.
        //

    }); // end ready()

}) ();