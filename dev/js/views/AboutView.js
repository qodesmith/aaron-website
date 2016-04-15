App.Views.AboutView = Backbone.View.extend({
  id: 'about-page',
  className: 'page full-size sans',
  initialize: function() {
    App.router.navigate('about');
    this.typer = true;
    this.html = App.templates.AboutPageView();
    this.render();
  },
  render: function() {
    var _this = this;

    App.randomDir(this.$el);

    this.$el.html(this.html);
    $('body').append(this.$el);
    this.photoSlide();

    setTimeout(function() {
      _this.$el.addClass('show');
      typeSkills();
    }, 10);
  },
  events: {
    'transitionend': 'close',
    'click .close': 'hide'
  },
  hide: function() {
    document.body.dispatchEvent(new CustomEvent('killTyper'));
    bgImageGallery('stop');
    this.$el.removeClass('show');
    this.closing = true;
  },
  close: function(e) {
    var close = App.dirCheck(e.originalEvent.propertyName);

    if(this.closing && close) {
      App.menuClickable = true;
      App.kill(this, '', 1);
    }
  },
  photoSlide: function() {
    // Array found in 'demos/photoArrays.js'
    bgImageGallery(aboutMePhotos, '.bg1', '.bg2');
  }
});