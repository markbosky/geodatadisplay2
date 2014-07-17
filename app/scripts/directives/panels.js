(function(){

	geodatadisplayModule.directive('panels', function(){
		return{
			restrict: 'E',
			templateUrl: 'views/panels.html',
			controller: function(){
				this.tab = 1;
					
				this.selectTab = function(setTab){
					this.tab = setTab;
				};
				this.isSelected = function(checkTab){
					return this.tab === checkTab;
				};	
			},
				controllerAs: 'panels'
		};
	});

})();