app.ThingDemoView = Backbone.View.extend({
  id: 'thing-demo',
  className: 'page no-overflow',
  initialize: function() {
    router.navigate('thing-to-html');
    this.thing = true;
    this.$el.html(templates.thingDemo());
    app.typicalRender(this);
    thingExample();
  }
});
