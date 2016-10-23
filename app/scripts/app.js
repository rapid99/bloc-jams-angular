(function() {
	function config($stateProvider, $locationProvider){
		$locationProvider //config app's paths
			.html5Mode({
				enabled: true, //hides #! from url (hashbang indicates that the page load is triggered by JS)
				requireBase: false
			});
		$stateProvider //detirmine the number of properties for a state
			.state('landing', {
				url: '/',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
             	url: '/album',
             	templateUrl: '/templates/album.html'
         	})
         	.state('collection', {
         		url: '/collection',
         		templateUrl: '/templates/collection.html'
         	});
	}

	angular
		.module('blocJams', ['ui.router'])
		.config(config)
})();
