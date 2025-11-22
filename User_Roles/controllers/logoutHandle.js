const data = {
    users: require('../model/data.json'),
    setUsers: function(data) {this.users = data;}
}

const fsPromises= require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');


const handleLogout = async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204);
    const refreshToken = cookies.jwt;
    const foundUser = data.users.find(user => user.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'});
        return res.status(204);
    }
    const otherUsers = data.users.filter(user => user.refreshToken !== refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    data.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'data.json'),
        JSON.stringify(data.users)
    )
    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None'});
    res.status(204);
}

module.exports = {handleLogout};