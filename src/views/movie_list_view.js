import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import MovieView from './movie_view';
import Movie from '../models/movie.js';

var MovieListView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.modalTemplate = _.template($('#movie-modal-template').html());
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

      // add listento here
      self.listenTo(movieView, "details", self.showDetails);


      self.$("#movie-list").append(movieView.render().$el);

    });

    return this;
  },

  showDetails: function(movie) {
    this.modalTemplate({
      title: movie.title
    })
    console.log(movie);
  },

  showList: function() {
    $('.movie-db #movie-list').hide();
    $('.rental #movie-list').show();
    this.model.fetch();
  },

  searchList: function() {
    $('.rental #movie-list').hide();
    $('.movie-db #movie-list').show();
    var formData = this.readNewSearchForm();
    console.log(formData);
    console.log(this.model.url)
    this.model.url = "http://localhost:3000/movies?query=";
    var newUrl = this.model.url + formData.search;
    this.model.url = newUrl;
    this.model.fetch();
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
    "click #search-button": "searchList",
  }
});

export default MovieListView;
