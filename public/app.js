import React, { Component } from 'react';
import "./index.css";

class App extends Component {
  render() {
    return (
    <html>
        <head>
            <meta charset="UTF-8" />
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="index.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <script src="../jquery.js"></script>
            <script src="match.js"></script>
            <script src="users.js"></script>
            <title>Home</title>
        </head>
        <body>
        <header>
            <div class="user_info">
            <div class="profile">
                <span id="profile_overlay">edit</span>
                <img id="profile" src="profile.png" alt="profile" width="60px" height="60px"/>
            </div>
            
            <h3>Name</h3>
            </div>
            <nav id="main_nav">
            <a href="#dashboard_sec" >Dashboard <i class="material-icons">rss_feed</i></a>
            <a href="#intrests_sec">My Intrests <i class="material-icons">favorite_border</i></a>
            <a href="#mentors_sec">My Mentors <i class="material-icons">face</i></a>
            <a href="#">Sign Out <i class="material-icons">exit_to_app</i></a>
            </nav>
        </header>
        <div class="section" id="dashboard_sec">
            <h1>Dashboard</h1>
            <div class="dash_container">
                <div class="messages">
                <p class="subheader">Messages</p>
                <div id="events"></div>
                </div>
                <div class="events">
                <p class="subheader">Events</p>
                <div id="events">
                    <div class="eventContainer">
                    <div id="date">10/10/19</div>
                    <div id="todo">Meet with mentor.</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="section" id="intrests_sec">
            <h1>Your Interests</h1>
            <form action="" id="formFields">
            <input type="text" id="search" placeholder="keywords"/>
            <button id="searchBTN"><i class="material-icons">search</i></button>
            </form>
            <div id="interests">
            <p class="subheader">Fields</p>
            </div>
        </div>
        <div class="section" id="mentors_sec">

        </div>
        </body>
    </html>
    );
  }
}
export default App;

