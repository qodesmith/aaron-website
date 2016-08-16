// menu = #menu-container, container = #menu
function blowUpMenu(menu, container) {
  var transitionEnds = 0;
  var wraps;
  var length;

  function num(num1, num2, neg) {
    var n = app.randomNum(num1, num2);
    if (neg === false && n % 2) n *= -1;
    if (neg) n /= 100;
    return n;
  }

  // Wrap all text-nodes in a wrapify element.
  wrapify($(menu)[0], 'div', 'wrapify');
  wraps = $('.wrapify').toArray();
  length = wraps.length;

  $(container).on('transitionend', function(e) {
    if (e.originalEvent.propertyName === 'top') {
      transitionEnds++;

      if (transitionEnds === wraps.length) {
        $(container).off('transitionend');
        $body.trigger('menuAnimationComplete');
      }
    }
  });

  // Apply top, left, & transform css styles to the `.wrapify`d elements.
  wraps.map(function(el) {
    var top = ['top ', num(100, 150, true), 's cubic-bezier(.9,-.99,1,.96),'].join('');
    var left = ['left ', num(150, 250, true), 's cubic-bezier(0,0,.5,1),'].join('');
    var xfrm = ['transform ', num(250, 350, true), 's cubic-bezier(.25,.46,0,1)'].join('');
    var transition = [top, left, xfrm].join('');

    el.style.transition = transition;
  });

  setTimeout(function() {
    $(container).addClass('blow-up');

    wraps.map(function(el) {
      el.style.left = num(-20, 20) + 'vw';
      el.style.transform = 'rotate(' + num(140, 360, false) + 'deg)';
    });
  }, 50);
}
