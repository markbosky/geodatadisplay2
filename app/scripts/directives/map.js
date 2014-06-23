geodatadisplay.directive('map', function() {
	var linker = function(scope, element, attrs) {
		console.log('map directive linker function');



	     
	            
	
	   


		var myOptions = {
			zoom : 12,
			center : new google.maps.LatLng(38.5711659,-92.1624049),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(element.context, myOptions);

 $.getJSON("booze.json", function(json1) {
          $.each(json1, function(key, data) {
          	console.log(data.latlng);
          	console.log(data.licensee);
          	//console.log(data.latlng);
          /*	for (var i = 0; i < 3; i++) {
        var l = data.latlng[i];
        console.log(l.longitude);
    }*/
		//var latLng = new google.maps.LatLng(data.LATLNG); 
			//console.log(data.LATLNG);
	            // Creating a marker and putting it on the map
	        //    var marker = new google.maps.Marker({
	           //     position: latLng,
	            //    title: data.name
	          //  });
	           // marker.setMap(map);
	            });
        });



	};
	var controller = function($scope) {
		console.log('map directive controller function');
	};
	// Pending };
	return {
		restrict : 'A',
		controller : controller,
		link : linker
	};
}); 