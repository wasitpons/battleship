const schema = {
    playerName: String,
    fieldID: String,
    action: {
        miss: Number,
        hit: Number,
        move: Number
    },
    usingTime: Number,
    log: [{miss: Number,
        hit: Number,
        move: Number}],
    isWin: Boolean
  }
  
  module.exports = schema;