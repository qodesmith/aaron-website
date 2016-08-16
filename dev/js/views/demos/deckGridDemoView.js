app.DeckGridDemoView = Backbone.View.extend({
  id: 'deck-grid-demo',
  className: 'page overflow',
  initialize: function() {
    router.navigate('deck-grid');
    this.deck = true;
    this.$el.html(templates.deckGridDemo());
    app.typicalRender(this);
    deckGrid();
  }
});
