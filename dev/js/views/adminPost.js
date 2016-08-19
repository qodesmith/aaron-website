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

app.AdminPostView = Backbone.View.extend({
  id: 'admin-post',
  className: 'full-size absolute top left flex',
  initialize: function(type) {
    var _this = this;

    if (type === 'edit') {
      this.edit = true;
      this.$el.addClass('edit');
    } else {
      this.$el.addClass('create col centered');
    }

    this.html = this.edit ? templates.editPost() : templates.createPost();

    // Check for logged-in status.
    $.ajax({
      method: 'GET',
      url: '/am-i-logged-in',
      cache: false,
      success: function(loggedIn) {
        if (loggedIn) {
          _this.$el.html(_this.html);

          if (_this.edit) {
            _this.errorMutation();
            _this.fetchPosts();
          }
        } else {
          _this.$el.addClass('centered');
          _this.$el.html('<div class="face">-_-</div>');

          $.post('/error-logs', {
            error: 'Someone tried to access the admin page.'
          });
        }

        $body.append(_this.$el);
      }
    });
  },
  events: {
    // EDIT EVENTS
    'click .post': 'getSinglePost',
    'keyup .search': 'searchFilter',
    'click .cancel': 'removeModal',
    'click .save': 'modalSaveEdits',
    'click .delete': 'modalDeletePost',

    // CREATE EVENTS
    'click .submit': 'modalCreateNewPost',
    'click .preview': 'preview',

    // MODAL EVENTS
    'click .ok.save-edits': 'saveEdits',
    'click .ok.delete-post': 'deletePost',
    'click .ok.overwrite': 'overwriteChanges',
    'click .ok.create': 'createNewPost',
    'click .ok': 'removeModal' // Always remove the modal after hitting 'ok'.
  },

  getFormData: function() {
    var title = $('.title').val();
    var image = $('.image').val();
    var tags = $('.tags').val();
    var content = $('.content').val();

    return {
      title: title,
      image: image,
      tags: this.sanitizeTags(tags),
      content: content
    };
  },
  sanitizeTags: function(tags) {
    // Takes a string (`tags`) and returns
    // an alphebetized array (`sanitized`).

    var sanitized = tags
      .split(',')
      .map(function(tag) {
        return tag
          .replace(/\s+/g, ' ') // Remove redundant spaces: http://goo.gl/ayyBdO
          .trim() // Remove leading / trailing spaces.
          .toLowerCase();
      })
      .sort(); // Alphabetical order.

    return sanitized;
  },
  newModal: function(type, content) {
    var $modal = $('<div class="modal page flex centered col">');
    var $content = $('<div class="modal-content">');
    var $buttons = $('<div class="buttons flex">');
    var $ok = $('<div class="button ok ' + type + '">OK</div>');
    var $cancel = $('<div class="button cancel">CANCEL</div>');

    $buttons
      .append($ok)
      .append($cancel);
    $content.text(content);
    $modal
      .append($content)
      .append($buttons);

    this.$el.append($modal);

    setTimeout(function() {
      $modal.addClass('show');
    }, 10);
  },
  removeModal: function() {
    if (this.edit) this.resetError();

    $('.modal').removeClass('show');

    setTimeout(function() {
      $('.modal').remove();
    }, 1000);
  },


  //////////////////
  // EDIT METHODS //
  //////////////////

  errorMutation: function() {
    this.$errors = this.$el.find('.errors');
    this.errorMessage = 'error messages here...';

    this.mutation = new MutationObserver(function(mutations) {
      var msg = this.$errors.attr('message');

      this.$errors.text(msg);

      if (msg === this.errorMessage) {
        this.$errors.removeClass('message');
      } else {
        this.$errors.addClass('message');
      }
    }.bind(this));

    this.mutation.observe(this.$errors[0], {
      attributes: true,
      attributeFilter: ['message']
    });
  },
  error: function(msg) {
    this.$errors.attr('message', msg);
  },
  resetError: function() {
    this.$errors.attr('message', this.errorMessage);
  },
  fetchPosts: function() {
    var _this = this;

    this.collection = new app.PostsCollection();
    this.collection.fetch({
      data: {limit: 0},
      success: _this.listPosts.bind(_this),
      error: function(res) {
        _this.error('fetchPosts() failed');
      }
    });
  },
  listPosts: function() {
    var $frag = $(document.createDocumentFragment());

    this.collection.map(function(model) {
      var $div = $('<div class="post show pointer">');

      $div
        .attr('id', 'post-' + model.get('_id'))
        .text(model.get('title'));

      $frag.append($div);
    });

    $('.posts-list').append($frag);
  },
  getSinglePost: function(e) {
    var id = $(e.currentTarget).attr('id').split('post-')[1];
    var model = this.collection.where({_id: id})[0];
    var title = model.get('title');
    var image = model.get('image');
    var tags = model.get('tags');
    var content = model.get('content');
    var oldModel = this.currentPost;
    var formData = this.getFormData();

    this.resetError();

    if (oldModel && this.hasDataChanged(formData, oldModel)) {
      this.newModel = model;
      return this.modalOverwriteChanges();
    }

    this.currentPost = model;

    $('.title').val(title);
    $('.image').val(image);
    $('.tags').val(tags.join(', '));
    $('.content').val(content);
  },
  searchFilter: function(e) {
    var posts = $('.post').toArray();
    var value = e.currentTarget.value;

    $('.post').each(function() {
      var $el = $(this);
      var text = $el.text().toLowerCase();

      if (text.indexOf(value) > -1) {
        $el.addClass('show');
      } else {
        $el.removeClass('show');
      }
    });
  },
  hasDataChanged: function(data, model) {
    if (!model) return false;

    var formTags = data.tags.sort().toString();
    var modelTags = model.get('tags').sort().toString();

    var title = data.title !== model.get('title');
    var image = data.image !== model.get('image');
    var tags = formTags !== modelTags;
    var content = data.content !== model.get('content');

    if (title || image || tags || content) {
      return {
        title: title,
        image: image,
        tags: tags,
        content: content
      };
    }

    return false;
  },
  getChangedData: function(model) {
    var data = this.hasDataChanged(this.getFormData(), model);
    var changes = {};

    if (!data) return false;

    for (var i in data) {
      if (data[i]) {
        if (i === 'tags') {
          changes[i] = this.sanitizeTags(changes[i]);
        } else {
          changes[i] = $('.' + i).val();
        }
      }
    }

    return changes;
  },
  // Edit modal methods...
  modalOverwriteChanges: function(newModel) {
    this.newModal('overwrite', 'Disregard changes & load the new post?');
  },
  overwriteChanges: function() {
    var model = this.newModel;

    this.currentPost = this.newModel;
    this.newModel = '';

    $('.title').val(model.get('title'));
    $('.image').val(model.get('image'));
    $('.tags').val(model.get('tags').join(', '));
    $('.content').val(model.get('content'));
  },
  modalSaveEdits: function() {
    if (!this.currentPost) {
      return this.error('no post loaded');
    }

    var data = this.getChangedData(this.currentPost);

    if (!data) {
      return this.error('no changes detected');
    }

    // Titles are married to `_id`, which is unique.
    if (data.title) {
      return this.error('title change detected');
    }

    this.newModal('save-edits', 'Are you sure you want to save these edits?');
  },
  saveEdits: function() {
    var _this = this;
    var data = this.getChangedData(this.currentPost);

    data.updatedAt = Date.now();
    this.currentPost.save(data, {
      patch: true,
      success: function(model, response, options) {
        $('.input').val('');
        this.currentPost = '';
      }.bind(_this),
      error: function(model, response, options) {
        _this.error('model failed to update');
        console.log('model:');
        console.log(model);
        console.log('response:');
        console.log(response);
        console.log('options:');
        console.log(options);
      }
    });
  },
  modalDeletePost: function() {
    if (!this.currentPost) {
      this.error('no post to delete');
      return;
    }

    this.newModal('delete-post', 'Are you sure you want to delete this post?');
  },
  deletePost: function() {
    var _this = this;

    this.currentPost.destroy({
      wait: true,
      success: function(model) {
        $('.input').val('');
        $('#post-' + model.get('_id')).remove();
      },
      error: function(model, response, options) {
        _this.error('unable to delete model');
        console.log('model:');
        console.log(model);
        console.log('response:');
        console.log(response);
        console.log('options:');
        console.log(options);
      }
    });
  },


  ////////////////////
  // CREATE METHODS //
  ////////////////////

  preview: function() {
    views.previewPost = new app.PreviewPostView();
  },
  // Create modal methods...
  modalCreateNewPost: function() {
    this.newModal('create', 'Are you sure you want to create this post?');
  },
  createNewPost: function() {
    var _this = this;
    var data = JSON.stringify(this.getFormData());

    $.ajax({
      method: 'POST',
      url: '/create-post',
      data: data,
      contentType: 'application/json', // Needed to send the `tags` array correctly.
      success: function() {
        $('.input').val('');
      }
    });
  }
});
