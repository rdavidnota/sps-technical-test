const { validateUser } = require('../validators/user.validator')
class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getUsers = async (req, res) => {
        const users = await this.userService.getUsers();

        res.json(users);
    }

    getUserById = async (req, res) => {
        const userId =  req.params.id;
        const users = await this.userService.findUserById(userId);

        res.json(users);
    }

    createUser = async (req, res) => {
        try {
            const userParams = req.body;
            const validate = await validateUser( userParams);
            if (validate) {
                const user = await this.userService.createUser(userParams);
                res.status(201).json(user);
            } else {
                throw new Error('Verifique los datos del usuario');
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    updateUser = async (req, res) => {
        try {
            const userId =  req.params.id;
            const userParams = req.body;
            const user = await this.userService.updateUser(userId, userParams);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    deleteUser = async (req, res) => {
        try {
            const userId =  req.params.id;;
            const userDeleted = await this.userService.deleteUser(userId);

            if (userDeleted) {
                res.status(200).send({ message: 'User deleted' });
            }
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

}
module.exports = UserController;
