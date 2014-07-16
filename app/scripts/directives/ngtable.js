geodatadisplayModule.directive('ngtable', ['geodatadisplayModel', 'geodatatable', function(geodatadisplayModel, geodatatable) {
   var gData;
    var dData;
    var eData;

    
    var linker = function(scope, element, attrs) {
       console.log('Executing Linker function for ngtable directive');
        console.log("scope data")
        console.dir(scope);
      // console.dir(scope.geodatadisplayModel.datasetRepository.datasets);
       /*console.log(scope.geodatadisplayModel.datasetRepository.datasets[0].getData().then(function(data){
      
          console.log(data);
        }));*/

        console.log(scope.geodatadisplayModel.geodatatable.getData().then(function(data){
          console.log(data);
          gData = data;
          console.log(gData);
        }));
        console.log(gData);

  /*var ldata = new geodatatable();
  console.log(ldata);
 // console.log("ldata " + ldata);
   ldata.data = ldata.getData(function(data){
    console.log(data);
          });
  var pdata = ldata.getData();
 // console.log(ldata.data);
 // console.log(ldata)
 // console.log(pdata)*/


   /*scope.geodatadisplayModel.geodatatable.getData(function(data){
            console.log('Executing Linker function for ngtable scope directive');
            console.log(data);
           // eData.data = data;
          });*/
    };
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay'
    };
}]);

