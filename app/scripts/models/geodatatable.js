geodatadisplayModule.factory('geodatatable', ['$http', '$q',
    function($http, $q) {

        function geodatatable(scope, $http, $q) {
            this.dataTable;
            this.data; //used to store raw json
            this.keys;
            this.columns;
            this.options;
        }

        geodatatable.prototype.getData2 = function() {
            console.log("geodatatable.prototype.getData2 starting");
            var defer = $q.defer();

            var _this = this;
            var test;
            var jString;
           
            
            $http.get('/booze-meta.json').
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
            console.log("defer promise: " + defer.promise);
            return defer.promise;
        }

        geodatatable.prototype.getData3 = function() {
            console.log("geodatatable.prototype.getData3 starting");
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

        geodatatable.prototype.getColumns = function() {
            console.log("geodatatable.prototype.getColumns starting");
            var defer = $q.defer();

            this.getData2().then(function(data) {
                console.log("GD GC: " + data);
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

        return new geodatatable;
}]);