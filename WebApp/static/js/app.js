// NameSpace bestaat biosApp al verander deze dan niet en of maak nieuwe aan
var biosApp = biosApp || {};



// self invoking anonymous function (IIFE) functie dus niet meer in de global scope
(function(){

	biosApp.apiLink = "http://dennistel.nl/movies";

	biosApp.controller = {

		init:function() {
			// Roep de init in apiOphalen aan
			biosApp.apiOphalen.init();
			// Roep de init in router aan
			biosApp.router.init();
			// Roep de init in sections aan
			biosApp.sections.init();
			// Roep de init in mcHammer aan
			biosApp.mcHammer.init();
		}
	}

	// object om de api op te halen en te parsen met JSON.
	biosApp.apiOphalen = {
		init: function(){
			// als movies in localStorage zit
			if("movies" in localStorage){
				// doe dan biosApp.apiOphalen.parseJson op storage get en haal de movies op
				this.parseJson(biosApp.storage.get("movies"))
				console.log('ik zit in localStorage');
			} 
			// probeer anders de api opnieuw op te halen
			else {
				this.getApi()
				console.log('jammer joh, geen localStorage');
			}
		},
		// haal/get get json bestand op mbv het xhr object met de parseJson functie hieronder
		getApi: function(){
			biosApp.xhr.trigger("GET", biosApp.apiLink , biosApp.apiOphalen.parseJson )
		},
		// parse de api
		parseJson: function(data){
			// de parsed data heet nu omgezetteData
			var omgezetteData = JSON.parse(data);
			biosApp.underscore.averageScore(omgezetteData);
			biosApp.contentHTML.genresNav(omgezetteData);
		}
	}

	// Maak in 'biosApp.js' een nieuw 'router'-object aan met een 'init'-methode
	biosApp.router = {
		init:function() {
			// Voeg aan de 'init'-methode de 'routes' toe voor de 'about' en 'movies' sections
			routie({
				// is de url #/about (meegegeven in de html)
				'/about': function() {
					biosApp.sections.movies(biosApp.contentHTML.movies)
					biosApp.sections.toggle('section[data-route="about"]');
					console.log("about");
				},
				// is de url #/movies (meegegeven in de html)
				'/movies': function() {
					biosApp.sections.movies(biosApp.contentHTML.movies)
					biosApp.sections.toggle('section[data-route="movies"]');
					console.log("movies");
				},
				// als de url genres/beschikbaar genre is
				'/genres/:genre': function(genre) {
					//filter de movies array (die de templating aan de gang zet) en toggle daarna de active class
			   		biosApp.underscore.filter(genre, biosApp.contentHTML.movies);
			   		biosApp.sections.toggle('section[data-route="movies"]');
			   		console.log("genre")
				},
				// als de url /movies/ meegegeven id is
				'/movies/:id': function(id) {
			   		biosApp.underscore.getDetail(id, biosApp.contentHTML.movies);
			   		biosApp.sections.toggle('section[data-route="detail"]');
			   		console.log("id")
				},
				// anything
				'*': function() {
					biosApp.sections.toggle('section[data-route="about"]');
					console.log("anything")
				}
			});
		}
	}

	// Maak in 'biosApp.js' een nieuw 'sections'-object aan met een 'init'-methode, een 'about'-methode, een 'movies'-methode
	biosApp.sections = {
		init:function(){
			// start biosapp.sections.about
			this.about();
		},

		// #about voorzien van de html die in de variabele contentHTML staat.
		about:function(){
			// variabele about content is
			var aboutContent = {
				// haal de titel en description uit content.js 
				'title': biosApp.contentHTML.about.title,
				'description': biosApp.contentHTML.about.description
			};
			// stop de content uit contentHTML in de section about (title en description)
			Transparency.render(document.querySelector('section[data-route="about"]'),aboutContent);
		},

		// #movies voorzien van de html die in de variabele contentHTML staat
		movies: function(array){
			var moviesContent = {
				'header': "Favorite movies",
				// moviedatabase meegeven als attribuut
				'movies': array
			}

			// dit zorgt ervoor dat de src van img tag veranderd
			var directives = {
				// gaat opzoek naar data route movies > cover > src
				movies: {
					cover: {
						src: function(params){
							return this.cover
						}
					},
					// dit zorgt ervoor dat het desbetreffende id wordt meegegegeven in de url
					title: {
						href: function(params){
							return "#/movies/" + this.id;
						}
					}
				}
			}

			// zorg met transparancy dat de sectie met data route movies wordt aangevuld met de title en de array en de directives
			Transparency.render(document.querySelector('section[data-route="movies"]'),moviesContent, directives);
		},

		//detail pagina manipuleren
		detail: function(array){
			// doorloop de reviews om de timestamps te converteren naar leesbare data en voeg die toe met een nieuwe key
			// i krijgt de waarde 0, als de reviews kleiner zijn dan 0 (geen reviews) i++ = 0
			for (i = 0; i < array.reviews.length; i++) { 
				array.reviews[i].createdDate = biosApp.timestampConverter.timestamp(array.reviews[i].created_at).toLocaleString();
				array.reviews[i].updatedDate = biosApp.timestampConverter.timestamp(array.reviews[i].updated_at).toLocaleString();
			}
			// vul de html data-routes aan dmv de content in de array
			var directives = {
				// data-bind genre
				genre: {
					// vul genres in de detailopmaak met text
					text: function () {
						// this verwijst naar genre binnen het JSON object
						return this.genres;
					}
				},
				// data-bind cover
				cover: {
					// vul de src in de detailopmaak met de cover
					src: function(params){
						// this verwijst naar cover binnen het JSON object
						return this.cover;
					}
				},
				// data-bind actors
				actors: {
					// data-bind actorPhoto
					actorPhoto: {
						src: function(params){
							return this.url_photo;
						}
					},
					// data-bind actor_name
					actor_name: {
						href: function(params){
							return this.url_profile;
						}
					},
					character: {
						href: function(params){
							return this.url_character;
						}
					}
				},

				reviews: {
					created: {
						datetime: function(params){
							return this.created_at;
						}
					},
					updated: {
						datetime: function(params){
							return this.updated_at;
						}
					},
					review_text: {
						text: function () {
							return this.review_text;
						}
					}

				}
			}

			Transparency.render(document.querySelector('section[data-route="detail"]'),array, directives);
		},

		//maak de genres navigatie aan
		genresNavigatie: function(array){

			genreUrl = {
				genreLink: {
					href: function(params){
						return this.url;
					}
				}
			}

			Transparency.render(document.querySelector('ul[data-bind="genres"]'), array, genreUrl);
		},

		// toggle van class
		toggle: function(section){
			// als het about active heeft of als movies of als detail active heeft verwijder dan active
			if (document.querySelector('section[data-route="about"]').classList.contains('active') || document.querySelector('section[data-route="movies"]').classList.contains('active') || document.querySelector('section[data-route="detail"]').classList.contains('active')){
				document.querySelector('section.active').classList.remove('active');
			}
			// toggle active class
			document.querySelector(section).classList.add('active');
		}
	}
	// localstorage so naar andre
	biosApp.storage = {
		// zet iets in de local storage
		// als je nieuwe wilt biosApp.storage.set(key, value)
		set: function(key, value){
			// localStorage is een bestaand object
			localStorage.setItem(key, value);
		},
		// haal iets uit de localstorage
		get: function(key){
			return localStorage.getItem(key);
		},
		// verwijder iets uit de localstorage
		remove: function(key){
			localStorage.removeItem(key);
		}
	}

	// map, reduce, filter
	biosApp.underscore = {
		//map reduce functie die de gemiddelde scores uitrekend en opslaat in het dataobject
		averageScore: function(data){
			//loop door de array i = 0
			for (i = 0; i < data.length; i++) { 
				// check of er wel reviews zijn.
				if(data[i].reviews.length > 0){
					//map functie die de alleen de score returned en toewijst aan een nieuwe key: reviewScore
					data[i].reviewScore = _.map(data[i].reviews, function(num, key) {
						return {
							reviewScore: num.score,
						};
					});
				//reduce functie die de reviewScores bij elkaar optelt en deelt door de lengte van de array
				data[i].reviewScore = _.reduce(data[i].reviewScore, function(memo, num){ 
					return memo + num.reviewScore; 
				}, 0 ) / data[i].reviewScore.length;
			// is er geen review, zet dan deze string
		} else {
			data[i].reviewScore = "No score";
		}
			// vul de content array met de nieuwe data
			biosApp.contentHTML.movies = data;
			// sla nieuwe op in localStorage zodat je niet elke keer hoeft te mappen/reducen
			biosApp.storage.set("movies", JSON.stringify(data))
			// zet de templating aan de gang
			biosApp.sections.movies(data);
		}
	},

	filter: function(key,array){
		// filter door de meegegeven array en sla die op in filtered
		filtered = _.filter(array, function(array){ 
			//return alle objecten die de key in array.genres hebben staan
			return _.contains(array.genres, key);
		});

		// zet de templating aan de gang
		biosApp.sections.movies(filtered);
	},

	getDetail: function(key, array){
		
		detailObj = _.filter(array, function (movie) {
      	  return movie.id == key;
        });


		// zet de templater aan het werk
		biosApp.sections.detail(detailObj[0]);
	}
}
	biosApp.timestampConverter = {
		// converteert een unix timestamp naar een epoch timestamp die er weer een Date object van maakt
		timestamp: function(timestamp){
			// de geparsde data van de timestamp heet nu date
			var date = new Date( Date.parse(timestamp));
			// geef date ^^^ terug aan de detail for loop
			return date;
		}
	}

	biosApp.mcHammer = {
		init: function(){
			// var menuToggle is new hammer blokje (HTML)
			var menuToggle = new Hammer(document.querySelector('#blokje'));
			// als er getapt wordt op menutoggle dus #blokje
			menuToggle.on('tap', function(){
				// console log blokje
				console.log('blokje');
				// toggle de active class van de main
				document.querySelector("#main").classList.toggle("active");
				
			})
		}
	}


	// roept de init binnen het controller object aan, zodat er gestart wordt.
	biosApp.controller.init();

})();