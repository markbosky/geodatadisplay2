/** This is the factory that builds the geodatadisplayModel. */

geodatadisplayModule.factory('geodatadisplayModel', ['geodatadisplaymap', 'datasetRepository', 'geodatatable',
    function(geodatadisplaymap, datasetRepository, geodatatable) {


        function geodatadisplayModel(scope) {
            this.geodatadisplaymap = geodatadisplaymap;
            this.datasetRepository = datasetRepository;
            this.geodatatable = geodatatable;
        }

        geodatadisplayModel.prototype.displayDataset = function(dataset) {
            dataset.getGeoJSON().then(function(geoJSON) {
            	console.log(geoJSON);
            	geodatadisplaymap.add(geoJSON);
            });
        }

        return new geodatadisplayModel();


    }
]);