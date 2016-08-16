app.PostsCollection = Backbone.Collection.extend({
  model: app.PostModel,
  url: '/blog-posts'
});
