const bcrypt = require('bcryptjs');
//Creating Account
function createAccount(firstname,lsatname,username,email,password,role,fields,description,db,assoNode) {
    db.query("Insert into users values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[firstname,lsatname,username,email,password,role,"{"+fields+"}",description,assoNode]);
}
//Creating Node 
function createNode(nodeName,nodeCode,nodeZip,nodePass,nodeFields,db) {
    db.query("Insert into nodes values ($1,$2,$3,$4,$5)",[nodeName,nodeCode,nodeZip,nodePass,"{"+nodeFields+"}"]);
}
// //encrpt
// function encrypt(pass,crypto,alg) {
//     let cipher = crypto.createHash(alg);
//     let encrypted = cipher.update(pass, 'utf8');
//     encrypted += cipher.digest('hex');
//     return encrypted.slice(15, encrypted.length);
// }
module.exports = function() { 
    //Retriving node names from database
    this.nodeNames = function(res,db){
        db.query("SELECT node_name FROM nodes")
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    },
    //Making Sure username entered by user does not already exist
    this.verifyUsername = function(req,res,db){
        db.query("SELECT username FROM users")
        .then((data) => {
            let success = true;
            data.forEach(element => {
                if(element.username == req.body.username){
                    success = false
                    res.json({result:false})
                }
            });
            if(success){
                res.json({result:true})
            }
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    },
    //Node Join Code and Name Auth and loads fields if true
    this.joinCodeAuth = function(req,res,db){
        db.query("SELECT node_name,join_code,fields FROM nodes")
        .then((data) => {
            let valueOfIndex;
            for( i = 0; i < data.length; i++){
                if(data[i].node_name === req.body.nodeName){
                    valueOfIndex = i
                    break
                }
            }
            if( data[valueOfIndex].join_code === req.body.jCode){
                let nodeFields = data[valueOfIndex].fields
                res.json({result:true, fields: nodeFields})
            } else {
                res.json({result:false, message:'Join code is not valid!'})
            }
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    },
    //Makes sure that the node name entered does not already exist.
    this.verifyNodeName = function(req,res,db){
        db.query("SELECT node_name FROM nodes")
        .then((data) => {
            let success = true;
            data.forEach(element => {
                if(element.node_name === req.body.nodeName){
                    success = false
                    res.json({result:false})
                }
            })
            if(success){
                res.json({result:true})
            }
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
        .finally(() => {
            res.end()
        })
    },
    //Creates new user and encrypts password
    this.newUser = function(req,res,db,crypto,alg){
        //req: everything your are sending over
        const rb = req.body;
        // rb[4] = encrypt(rb[4].value,crypto,alg)
        bcrypt.hash(rb[4].value,10, function(err,hash){
            createAccount(rb[0].value, rb[1].value, rb[2].value, rb[3].value, hash, rb[5].value, rb[6].value, rb[7].value,db,rb[8].value)
        })
        res.json({
            status:'success',
            data: req.body
        })
        res.end()
    },
    //Creates new node and encrypts password.
    this.newNode = function(req,res,db,crypto,alg){
        //req: everything your are sending over
        const rb = req.body;
        // rb[3] = encrypt(rb[3].value,crypto,alg)
        bcrypt.hash(rb[3].value,10, function(err,hash){
            createNode(rb[0].value,rb[1].value,rb[2].value,hash,rb[4].value,db)
        })
        
        res.json({
            status:'success',
            data: req.body
        })
        res.end()
    }
};