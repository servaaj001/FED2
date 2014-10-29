// NameSpace bestaat biosApp al verander deze dan niet en of maak nieuwe aan
var biosApp = biosApp || {};

// self invoking anonymous function (IIFE) functie dus niet meer in de global scope
(function(){

// AJAX aanvraag (data parameter als je iets verstuurd)
    biosApp.xhr = {
		trigger: function (type, url, success, data) {
			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');

			type === 'POST' ? req.send(data) : req.send(null);

			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						success(req.responseText);
					}
				}
			}
		}
	}

})();