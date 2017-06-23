import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var MovieView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },

  addMovie: function(event) {
    var url = "http://localhost:3000/movies";
    var data = { movie: this.model.attributes };
    $.post(url, data, function(response){
      console.log(response);
      console.log("added!");
    });
    console.log(this.model.attributes);
  },

  render: function() {
    // console.log(this.model.attributes);
    var html = this.template({movie: this.model.toJSON()});
    this.$el.html(html);

    // this.$("#movie-details").append(this.MovieView.render().$el);

    return this;
  },

  // showDetails: function(event) {
  //   console.log(this);
  //   var movieDetails = this.template()
  // }

  openModal: function(event) {
    console.log("open");
    var modal = document.getElementById('movie-details');

    // var modal = $('#movie-details');
    // var btn = $("#myBtn");
    // var span = document.getElementsByClassName("close")[0];
    //
    // modal.style.display = "block";
    // modal.show();
    this.trigger("details", this.model);
    event.preventDefault();
  },

  closeModal: function(event) {
    console.log("close");
    //
    // var modal = document.getElementById('movie-details');
    // // var btn = document.getElementById("myBtn");
    // // var span = document.getElementsByClassName("close")[0];
    // //
    var modal = $('#movie-details');

      modal.hide();
      // modal.style.display = "none";
  },

  events: {
    "click #add-button": "addMovie",
    "click #myBtn": "openModal",
    "click #close": "closeModal"
  }
});

export default MovieView;
