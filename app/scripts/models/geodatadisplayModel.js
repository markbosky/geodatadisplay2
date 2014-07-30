/** This is the factory that builds the geodatadisplayModel. */

geodatadisplayModule.factory('geodatadisplayModel', ['geodatadisplaymap', 'datasetRepository', 'geodatatable', 
    function(geodatadisplaymap, datasetRepository, geodatatable) {

        function geodatadisplayModel(scope) {
            this.geodatadisplaymap = geodatadisplaymap;
            this.datasetRepository = datasetRepository;
            this.geodatatable = geodatatable;
            this.scope = scope;
        }

        geodatadisplayModel.prototype.displayDataset = function(dataset) {
          console.log("geodatadisplayModel.prototype.displayDataset starting");

          dataset.getGeoJSON().then(function(geoJSON) {
          	var marker = dataset.getMarker();  
            console.log("display marker: " + marker);
             // console.log(geoJSON);
          	geodatadisplaymap.add(geoJSON, marker);
            
            var columns;
            var dtData;
            var dtColumns = [];
              

            console.log(dataset.combine().then(function(data){
                dtData = data[0];
                //columns = data[1];
                console.dir("column from combine: " + data[1]);

               // console.log("DDAATA: " + data[0]);
                //console.log("columns :" + data[1]);
                console.dir(data);

                this.options = {
                  aoColumns: data[1],
                  aoColumnDefs: [{
                      "bSortable": true,
                      "aTargets": [0, 1]
                  }],
                  bJQueryUI: true,
                  bDestroy: true,
                  aaData: data[0]
                };
            }))
          });

         return this.options;  
      }

        return new geodatadisplayModel();

    }
]);