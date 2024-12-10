const UserRepository = require('../user.repository');

class MemoryUserRepository extends UserRepository {
    constructor() {
        super();
        this.users = []; // Array en memoria para almacenar los usuarios
        this.currentId = 1; // ID autoincremental
    }

    async findUsers() {
        return this.users;
    }
    async createUser({ name, email, type, password }) {
        const userFind = await this.findUserByEmail(email);

        if (userFind == undefined) {
            const user = {
                id: this.currentId++, // Asignar un ID único
                name,
                email,
                type,
                password,
            };
            this.users.push(user);
            return user;
        }
    }

    async findUserByEmail(email) {
        const user = this.users.find(user => user.email == email);

        return user;
    }

    async findUserById(id) {
        return this.users.find(user => user.id == id);
    }

    async updateUser(id, { name, email, type, password }) {

        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        if (email != undefined) {
            const userFind = await this.findUserByEmail(email);
            if (userFind != undefined && userFind.id != id) {
                throw Error('Email in use')
            }
        }

        // Mantiene los datos si es que no lo actualiza
        const updatedUser = {
            ...this.users[userIndex],
            name: name || this.users[userIndex].name,
            email: email || this.users[userIndex].email,
            type: type || this.users[userIndex].type,
            password: password || this.users[userIndex].password,
        };

        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    async deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        this.users.splice(userIndex, 1); // Eliminar el usuario del array
        return true;
    }
}


module.exports = MemoryUserRepository;