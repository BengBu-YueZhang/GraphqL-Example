const bcrypt = require('bcryptjs')

module.exports = {
  encrypt (str) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(str, salt)
    return hash
  },

  compare (old, val) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(val, old, function(err, res) {
        if (err) {
          reject()
        } else {
          res ? resolve(true) : resolve(false)
        }
      })
    })
  }
}