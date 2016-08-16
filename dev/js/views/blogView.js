app.BlogView = Backbone.View.extend({
  id: 'blog',
  className: 'page overflow y flex col',
  initialize: function(data) {
    var route = 'blog';

    if (data && data.tag) {
      route += '/tag/' + data.tag;
      this.tag = data.tag;
    }

    if (this.tag) {
      // Reset the `taggedPosts` collection each time.
      taggedPosts.reset();
    }

    router.navigate(route);
    this.name = this.tag ? 'TagBlogView' : 'BlogView';
    this.blog = true;
    this.tagBlog = !!this.tag;
    this.$el.html(templates.blog(this.tag ? {tag: this.tag} : null));

    this.$container = this.$el.find('.posts-container');
    this.$button = this.$el.find('.posts-button');

    app.typicalRender(this);
    this.startButtonObserver();
    this.listPosts();

    if (app.blogPosition) this.el.scrollTop = app.blogPosition;
  },
  events: {
    'click .post-title a': 'loadSinglePost',
    'click .posts-button': 'listPosts'
  },
  startButtonObserver: function() {
    // https://goo.gl/TnkVN

    // Observer instance.
    this.buttonObserver = new MutationObserver(function(mutations) {
      var state = this.$button.attr('state');

      this.$button.text(this.$button.attr('state'));

      if (state === 'end') {
        this.$button.addClass('end');
        this.noMorePosts = true;
      }
    }.bind(this));

    // Start listening.
    this.buttonObserver.observe(this.$button[0], {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['state']
    });
  },
  listPosts: function(e) {
    if (this.noMorePosts) return;

    var _this = this;
    var start = this.tag ? taggedPosts.length : posts.length;
    var data = {
      start: start
    };

    if (this.tag) data.tag = this.tag;

    this.buttonState('loading');

    // 3 possible scenarios:
    // 1. First visit to blog - no models in collection (`!start`).
    // 2. Revisit to blog - models in collection but no `e`.
    // 3. 'Load More' button clicked - `e` will have a value.

    // 1st visit & 'load more'.
    if (!start || e) {
      (this.tag ? taggedPosts : posts).fetch({
        data: data,
        remove: false, // Seems necessary to merge the new models with the old ones.
        success: function(collection, response) {
          _this.showTitles(collection, e ? response : null);
        },
        error: function(collection, response, options) {
          $.post('/error-logs', {
            error: 'BlogView: listsPosts() error',
            collection: collection,
            response: response,
            options: options
          });
        }
      });

    // Revisit.
    } else {
      this.showTitles(this.tag ? taggedPosts : posts);
    }
  },
  showTitles: function(collection, newPosts) {
    var $frag = $(document.createDocumentFragment());

    // No tagged posts to begin with.
    if (this.tag && !collection.length) {
      this.$container
        .addClass('show')
        .html('no posts yet');

      this.buttonState('end');
      return;
    }

    // Exhausted posts.
    if (newPosts && !newPosts.length) {
      this.buttonState('end');
      return;
    }

    (newPosts ? newPosts : collection).map(function(model) {
      var $title = $('<div class="post-title">');
      var $invisible1 = $('<div class="invisible">');
      var $invisible2 = $('<div class="invisible">');
      var $a = $('<a href=#>');
      var data = {};

      // We're either dealing with Backbone model objects in a
      // collection (`collection` above) or plain objects returned
      // from the server (`newPosts` above).
      if (newPosts) {
        data.title = model.title;
        data._id = model._id;
      } else {
        data.title = model.get('title');
        data._id = model.get('_id');
      }

      $a.text(data.title);
      $a.attr('data-id', data._id);
      $title
        .append($invisible1)
        .append($a)
        .append($invisible2);
      $frag.append($title);
    });

    this.buttonState('load more');
    this.$container
      .append($frag)
      .addClass('show');
  },
  loadSinglePost: function(e) {
    e.preventDefault();

    app.blogPosition = this.el.scrollTop;

    var id = $(e.currentTarget).data('id');
    var model = (this.tag ? taggedPosts : posts).where({_id: id})[0];

    views.currentView.remove();
    views.currentView = new app.BlogPostView({model: model});
  },
  buttonState: function(state) {
    this.$button.attr('state', state);
  }
});
