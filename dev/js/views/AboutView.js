App.Views.AboutView = Backbone.View.extend({
  id: 'about-page',
  className: 'page full-size sans',
  initialize: function() {
    // this.template = Handlebars.compile($('#about-template').html());
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
    'transitionend *': 'noBubble',
    'transitionend': 'close',
    'click .close': 'hide'
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  hide: function() {
    document.body.dispatchEvent(CustomEvent('killTyper'));
    bgImageGallery('stop');
    this.$el.removeClass('show');
  },
  close: function(e) {
    if(this.isOpen) { // Rejects the opening transition.
      App.menuClickable = true;
      App.kill(this);
    }

    this.isOpen = true;
  },
  photoSlide: function() {
    // Array found in 'demos/photoArrays.js'
    bgImageGallery(aboutMePhotos, '.bg1', '.bg2');
  }
});