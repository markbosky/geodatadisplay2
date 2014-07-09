geodatadisplayModule.directive('ngtable',  function(ngTableParams) {
    var linker = function(scope, element, attrs) {
     //   console.log('Executing Linker function for datagrid directive');
      //  console.log("scope data")
      //  console.dir(scope);
      // console.dir(scope.geodatadisplayModel.datasetRepository.datasets);
       /* console.log(scope.geodatadisplayModel.datasetRepository.datasets[0].getData().then(function(data){
      
          console.log(data);
        }));*/
        var ngData;
        


          ngData = scope.geodatadisplayModel.geodatatable.getData(function(data){
            //console.log(data);
            console.log(data);
            
          });

         // console.log(ngData);
        /*scope.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 10           // count per page
        }, {
          total: ngData.length, // length of data
          getData: function($defer, params) {
              $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
      });*/
    };
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay'
    };
});

