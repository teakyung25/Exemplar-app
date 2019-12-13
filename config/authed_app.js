module.exports = function(db) { 
    this.role = function(res,details) {
        db.query("SELECT role FROM users WHERE username = $1", [details])
        .then((data) => {
            res.json(data[0])
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.sendMessage = function(details,res) {
        db.query("SELECT messages FROM users WHERE username = $1", [details.recipient])
        .then((data) => {
            console.log(data[0].messages)
            if(data[0].messages != null){
                console.log('not null')
                db.query("UPDATE users SET messages = messages || $1 WHERE username = $2", [[details.subject,details.newMessage,details.date,details.time,details.sender],details.recipient])
            } else {
                db.query("UPDATE users SET messages = $1 WHERE username = $2", [[[details.subject,details.newMessage,details.date,details.time,details.sender]], details.recipient])
            }
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.fetchMessage = function(details,res) {
        db.query("SELECT messages FROM users WHERE username = $1", [details.user.username])
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.sendEvent = function(details,res) {
        db.query("SELECT events FROM users WHERE username = $1", [details.username])
        .then((data) => {
            if(data[0].events != null){
                console.log('not null')
                db.query("UPDATE users SET events = events || $1 WHERE username = $2", [[details.event_title,details.event_date,details.event_time],details.username])
            } else {
                db.query("UPDATE users SET events = $1 WHERE username = $2", [[[details.event_title,details.event_date,details.event_time]], details.username])
            }
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.getEvent = function(details,res){
        db.query("SELECT events FROM users WHERE username = $1", [details])
        .then((data) => {
            console.log(data[0].events)
            res.json({data:data[0].events})
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }
    this.asNode = function(req,res,details) {
        db.query("SELECT asso_node FROM users WHERE username = $1", [details])
        .then((data) => {
            res.json(data[0])
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.mentors = function(req,res,details) {
        db.query("SELECT username,firstname,lastname FROM users WHERE asso_node = $1 AND role = true", [details])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.getUserFields = function(details,res) {
        db.query("SELECT fields FROM users WHERE username = $1", [details])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.getNodeFields = function(details,res) {
        db.query("SELECT fields FROM nodes WHERE node_name = $1", [details])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.addUserFields = function(details,res) {
        db.query("UPDATE users SET fields = fields || $1 WHERE username = $2", [details.fields,details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.updateUserFields = function(details,res) {
        db.query("UPDATE users SET fields = $1 WHERE username = $2", [details.fields,details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }
    this.userMentor = function(details,res) {
        db.query("SELECT asso_users FROM users WHERE username = $1", [details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.activeMentors = function(details,res) {
        db.query("SELECT username, fields FROM users WHERE asso_node = $1 AND role=true", [details.asso_node]) // When active is introduced: TO-DO: Query for active users.
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.mentorDetails = function(details,res) {
        console.log(JSON.stringify(details))
        let myString = '';
        for (let m of details) {
            myString += '\"username\"=\'' +m + '\' OR '
        }
        myString  = myString.slice(0,myString.length-4)
        console.log(myString)
        db.query(`SELECT username, firstname, lastname, description, fields FROM users WHERE ${myString}`) // When active is introduced: TO-DO: Query for active users.
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }
    this.mentees = function(details,res) {
        console.log(JSON.stringify(details))
        db.query(`SELECT username, firstname, lastname FROM users WHERE asso_node = $1 AND role = false`, [details.asso_node]) // When active is introduced: TO-DO: Query for active users.
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }  
    this.addMentorRequest = function(details,res) {
        console.log(details)
        db.query("UPDATE users SET pending_users = pending_users || $1 WHERE username = $2", [[details.user.username], details.mentor])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.getPendingUsers = function(details,res) {
        console.log(details)
        db.query('SELECT pending_users FROM users WHERE username = $1', [details.user.username]) // When active is introduced: TO-DO: Query for active users.
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }  
    this.approveMentee = function(details,res) {
        console.log(details)
        db.query("UPDATE users SET asso_users = asso_users || $1 WHERE username = $2", [[details.mentee], details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.fetchApprovedMentee = function(details,res) {
        console.log(details)
        db.query('SELECT asso_users FROM users WHERE username = $1', [details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.updatePendingforMentor = function(details,res) {
        db.query("UPDATE users SET pending_users = $1 WHERE username = $2", [details.mentees[0].pending_users,details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }
    this.updatePendingforMentee = function(details,res) {
        db.query("UPDATE users SET pending_users = $1 WHERE username = $2", [details.menteePendingMentors[0].pending_users,details.mentee])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    }
    this.updateMenteeSideMentor = function(details,res) {
        console.log(details)
        db.query("UPDATE users SET asso_users = asso_users || $1 WHERE username = $2", [[details.user.username],details.mentee])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.pendingMenteeMentors = function(details,res) {
        console.log(details)
        db.query("UPDATE users SET pending_users = pending_users || $1 WHERE username = $2", [[details.mentor],details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
    this.getAllMentorsforUser = function(details,res) {
        console.log(details)
        db.query("SELECT asso_users,pending_users FROM users WHERE username = $1", [details.user.username])
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    } 
}