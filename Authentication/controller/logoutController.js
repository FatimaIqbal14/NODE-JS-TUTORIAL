const data = {
    users: require("../model/data.json"),
    setUserData: function(data) {this.users = data;}
}

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

require('dotenv').config();

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204)
    const refreshToken = cookies.jwt;

    const foundUser = users.data.find(user => user.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', ({httpOnly: true, sameSite: 'None', secure: true}));
        return res.status(204);
    }

    const otherUsers = data.users.filter(users => users.refreshToken !== refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    data.setUserData([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(data.users)
    );

    res.clearCookie('jwt', ({httpOnly: true, sameSite: 'None', secure: true}));
    return res.status(204);

}

module.exports = {handleLogout};