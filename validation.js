const bookshelf = require('./bookshelf');

User = bookshelf.Model.extend({
    tableName: 'users',
    initialize: function() {
        this.on('saving'.this._assaultEmailUnique);
    },
    _assaultEmailUnique: function(model, attributes, options){
        if (this.hasChanged('email')) {
            return User
                .query('where', 'email', this.get('email'))
                .fetch(_.pick('options', 'transcating'))
                .then(function(existing){
                    if (existing) throw new Error('duplicate email');
                });
        }
    }
});