const data = {
    users: require('../model/data.json'),
    setUsers: function(data) {this.users = data}
}



const handleUsers = async (req, res) => {
    const {username, pwd} = req.body;
    if(!username || !pwd) {
        return res.status(400).json({'message': 'Username or Password is incorrect!'});
    }
    const foundUser = data.users.find(user => user.username === username);
    if(!foundUser) {
        return res.status(400).json({'message': 'Username is not found!'});
    }
    const pwdMatch = await bcrypt.compare(pwd, foundUser.pwd);
    if(!pwdMatch){
        return res.status(400).json({'message': 'Password is incorrect!'});
    } else {
        return res.status(200).json({'message': `Welcome ${username}`})
    }
}

module.exports = { handleUsers}