geodatadisplayModule.factory('geodatatable',['$http', function($http, scope, ngTableParams) {

	function geodatatable($http, scope){
        this.comment = "geodatatable model";
        this.data;
        this.dataSource = [];
        this.keys;
        this.scope = scope;
	}

	geodatatable.prototype.getData = function() {

        var _this = this;

        $http.get("http://data.mo.gov/resource/dymb-xy5c.json").success(function(data){
        	 _this.data = data;
        	 _this.dataSource = data;
        	 _this.keys = Object.keys(_this.dataSource[0]);

        	 console.log(_this.keys);
			//console.log(_this.dataSource);           
        }).
        error(function(data, status, headers, config) {
            console.log('There was an error with the request');
        });
       // return defer.promise;
    }

	return new geodatatable();
}]);