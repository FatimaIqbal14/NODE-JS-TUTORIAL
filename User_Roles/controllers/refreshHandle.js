const data = {
    users: require('../model/data.json'),
    setUsers: function(data) {this.users  = data;}
}

const jwt = require('jsonwebtoken');


const refreshUsers = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({'message': 'Unauthorized!'});
    const refreshToken = cookies.jwt;

    const foundUser = data.users.find(user => user.refreshToken === refreshToken);
    if(!foundUser) return res.status(403).json({'message': 'Forbidden!'});
    // Creating new Access Token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.status(403).json({'message': 'Forbidden!'});    
 
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
        {
            "UserInfo": {"username": foundUser.username,
            "Roles": roles}
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:  '30s'}
    );
    refreshToken.json({ accessToken });
}) 
}

module.exports = {refreshUsers};