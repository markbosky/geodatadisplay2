'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
  .controller('GeoDataDisplayCtrl', ['$scope','$filter','geodatadisplayModel', 'datasetModel','geodatatable', function ($scope, $filter, geodatadisplayModel, datasetModel, geodatatable, scope) {
 // 	console.log('Scope for GeoDataDisplayCtrl');
 // 	console.dir($scope);

  
  var myDataset = new datasetModel();
  $scope.geodatadisplayModel = geodatadisplayModel;

  $scope.addDataset = function(){
    console.log("adding dataset");
    myDataset.src = this.url;
    myDataset.name = "new Data:";
    
    geodatadisplayModel.datasetRepository.datasets.push(myDataset);
  }       
}]);
