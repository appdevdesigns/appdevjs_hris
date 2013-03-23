

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
                



                this.element.hide();


                
                // insert our DOM elements
                this.insertDOM();
                
                
                // attach other widgets & functionality here:
                $( ".column" ).sortable({
                    connectWith: ".column"
                 });
                 $( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
                    .find( ".portlet-header" )
                    .addClass( "ui-widget-header ui-corner-all" )
                    .prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
                    .end()
                    .find( ".portlet-content" );
 
                $( ".portlet-header .ui-icon" ).click(function() {
                    $( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
                    $( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
                
                });
                $( ".column" ).disableSelection();
                // Find the object_id for the object_key = person.
                var self = this;
                hris.Object.findAll({object_key: 'person'})
                .done(function(list) {
                    if (list[0]) {
                        self.api_person_object_id = list[0].object_id;
                    }
                });
                // translate Labels
                // any DOM element that has an attrib "appdLabelKey='xxxx'" will get it's contents
                // replaced with our Label.  Careful to not put this on places that have other content!
                this.xlateLabels();
            },
            'userFamily.person.selected subscribe': function(msg, model)
            {
                this.element.show();


                var self= this;

                if (this.api_person_object_id === undefined) {
                    return;
                }
                
                // Find out which attribute sets apply to the person object
                var found =  hris.Attributeset.findAll({object_id: this.api_person_object_id});
                $.when(found)
                    .then(function(list){
                        self.element.find('.userAttributeRow').remove();
                        self.element.find('.attribute_Set_List').remove();
                        
                       
                        for (var i=0; i< list.length; i++){
                            self.addItem(list[i]);  
                            } 
                        })
                    .fail(function(err){ })

            },
            '.attribute_Set_List click': function(el, ev){
                //$('#attributeDetailContainer').hide();
                // Add the active class so navigation shows a highlight
                $('.attribute_Set_List').removeClass('active');
                var $el = $(el);
                $el.addClass('active');

                var model = el.data('ad-model');

                AD.Comm.Notification.publish('userFamily.attributeSetItem.selected', model);
                return false;
            },
            addItem: function(model){
                
                var view = this.view('/hris/userFamily/view/attributeSetListItem.ejs', {model: model});
                var $div = $(view);

                $div.data("ad-model", model);

                this.ul.append($div);

            },
            
            
            insertDOM: function() {
                
                this.element.html(this.view('/hris/userFamily/view/attributeSetList.ejs', {}));
                this.ul = this.element.find('ul');
                
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
