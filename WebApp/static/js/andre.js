// namespace (Om je script te beschermen van buitenaf en om verschillende bestanden te kunnen koppelen)
var filmApp = filmApp || {};

// self invoking anonymous function (om je script te beschermen van buitenaf / local scope, hierbuiten global)
(function(){

	// controller object
	filmApp.controller = {

		// init method, die je app opstart
		init: function(){
			// roep de router init en sections init aan
			filmApp.router.init();
			filmApp.sections.init();
		}
	}

	// router object
	filmApp.router = {
		// init method met daarin 2 routes (About en Overview)
		init: function(){
			routie({
				'about': function() {
					filmApp.sections.toggle('section[data-route="about"]');
				},
				'overview': function() {
					filmApp.sections.toggle('section[data-route="movies"]');
				}
			});
		}
	}

	// data object
	filmApp.content = {
		
		// about object
		about: {	
			title: 'About this app',
			description: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
		},

        // movies array
        movies: [
        	{
        		title: "Shawshank Redemption",
        		releaseDate: "14 October 1994",
        		description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        		cover: "images/shawshank-redemption.jpg"
        	},
        	{
        		title: "The Godfather",
        		releaseDate:"24 March 1972",
        		description:"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
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
        ],
    }

	// sections object
	filmApp.sections = {
		init: function(){
			this.about();
			this.movies();
		},

		// vul de about section met HTML
		about: function(){

			var aboutHtml = {
				'title': filmApp.content.about.title,
				'description': filmApp.content.about.description
			};

			Transparency.render(document.querySelector('section[data-route="about"]'),aboutHtml);
		},

		// vul de movies/overview section met HTML
		movies: function(){

			var moviesHtml = {
				'header': "Favorite Movies",
				'movies': filmApp.content.movies
			}

			// dit zorgt ervoor dat de src van img tag veranderd naar wat er staat in this.cover
			var directives = {
				movies: {
					cover: {
						src: function(params){
							return this.cover
						}
					}
				}
			}

			Transparency.render(document.querySelector('section[data-route="movies"]'),moviesHtml, directives);
		},

		// toggle van class
		toggle: function(section){
			document.querySelector(section).classList.toggle('active');
		}
	}

	// roep de init aan om alles te starten :)
	filmApp.controller.init();
})();
Status API Training Shop Blog About © 2014 GitHub, Inc. Terms Privacy Security Contact 