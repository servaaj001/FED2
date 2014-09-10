var geo = geo || {};

	(function() {

		var controller = {
			init = function(){
				debug.message();
			},

			startInterval = function(){
				console.log('jimbo start interval');
			},
			updatePosition = function(){
				console.log('jimbo update position');
			}
		}

		var map = {
			generate = function() {
				console.log('jimbo generate');
			},
			updatePosition = function() {
				console.log('jimbo update');
			}
		}

		var utils = {
			isNumber = function() {

			}
		}

	})();

geo.gps.init();
