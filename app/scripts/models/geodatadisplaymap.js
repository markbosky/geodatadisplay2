geodatadisplayModule.factory('geodatadisplaymap',[function() {

	function geodatadisplaymap(){
        this.name = "geodatadisplaymap model";
        this.marker;
        this.map;
	}

    geodatadisplaymap.prototype.displayLayers = function(){
        console.log('Display map layers');
    }

    geodatadisplaymap.prototype.add = function(geoJSON, marker){
        this.map.data.addGeoJson(geoJSON);
        console.log(geoJSON);

        this.map.data.setStyle({
            icon: marker,
        });
    }

	return new geodatadisplaymap();

}]);