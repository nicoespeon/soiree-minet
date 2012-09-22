<!DOCTYPE html>
<html lang="fr">
<head>
	<!-- Title -->
	<title>MiNET [07/12/12] : J-XX</title>
	
	<!-- Meta -->
	<meta name="description" content="Soirée MiNET 2012... Coming Soon !" />
	<meta name="keywords" content="MiNET, soirée, hack, Télécom, Soirée MiNET 2012, TMSP, TEM, TSP, Télécom SudParis, Télécom École de Management" />
	<meta name="author" content="Espeon" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">
	<meta charset="utf-8" />
	
	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/reset.css" />
	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/map.css" />
	<link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>
</head>
<body>
	<!--[if lt IE 9]>
	    <script src="http://ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js"></script>
	    <script>CFInstall.check({ mode: "overlay" });</script>
    <![endif]-->
    
	<!-- Menu de navigation -->
	<nav>
		<ul class="clearfix">
			<li>
				<a class="active" href="#">Soirée MiNET</a>
			</li>
			<li>
				<a href="#">Animations</a>
			</li>
			<li>
				<a href="#">Tarifs</a>
			</li>
			<li class="last">
				<a href="#howToPlay">?</a>
			</li>
		</ul>
	</nav>
	
	<!-- Interactions -->
	<div id="interaction"></div>
	
	<!-- Notifications -->
	<div id="notification"></div>
	
	<!-- Contenu du jeu -->
	<div id="wrapper">
		<!-- Décor BG du jeu -->
		<div class="flowers1 one" data-x="5" data-y="21"></div>
		<div class="flowers1 two" data-x="15" data-y="26"></div>
		<div class="flowers1 three" data-x="21" data-y="45"></div>
		<div class="flowers1 four" data-x="38" data-y="49"></div>
		<div class="flowers1 five" data-x="28" data-y="55"></div>
		<div class="flowers1 six" data-x="6" data-y="57"></div>
		<div class="flowers1 seven" data-x="23" data-y="65"></div>
		
		<div class="flowers2 one" data-x="19" data-y="4"></div>
		<div class="flowers2 two" data-x="25" data-y="4"></div>
		
		<!-- Montagnes -->
		<div id="mountain">
			<div class="upper top" data-x="1" data-y="1"></div>
			<div class="upper left" data-x="1" data-y="1"></div>
			<div class="corner" data-x="3" data-y="3"></div>
			<div class="front" data-x="4" data-y="3"></div>
			<div class="right" data-x="3" data-y="4"></div>
			<div class="door" data-x="22" data-y="2"></div>
			<div class="runes" data-x="5" data-y="3"></div>
		</div>
		
		<!-- Runes -->
		<div id="runes" data-x="7" data-y="2">
		</div>
		
		<!-- Prairie -->
		<div id="prairie">
			<div class="path" data-x="22" data-y="4"></div>
			<div class="path end" data-x="22" data-y="34"></div>
		</div>
		
		<!-- Forêt -->
		<div id="forest" data-x="27" data-y="3">
		</div>
		
		<!-- Red City -->
		<div id="red-city">
			<div class="city" data-x="4" data-y="28"></div>
			<div class="road" data-x="10" data-y="57"></div>
		</div>
		
		<!-- Blue City -->
		<div id="blue-city">
			<div class="city" data-x="26" data-y="56"></div>
			<div class="road" data-x="13" data-y="68"></div>
		</div>
		
		<!-- Port -->
		<div id="port" data-x="4" data-y="75">
		</div>
		
		<!-- Mer -->
		<div id="sea">
			<div class="top" data-x="4" data-y="91"></div>
			<div class="water" data-x="4" data-y="92"></div>
			<div class="boat" data-x="4" data-y="97"></div>
		</div>
		
		<!-- PNJs -->
		<ul id="pnjs"></ul>
	</div>
	
	<!-- Templates -->
	<script type="text/template" id="pnj-template">
		<div class="pnj <%= type %>" data-x="<%= position[0] %>" data-y="<%= position[1]-0.3 %>"></div>
	</script>
	<script type="text/template" id="player-template">
		<div id="player" class="<%= type %>" data-x="<%= position[0] %>" data-y="<%= position[1]-0.3 %>">
			<!-- Here is your player ! -->
		</div>
	</script>
	
	<!-- Librairies JS -->
	<script src="js/jquery-1.7.2.min.js"></script>
	<script src="js/underscore.min.js"></script>
	<script src="js/backbone.min.js"></script>
	
	<!-- Scripts JS -->
	<script src="js/main.js"></script>
	<script src="js/personnages.js"></script>
</body>
</html>