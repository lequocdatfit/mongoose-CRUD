const mongoose = require('mongoose');
const Dishes = require('./model/dishes');


const url = 'mongodb://localhost:27017';

mongoose.connect(url)
  .then((db) => {
    console.log('Connected correctly to server');
    
    Dishes.create({
      name: 'Dia 01',
      description: 'test'
    }).then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
          $set: {description: 'Updated'}
        }, {new: true}).exec();;
      }).then((dish) => {
        console.log(dish);
        
        dish.comments.push({
          rating: 5,
          comment: 'Verry useful',
          author: 'Le Quoc Dat'
        });

        return dish.save();
      }).then((dish) => {
        console.log('Push comment');
        console.log(dish);
        return Dishes.remove({});
      }).then(() => {
        console.log('remove all');

        return mongoose.connection.close();
      }).catch((err) => {
        console.log(err);
      })
  }).catch((err) => {
    console.log(err);
  })