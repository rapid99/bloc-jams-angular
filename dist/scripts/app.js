(function() {
	function config($stateProvider, $locationProvider){
		$locationProvider //config app's paths
			.html5Mode({
				enabled: true, //hides #! from url (hashbang indicates that the page load is triggered by JS)
				requireBase: false
			});
		$stateProvider //determine the number of states and their properties
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			})
			.state('album', {
             	url: '/album',
             	controller: 'AlbumCtrl as album',
             	templateUrl: '/templates/album.html'
         	})
         	.state('collection', {
         		url: '/collection',
         		controller: 'CollectionCtrl as collection',
         		templateUrl: '/templates/collection.html'
         	});
	}

	angular
		.module('blocJams', ['ui.router'])
		.config(config)
})();
