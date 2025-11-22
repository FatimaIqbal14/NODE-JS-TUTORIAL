const data = {
    users: require('../model/data.json'),
    setUsersData: function(data) {this.users = data;}
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({'message': 'Cookies not found!'});
    refreshToken = cookies.jwt;
    const foundUser = data.users.find(user => user.refreshToken === refreshToken);
    if(!foundUser) return res.status(403).json({'message': 'Forbidden'});
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username)  return res.status(403).json({'message': 'Forbidden'});
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    );
}

module.exports = {handleRefreshToken};