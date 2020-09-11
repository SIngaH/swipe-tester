//https://css-tricks.com/simple-swipe-with-vanilla-javascript/
//swipe
const _C = document.querySelector(".container"), 
      //how many children does the container have
      N = _C.children.length;
//--n = number of images in the container (used to give us the total width that we give to the container so it knows how wide all the images are)
_C.getElementsByClassName.setProperty("--n", N);

//start coordinates in the container
let x0 = null;
/*In the lock() function, we remove this class from the .container (we’ll add it again at the end on "touchend" and "mouseup") 
and also set a locked boolean variable, so we don’t have to keep performing the x0 || x0 === 0 check. 
We then use the locked variable for the checks instead:*/
let locked = false;
//Locking on "touchstart" (or "mousedown") means getting and storing the x coordinate into an initial coordinate variable x0
/*We then update the JavaScript to replace the code parts where we were updating these CSS variables. 
First, we take care of the lock() function, where we ditch toggling the .smooth class and of the drag() function, 
where we replace updating the --tx variable we’ve ditched with updating --i, which, as mentioned before, doesn’t need to be an integer anymore:*/
function lock(e){
  x0 = unify(e).clientX;

  //making the transition smooth
  _C.classList.toggle("smooth", !(locked = true))
};

/*If we have performed the lock() action, we read the current x coordinate, compute the difference dx between this coordinate and the initial one 
x0 and set --tx to this value (which is a pixel value).*/
function drag(e){ 
  e.preventDefault();
  if(locked){
    _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`)
  }
};

//In the JavaScript, we get an image’s width (updated on "resize") and compute for what fraction of this we have dragged horizontally:
let w;
/*The read-only Window property innerWidth returns the interior width of the window in pixels. 
This includes the width of the vertical scroll bar, if one is present.
More precisely, innerWidth returns the width of the window's layout viewport. 
The interior height of the window—the height of the layout viewport—can be obtained from the innerHeight property.*/
function size(){ w = window.innerWidth };

/*In order to see how to move our .container (or if we have reached the end), we check if we have performed the lock() action, and if we have, 
we read the current x coordinate, compute the difference between it and x0 and resolve what to do out of its sign and the current index*/

/*Let’s say that we don’t want to move on to the next image if we only drag a little bit below a certain threshold. 
Because now, a 1px difference during the drag means we advance to the next image and that feels a bit unnatural. 
To fix this, we set a threshold at let’s say 20% of an image’s width:*/
function move(e){
  if(locked){
    let dx = unify(e).clientX - x0, s = Math.sign(dx);
    f = +(s*dx/w).toFixed(2);

      if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2)
      //--i = the current image
      _C.style.setProperty("--i", i -= s);
    }
      _C.style.setProperty("--tx", "0px");
      /*At this point, we’re always using the same transition-duration no matter how much of an image’s width we still have to translate after 
      the drag. We can fix that in a pretty straightforward manner by introducing a factor f, which we also set as a CSS variable to help us 
      compute the actual animation duration:*/
      _C.style.setProperty("--f", f);
      _C.classList.toggle("smooth", !(locked = false));
      f = 1 - f

      x0 = null
};

size();
//The resize event fires when the document view (window) has been resized
addEventListener("resize", size, false);

//what direction is the swipe going
_C.addEventListener("mousedown", lock, false);
_C.addEventListener("touchstart", lock, false);

_C.addEventListener("mouseup", move, false);
_C.addEventListener("touchend", move, false);

//chrome and edge keep swiping further than we want so i add a touchmove to prevent that
_C.addEventListener("touchmove", e => {e.preventDefault()}, false)

//getting swipe to work in edge
_C.addEventListener("mousemove", drag, false);
_C.addEventListener("touchmove", drag, false);

//unifying touch and click cases
function unify(e){
  return e.changedTouches = e.changedTouches[0] : e
}

/*
const swiper = document.querySelectorAll('.container');
const swiperArray = Array.from(swiper);
swiperArray.forEach(_C =>{
  //the children of the chosen container (.swiper)
  N = _C.children.length;

  _C.style.setProperty('--n', N)
  
  let x0 = null;

  _C.addEventListener('mousedown', lock, false);
  _C.addEventListener('touchstart', lock, false);

  _C.addEventListener('mouseup', move, false);
  _C.addEventListener('touchend', move, false);

  function lock(e) { x0 = unify(e).clientX };
  
  let i = 0;

  function move(e) {
    if(x0 || x0 === 0) {
      let dx = unify(e).clientX - x0, s = Math.sign(dx);
    
      if((i > 0 || s < 0) && (i < N - 1 || s > 0))
      _C.style.setProperty('--i', i -= s);
    
      x0 = null
    }
  };
  _C.addEventListener('touchmove', e => {e.preventDefault()}, false)

  function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };
});*/