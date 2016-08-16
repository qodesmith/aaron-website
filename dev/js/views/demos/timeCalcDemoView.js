app.TimeCalcDemoView = Backbone.View.extend({
  id: 'time-calc-demo',
  className: 'page no-overflow flex centered',
  initialize: function() {
    router.navigate('time-calculator');
    this.calculator = true;
    this.$el.html(templates.timeCalcDemo());
    app.typicalRender(this);
    timeCalculator();
  }
});
