
let photo = document.getElementsByClassName('photo');
Array.from(photo).forEach(photo => {
    photo.addEventListener('mouseover',function() {
        photo.focus();
    })
});

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        document.getElementById("navbar").classList.remove("transparent");
    } else {
        document.getElementById("navbar").classList.add("transparent");
    }
  });
  
/* Get all a elements that start with #, i.e. link back to current page */
$("a[href*='#']") 
    .click(function(event) {
        var target = $(this.hash); 
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - 65
        }, 1000, function() {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
                return false; 
            } else {
                $target.attr('tabindex','-1');
                $target.focus();
            }
        });
    });


var navbar = $("#navbar"),
navbarHeight = navbar.outerHeight()+15,
// All bar items
menuItems = navbar.find("a"),
// Anchors corresponding to items
scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
});

// Adding active class to nav element on scroll 
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+navbarHeight;
 
    // Get id of current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#"+id+"']").parent().addClass("active");
 });


// For text rotation in home page
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
    var delta = 200 - Math.random() * 100;
  
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
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

// For Main Wheel Div
wheel = new wheelnav("main-wheelDiv");
// Marker
wheel.markerEnable = true; 
wheel.markerPathFunction = markerPath().PieLineMarker;
wheel.colors = ['#2e9cca'];
wheel.slicePathFunction = slicePath().DonutSlice; 
wheel.wheelRadius = .7*wheel.wheelRadius;
wheel.hoverPercent = .98;
wheel.initWheel([icon.arrowright, icon.search, icon.mail, icon.photo ,icon.code]);
wheel.createWheel(); 

// Main wheel div functionality
var wheelText = document.getElementById("wheelTitle");
wheelText.innerHTML = "Welcome! This is my <a>personal website.</a> Thanks for visiting, and feel free to explore."
wheel.navItems[0].navigateFunction = function () { wheelText.innerHTML = "Welcome! This is my <a>personal website.</a> Thanks for visiting, and feel free to explore." };
wheel.navItems[1].navigateFunction = function () { wheelText.innerHTML = "Here's a little more <a href='#about'>about</a> me."};
wheel.navItems[2].navigateFunction = function () { wheelText.innerHTML = "I'd love to <a href='#contact'>get in touch</a> about anything."};
wheel.navItems[3].navigateFunction = function () { wheelText.innerHTML = "Here are some of the <a href='#photography'>photos</a> I've taken."};
wheel.navItems[4].navigateFunction = function () { wheelText.innerHTML = "Take a look at some <a href='#projects'>projects</a> I've worked on."};

// For About Wheel Div
wheel = new wheelnav("about-wheelDiv");
wheel.colors = ['#2e9cca'];
wheel.clickModeRotate = false;
wheel.wheelRadius = 0.7*wheel.wheelRadius;
wheel.centerY = 300;
wheel.centerX = 500;
wheel.slicePathFunction = slicePath().TabSlice; 
wheel.initWheel([icon.fave, icon.chat, icon.user, icon.loaction2, icon.edit]);
wheel.navItems[0].sliceSelectedTransformFunction = sliceTransform().ScaleTitleTransform;
wheel.navItems[1].sliceSelectedTransformFunction = sliceTransform().ScaleTransform;
wheel.navItems[2].sliceSelectedTransformFunction = sliceTransform().RotateAlotTransform;
wheel.navItems[3].sliceSelectedTransformFunction = sliceTransform().ScaleTransform;
wheel.navItems[4].sliceSelectedTransformFunction = sliceTransform().RotateAlotTransform;
wheel.createWheel();

// About wheel div functionality 
var about_contents = [document.getElementById('about-interests'),document.getElementById('about-values'),
document.getElementById('about-goals'),document.getElementById('about-location'),document.getElementById('about-education')];
var last_selected = about_contents[0]; 
wheel.navItems[0].navigateFunction = function () { 
    last_selected.style.display = 'none';
    about_contents[0].style.display = 'flex';
    last_selected = about_contents[0]
};
wheel.navItems[1].navigateFunction = function () { 
    last_selected.style.display = 'none';
    about_contents[1].style.display = 'flex';
    last_selected = about_contents[1]
};
wheel.navItems[2].navigateFunction = function () {
    last_selected.style.display = 'none';
    about_contents[2].style.display = 'flex';
    last_selected = about_contents[2]
};
wheel.navItems[3].navigateFunction = function () {
    last_selected.style.display = 'none';
    about_contents[3].style.display = 'flex';
    last_selected = about_contents[3]
};
wheel.navItems[4].navigateFunction = function () {
    last_selected.style.display = 'none';
    about_contents[4].style.display = 'flex';
    last_selected = about_contents[4]
};

wheel.navigateWheel(0);

// Contact wheel div 
wheel3 = new wheelnav("contact-wheelDiv");
wheel3.colors = ['#2e9cca'];
wheel3.clickModeRotate = false;
wheel3.spreaderEnable = true;
wheel3.spreaderInTitle = '+';
wheel3.spreaderOutTitle = '-';
wheel3.spreaderRadius = 25;
wheel3.centerY = 180;
wheel3.centerX = 180;
wheel3.sliceSelectedTransformFunction = sliceTransform().ScaleAllTransform;
wheel3.sliceHoverTransformFunction = sliceTransform().ScaleAllTransform;
wheel3.slicePathFunction = slicePath().MenuSlice; 
wheel3.initWheel([icon.mail, icon.linkedin, icon.cross ,null, null, null, null,null]);
wheel3.createWheel();

// contact wheel functionality 
var wheel3Text = document.getElementById("contact-wheel-title");
wheel3.navItems[0].navigateFunction = function () { wheel3Text.innerHTML = "Feel free to <a href='mailto:adam.skrocki@gmail.com'>email </a>me..." };
wheel3.navItems[1].navigateFunction = function () { wheel3Text.innerHTML = "...or message me on <a href='http://www.linkedin.com/in/adamskrocki'>LinkedIn.</a>"};
wheel3.navItems[2].navigateFunction = function () { wheel3.spreadWheel() };
wheel3.navigateWheel(0);

// Gallery setup
$('#gallery').justifiedGallery({
    rowHeight : 200,
    lastRow : 'nojustify',
    margins : 0,
    captions: false,
    imageAnimationDuration: 500
});

  /* Radar chart design created by Nadieh Bremer */
/*
// Set up 
var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

// Data
var data = [
            [//2018
            {axis:"Programmer",value:0.9},
            {axis:"Fitness",value:0.7},
            {axis:"Music",value:0.9},
            {axis:"Chess",value:0.5},
            {axis:"Data Science",value:0.9},
            {axis:"Photography",value:0.5},
            {axis:"Food",value:0.8},
            {axis:"Design",value:0.45},
            {axis:"Friends",value:0.9},
            {axis:"Travel",value:0.5},
            {axis:"Work",value:0.8},	
            {axis:"Family",value:0.9},	
            {axis:"Fun",value:0.7},	
            {axis:"School",value:0.6}		
            ],[//2017
            {axis:"Programming",value:0.5},
            {axis:"Fitness",value:0.5},
            {axis:"Music",value:0.9},
            {axis:"Chess",value:0.8},
            {axis:"Data Science",value:0.5},
            {axis:"Photography",value:0.5},
            {axis:"Food",value:0.8},
            {axis:"Design",value:0.3},
            {axis:"Friends",value:0.9},
            {axis:"Travel",value:0.7},
            {axis:"Work",value:0.7},	
            {axis:"Family",value:0.9},	
            {axis:"Fun",value:0.8},	
            {axis:"School",value:0.7}	
            ],[//2016
            {axis:"Programming",value:0.3},
            {axis:"Fitness",value:0.6},
            {axis:"Music",value:0.9},
            {axis:"Chess",value:0.7},
            {axis:"Data Science",value:0.3},
            {axis:"Photography",value:0.8},
            {axis:"Food",value:0.8},
            {axis:"Design",value:0.3},
            {axis:"Friends",value:0.9},
            {axis:"Travel",value:0.6},
            {axis:"Work",value:0.6},	
            {axis:"Family",value:0.9},	
            {axis:"Fun",value:0.8},	
            {axis:"School",value:0.8}		
            ]
        ];

// Draw
var color = d3.scale.ordinal()
    .range(["#EDC951","#CC333F","#00A0B0"]);
    
var radarChartOptions = {
    w: width*.9,
    h: height*.9,
    margin: margin,
    maxValue: 1,
    levels: 5,
    roundStrokes: true,
    color: color
};

// Call 
//RadarChart("#radar-display", data, radarChartOptions);
*/
