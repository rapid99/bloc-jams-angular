(function(){
	function AlbumCtrl(Fixtures, SongPlayer){
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = Fixtures.getAlbumSongs();
		
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();