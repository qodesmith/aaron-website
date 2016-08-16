app.BGGalleryDemoView = Backbone.View.extend({
  id: 'bg-gallery-demo-view',
  className: 'page no-overflow full-size',
  initialize: function() {
    router.navigate('background-gallery');
    this.gallery = true;
    app.typicalRender(this);
    bgImageGallery(galleryPhotos, '#' + this.id, 6000, true);
  }
});
