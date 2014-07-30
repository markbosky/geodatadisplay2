    geodatadisplayModule.directive('atable', function($timeout) {
        return function(scope, element, attrs) {
            console.log('starting run');
            $timeout(function() {
                console.log('update with timeout fired')
        
                // apply DataTable options, use defaults if none specified by user
                var options = {};
                if (attrs.atable.length > 0) {
                    options = scope.$eval(attrs.atable);
                    console.log("aTable OPTIONS");
                    console.dir(options);
                } else {
                    options = {
                        "bStateSave": true,
                        "iCookieDuration": 2419200, /* 1 month */
                        "bJQueryUI": true,
                        "bPaginate": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "bInfo": false,
                        "bDestroy": true
                    };
                }

                // Tell the dataTables plugin what columns to use
                // We can either derive them from the dom, or use setup from the controller           
                var explicitColumns = [];
                element.find('th').each(function(index, elem) {
                    explicitColumns.push($(elem).text());
                });
                if(attrs.options){
                    options = scope.$eval(attrs.options);
                }
                else{

                    if (explicitColumns.length > 0) {
                        options["aoColumns"] = explicitColumns;
                    } else if (attrs.aoColumns) {
                        options["aoColumns"] = scope.$eval(attrs.aoColumns);
                    }
                }

                // aoColumnDefs is dataTables way of providing fine control over column config
                if (attrs.aoColumnDefs) {
                    options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
                }
                
                if (attrs.fnRowCallback) {
                    options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
                }

                // apply the plugin
                var dataTable = element.dataTable(options);

                
                
                // watch for any changes to our data, rebuild the DataTable
                scope.$watch(attrs.aaData, function(value) {
                    var val = value || null;
                    if (val) {
                        dataTable.fnClearTable();
                        dataTable.fnAddData(scope.$eval(attrs.aaData));
                    }
                });
            }, 3000);
        };
    });
