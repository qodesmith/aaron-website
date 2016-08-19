app.PreviewPostView = Backbone.View.extend({
  id: 'blog-post',
  className: 'preview-post page overflow y',
  initialize: function() {
    this.model = new app.PostModel({
      title: $('.title').val(),
      image: $('.image').val(),
      tags: $('.tags').val().split(','),
      content: $('.content').val(),
      createdAt: Date.now()
    });

    var image = [
      'url(',
      this.model.get('image'),
      ')'
    ].join('');

    this.$el
      .html(templates.blogPost(this.model.toJSON()))
      .append($('<div class="close absolute top right pointer">'));
    this.el.style.backgroundImage = image;
    app.typicalRender(this);
  },
  events: {
    'click .close': 'close'
  },
  close: function() {
    app.removeCurrentView();
  }
});
