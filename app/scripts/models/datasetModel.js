geodatadisplayModule.factory('datasetModel', ['$http', '$q',
    function($http, $q) {

        function datasetModel($http) {
            this.dataTable;
            this.data; //used to store raw json
            this.columns;
            this.options;
            
        }

        datasetModel.prototype.getData = function() {
            console.log("datasetModel.prototype.getData starting");
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
            console.log("datasetModel.prototype.getData2 has starting");
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
                obj = jQuery.parseJSON( jString );
                
                for (var i = 0; i < data.length; i++) {
                    for (var prop in data[i]) {
                        if (data[i].hasOwnProperty(prop)) {
                            var key = prop;
                            break;
                        }
                    }
                }
               
                _this.keys = Object.keys(data);
                defer.resolve(data);
        
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            //console.log("defer promise: " + defer.promise);
            return defer.promise;
        }

        datasetModel.prototype.getData3 = function() {
            console.log("datasetModel.prototype.getData3 starting");
            var defer = $q.defer();

            this.getData2().then(function(data) {
                var result = [];
                var item;
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

        datasetModel.prototype.getMarker = function() {
            console.log("datasetModel.prototype.getMarker starting");
            var defer = $q.defer();
            var _this = this;
            var marker = this.marker;
            console.log("Marker: " + marker);
            return marker;
        }

        datasetModel.prototype.getGeoJSON = function() {
            console.log("datasetModel.prototype.getGeoJSON starting");
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

        datasetModel.prototype.getColumns = function() {
            console.log("datasetModel.prototype.getColumns starting");
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
            console.log("datasetModel.prototype.combine starting");
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

                //console.log("dtColumns datasetModel: " + dtColumns);
                //console.log(dtColumns[0]);
                var promiseArray = [];
                promiseArray.push(result);
                promiseArray.push(dtColumns);

                defer.resolve(promiseArray);
        })

            return defer.promise;
        }

        return datasetModel;

    }
]);