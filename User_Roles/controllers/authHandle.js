const data = {
    users: require('../model/data.json'),
    setUsers: function(data) {this.users = data;}
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) => {
    const {username, pwd} = req. body;
    if(!pwd || !username) {
        return res.status(400).json({'message': "Username and password are required!"});
    }
    const foundUser = data.users.find(user => user.username === username)
    if(!foundUser) {
                return res.status(400).json({'message': "Username is incorrect!"});
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const roles = Object.values(foundUser.roles);
        const otherUsers = data.users.filter(user => user.username !== foundUser.username);
        const currentUser = {...foundUser, refrehToken};
        data.setUsers([...otherUsers, currentUser]);
        const accessToken = JsonWebTokenError.sign(
            {
                "username": foundUser.username,
                "roles": roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )

        const refrehToken = jwt.sign(
            {"username": foundUser.username}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'userData.json'),
            JSON.stringify(data.users)
        )
        res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 42*60*60*1000});
        res.json({accessToken});
    }
}

module.exports = {handleLogin};