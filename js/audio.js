/*
|--------------------------------------------------------------------------
| AUDIO SCRIPT
|--------------------------------------------------------------------------
|
| G�re l'audio du coming soon
|
*/

/*
|--------------------------------------------------------------------------
| VARIABLES
|--------------------------------------------------------------------------
*/
var DUREE_AUDIO = 0;

/*
|--------------------------------------------------------------------------
| FONCTIONS
|--------------------------------------------------------------------------
*/
//On cree l'element audio
var audioElement = new Audio();

//Lance la musique
function playAudio(piste, loop) {
	//D�fini l'extension
	var ext = '.ogg';
	if(audioElement.canPlayType("audio/mpeg"))	ext = '.mp3';
	
	//Charge le fichier de son
	audioElement.src = 'sounds/'+piste+ext;
	audioElement.load;
	
	//Boucle la musique selon le param�tre
	if(loop)	audioElement.setAttribute('loop');
	
	//Lance la musique puis r�cup�re sa duree totale
	audioElement.play();
	setTimeout(
		function() {
			DUREE_AUDIO = audioElement.duration;
		},
		1000
	);
}

//Pause la musique
function pauseAudio() {
	audioElement.pause();
}


//R�cup�re le temps de lecture
function getAudioDuration() {
	return audioElement.duration;
}

/*
|--------------------------------------------------------------------------
| ONLOAD
|--------------------------------------------------------------------------
*/

$(window).load(function () {
	//playAudio('city', false);
});