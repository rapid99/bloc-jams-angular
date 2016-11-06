(function() {
	function SongPlayer($rootScope, Fixtures) {

/**
* @desc object placeholder for song player
* @type {Object}
*/
     	var SongPlayer = {};

/**
* @desc grabs albumPicasso from Fixtures.js
* @type {Object}
*/

        var currentAlbum = Fixtures.getAlbum();


/**
* @desc Buzz object audio file
* @type {Object}
*/
     	var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

     	var setSong = function(song) {
     		if (currentBuzzObject) {
     			currentBuzzObject.stop();
     			SongPlayer.currentSong.playing = null;
     		}
     		currentBuzzObject = new buzz.sound(song.audioUrl, { 
     			formats: ['mp3'],
     			preload: true
     		});
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });


     		SongPlayer.currentSong = song;
     	};

/**
* @function playSong
* @desc plays current song as currentBuzzObject and sets song.playing to true
* @param {Object} song
*/

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

/**
* @function getSongIndex
* @desc retrives index # of current song
* @param {Object} song
*/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

/**
* @function stopSong
* @desc stops current song
* @param {Object} song
*/

        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

/**
* @desc current song selected
* @type {Object}
*/
        SongPlayer.currentSong = null;

 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;
/**
* @method .play on SongPlayer {Object}
* @desc checks currentSong against song to play the selected song
* @param {Object} song
*/

     	SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
         	if (SongPlayer.currentSong !== song) {
         		setSong(song);
         		playSong(song); 

         	} else if (SongPlayer.currentSong === song) {
         		if (currentBuzzObject.isPaused()){
         			currentBuzzObject.play();
         		}
         	}
     	};

/**
* @method .pause on SongPlayer {Object}
* @desc pauses current song (currentBuzzObject)
* @param {Object} song
*/

     	SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
     		currentBuzzObject.pause();
     		song.playing = false;
     	};

/**
* @method .previous on SongPlayer {Object}
* @desc plays previous song in songs array
*/

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0){
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

/**
* @method .next on SongPlayer {Object}
* @desc plays next song in songs array
*/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex > currentAlbum.songs.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

/*
* @function setCurrentTime
* @desc set current time (in seconds) of currently playing song
* @param {Number} time
*/
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

     	return SongPlayer;
 	}


	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

})();