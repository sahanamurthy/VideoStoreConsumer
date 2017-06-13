import $ from 'jquery';
import _ from 'underscore';
import MovieList from 'collections/movie_list';
import MovieListView from 'views/movie_list_view';

var myMovieList = new MovieList();
myMovieList.fetch();

$(document).ready(function() {

  var myMovieListView = new MovieListView ({
    model: myMovieList,
    el: 'main'
  })

});
