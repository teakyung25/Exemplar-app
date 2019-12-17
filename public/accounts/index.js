$(async function(){
    let newFields = [];
    console.log("JS Initialized")
    let nodeList;
    async function fetchData (url, info) {
        const options = {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(info)
        }
        let response = await fetch(url,options)
        let data = await response.json()
        return data
    }
    let nodes = await fetchData('/nodes', {'giveme' : ''})
    if(nodes.length != 0){
        nodes.forEach(e => {
            $("#nodeSelected").append(`<option value="${e.node_name}" >${e.node_name}</option>`)
        });
    }
    $("#login").on('submit', async function(e){
        e.preventDefault();
        let details = $('#form_login').serializeArray();
        let passport = {username:details[0].value,password:details[1].value}
        console.log(passport)
        const options = {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(passport)
        }
        const response = await fetch('/userAuth', options)
        // const yes = await response.json()
        location.href = response.url; // TO-DO: CREATE A BETTER WAY TO DO THIS PLEASE
        // console.log(yes)
        // const valid_user = await response.json()
        // if(valid_user.success){

        // }
    })
    $("#nodeJoinCode").change(async function(){
        let details = [$("#nodeSelected :selected").val(),$("#nodeJoinCode").serializeArray()]
        console.log(details[1][0].value)
        if(details[0] == ""){
            alert("Enter Your Node Before Your Join Code!")
        } else {
            const options = {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({'nodeName':details[0],'jCode':details[1][0].value})
            }
            const response = await fetch('/nodeCode', options)
            const isvalid = await response.json()
            if(isvalid.result){
                $("#fieldBank").remove("#fieldAdded")
                isvalid.fields.forEach(e => {
                    $("#fieldBank").append(`<option value="${e}" id="fieldAdded">${e}</option>`)
                })
            } else{
                alert("Invalid Join Code.")
            }
        }
    })
    $("#createAccount").on('submit', async function(e){
        e.preventDefault();
        let details = $("#form_newAccount").serializeArray();
        console.log(details);
            if(details[6].value == details[7].value){
                let verifiedPass = details[6]
                let isMentor = details[8].value == 'mentor' ? true : false
                let fieldList = []
                details.slice(9,(details.length-1)).forEach( e => {
                    fieldList.push(e.value)
                })
                console.log(fieldList)
                console.log(details.slice(9,(details.length-1)))
                var userinfo = [details[2],details[3],details[4],details[5], verifiedPass, {name:'isMentor', value:isMentor},{name:'fieldList', value:fieldList.toString()},details[details.length-1],details[0]]
                const optionsUsername = {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({username:details[4].value})
                }
                const options = {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(userinfo)
                }
                const response = await fetch('/verifyUsername', optionsUsername)
                const usernameOg = await response.json()
                console.log(usernameOg.result);
                if(usernameOg.result){
                    const res = await fetch('/newUser', options)
                    const data = await res.json()
                    console.log(data);
                } else{
                    alert('username is already taken')
                }
            }else{
                alert("Passwords do not match!");  
            }
    });
    $("#addField_btn").on('click', function(e){
        e.preventDefault()
        let detail = ($("#fieldAdd").serializeArray())[0].value
        if(detail == "" || newFields.includes(detail)){
            alert("Please add a field or add a new field.")
        } else{
            $('#fields').append(`<div class="newField">`+detail+`</div>`)
            newFields.push(detail)
            console.log(newFields)
            $(".newField").on('dblclick', function(){
                newFields.splice(newFields.indexOf(this.textContent))
                this.remove()
                console.log(newFields)
            })
        }
    })
    $("#createNode").on('submit', async function(e){
        e.preventDefault()
        let details = $("#form_newNode").serializeArray()
            if(details[3].value == details[4].value){
                let verifiedPass = details[3]
                // {name:'newFields', value:newFields}
                var nodeInfo = [details[0],details[1],details[2],verifiedPass, {name:'newFields', value:newFields.toString()}]
                const optionOtherNode = {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({nodeName:details[0].value})
                }
                const options = {
                    method:'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(nodeInfo)
                }
                const response = await fetch('/verifyNode', optionOtherNode)
                const nodeOg = await response.json()
                console.log(nodeOg.result);
                if(nodeOg.result){
                    const res = await fetch('/newNode', options)
                    // const data = await res.json()
                    // console.log(data);
                } else{
                    alert('There seems to be another node with your Name, Location, and Join Code. Please change your Name or Join Code.')
                }
            }else{
                alert("Passwords do not match!");  
            }
    });
});
