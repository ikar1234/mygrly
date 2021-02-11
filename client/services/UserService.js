import axios from 'axios';

const url = 'http://localhost:3000/users/'

class UserService {
    static async getUsers() {
        var res = await axios.get(url);
        return res.data;
    }

    static getUser(name) {
        return new Promise((resolve, reject) => {
            try {
                const res = axios.get(`${url}${name}`);
                const data = res.data;
                resolve(data);
            }
            catch(err) {
                reject(err);
            }
        });
    }

    static insertUser(name, password, accountType) {
        axios.post(url, {
            name: name,
            password: password,
            accountType: accountType
        }).catch(e => {
            console.log(e);
        })
    }

    static deleteUser(id) {
        axios.delete(`${url}${id}`).catch(e => {
            console.log(e);
        })
    }
}

export default UserService;