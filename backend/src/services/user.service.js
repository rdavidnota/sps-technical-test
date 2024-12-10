const bcrypt = require('bcrypt');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.setData();
    }

    setData = async () => {
        const admin = {
            name: "admin",
            email: "admin@spsgroup.com.br",
            type: "admin",
            password: "1234"
        }

       await this.createUser(admin);
    };

    getUsers = async () => {
        return await this.userRepository.findUsers();
    }

    createUser = async (user) => {
        try {
            const userFind = await this.userRepository.findUserByEmail(user.email);
            if (userFind == undefined) {
                const passwordHash = await bcrypt.hash(user.password, 10);
                user.password = passwordHash;
                return await this.userRepository.createUser(user);
            }else{
               throw new Error('Email registrado con otro usuario');
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    updateUser = async (id, user) => {
        try{
            if(user.password != undefined){
                const passwordHash = await bcrypt.hash(user.password, 10);
                user.password = passwordHash;
            }
            const userUpdated = await this.userRepository.updateUser(id, user);
            return userUpdated
        }catch(error){
            console.log(error)
            throw error
        }
    }

    deleteUser = async (id) => {
        try{
            return await this.userRepository.deleteUser(id);
        }catch(error){
            console.log(error)
            throw error
        }
    }

    findUserByEmail = async(email)=>{
        const userFind = await this.userRepository.findUserByEmail(email);

        return userFind;
    }

    findUserById = async(id)=>{
        const userFind = await this.userRepository.findUserById(id);

        return userFind;
    }


}

module.exports = UserService;
