'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
  .controller('GeoDataDisplayCtrl', ['$scope','$filter','$http','geodatadisplayModel', 'datasetModel','geodatatable', function ($scope, $filter, $http, geodatadisplayModel, datasetModel, geodatatable, scope) {
 // 	console.log('Scope for GeoDataDisplayCtrl');
 // 	console.dir($scope);

 /*$scope.selection  = {
        ids: {"1": false}
    };*/
    $scope.selection  = {
        ids: {"1": false}
        
    };

 $scope.selectionList = false;

  var myDataset = new datasetModel();
  $scope.geodatadisplayModel = geodatadisplayModel;

  $scope.addDataset = function(){
    console.log("adding dataset");
    myDataset.src = this.url;
    myDataset.name = "new Data:";
    
    geodatadisplayModel.datasetRepository.datasets.push(myDataset);
  }       
}]);
