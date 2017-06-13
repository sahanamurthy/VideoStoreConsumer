import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var MovieView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    // console.log(this.model.attributes);
    var html = this.template({movie: this.model.toJSON()});
    this.$el.html(html);

    return this;
  }
});

export default MovieView;
