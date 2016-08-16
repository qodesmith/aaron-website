app.AboutView = Backbone.View.extend({
  id: 'about',
  className: 'page overflow y',
  initialize: function() {
    router.navigate('about');
    this.name = 'AboutView';
    this.typer = true;
    this.gallery = true;
    this.angleHidden = false;
    this.$el.html(templates.about());
    this.$angle = this.$el.find('.angle-down');
    app.typicalRender(this);
    this.typeSkills();
    this.photoGallery();
  },
  events: {
    'click .angle-down span': 'scrollToContents',
    scroll: 'checkDownAngle'
  },
  scrollToContents: function() {
    // If the angle is already hidden, make it un-clickable.
    if (this.angleHidden) return;

    var el = this.el; // What actually scrolls.
    var fps = 60; // frames per second
    var time = 1500; // How long the scrolling will take.
    var start = el.scrollTop; // Starting position (in case we've scrolled a bit).
    var end = window.innerHeight; // End position.
    var distance = end - start; // Total distance to scroll.
    var iterations = Math.floor(time / fps); // How many times to scroll.
    var scrollAmount = distance / iterations; // How far each scroll goes.
    var speed = 1000 / fps; // Frequency of the scroll interval, based on fps.
    var i = 0; // Keeps track of our intervals.

    // TODO: Implement easing solution.
    var type = 'linear';
    // var type = 'ease';

    this.scroll = setInterval(function() {
      var amount;

      if (type === 'linear') {
        el.scrollTop += scrollAmount;
      } else {
        // TODO: Implement easing solution.
      }

      i++;

      if (i === iterations) {
        el.scrollTop = end;
        clearInterval(this.scroll);
      }
    }.bind(this), speed);
  },
  checkDownAngle: function() {
    var amount = Math.floor(window.innerHeight * .5);

    if (this.angleHidden && this.el.scrollTop < amount) {
      this.angleHidden = false;
      this.$angle.removeClass('hide');
    } else if (this.el.scrollTop >= amount) {
      this.angleHidden = true;
      this.$angle.addClass('hide');
    }
  },
  typeSkills: function() {
    var p = 1500;
    var s = 25;
    var i = 0;
    var skillz = [ // `JavaScript` below...
      'backbone.',
      'node.',
      'express.',
      'HTML & CSS.',
      'LESS.',
      'flexbox.',
      'gulp.',
      'photoshop.',
      'responsive design.',
      'wordpress.',
      'dealing with client "complications".'
    ];

    function typeSkill() {
      typer('.skillset')
        .line(skillz[i++])
        .pause(p)
        .back('all', s)
        .run(function(el) {
          $(el).html('');

          if (i === skillz.length) i = 0;

          setTimeout(function() {
            typeSkill();
          }, 10);

          document.body.dispatchEvent(new Event('killTyper'));
        });
    }

    skillz = app.randomizeArray(skillz);
    skillz.unshift('JavaScript.'); // JavaScript always 1st on the list :)
    typeSkill();
  },
  photoGallery: function() {
    var photos = [
      {image: '/images/about/01.jpg', credits: 'Me & my boy'},
      {image: '/images/about/02.jpg', credits: 'My radio, Marquis'},
      {image: '/images/about/03.jpg', credits: 'In the booth'},
      {image: '/images/about/04.jpg', credits: 'Larry Crane!'},
      {image: '/images/about/05.jpg', credits: 'Working for the man'},
      {image: '/images/about/06.jpg'},
      {image: '/images/about/07.jpg'},
      {image: '/images/about/08.jpg', credits: 'In the studio'},
      {image: '/images/about/09.jpg', credits: '"Tracksmith"'},
      {image: '/images/about/10.jpg', credits: '@ Girls Who Code'},
      {image: '/images/about/11.jpg', credits: 'Hip-Hop!'}
    ];

    photos = app.randomizeArray(photos);
    bgImageGallery(photos, '.me', 6000, true);
  }
});
