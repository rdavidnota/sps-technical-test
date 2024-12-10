const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtUtils')

class AuthService {
    constructor(userService){
        this.userService = userService;
    }

    login = async (email, password) => {
        const user = await this.userService.findUserByEmail(email);
        console.log(user)
        if (user == undefined) {
            throw Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw Error('Invalid credentials');
        }

        const token = jwt.generateToken({ id: user.id });
        return token;
    }
}

module.exports = AuthService;