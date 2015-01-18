var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var weeklySchema = new Schema({
    content: String,
    mood: Number,
    date: {type: Date}
},{
    collection: 'weekly'
});
    
blogModel = mongoose.model('Weekly', weeklySchema);
