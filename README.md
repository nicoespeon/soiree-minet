## SOIREE MINET [07/12/12]

### 0. PREAMBULE

Ceci est la version `1.0` du site de la soirée MiNET 2012, tel qu'il a été lancé pendant l'événement.

Concernant l'état du code, c'était pas mal parti, mais il y a énormément à faire pour refactor tout ça : ajouter de l'AMD, virer tout ce qui est maladroit, procédural, partir sur une nouvelle architecture, mettre à jour les frameworks utilisés, etc.

Le but de ce projet est d'aboutir sur une `v2.0` propre, modulaire, future-proof.

Voilà donc pour le bilan. Place au refactoring !

### 1. PRINCIPE

Il s'agit d'un jeu en HTML5-Javascript.
La structure JS est développée avec la librairie [Backbone.js](http://www.backbonejs.org).

Le visiteur se trouve sur une carte **1280x3200**.
Il se déplace pour interagir avec le décor où se trouvent :

* PNJs, dignes icônes de MiNETiens triés sur le volet et caricaturés à souhait
* Events, konami-codes/intéractions/notifications, ... de quoi s'amuser
* Goodies, comme des wallpaper pour smartphone à flasher via QRCode, ...
* Infos diverses et variées, sur la soirée, sur MiNET, sur la Vie, l'Univers et le reste
* De geekeries à gogo

### 2. COMMANDES

- **Déplacement**       : Flèches directionnelles
- **Activer/Interagir** : Touche `Enter`
- **Konami Code**       : Autres touches du clavier

### 3. CONTRIBUER

#### A - CODER

Vous pouvez coder et contribuer au projet si ça vous tente.

Cependant, la branche `master` est lockée et vous ne pourrez pas pusher dessus. En revanche, la branche `develop` est à votre disposition et je vous encourage à committer dessus.

Pour créer une branche locale `develop` qui *track* la branche `origin/develop` du dépôt, lancez :

    $ git checkout develop origin/develop

Ainsi, un `git push` depuis votre branche locale `develop` enverra vos commit sur la branche `origin/develop` !

**Si vous avez des soucis, n'hésitez pas à m'envoyer un mail -** espeon@minet.net

#### B - TESTER

Plus simplement, vous pouvez tester le jeu chez vous et faire remonter les issues que vous rencontrerez (il y en aura forcément) :

* En m'envoyant un mail récapitulatif des soucis à corriger,
* ou bien en créant des *issues* directement sur **Gitlab**, ça fonctionne bien aussi !


### 4. REMARQUES

Les fichiers de sons ne sont pas versionnés mais sont disponibles dans un fichier `.zip` de la Dropbox MiNET : *Projets/Soirées/2012-2013*
