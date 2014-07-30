testCtrl.factory('geodatatableTestTest', ['$http', '$q',
    function($http, $q) {

        function geodatatableTest(scope, $http, $q) {
            this.dataTable;
            this.data; //used to store raw json
            this.keys;
            this.columns;
            this.options;
        }

        /*geodatatableTest.prototype.getData = function() {
            var defer = $q.defer();
            var _this = this;
            var test;
            var jString;
           
            
            $http.get('/booze.json').
            success(function(data, status, headers, config) {
                _this.data = data;
                jString = JSON.stringify(data);
               // console.log("stringigy: " + jString);
                _this.dataSource = data;
                obj = jQuery.parseJSON( jString );
                
                for (var i = 0; i < data.length; i++) {
                    for (var prop in data[i]) {
                        if (data[i].hasOwnProperty(prop)) {
                            var key = prop;
                            break;
                        }
                    }
                    //console.log(key);
                }
               
                _this.keys = Object.keys(data);
               // console.log(_this.keys);
               // console.log(data);
               // console.log(_this.data);
                console.log("getData() has run");
                defer.resolve(data);
        
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            console.log("defer promise: " + defer.promise);
            return defer.promise;
        }*/

        geodatatableTest.prototype.getData2 = function() {
            var defer = $q.defer();

            var _this = this;
            var test;
            var jString;
           
            
            $http.get('/booze-meta.json').
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

        geodatatableTest.prototype.add = function(scope, getDataObject, dtColumns){

            scope.options = {
              aoColumns: dtColumns,/*[{
                  "sTitle": "Surname"
              }, {
                  "sTitle": "First Name"
              }],*/
              aoColumnDefs: [{
                  "bSortable": true,
                  "aTargets": [0, 1]
              }],
              bJQueryUI: true,
              bDestroy: true,
              aaData: getDataObject/*result[
                ["Webber", "Adam"],
                ["Bosky", "Mark"],
                ["Distler", "Rodney"],
                ["Houston", "Johnn"],
              ]*/
            };
        }

        geodatatableTest.prototype.getData3 = function() {
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

       

        geodatatableTest.prototype.getColumns2 = function() {

            this.getData4().then(function(data) {
                console.dir("GD GC2: " + data);

                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;
                    }
                }
                
                this.columns = columns;
                console.log("gColumns2: " + columns);
            });

            return columns;
        };

        geodatatableTest.prototype.getColumns = function() {
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

        geodatatableTest.prototype.getTable = function(columns) {
            var defer = $q.defer();
            var dataTable = "test";
            this.getData3().then(function(data){
                var getDataObject = data;
                //console.log("geodatatableTest getTable:" + getDataObject);
                //console.log("DATA " + data);
      
                //this.getColumns().then(function(dataColumns){
                    //console.log("Data Columns: " + dataColumns);
                    

                   /* scope.options = {
                      aoColumns: dtColumns,
                      aoColumnDefs: [{
                          "bSortable": true,
                          "aTargets": [0, 1]
                      }],
                      bJQueryUI: true,
                      bDestroy: true,
                      aaData: getDataObject
                    };

                    dataTable = element.dataTable(scope.options); */
                defer.resolve(dataTable);
            });
                
            return defer.promise;
        };

        return new geodatatableTest;
}]);



///////////////////////////////////////////////////////////////////////

/*geodatadisplayModule.factory('geodatatableTest',['$http', '$q', function($http, $q) {

	function geodatatableTest($http, scope){
        this.comment = "geodatatableTest model";
        this.data;
        this.dataSource = [];
        this.keys;
	}

	geodatatableTest.prototype.getData = function() {
        var defer = $q.defer();

        var _this = this;

        $http.get("/booze.json").success(function(data){
        	 _this.data = data;
        	 _this.dataSource = data;
        	 _this.keys = Object.keys(_this.dataSource[0]);

        	 console.log(_this.keys);
            // console.log(_this.data);
			//console.log(_this.dataSource); 
            defer.resolve(data);          
        }).
        error(function(data, status, headers, config) {
            console.log('There was an error with the request');
        });
        console.log("_this.data " + _this.data);
        console.log("defer.promise " + defer.promise);
        return defer.promise;
        //console.log(_this.data); 
    }

	return new geodatatableTest();
}]);*/