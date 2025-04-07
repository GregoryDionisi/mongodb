//localhost:3000/profile?user=luca

const auth = (req, res, next) => {
    const {user} = req.query
    console.log(user)
    if (user === "luca"){
    next()
    }
    else{
        res.send("ACCESS DENIED")
    }
}

module.exports = auth