'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
  .controller('GeoDataDisplayCtrl', ['$scope','$filter', 'geodatadisplayModel', 'datasetModel','ngTableParams', function ($scope, $filter, geodatadisplayModel, datasetModel, ngTableParams) {
 // 	console.log('Scope for GeoDataDisplayCtrl');
 // 	console.dir($scope);

     $scope.options = {
          aoColumns: [{
              "sTitle": "Surname"
          }, {
              "sTitle": "First Name"
          }],
          aoColumnDefs: [{
              "bSortable": false,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: [
              ["Webber", "Adam"]
          ]
      };

      $scope.addData = function () {
          $scope.counter = $scope.counter + 1;
          $scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
      };

      $scope.counter = 0;

	var myDataset = new datasetModel();
      $scope.geodatadisplayModel = geodatadisplayModel;

      $scope.addDataset = function(){
      	console.log("adding dataset");
      	myDataset.src = this.url;
      	myDataset.name = "new Data:";
      	geodatadisplayModel.datasetRepository.datasets.push(myDataset);
      }

  }]);
