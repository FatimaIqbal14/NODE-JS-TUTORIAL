const data = {
    users: require('../model/data.json'),
    setUsers: function (data) {this.users = data;}
}

const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const handleRegister = async (req, res) => {
    const {username, pwd} = req.body;
    if(!username || !pwd) return res.status(400).json({'message': 'Username and password are requiresd.'});
    const duplicate = data.users.find(user => user.username === username);
    if(duplicate) return res.status(409).json({'message': 'User already exists.'})
    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser ={
            "Username": username,
            "Password": hashedPwd,
            "Roles": {"User": 2001}
        }

        data.setUsers([...data.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'data.json'),
            JSON.stringify(data.users)
        )
        res.status(201).json({'message': `New user created, ${username}`})
        console.log(data.users);
} catch(err) {
    return res.status(500).json({'message': err.message});
}
}

module.exports = {handleRegister};