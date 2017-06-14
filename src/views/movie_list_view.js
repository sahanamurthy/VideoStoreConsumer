import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import MovieView from './movie_view';
import Movie from '../models/movie.js';

var MovieListView = Backbone.View.extend({
  initialize: function(options) {
    this.template = _.template($('#movie-template').html());
    this.listenTo(this.model, 'update', this.render);
    // this.listElement = this.$('.movie-list');
  },

  render: function() {
    console.log("In render");
    this.$('#movie-list').empty();

    var self = this;

    this.model.each(function(movie) {
      var movieView = new MovieView({
        model: movie,
        template: self.template
      });

      self.$("#movie-list").append(movieView.render().$el);
    });

    return this;
  },

  showList: function() {
    this.model.fetch();
    console.log("showlist");
  },

  searchList: function() {
    var formData = this.readNewSearchForm();
    this.url="http://localhost:3000/movies?query=" + formData;
    this.model.fetch();
    console.log(formData);
  },

  clearForm: function() {
    $('#search').val('');
  },

  readNewSearchForm: function() {
    var formSearch = $('#search').val();
    this.clearForm();

    var formData = {};
    if (formSearch && formSearch != "") {
      formData['search'] = formSearch
    }
    return formData;
  },

  events: {
    "click #rental-library": "showList",
    "click #search-button": "searchList"
  }
});

export default MovieListView;
