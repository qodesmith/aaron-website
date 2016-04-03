App.Views.BackgroundGalleryView = Backbone.View.extend({
  id: 'background-gallery',
  className: 'full-size',
  initialize: function() {
    this.transitions = 0;
    this.html = App.templates.BackgroundGalleryView();
    this.render();
  },
  render: function() {
    var _this = this;
    this.$el.html(this.html);

    // Create & append a close button.
    var close = $('<div class="close light">&times;</div>');
    this.$el.append(close);

    $('body').append(this.$el);

    this.startGallery();

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'click .close': 'close',
    'transitionend *': 'noBubble',
    'transitionend': 'removeMe'
  },
  close: function() {
    this.$el.removeClass('show');
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  removeMe: function() {
    if(this.transitions === 1) {
      bgImageGallery('stop');
      this.remove();
    }
    this.transitions++;
  },
  startGallery: function() {
    // Array found in 'demos/photoArrays.js'
    bgImageGallery(bgGalleryPhotos, '.bg1', '.bg2');
  }
});
