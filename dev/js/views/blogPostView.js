app.BlogPostView = Backbone.View.extend({
  id: 'blog-post',
  className: 'page overflow y',
  initialize: function() {
    var id = this.model.get('_id');
    var image = [
      'url(',
      this.model.get('image'),
      ')'
    ].join('');

    router.navigate('blog/' + id);
    this.$el.html(templates.blogPost(this.model.toJSON()));
    this.el.style.backgroundImage = image;
    app.typicalRender(this);
  },
  events: {
    'click .tags a': 'getTaggedPosts'
  },
  getTaggedPosts: function(e) {
    var tag = $(e.currentTarget).text();
    e.preventDefault();

    views.currentView.remove();
    views.currentView = new app.BlogView({tag: tag});
  }
});
