App.Views.AwesomeResumeView = Backbone.View.extend({
  id: 'awesome-resume',
  className: 'page full-size mono',
  initialize: function() {
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
    'transitionend *': 'noBubble',
    'transitionend': 'close',
    'click .close': 'hide',
    'click #switch-theme': 'switchTheme'
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  hide: function() {
    // Remove the event listeners associated with thingToHTML.
    var killThings = CustomEvent('killThings');
    document.body.dispatchEvent(killThings);

    this.$el.removeClass('show');
  },
  close: function() {
    if(this.isOpen) { // Rejects the opening transition.
      App.menuClickable = true;
      App.kill(this);
    }

    this.isOpen = true;
  },
  switchTheme: function() {
    $('.close').toggleClass('dark light');
    $('#awesome-resume').toggleClass('dark light');
    $('.awesome-resume').toggleClass('dark light');
  }
});