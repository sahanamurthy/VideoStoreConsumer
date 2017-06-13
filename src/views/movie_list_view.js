import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
// import MovieView from './movie_view';
import Movie from '../models/movie.js';

var MovieListView = Backbone.View.extend({
  initialize: function(options) {
    this.template = _.template($('#movie-template').html());
    this.listenTo(this.model, 'update', this.render);
    // this.listElement = this.$('.movie-list');
  },

  render: function() {
    this.$('#movie-list').empty();

    var self = this;

    this.model.forEach(function(rawMovie) {
      var movieView = new MovieView({
        model: movie,
        template: self.template
      });

      self.$("#movie-list").append(movieView.render().$el);
    });

    return this;
  }
});

export default MovieListView;
