geodatadisplayModule.service('datasetRepository', function() {

	this.datasets = [];
	
	this.displayDataset = function(dataset){
		console.log('Display dataset');
		console.log(dataset);
		if(!dataset.data){
			dataset.loadDataSet();
		}
	}
});