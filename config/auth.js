module.exports = function(passport,db,bcrypt) { 
    const LocalStrategy = require('passport-local').Strategy;
    //Authenticates users 
    passport.serializeUser(function(user, cb) {
        cb(null, user.username);
    });

    passport.deserializeUser((user, cb) => {
        db.query('SELECT username type FROM users WHERE username = $1', [user.username], (err, results) => {
        if(err) {
            winston.error('Error when selecting user on session deserialize', err)
            return cb(err)
        }
    
        cb(null, results.rows[0])
        })
    })

    passport.use(
        new LocalStrategy((username, password, cb) => {
            console.log(password)
            db.query('SELECT username,password FROM users WHERE username = $1', [username])
            .then((data) => {
            const first = data[0];
            if(data.length > 0) {
                bcrypt.compare(password, first.password, function(err, res) {
                if(res) {
                    cb(null, { username: first.username})
                } else {
                    cb(null, false)
                }
                })
            } else {
                cb(null, false)
            }
            })
        })
    )
}