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

    return this;
  },

  openModal: function() {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
  },

  closeModal: function(event) {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    if (event.target == modal) {
      modal.style.display = "none";
    }
  },

  events: {
    "click #add-button": "addMovie",
    "click #myBtn": "openModal",
    "click": "closeModal"
  }
});

export default MovieView;
