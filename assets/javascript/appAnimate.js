// ****************Code from https://codepen.io/anon/pen/JgKErw --SVG-Stroke Animation A PEN BY CAPTAIN ANONYMOUS**************************
//inspired by http://product.voxmedia.com/post/68085482982/polygon-feature-design-svg-animations-for-fun-and

//Depends on jQuery



// Easing excerpt from George McGinley Smith 
// https://gsgd.co.uk/sandbox/jquery/easing/
jQuery.extend( jQuery.easing,
{
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/3*t*t + b;
		return -c/3 * ((--t)*(t-3) - 1) + b;
  }
});



//If you want to add SVG to the DOM, jQuery won't do
//http://www.benknowscode.com/2012/09/using-svg-elements-with-jquery_6812.html

function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}


function hideSVGPaths(parentElement) {

    var paths = $(parentElement).find('path');

    //for each PATH..
    $.each( paths, function() {

        //get the total length
        var totalLength = this.getTotalLength();

        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });
    });
}

function drawSVGPaths(_parentElement, _timeMin, _timeMax, _timeDelay) {


    var paths = $(_parentElement).find('path');

    //for each PATH..
    $.each( paths, function(i) {
        //get the total length
        var totalLength = this.getTotalLength();


        //set PATHs to invisible
        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });

        //animate
        $(this).delay(_timeDelay*i).animate({
            'stroke-dashoffset': 0
        }, {
            duration: Math.floor(Math.random() * _timeMax) + _timeMin
            ,easing: 'easeInOutQuad'
        });
    });
}


function startSVGAnimation(parentElement) {
    
    drawSVGPaths(parentElement, 2000, 3000, 2000);
}


// startSVGAnimation($('svg'));

// *******************************************************************************************************

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
