$(function() {
	
	var workTime = parseInt($('div.work-time-display').html());
	var breakTime = parseInt($('div.break-time-display').html());
	var workDown = $('.work-down');
	var workUp = $('.work-up');
	var breakDown = $('.break-down');
	var breakUp = $('.break-up');
	var totalWork = workTime*60;
	var totalBreak = breakTime*60;
	var start = $('.start');
	var pause = $('.pause');
	var resume = $('.resume');
	var workTimerMin = $('.timer1-1');
	var workTimerSec = $('.timer1-2');
	var breakTimerMin = $('.timer2-1');
	var breakTimerSec = $('.timer2-2');
							 
	workDown
		.click(function () {	
			if (workTime > 1) {
				workTime -= 1;
				$('div.work-time-display').html(workTime);
				totalWork = workTime*60;
				workTimerMin.html(workTime);
			}
		})
		.mousedown(function() {
			$(this).children().css("color", "red");
		})
		.mouseup(function() {
			$(this).children().css("color", "#262228");
		});
	
	workUp
		.click(function () {	
			if (workTime < 60) {
				workTime += 1;
				$('div.work-time-display').html(workTime);
				totalWork = workTime*60;
				workTimerMin.html(workTime);
			}
		})
		.mousedown(function() {
			$(this).children().css("color", "green");
		})
		.mouseup(function() {
			$(this).children().css("color", "#262228");
		});
	
	breakDown
		.click(function () {
			if (breakTime > 1) {
				breakTime -= 1;
				$('div.break-time-display').html(breakTime);
				totalBreak = breakTime*60;
				breakTimerMin.html(breakTime);
			}
		})
		.mousedown(function() {
				$(this).children().css("color", "red");
			})
				.mouseup(function() {
				$(this).children().css("color", "#262228");
			});
	
	breakUp
		.click(function () {
			if (breakTime < 60) {
				breakTime += 1;
				$('div.break-time-display').html(breakTime);
				totalBreak = breakTime*60;
				breakTimerMin.html(breakTime);
			}
		})
		.mousedown(function() {
		$(this).children().css("color", "green");
	})
		.mouseup(function() {
		$(this).children().css("color", "#262228");
	});

	var workClock = {

  start: function () {
   
    this.interval = setInterval(function () {
      if (totalWork > 0) {
				totalWork -= 1;
			} else if (totalWork === 0) {
				workClock.pause();
				totalWork = workTime*60;
				breakClock.start();
				workTimerMin.text(workTime);
				workTimerSec.text("00");
				action = 4;
			}

			var minutes = parseInt(totalWork / 60)
      var seconds = parseInt(totalWork % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      workTimerMin.text(minutes);
      workTimerSec.text(seconds);
    }, 1000);
		
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.start();
  }
};
	
	var breakClock = {

  start: function () {
   
    this.interval = setInterval(function () {
      if (totalBreak > 0) {
				totalBreak -= 1;
			} else if (totalBreak === 0) {
				breakClock.pause();
				totalBreak = breakTime*60;
				workClock.start();
				breakTimerMin.text(breakTime);
				breakTimerSec.text("00");
				action = 2;
			}
			
			var minutes = parseInt(totalBreak / 60)
      var seconds = parseInt(totalBreak % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

     	breakTimerMin.text(minutes);
      breakTimerSec.text(seconds);
    }, 1000);
  },

  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) this.start();
  }
};
	
	var action = 1;
	start.click(function() {
		
		if (action === 1) {
			workClock.start();
			start.html("pause").css({"background": "#fff268", "color": "#262228"});
			action = 2;
		} else if (action === 2) {
			workClock.pause();
			start.html("resume").css({"background":"#a52e2e", "color":"white"});
			action = 3;
		} else if (action === 3) {
			workClock.resume();
			start.html("pause").css({"background": "#fff268", "color": "#262228"});;
			action = 2;
		} else if (action === 4) {
			breakClock.pause();
			start.html("resume").css({"background":"#a52e2e", "color":"white"});;
			action = 5;
		} else if (action === 5) {
			breakClock.resume();
			start.html("pause").css({"background": "#fff268", "color": "#262228"});;
			action = 4;
		}
	});
		
}); //    document.ready