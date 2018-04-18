const schema = {
    datetime: Date,
    field: [[String]],
    ship: {
        battleShip: Number,
        cruisers: Number,
        destroyer: Number,
        subMarines: Number
    },
    status: String
  }
  
  module.exports = schema;
  
  