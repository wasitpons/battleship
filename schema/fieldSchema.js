const schema = {
    datetime: Date,
    field: [[Number]],
    ship: {
        battleShip: Number,
        cruisers: Number,
        destroyer: Number,
        subMarines: Number
    },
    status: String
  }
  
  module.exports = schema;
  
  