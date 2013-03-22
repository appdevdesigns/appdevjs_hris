

/**
 * @class [moduleName].client.pages.attributeSetList
 * @parent [moduleName].client.pages.attributeSetList
 * 
 *  Setup the attributeSetList Widget
 */

//steal('/hris/userFamily/view/attributeSetList.ejs').then(function() {

    // Keep all variables and functions inside an encapsulated scope
    (function() {
    
    
        //// Setup Widget:
        AD.Controller.extend('attributeSetList', {
    
            
            init: function (el, options) {

                //// Setup your controller here:
                
                // make sure defaults are taken care of
                var defaults = {
                      uid:'attributeSetList_uuid_notGiven',
/*                      
                      dataManager:null, // the ListIterator of the data to display
                      template:null,	// view(): the default view template
                      templateEdit:null,// veiw(): the edit panel view
                      templateDelete:null, // view():  the delete confirmation view
                      title: null      // the MultilingualLabel Key for the title
*/                      
                };
                var options = $.extend(defaults, options);
                this._super(el, options);
                
                
                this.options = options;
                
                
                // insert our DOM elements
                this.insertDOM();
                
                
                // attach other widgets & functionality here:
                
                
                
                // translate Labels
                // any DOM element that has an attrib "appdLabelKey='xxxx'" will get it's contents
                // replaced with our Label.  Careful to not put this on places that have other content!
                this.xlateLabels();
            },
	    'userFamily.person.selected subscribe': function(msg, model)
            {
                console.log("Got a person");
                 var self= this;
                
                var found =  hris.Attributeset.findAll({object_id: model.object_id});


                $.when(found)
                    .then(function(list){
                        self.element.find('.attribute_Set_List').remove();
                        for (var i=0; i< list.length; i++){
                            console.log(list[i]);
                            
                            self.addItem(list[i]);   
                            
                        }
                        
                    })
                    .fail(function(err){
                          
                          })
            },
 	    addItem: function(model){
                
                var view = this.view('/hris/userFamily/view/attributeSetListItem.ejs', {model: model});
             var $div = $(view);
                          
                          
            this.element.append($div);
                
                
            },
            
            
            insertDOM: function() {
                
                this.element.html(this.view('/hris/userFamily/view/attributeSetList.ejs', {}));
                
            }
            
            
//// To setup default functionality
/*
            '.col1 li dblclick' : function (e) {
            
                this.element.find('#someDiv').append(e);
            },
*/

//// To Add Subscriptions:
/*
            'apprad.module.selected subscribe': function(message, data) {
                // data should be { name:'[moduleName]' }
                this.module = data.name;
                this.setLookupParams({module: data.name});
            },
*/
        });
        
    }) ();

// });  // end steal