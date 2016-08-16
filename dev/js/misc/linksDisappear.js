function linksDisappear($el, parentEl, type, className) {
  var disappears;
  var vanish;

  // The `wrapify` function found in `wrapify.js`.
  wrapify($(parentEl)[0], type, className);

  disappears = $el.find('.disappear').toArray();
  disappears.map(function(el) {
    el.style.transition = 'opacity .4s';
    el.style.opacity = '1';
  });

  vanish = setInterval(function() {
    var i = app.randomNum(0, disappears.length - 1);

    disappears[i].style.opacity = '0';
    disappears.splice(i, 1);

    if (!disappears.length) {
      clearInterval(vanish);

      $('#menu')
        .addClass('disappear')
        .on('transitionend', function(e) {
          if (e.target.id === 'menu') {
            $('#menu').off('transitionend');
            $body.trigger('menuAnimationComplete');
          }
        });
    }
  }, 50);
}
