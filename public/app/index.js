$(async function(){
    async function fetchData (url,info) {
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
    async function sendData (url, info) {
        const options = {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(info)
        }
        let send = await fetch(url,options)
    }
    function renderElement(element, domContainer) {
        ReactDOM.render(element, domContainer);
    }
    //Events System
    let eventsDetail = [];
    $('#add_event').on('click', () => {
        $('.modals').css('display','block')
    })

    //Messaging Dashboard Load
    let messages = await fetchData('/api/userMessages', {user})
    console.log(messages[0].messages)
    if(messages[0].messages != null){
        const dash_messages = messages[0].messages.map((messageData) =>
        <div key={messageData[0]} className="eventContainer">
        <div id="subject">{messageData[0] + " from " + messageData[4]}</div>
            <div id="message">{messageData[1]}</div>
            <div id="data-time">{messageData[2] + " " + messageData[3]}</div>
        </div>
    );
    renderElement(<div class="eventsContainer">{dash_messages}</div>, $('#dash_messages')[0])
    }

    //BTN to cancel adding an event
    $('#cancelBtn').on('click', () => {$('.modals').css('display','none')})

    //Fetching User Events 
    let events = await fetchData('/api/getEvents',{user:user.username})
    if (events.data != null) {
        console.log(events.data)
        events.data.forEach(element => {
            eventsDetail.push({eventTitle:element[0],event_time: element[2]})
        });
        eventsAppend(events)
        function eventsAppend(eventsElem){
            const eventItems = eventsElem.data.map((event) =>
                <div key={event[0]} className="eventContainer">
                    <div id="date">{event[1]}</div>
                    <div id="todo">{event[0]}</div>
                </div>
            );
        let eventContainer = document.querySelector('#events');
        renderElement(<div class="eventsContainer">{eventItems}</div>,eventContainer)
    }

    }
    
    //Adding an user event 
    $('#event_form').on('submit', async function(e) {
        e.preventDefault();
        let data = $('#event_form').serializeArray();
        let formated = {event_title:data[0].value,event_date:data[1].value,event_time:data[2].value,username:user.username}
        sendData('/api/userEvents',formated);
        let events = await fetchData('/api/getEvents',{user:user.username})
        console.log((events.data))
        location.reload()
        $('.modals').css('display','none')
    })

    // Fetching user role mentee or mentor
    let role = await fetchData('/api/role',{user:user.username})
    console.log(role.role)

    //Getting AssoNode
    let AssoNode = await fetchData('/api/assoNode',{user:user.username})
    console.log(AssoNode.asso_node);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Messaging System
    // let getUserMentors = await fetchData('/api/userMessages/',{data:data})
    $("#message_form").on('submit', async function(e) {
        e.preventDefault();
        let data = $('#message_form').serializeArray();
        console.log(data)
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let formated = {recipient:data[0].value, subject:data[1].value,newMessage:data[2].value, sender:user.username, time:time, date: date}
        console.log(formated)
        let sendMessage = sendData('/api/senduserMessages/',{formated})
    }) 
    async function load_for_mentee() {
        $('#mentors_sec').load('menteemymentors.html');
        $('#mentors_tab').text('My Mentors')
        let menteePendingMentors = await fetchData('/api/getPending',{user})
        if(menteePendingMentors[0].pending_users != null){
            console.log(menteePendingMentors)
            const pendingMentors = (menteePendingMentors[0].pending_users).map((mentor) =>
                <div key={mentor} className="mentor_mentees mentees_div" value={mentor}>{mentor}</div>
            );
            renderElement(<div id="mentorMentees">{pendingMentors}</div>, $('#userPendingMentors')[0])
        }
        //Fetch and load user mentors//
        let userMentors = await fetchData('/api/userMentors',{user})
        console.log(userMentors)
        if(userMentors[0].asso_users == null || userMentors[0].asso_users.length == 0){
            console.log($('#userMentors')[0])
            renderElement(<p id="warning">You have not selected any Mentors under your account.</p>,$('#userMentors')[0])
        } else {
            const menteeMentors = (userMentors[0].asso_users).map((mentor) =>
                <div key={mentor} className="mentor_mentees mentees_div" value={mentor}>{mentor}</div>
            );
            renderElement(<div id="userMentee_Mentors">{menteeMentors}</div>, $('#userMentors')[0])
        }
    }
    console.log(role.role)
    if (!role.role) {
        load_for_mentee()
    } else {
        $('#mentors_sec').load('mentormymentees.html')
        $('#mentors_tab').text('My Mentees')
        let mentees = await fetchData('/api/getPending', {user})
        console.log(mentees[0].pending_users)
        const pendingItems = (mentees[0].pending_users).map((mentee) =>
            <div key={mentee} className="verifyMentee_on_mentor mentees_div" value={mentee}>{mentee}<span className="grow"></span><button id={'acceptButton' + mentee} type='button' className="destyle_btn"><i className="material-icons">done</i></button><button id={'declineButton' + mentee} type='button' className="destyle_btn"><i className="material-icons">close</i></button></div>
        );
        renderElement(<div id="pendingUsers">{pendingItems}</div>,$('#pendingMentees')[0]);
        //approve or decline on mentor side
        mentees[0].pending_users.forEach((e)=>{
            $('#acceptButton'+e).click( async ()=>{
                let mentee = ($('#acceptButton'+e).parent()[0]).attributes[1].value;
                console.log(mentee)
                sendData('/api/approveMentee',{mentee,user})
                .then(async (data)=>{
                    console.log(data)
                    $('#acceptButton'+e).css('color','rgb(10,220,10)')
                    $('#acceptButton'+e).click(()=>{})
                    mentees[0].pending_users.splice(mentees[0].pending_users.indexOf(mentee),1)
                    console.log(mentees[0])
                    sendData('/api/updatePendingforMentor',{user,mentees})
                    sendData('/api/updateMenteeSideMentor',{user,mentee})
                    let menteePendingMentors = await fetchData('/api/getPending',{user:{username:mentee}})
                    menteePendingMentors[0].pending_users.splice(menteePendingMentors[0].pending_users.indexOf(user.username),1)
                    sendData('/api/menteePendingMentors',{mentee,menteePendingMentors})
                    location.reload()
                })
            })
        })
        let approvedMentees = await fetchData('/api/fetchApprovedMentee',{user})
        if(approvedMentees[0].asso_users != null){
            console.log(approvedMentees)
            const mentorMentees = (approvedMentees[0].asso_users).map((mentee) =>
                <div key={mentee} className="mentor_mentees mentees_div" value={mentee}>{mentee}<span className="grow"></span><button id={'declineButton' + mentee} type='button' className="destyle_btn"><i className="material-icons">close</i></button></div>
            );
            renderElement(<div id="mentorMentees">{mentorMentees}</div>, $('#userMentees')[0])
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Grabing Mentor List from Node for Messaging System
    if (!role.role) {
        let mentors = await fetchData('/api/nodeMenotrs', AssoNode)
        const listItems = mentors.map((mentor) =>
            <option key={mentor.username} value={mentor.username} name={mentor.firstname + " " + mentor.lastname}>{mentor.firstname + " " + mentor.lastname}</option>
        );
        const domContainer = document.querySelector('#recipients_container');
        renderElement(<datalist id="recipients">{listItems}</datalist>,domContainer);
        $('#mentor_search').click(async ()=>{
            let data = $('#search').serializeArray();
            console.log(data);
            let mentorz = await fetchData('/api/allMentorsforUser', {user})
            let ments = mentorz[0].asso_users + mentorz[0].pending_users

            if (ments.includes(data[0].value)) {
                alert('Invalid. Mentor already in your pool.')
            }else{
            sendData('/api/requesttomentor',{mentor:data[0].value,user})
            .then(()=>{
                $('#request_btn').text('Request Succesful!')
                $('#request_btn').click(()=>{})
            })}
        })
    }else {
        let mentees = await fetchData('/api/nodeMentees', AssoNode)
        const listItems = mentees.map((mentor) =>
            <option key={mentor.username} value={mentor.username} name={mentor.firstname + " " + mentor.lastname}>{mentor.firstname + " " + mentor.lastname}</option>
        );
        console.log(mentees)
        const domContainer = document.querySelector('#recipients_container');
        renderElement(<datalist id="recipients">{listItems}</datalist>,domContainer);

    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Fields Page
    //Getting Node Fields 
    let nodeFields = await fetchData('/api/getNodeFields',AssoNode)
    console.log((nodeFields[0].fields))
    const nodeFieldsDOM = nodeFields[0].fields.map((field) =>
        <button key={field} value={field} className="destyle_btn nodeField_btn">{field}</button>
    );
    ReactDOM.render(<div className="nodeInterests">{nodeFieldsDOM}</div>, document.querySelector('#nodeFields'));
    //Getting user Fields
    let userFields = await fetchData('/api/getUserFields',{user:user.username})
    console.log(userFields[0].fields)
    userFieldsAppend(userFields[0].fields);
    function userFieldsAppend(data){
        const userFieldsDOM = data.map((field) =>
            <button key={field} className="destyle_btn userField_btn userField_notselected">{field}</button>
        );
        ReactDOM.render(<div id="userInterests">{userFieldsDOM}</div>, document.querySelector('#interests'));
    }
    //Null buttons for already used fields
    let userFieldsofNodeFields = document.querySelectorAll('.nodeField_btn');
    for (const userFieldofNodeField of userFieldsofNodeFields) {
        userFields[0].fields.forEach((e)=>{
            if(e == userFieldofNodeField.value){
                userFieldofNodeField.disabled = true
                // userFieldofNodeField.classList.remove('nodeField_btn')
                userFieldofNodeField.classList.add('null_btn')
                console.log(userFieldofNodeField)
            }
        })
    }
    //Adding Fields to User Fields
    //Selecting Node Fields
    $('.nodeField_btn').click(function(){
        $(this).toggleClass('nodeField_selected');
        nodeField_selectedUpdate();
    })
    //Adds to user fields 
    $('#add_fields').click(function(){
        let nodeField_selected = document.querySelectorAll('.nodeField_selected');
        let nodeField_selElm = [];
        for (const nodeField_ed of nodeField_selected.values()) {
            console.log(nodeField_ed.textContent)
            nodeField_selElm.push(nodeField_ed.textContent);
        }
        sendData('/api/addUserFields',{fields:nodeField_selElm,user});
        location.reload()
    })
    function nodeField_selectedUpdate(){
        let nodeField_selected = document.querySelectorAll('.nodeField_selected');
        // userFieldsAppend(nodeField_selElm)
        if(nodeField_selected.length != 0){
            $('#add_fields').css('display','flex')
        } else {
            $('#add_fields').css('display','none')
        }
    }
    //Select User Fields
    $('.userField_btn').click(function(){
        $(this).toggleClass('userField_selected userField_notselected');
        userField_selectedUpdate()
    })
    //Removes fields from user fields
    $('#remove_fields').click(function(){
        let userField_selected = document.querySelectorAll('.userField_notselected'); 
        let userField_selElm = [];
        for (const userFieldDelete of userField_selected.values()) {
            console.log(userFieldDelete.textContent)
            userField_selElm.push(userFieldDelete.textContent);
        }
        console.log(userField_selElm)
        sendData('/api/updateUserFields',{fields:userField_selElm,user});
        location.reload()
    })
    function userField_selectedUpdate(){
        let userField_selected = document.querySelectorAll('.userField_selected');
        console.log(userField_selected)
        if(userField_selected.length != 0){
            $('#remove_fields').css('display','flex')
        } else {
            $('#remove_fields').css('display','none')
        }

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //User Mentor Section
    if (!role.role) {
    $('#userMentorBTN').click(() => {
        $('#userMentorBTN').addClass('selected');
        $('#findMentorBTN').removeClass('selected');
        $('#userMentor_container').css('display','block');
        $('#newMentor_container').css('display','none');
    })
    $('#findMentorBTN').click(() => {
        $('#findMentorBTN').addClass('selected');
        $('#userMentorBTN').removeClass('selected');
        $('#userMentor_container').css('display','none');
        $('#newMentor_container').css('display','block');
    })



    //Add new user selected mentors//
    //auto match
    $('#auto_match').click(async ()=>{
        let activeMentors = await fetchData('/api/activeMentors', AssoNode)
        let results = matchmaker(activeMentors,userFields[0].fields)
        console.log(results)
        let mentorDetails = await fetchData('/api/mentorDetails', {results});
        console.log(mentorDetails)
        const userMentor_elements = mentorDetails.map((detail) =>
            <div key={detail.username} value={detail.username} className="userMentor_eContainer">
                <div class="userMentor_e" id="userMentor_eHeader">{detail.firstname + " " + detail.lastname}</div>
                <div class="userMentor_e" id="userMentor_eContent">
                    <p>{detail.description}</p>
                    <p id="fieldsInterest">Fields of Interest: <span id='userMentor_eFields'>{detail.fields}</span></p>
                    <button className="request_btn destyle_btn" id={'request_btn' + detail.username}>Request to Join</button>
                </div>
            </div>
        );
        renderElement(<div id="automatch_container">{userMentor_elements}</div>,$('#autoMatch_results')[0]);
        //Null buttons for already used fields
        let requests = $('.userMentor_eContainer').find('.request_btn')
        let other = $('.userMentor_eContainer')
        console.log(requests)
        // document.querySelectorAll('.request_btn');
        
        for (const req of requests) {
            let userMentors = await fetchData('/api/allMentorsforUser',{user})
            let ments = userMentors[0].asso_users + userMentors[0].pending_users
            console.log(ments)
            for (let o of other) {
                console.log()
                if (ments.includes(o.attributes[0].value)) {
                    req.disabled = true
                    req.classList.add('null_btn')
                    req.innerHTML = 'Invalid Option'
                    req.style.color = 'black'
                    // o.classList.add('null_option')
                    // console.log('Yes. This element right here, officer.')
                }
            }
            // req[0].fields.forEach((e)=>{
            //     if(e == userFieldofNodeField.value){
            //         userFieldofNodeField.disabled = true
            //         // userFieldofNodeField.classList.remove('nodeField_btn')
            //         userFieldofNodeField.classList.add('null_btn')
            //         console.log(userFieldofNodeField)
            //     }
            // })
        }
        mentorDetails.forEach((e)=>{
            $('#request_btn'+e.username).click( async ()=>{
                let mentor = ($('#request_btn'+e.username).parent().parent()[0]).attributes[0].value;
                sendData('/api/requesttomentor',{mentor,user})
                sendData('/api/pendingMenteeMentors',{mentor,user})
                .then(()=>{
                    $('#request_btn'+e.username).text('Request Succesful!')
                    $('#request_btn'+e.username).click(()=>{})
                })
            })
        })

    })}
    /////////////////////////////////////////////////////////////////////////////////////////////////



}) 
