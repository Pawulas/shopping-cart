var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopping');

var products = [ 
  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Gothic",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  }),

  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Mario",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  }),

  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Tekken",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  }),

  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Final Fantasy",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  }),

  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Metal Gear Solid",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  }),

  new Product({
    imgPath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Carsh Team Racing",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum deserunt suscipit doloremque odio earum vel odit, ratione cupiditate hic",
    price: 12
  })
];

var done = 0;
products.forEach((product) => product.save((err, res) => {
  done++;
  if (done === products.length) {
    exit();
  }
}));

function exit() {
  mongoose.disconnect();
}
