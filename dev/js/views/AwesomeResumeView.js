App.Views.AwesomeResumeView = Backbone.View.extend({
  id: 'awesome-resume',
  className: 'page full-size mono',
  initialize: function() {
    App.router.navigate('nerdy-resume');
    this.$el.html(App.templates.AwesomeResume());
    this.render();
  },
  render: function() {
    var _this = this;

    App.randomDir(this.$el);
    $('body').append(this.$el);

    thingToHTML({
      container: '.awesome-resume',
      thing: nerdResume,
      button: true
    });

    // Create switch-theme button.
    var switchTheme = $('<div id="switch-theme" class="button">SWITCH THEME</div>');
    $('.buttons').append(switchTheme);

    // Random dark / light theme added to the resume.
    var num = Math.floor(Math.random() * 6 + 1);
    var name;
    num % 2 ? name = 'dark' : name = 'light';
    $('.awesome-resume').addClass(name);
    $('.awesome-resume').parent().addClass(name);
    $('.close').addClass(name === 'dark' ? 'light' : 'dark');

    // Collapse all.
    $('#open-close').click();

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'transitionend': 'close',
    'click .close': 'hide',
    'click #switch-theme': 'switchTheme'
  },
  hide: function() {
    // Remove the event listeners associated with thingToHTML.
    document.body.dispatchEvent(new CustomEvent('killThings'));

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
  switchTheme: function() {
    $('.close').toggleClass('dark light');
    $('#awesome-resume').toggleClass('dark light');
    $('.awesome-resume').toggleClass('dark light');
  }
});