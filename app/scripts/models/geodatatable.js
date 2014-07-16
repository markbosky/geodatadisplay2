geodatadisplayModule.factory('geodatatable', ['$http', '$q',
    function($http, $q) {

        function geodatatable(scope, $http, $q) {
            this.data; //used to store raw json
            this.keys;
            this.dataSource = [];
        }

        geodatatable.prototype.getData = function() {
            var defer = $q.defer();

            var _this = this;
            var test;

            $http.get('/booze.json').
            success(function(data, status, headers, config) {
                _this.data = data;
                _this.dataSource = data;
                _this.keys = Object.keys(_this.dataSource[0]);
               // console.log(_this.keys);
               // console.log(data);
                //console.log(_this.data);
                console.log("getData() has run");
                defer.resolve(data);
        
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            console.log("defer promise: " + defer.promise);
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