var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    if(this.get('like')){
      this.set('like' , false);
    } else {
      this.set('like', true);
    }
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,
  data: [],
  initialize: function(datumArrOfObj) {
    this.on('change', this.sort, this);
    //this.set('sorting' , 0);
  },

  comparator: 'title',
  sortByField: function(field) {
    // your code here
    this.comparator = field;
    this.sort() ;
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function(model) {
    this.model.on('change', this.render, this);
    this.model.on('click', this.handleClick);
    //if the model changed 
    //call this.render();
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() { 
    this.model.toggleLike();
        // your code here

  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sort', this.render , this)
    // your code here
  },

  render: function() {
    this.$el.empty();
    console.log('hi')
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
