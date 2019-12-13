module.exports = function(passport,db,bcrypt,app) { 
    const path = require('path');
    app.set('public/app', path.join(__dirname, 'public/app'));

    require('../config/account.js')()
    require('../config/auth.js')(passport,db,bcrypt)
    require('../config/authed_app.js')(db)
    //Frontend-Webserver-Database
    app.post("/nodes", (req,res) => {
        nodeNames(res,db)
    })

    app.post("/verifyUsername", (req,res) => {
        verifyUsername(req,res,db)
    })

    app.post("/nodeCode", (req, res) => {
        joinCodeAuth(req,res,db)
    })

    app.post("/verifyNode", (req,res) => {
        verifyNodeName(req,res,db)
    })

    app.post("/newUser", (req, res) => {
        newUser(req,res,db)
    })

    app.post("/newNode", (req, res) => {
        newNode(req,res,db)
    })

    //Auth
    app.get('/app', (req, res) => res.render('../public/app',{user:req.query}));
    app.get('/accounts', (req, res) => res.json({loginStat: false}));


    app.post('/userAuth', passport.authenticate('local', { failureRedirect: '/accounts' }), function(req, res) {
        res.redirect('/app/?username='+req.user.username);
    });
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //App data requests
    app.post('/api/role', (req,res) => {
        console.log(req.body.user)
        role(res,req.body.user)
    })
    app.post('/api/assoNode', (req,res) => {
        console.log(req.body.user)
        asNode(req,res,req.body.user)
    })
    app.post('/api/nodeMenotrs', (req,res) => {
        console.log(req.body.asso_node)
        mentors(req,res,req.body.asso_node)
    })
    app.post('/api/senduserMessages', (req,res) => {
        console.log(req.body.formated)
        sendMessage(req.body.formated,res)
    })
    app.post('/api/userMessages', (req,res) => {
        fetchMessage(req.body,res)
    })
    app.post('/api/userEvents', (req,res) => {
        // console.log(req.body)
        sendEvent(req.body,res)
    })
    app.post('/api/getEvents', (req,res) => {
        console.log(req.body.user)
        getEvent(req.body.user,res)
    })
    app.post('/api/getUserFields', (req,res) => {
        console.log(req.body.user)
        getUserFields(req.body.user,res)
    })
    app.post('/api/getNodeFields', (req,res) => {
        console.log(req.body)
        getNodeFields(req.body.asso_node,res)
    })
    app.post('/api/addUserFields', (req,res) => {
        console.log(req.body)
        addUserFields(req.body,res)
    })
    app.post('/api/updateUserFields', (req,res) => {
        console.log(req.body)
        updateUserFields(req.body,res)
    })
    app.post('/api/userMentors', (req,res) => {
        console.log(req.body)
        userMentor(req.body,res)
    })
    app.post('/api/activeMentors', (req,res) => {
        console.log(req.body)
        activeMentors(req.body,res)
    })
    app.post('/api/mentorDetails', (req,res) => {
        console.log(req.body.results + 'IS THIS')
        mentorDetails(req.body.results,res)
    })
    app.post('/api/nodeMentees', (req,res) => {
        mentees(req.body,res)
    })
    app.post('/api/requesttomentor', (req,res) => {
        addMentorRequest(req.body,res)
    })
    app.post('/api/getPending', (req,res) => {
        getPendingUsers(req.body,res)
    })
    app.post('/api/approveMentee', (req,res) => {
        console.log(req.body)
        approveMentee(req.body,res)
    })
    app.post('/api/fetchApprovedMentee', (req,res) => {
        console.log(req.body)
        fetchApprovedMentee(req.body,res)
    })
    app.post('/api/updatePendingforMentor', (req,res) => {
        console.log(req.body)
        updatePendingforMentor(req.body,res)
    })
    app.post('/api/updateMenteeSideMentor', (req,res) => {
        console.log(req.body)
        updateMenteeSideMentor(req.body,res)
    })
    app.post('/api/pendingMenteeMentors', (req,res) => {
        console.log("OUTPUT GO HERE:")
        console.log(req.body)
        pendingMenteeMentors(req.body,res)
    })
    app.post('/api/menteePendingMentors', (req,res) => {
        console.log(req.body)
        updatePendingforMentee(req.body,res)
    })
    app.post('/api/allMentorsforUser', (req,res) => {
        console.log(req.body)
        getAllMentorsforUser(req.body,res)
    })
}
