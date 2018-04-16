const schema = {
    datetime: Date,
    field: [{
        index: Number,
        data: [Number]
    }],
    ship: {
        battleShip: Number,
        cruisers: Number,
        destroyer: Number,
        subMarines: Number
    },
    status: String
  }
  
  module.exports = schema;
  
  