const data = {
    users: require('../model/data.json'),
    setUsers: function(data) {this.users = data}
}

const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const handleNewUsers = async (req, res) => {
    const {username, pwd} = req.body;
    if(!username || !pwd) {
        return res.status(400).json({'message': 'Username or Password is incorrect!'});
    }
    const match = data.users.find(user => user.username === username);
    if(match) {
        return res.status(409).json({'message': 'Username already exists!'});
    }
    try{
         const hashedpwd = await bcrypt.hash(pwd, 10);
         const newUser = {"username": username, "password": hashedpwd};
         data.setUsers = [...data.users, newUser];
         await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'data.json'),
            JSON.stringify(data.users)
         )
         console.loh(data.users);
        return res.status(200).json({"message": `New user created, ${username}`});
    } catch(err) {
        return res.status(500).json({'message': `an error occured ${err.message}`});
    }


}

module.exports = { handleNewUsers}