geodatadisplayModule.directive('datagrid', function() {
    var linker = function(scope, element, attrs) {
     //   console.log('Executing Linker function for datagrid directive');
      //  console.log("scope data")
      //  console.dir(scope);
      // console.dir(scope.geodatadisplayModel.datasetRepository.datasets);
       /* console.log(scope.geodatadisplayModel.datasetRepository.datasets[0].getData().then(function(data){

        	console.log(data);
        }));*/

        scope.geodatadisplayModel.datasetRepository.datasets[0].getData().then(function(data){
        	console.log(data);
        });

    };
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay'
    };
});

