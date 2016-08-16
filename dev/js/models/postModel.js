// Example model:
// {
//   _id: 'apologetics-2',
//   createdAt: 849739847534,
//   updatedAt: 938729387474,
//   title: 'Apologetics 2',
//   content: '...',
//   tags: ['some', 'tags', 'here'],
//   image: 'some/url/here.png'
// }

app.PostModel = Backbone.Model.extend({
  idAttribute: '_id'
});
