const schema = {
    playerName: String,
    fieldID: String,
    action: {
        miss: Number,
        hit: Number,
        move: Number
    },
    usingTime: Number,
    log: [{
        selected: String,
        action: {
            miss: Number,
            hit: Number,
            move: Number
        },
        msg: String}],
    isWin: Boolean
  }
  
  module.exports = schema;