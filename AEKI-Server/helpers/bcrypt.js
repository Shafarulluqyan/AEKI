const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: (password) => bcrypt.hashSync(password, 10),
    comparePassword: (password, hashedPassword)=> bcrypt.compareSync(password,hashedPassword)
}