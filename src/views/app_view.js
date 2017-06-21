import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import MovieView from './movie_view';
import Movie from '../models/movie.js';
import MovieList from '../collections/movie_list';
import MovieListView from './movie_list_view.js';

var AppView = Backbone.View.extend({
  initialize: function(options) {
    var myMovieList = new MovieList({url: "http://localhost:3000/movies"});
    var myMovieListView = new MovieListView ({
      model: myMovieList,
      template: _.template($('#movie-template').html()),
      el: '.rental'
    });

    var searchMovieList = new MovieList(
      {url: "http://localhost:3000/movies?query="}
    );
    var searchMovieListView = new MovieListView ({
      model: searchMovieList,
      template: _.template($('#search-template').html()),
      el: '.movie-db'
    });
  }
});

export default AppView;
