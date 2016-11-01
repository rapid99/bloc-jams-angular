(function() {
	function SongPlayer() {

/**
* @desc object placeholder for song player
* @type {Object}
*/
     	var SongPlayer = {};

/**
* @desc current song selected
* @type {Object}
*/
     	var currentSong = null;
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
     			currentSong.playing = null;
     		}
     		currentBuzzObject = new buzz.sound(song.audioUrl, { 
     			formats: ['mp3'],
     			preload: true
     		});

     		currentSong = song;
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
* @method .play on SongPlayer {Object}
* @desc checks currentSong against song to make selected song play
* @param {Object} song
*/

     	SongPlayer.play = function(song) {
         	if (currentSong !== song) {
         		setSong(song);
         		playSong(song); 

         	} else if (currentSong === song) {
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
     		currentBuzzObject.pause();
     		song.playing = false;
     	};

     	return SongPlayer;
 	}


	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);

})();