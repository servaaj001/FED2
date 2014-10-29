// NameSpace bestaat biosApp al verander deze dan niet en of maak nieuwe aan
var biosApp = biosApp || {};

// self invoking anonymous function (IIFE) functie dus niet meer in de global scope
(function(){

	// Maak een 'content'-object aan met daarin een 'about'-object en een 'movies'-array.
	biosApp.contentHTML = {
		
		// Het 'about'-object bevat twee properties; 'titel' en 'description'
		about: {
			title: "About",
			description: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
		},
		
		// De 'movies'-array bevat voor elke film een object met de properties; 'title', 'releaseDate', 'description' en 'cover'
		movies: [
		],

		// de omgezettaData verwerken in genresnav
                genresNav: function(data){
                	//hierin komen de objecten in met de links
                	var genres = [];
                	// deze array is om te checken of het al bestaat of niet
                	var alreadyExists = [];

                	// variabele i = 0 < dan lengte van array data (dus overal langs) i++ is voor +1 in de array loop
                	for (i = 0; i < data.length; i++) { 
                		//loop door de genres heen
                		for (n = 0; n < data[i].genres.length; n++) { 
                                        // check of het genre al voorkomt dmv _.contains zo niet maak dan nieuwe
                			if(!_.contains(alreadyExists,data[i].genres[n])){
                                                // genreobject = genrelink(in html) data is lokale variabele in de array
                				genreObject = {
                					genreLink: data[i].genres[n],
                					url: "#/genres/" + data[i].genres[n]
                				}
                                                // genres toevoegen aan array
                				genres.push(genreObject);
                				alreadyExists.push(data[i].genres[n]);

                			}
                		}
        	}
        
        	//zet transparancy aan het werk
        	biosApp.sections.genresNavigatie(genres);

        	//nog te doen: sorteren op alfabet
        }

	}

})();