geodatadisplayModule.factory('datasetModel', ['$http', '$q',
    function($http, $q) {

        function datasetModel($http) {
            this.dataTable;
            this.data; //used to store raw json
            this.columns;
            this.options;
            
        }

        datasetModel.prototype.getData = function() {
            var defer = $q.defer();

            var _this = this;

            $http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                _this.data = data;
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            return defer.promise;
        }

        datasetModel.prototype.getData2 = function() {
            var defer = $q.defer();

            var _this = this;
            var test;
            var jString;
           
            //$http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
            //success(function(data, status, headers, config) {
            $http.get(this.src).
            success(function(data, status, headers, config) {
                
                _this.data = data;
                jString = JSON.stringify(data);
               // console.log("stringigy: " + jString);
                obj = jQuery.parseJSON( jString );
                
                for (var i = 0; i < data.length; i++) {
                    for (var prop in data[i]) {
                        if (data[i].hasOwnProperty(prop)) {
                            var key = prop;
                            break;
                        }
                    }
                //    console.log(key);
                }
               
                _this.keys = Object.keys(data);
               // console.log(_this.keys);
              //  console.log(data);
               // console.log(_this.data);
               console.log("getData2() has run");
                defer.resolve(data);
        
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            console.log("defer promise: " + defer.promise);
            return defer.promise;
        }

        datasetModel.prototype.getData3 = function() {
            var defer = $q.defer();

            this.getData2().then(function(data) {
                var result = [];
                var item;
                //console.log("data length: " + data.data[1].length);
                for (var x = 0; x < data.data.length; x++) {

                    item = data.data[x];
                    result.push(new Array());

                    for(var i = 8; i < data.data[x].length; i++){

                        if (typeof item[i] !== 'function') {
                          result[x].push(item[i]);
                        }
                    }

                }
                defer.resolve(result);
            })

            return defer.promise;
        }

        datasetModel.prototype.getData4 = function() {
            var defer = $q.defer();

            var _this = this;
            var test;
            var jString;
           
            //$http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
            //success(function(data, status, headers, config) {
            $http.get('booze-meta.json').
            success(function(data, status, headers, config) {
                
                _this.data = data;
                jString = JSON.stringify(data);
               // console.log("stringigy: " + jString);
                obj = jQuery.parseJSON( jString );
                
                for (var i = 0; i < data.length; i++) {
                    for (var prop in data[i]) {
                        if (data[i].hasOwnProperty(prop)) {
                            var key = prop;
                            break;
                        }
                    }
                //    console.log(key);
                }
               
                _this.keys = Object.keys(data);
               // console.log(_this.keys);
              //  console.log(data);
               // console.log(_this.data);
               console.log("getData4() has run");
                defer.resolve(data);
        
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            console.log("defer promise: " + defer.promise);
            return defer.promise;
        }

        datasetModel.prototype.getMarker = function() {
            var defer = $q.defer();
            var _this = this;
            var marker = this.marker;
            console.log("Marker: " + marker);
            return marker;
        }

        /*datasetModel.prototype.getEnd = function() {
            var defer = $q.defer();

            var _this = this;

            $http.jsonp(this.end + '?$jsonp=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                _this.data = data;
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            return defer.promise;
        }*/

        datasetModel.prototype.getGeoJSON = function() {
            var defer = $q.defer();

            this.getData().then(function(data) {
                var json = {};

                json.bbox = [];
                json.crs = {};
                json.features = [];
                json.type = 'FeatureCollection';
                this.json = json;

                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;

                        // Check to see if this is a location column
                        if (this.locationFieldName != undefined && column.fieldName == this.locationFieldName) {
                            var locationColumn = column;
                        } else if (this.locationFieldName == undefined && column.dataTypeName == "location") {
                            var locationColumn = column;
                        }
                    }
                }

                this.columns = columns;

                for (var x = 0; x < data.data.length; x++) {

                    var feature = {};
                    feature.type = 'Feature';
                    feature.id = data.data[x][1];
                    feature.geometry = {};
                    feature.geometry.type = "Point";
                    feature.geometry_name = "geo_point";
                    feature.geometry.coordinates = [];
                    feature.properties = {};
                    if (locationColumn) {
                   //     console.log(data.data[x][locationColumn.positionInArray][2]);
                   //     console.log(parseFloat(data.data[x][locationColumn.positionInArray][2]));
                        feature.geometry.coordinates.push(parseFloat(data.data[x][locationColumn.positionInArray][2]));
                        feature.geometry.coordinates.push(parseFloat(data.data[x][locationColumn.positionInArray][1]));
                    }

                    for (column in columns) {
                        feature.properties[column] = data.data[x][columns[column].positionInArray];
                    }

                    if (feature.geometry.coordinates[0] != null && feature.geometry.coordinates[1] != null) {
                        json.features.push(feature);
                    }

                }
                defer.resolve(json);
            })


            return defer.promise;
        }

        /*datasetModel.prototype.getColumns = function() {
            var defer = $q.defer();

            this.getData().then(function(data) {
                console.log("GD GC: " + data);
                var keys;
                
                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;
                    }
                }

                this.columns = columns;
                console.log("Columns: " + columns);

                defer.resolve(columns);
            })


            return defer.promise;
        }*/


        datasetModel.prototype.getColumns = function() {
            var defer = $q.defer();

            this.getData2().then(function(data) {
                //console.log("GD GC: " + data);
                var json = {};
                var keys;
                json.bbox = [];
                json.crs = {};
                json.features = [];
                json.type = 'FeatureCollection';
                this.json = json;

                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;
                    }
                }
                
                this.columns = columns;
                defer.resolve(columns);
            });

            return defer.promise;
        };
        datasetModel.prototype.combine = function() {
            var columns = [];
             var dtColumns = [];
             var table;
             var dataTable;
             var getDataObject;

             var defer = $q.defer();

            this.getData2().then(function(data) {
                var result = [];
                var item;
                //console.log("data length: " + data.data[1].length);
                for (var x = 0; x < data.data.length; x++) {

                    item = data.data[x];
                    result.push(new Array());

                    for(var i = 8; i < data.data[x].length; i++){

                        if (typeof item[i] !== 'function') {
                          result[x].push(item[i]);
                        }
                    }

                }
                console.log("GD GC: " + data);
                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;
                    }
                }
 

                newColumns = Object.keys(columns);
                    //console.log("get Table Columns2: " + newColumns);

                    jQuery.each(newColumns, function(i, value){
                      var obj = { sTitle: value };
                      dtColumns.push(obj);
                    });

                    console.log("dtColumns datasetModel: " + dtColumns);
                    //console.log(dtColumns[0]);
                    var promiseArray = [];
                    promiseArray.push(result);
                    promiseArray.push(dtColumns);

                    defer.resolve(promiseArray);
            })

            return defer.promise;
        }
        
        datasetModel.prototype.displayDataset = function() {
             var columns = [];
             var dtColumns = [];
             var table;
             var dataTable;
             var getDataObject;



            console.log(this.getData3().then(function(data){
                getDataObject = data;
                //console.log("Data Get3: " + getDataObject);

                console.log(this.getColumns().then(function(dataColumns){
            
                    columns = Object.keys(dataColumns);
                    console.log("get Table Columns2: " + columns);

                    jQuery.each(columns, function(i, value){
                      var obj = { sTitle: value };
                      dtColumns.push(obj);
                    });
                    console.log("dtColumns: " + dtColumns);

                    this.options = {
                          aoColumns: dtColumns,
                          aoColumnDefs: [{
                              "bSortable": true,
                              "aTargets": [0, 1]
                          }],
                          bJQueryUI: true,
                          bDestroy: true,
                          aaData: getDataObject
                        };

                        
                    geodatatable.add(this.options);
                    //dataTable = element.dataTable(this.options);

                }));
            }));
       
            return this.options; 
        }
        
        return datasetModel;

    }
]);