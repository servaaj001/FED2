// NameSpace bestaat APP al verander deze dan niet en of maak nieuwe aan
var app = app || {};

// self invoking anonymous function (IIFE) functie dus niet meer in de global scope
	(function(){

		app.controller = {
			
			init:function() {
				// Roep in de 'init'-methode van het 'controller'-object, de 'init'-methode van het 'router'-object aan
				app.router.init();
				app.sections.init();
			}
		}

		// Maak in 'app.js' een nieuw 'router'-object aan met een 'init'-methode
		app.router = {
			init:function() {
				// Voeg aan de 'init'-methode de 'routes' toe voor de 'about' en 'movies' sections
				routie({
				    'about': function() {
				    	// url/#about
				    	app.sections.toggle('section[data-route="about"]');
				    	// Laat voor beide routes in de console zien welke route aangeklikt is
				    	console.log("about")
				    },
				    'movies': function() {
				    	// url/#movies
				    	app.sections.toggle('section[data-route="movies"]');
				    	// Laat voor beide routes in de console zien welke route aangeklikt is
				    	(console.log("movies"))
				    }
				});
			}
		}

		// Maak een 'content'-object aan met daarin een 'about'-object en een 'movies'-array.
		app.content = {
			
			// Het 'about'-object bevat twee properties; 'titel' en 'description'
			about: {
				title: "About this app",
				description: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
			},
			
			// De 'movies'-array bevat voor elke film een object met de properties; 'title', 'releaseDate', 'description' en 'cover'
			movies: [
				{
					// 4 properties titel, releaseDate, description en Cover
					title: "Shawshank Redemption", 
					releaseDate: "14 October 1994", 
					description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 
					cover: "images/shawshank-redemption.jpg"
				},
				{
					title: "The Godfather", 
					releaseDate: "24 March 1972", 
					description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", 
					cover: "images/the-godfather.jpg"
				},
				{
					title: "Pulp Fiction", 
					releaseDate: "14 October 1994", 
					description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
					cover: "images/pulp-fiction.jpg"
				},
				{
					title: "The Dark Knight", 
					releaseDate: "18 July 2008", 
					description: "When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.", 
					cover: "images/the-dark-knight.jpg"
				}
			]				
		}

		// Maak in 'app.js' een nieuw 'sections'-object aan met een 'init'-methode, een 'about'-methode, een 'movies'-methode
		app.sections = {
			init:function(){
				this.about();
				this.movies();
			},

			// #about voorzien van de html die in de variabele content staat.
			about:function(){
				var aboutContent = {
					'title': app.content.about.title,
					'description': app.content.about.description
				};
				// querySelector i.p.v. $ bij jQuery (bron: http://blog.romanliutikov.com/post/63383858003/how-to-forget-about-jquery-and-start-using-native)
				Transparency.render(document.querySelector('section[data-route="about"]'),aboutContent);

			},

			movies:function(){
				var moviesContent = {
					'title': "Favorite movies",
					'movies': app.content.movies
			}

			// plaatst de source van de plaatjes in de img tag
			var directives = {
				movies: {
					cover: {
						src: function(params){
							return this.cover
						}
					}
				}
			}

			Transparency.render(document.querySelector('section[data-route="movies"]'),moviesContent, directives);
		},

		// toggle de active class voor alle sections.
		toggle: function(section){
			document.querySelector(section).classList.toggle('active');
		}
	}

		// roept de init binnen het controller object aan, zodat er gestart wordt.
		app.controller.init();
	
})();