var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    if(this.defaults.like ){
      this.defaults.like = false;
    } else {
      this.defaults.like = true;
    }
    //modelView.render()
    console.log(this.defaults.like)
    //this.defaults.like = !(this.defaults.like);
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function(datumArrOfObj) {
    // your code here
    for(var i of datumArrOfObj) {
      i = new this.model(i);
      i.on('change:dafaults:like', this.sort(), this);
    }
    //this.model.on('change', this.sort())
    this.data = datumArrOfObj
    console.log(this.data)
    
    

  },

  comparator: 'title',

  sortByField: function(field) {
    // your code here
    this.comparator = field;
    this.sort() ;
  },
  sort: function () {

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
    this.model.on('change', this.render(), this)
    //if the model changed 
    //call this.render();
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() { 
    this.model.on('click', this.model.toggleLike());
        // your code here

  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.collection.on("all",this.render() , this)
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
