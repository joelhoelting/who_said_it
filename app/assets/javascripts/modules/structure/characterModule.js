(function() {

	const gameModule = require('./gameModule');

	var characterModule = {
		init: function() {
			this.cacheDom();
	    this.bindEvents();
		},
		cacheDom: function() {
			// Character Screen
	    this.$characterScreen = $('#character-screen');
	    this.$flipcards = this.$characterScreen.find('.flipcard');
			this.$characterForm = this.$characterScreen.find('form');
		},
	  bindEvents: function() {
	  	var originalThis = this;
	    this.$flipcards.on('click', this.selectFlipCards);
	    this.$characterForm.on('submit', function(event) {
	    	originalThis.postNewGame(event);
	    })
	  },
	  selectFlipCards: function(event) {
	  	var max = $('#difficulty-level button.active').data('max-characters');

	  	if ($('.selected').length < max) {
				$(this).toggleClass('selected');
			} else {
				$(this).removeClass('selected');
			}
	  },
	  postNewGame: function(event) {
	  	event.preventDefault();

	  	var originalThis = this;
	    if ($('.selected').length < 2) {
	      alert('Please select 2 characters');
				return;
	    } else {
	      var AUTH_TOKEN = $("input[name='authenticity_token']").val();
	      var url = event.target.action
	      var character1 = $('.selected :input')[0];
	      var character2 = $('.selected :input')[1];

	      var object = {
	        'authenticity_token': AUTH_TOKEN,
	        'characters' : [
	        {
	          'name': character1.name,
	          'id': character1.id
	        },
	        {
	          'name': character2.name,
	          'id': character2.id
	        }]
	      }

	      $.ajax({
	        type: "POST",
	        url: url,
	        data: object,
	        success: function(data) {
	        	// Character Screen Fade Out
	        	originalThis.$characterScreen.hide();
						// Pass Game to Game Module
	          gameModule.createGame(data);
	        }
	      });
	    }
	  }
	}
	characterModule.init();

})()
