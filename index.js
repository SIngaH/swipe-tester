//swipe
// function swipe(){
  console.log("here")
    const swiper = document.querySelectorAll('.swiper');
    const swiperArray = Array.from(swiper);
    swiperArray.forEach(_C =>{
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
    });
  // }