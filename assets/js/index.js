// Source credit: http://thenewcode.com/279/Rotate-Elements-on-Scroll-with-JavaScript

var left = document.getElementById('left-outer'),
    left1 = document.getElementById('left-inner-1'),
    left2 = document.getElementById('left-inner-2'),
    left3 = document.getElementById('left-inner-3'),
    left4 = document.getElementById('left-inner-4'),
    left5 = document.getElementById('left-inner-5'),
    left6 = document.getElementById('left-inner-6'),
    logic1 = document.getElementById('left-logic-1'),
    logic2 = document.getElementById('left-logic-2'),
    logic3 = document.getElementById('left-logic-3'),
    logic4 = document.getElementById('left-logic-4'),
    logic5 = document.getElementById('left-logic-5'),    
    right = document.getElementById('right-outer'),
    right1 = document.getElementById('right-inner-1'),
    right2 = document.getElementById('right-inner-2'),
    right3 = document.getElementById('right-inner-3'),
    right4 = document.getElementById('right-inner-4'),
    right5 = document.getElementById('right-inner-5'),
    right6 = document.getElementById('right-inner-6'),
    color1 = document.getElementById('right-color-1'),
    color2 = document.getElementById('right-color-2'),
    color3 = document.getElementById('right-color-3'),
    color4 = document.getElementById('right-color-4'),
    color5 = document.getElementById('right-color-5');

;(function(){

  var throttle = function(type, name, obj){
    var obj = obj || window;
    var running = false;
    var func = function(){
      if (running){ return; }
      running = true;
      requestAnimationFrame(function(){
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  
  // throttle("mousemove", "optimizedMove");
  throttle("scroll", "optimizedScroll");
})();

var lastScrollTop = 0;

window.addEventListener("optimizedScroll", function(){
  // left.style.transform = "rotate("+ st + "deg)";
  // right.style.transform = "rotate(" + st + "deg)";
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
      // downscroll code
      document.querySelector('.mouse').style.opacity = 0;
      document.querySelectorAll('.box').forEach((elem) => {
        elem.style.opacity = 0;
      });

      document.querySelectorAll('.scene').forEach((elem) => {
 
        let y_modifier = elem.getAttribute('data-top');
        let x_modifier = (elem.getAttribute('data-left')) ? elem.getAttribute('data-left') : elem.getAttribute('data-right');

        if(x_modifier==0){
          x_modifier = Math.floor(Math.random() * 200) + 1;
        }
        if(y_modifier==0){
          y_modifier = Math.floor(Math.random() * 200) + 1;
        }

        if(elem.hasAttribute('data-left')){
          elem.style.transform=`translateY(${y_modifier + st}px)`;
          elem.style.transform=`translateX(${x_modifier + st}px)`;          
        }
        if(elem.hasAttribute('data-right')){
          elem.style.transform=`translateY(-${y_modifier + st}px)`;
          elem.style.transform=`translateX(-${x_modifier + st}px)`; 
        }
        elem.style.transition=" all 0.5s";        
        
      })
  } else if (st < lastScrollTop) {
      // upscroll code
      document.querySelector('.mouse').style.opacity = 1;
      document.querySelectorAll('.box').forEach((elem) => {
        elem.style.opacity = 1;
      });

      document.querySelectorAll('.scene').forEach((elem) => {
 
        let y_modifier = elem.getAttribute('data-top');
        let x_modifier = (elem.getAttribute('data-left')) ? elem.getAttribute('data-left') : elem.getAttribute('data-right');

        elem.style.transform=`translateY(0%)`;
        elem.style.transform=`translateX(0%)`;
        elem.style.transition=" all 0.5s";
        
      })
  } // else was horizontal scroll
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

  left.style.right = (st) + 'px';
  left.style.top = (st) + 'px';

  right.style.left = (st) + 'px';
  right.style.top = (st) + 'px';
  
});


let observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7
};

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // fade in observed elements that are in view
      entry.target.classList.replace('fadeOut', 'fadeIn');
    } else {
      // fade out observed elements that are not in view
      entry.target.classList.replace('fadeIn', 'fadeOut');
    }
  });
}

let observer = new IntersectionObserver(observerCallback, observerOptions);

let fadeElms = document.querySelectorAll('.fade');
fadeElms.forEach(secc => observer.observe(secc));