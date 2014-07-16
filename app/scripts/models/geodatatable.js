geodatadisplayModule.factory('geodatatable', ['$http', '$q',
    function($http, $q) {

        function geodatatable(scope, $http, $q) {
            this.dataTable;
            this.data; //used to store raw json
            this.keys;
        }

        geodatatable.prototype.getData = function() {
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
        }

        geodatatable.prototype.getData2 = function() {
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

        geodatatable.prototype.getColumns = function() {
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
            })

            return defer.promise;
        }

        return new geodatatable;
}]);



///////////////////////////////////////////////////////////////////////

/*geodatadisplayModule.factory('geodatatable',['$http', '$q', function($http, $q) {

	function geodatatable($http, scope){
        this.comment = "geodatatable model";
        this.data;
        this.dataSource = [];
        this.keys;
	}

	geodatatable.prototype.getData = function() {
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

	return new geodatatable();
}]);*/