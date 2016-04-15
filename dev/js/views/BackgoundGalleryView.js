App.Views.BackgroundGalleryView = Backbone.View.extend({
  id: 'background-gallery',
  className: 'full-size',
  initialize: function() {
    App.router.navigate('projects/background-gallery');
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
    'click .close': 'close'
  },
  close: function(e) {
    var _this = this;
    App.menuClickable = true;

    this.$el.removeClass('show');
    bgImageGallery('stop');

    setTimeout(function() {
      App.kill(_this, 'projects', 1);
    }, 1000);
  },
  startGallery: function() {
    // Array found in 'demos/photoArrays.js'
    bgImageGallery(bgGalleryPhotos, '.bg1', '.bg2');
  }
});
