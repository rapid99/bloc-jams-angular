(function(){
	function AlbumCtrl(){
		this.albumSongs = angular.copy(albumPicasso.songs);
		this.albumData = angular.copy(albumPicasso);

	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();