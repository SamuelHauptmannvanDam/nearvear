// Checks if user is signed in
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        let uid = user.uid;
        // console.log("We are logged in") 
        // console.log(uid) 

    }  else {
        
        // console.log("logging in anonymously.") 

        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

      }
});

//MAIN BOX
const flexBox = document.createElement('flexBox');
flexBox.id = "flexBoxID";
document.body.appendChild(flexBox);


// CENTER HORIZONTAL
const centeringBox = document.createElement('centeringBox');
centeringBox.id = "CenteringBoxID";
flexBox.appendChild(centeringBox);


// my 3 main boxes
const topBox = document.createElement('topBox');
centeringBox.appendChild(topBox);

const midBox = document.createElement('midBox');
centeringBox.appendChild(midBox);

// const centeringVerticallyBox = document.createElement('centeringVerticallyBox');
// midBox.appendChild(centeringVerticallyBox);


//HOME ICON
const imgLogo = document.createElement('img'); 
imgLogo.src = '32px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo);


const pageTitle = document.createElement('pageTitle');
pageTitle.innerText = " Notifications";
pageTitle.onclick = function(){home()};
topBox.appendChild(pageTitle);


function home(){
    window.location='index.html';
}


const description = document.createElement('description');
description.innerText = "Email notifications when:";
midBox.appendChild(description);

// ----------------------------------------- SUNDAY CONFESSION
const sundayConfessionBox = document.createElement('sundayConfessionBox');
midBox.appendChild(sundayConfessionBox);

const sundayConfessionDescription = document.createElement('sundayConfessionDescription');
sundayConfessionDescription.innerText = "Time for Sunday confession"
sundayConfessionBox.appendChild(sundayConfessionDescription);

const sundayConfessionButton = document.createElement('sundayConfessionButton');
sundayConfessionButton.onclick = function(){toggleSundayConfession()};
sundayConfessionBox.appendChild(sundayConfessionButton);


// -----------------------------------------NEW MESSAGE BOX
const newMessageBox = document.createElement('newMessageBox');
midBox.appendChild(newMessageBox);

const newMessageDescription = document.createElement('newMessageDescription');
newMessageDescription.innerText = "New messages in conversations"
newMessageBox.appendChild(newMessageDescription);

const newMessageButton = document.createElement('newMessageButton');
newMessageButton.onclick = function(){toggleNewMessages()};
newMessageBox.appendChild(newMessageButton);


// -----------------------------------------SOMEONE LOVE YOUR CONFESSION
const someoneLoveYouBox = document.createElement('someoneLoveYouBox');
midBox.appendChild(someoneLoveYouBox);

const someoneLoveYouDescription = document.createElement('someoneLoveYouDescription');
someoneLoveYouDescription.innerText = "Someone loves your confession"
someoneLoveYouBox.appendChild(someoneLoveYouDescription);

const someoneLoveYouButton = document.createElement('someoneLoveYouButton');
someoneLoveYouButton.onclick = function(){toggleLove()};
someoneLoveYouBox.appendChild(someoneLoveYouButton);



// -----------------------------------------SOMEONE FOUND YOU TRUSTWORTHY
const someoneFoundYouTrustworthyBox = document.createElement('someoneFoundYouTrustworthyBox');
midBox.appendChild(someoneFoundYouTrustworthyBox);

const someoneFoundYouTrustworthyDescription = document.createElement('someoneFoundYouTrustworthyDescription');
someoneFoundYouTrustworthyDescription.innerText = "Someone found you trustworthy"
someoneFoundYouTrustworthyBox.appendChild(someoneFoundYouTrustworthyDescription);

const someoneFoundYouTrustworthyButton = document.createElement('someoneFoundYouTrustworthyButton');
someoneFoundYouTrustworthyButton.onclick = function(){toggleTrustworthy()};
someoneFoundYouTrustworthyBox.appendChild(someoneFoundYouTrustworthyButton);



// ADD EMAIL 

// const descriptionEmail = document.createElement('descriptionEmail');
// descriptionEmail.innerText = "Add your Email:";
// descriptionEmail.className = "description"
// midBox.appendChild(descriptionEmail);

const textarea = document.createElement('input');
textarea.maxLength = 3000;
textarea.id = "emailTextArea";
textarea.autocomplete = "email";
textarea.placeholder = "Add Email";
midBox.appendChild(textarea);

const add = document.createElement('add');
add.innerText = "Add Email";
add.onclick = function(){addEmail()};
midBox.appendChild(add);

const clearEmail = document.createElement('clearEmail');
clearEmail.innerText = "Remove email";
clearEmail.onclick = function(){clearEmailFunction()};
midBox.appendChild(clearEmail);



const bottomBox = document.createElement('bottomBox');
bottomBox.id = "bottomBoxID";
centeringBox.appendChild(bottomBox);


// -----------------------------------------BOTTOM BOX BUTTONS

const talk = document.createElement('talk');
// talk.innerText = "Confess";
talk.onclick = function(){talkLink()};
talk.onmouseover = function(){changeConfessToWhite()};
talk.onmouseout = function(){changeConfessToBlack()};
bottomBox.appendChild(talk);

const confessIcon = document.createElement('img'); 
confessIcon.src = 'confess.svg';
confessIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))"; 
talk.appendChild(confessIcon); 

const confessButtonText = document.createElement('confessButtonText');
confessButtonText.innerText = "Confess";
talk.appendChild(confessButtonText); 

function changeConfessToWhite(){
    confessIcon.src = 'confessWhite.svg';
}

function changeConfessToBlack(){
    confessIcon.src = 'confess.svg';
}


function talkLink(){
    
    window.location='talk.html';
}

const listen = document.createElement('listen');
// listen.innerText = "Listen";
listen.onclick = function(){allQuestionsLink()};
listen.onmouseover = function(){changeListenToWhite()};
listen.onmouseout = function(){changeListenToBlack()};
bottomBox.appendChild(listen);

const listenIcon = document.createElement('img'); 
listenIcon.src = 'confessionsBlack.svg'; 
listenIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))"; 
listen.appendChild(listenIcon); 

const listenButtonText = document.createElement('listenButtonText');
listenButtonText.innerText = "Confessions";
listen.appendChild(listenButtonText); 

function changeListenToWhite(){
    listenIcon.src = 'confessionsWhite.svg';
}

function changeListenToBlack(){
    listenIcon.src = 'confessionsBlack.svg';
}

// Changed to allQuestions, instead of your feelings.
function allQuestionsLink() {
    window.location='allQuestions.html';
}



const yourConversations = document.createElement('yourConversations');
yourConversations.onclick = function(){YourConversationsLink()};
bottomBox.appendChild(yourConversations);

checkNotificationLight()
function checkNotificationLight(){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
        console.log(uid)
        database.ref().child("Settings").child("yourConversations").child("notificationLight").child(uid).child("seen").once('value').then(function(snapshot) {
            if (snapshot.exists()) {
                if(snapshot.val() == "unseen"){
                  changeConversationsToWhite()
                  yourConversations.style.backgroundColor = "black"
                  yourConversations.style.color = "white"
                    // do nothing 
                } else {
                  yourConversations.onmouseover = function(){changeConversationsToWhite()};
                  yourConversations.onmouseout = function(){changeConversationsToBlack()};
                }
            } 
        });
    }
  });
  
}




const conversationsIcon = document.createElement('img'); 
conversationsIcon.src = 'conversationsBlack.svg'; 
conversationsIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))"; 
yourConversations.appendChild(conversationsIcon); 

const conversationsButtonText = document.createElement('listenButtonText');
conversationsButtonText.innerText = "Conversations";
yourConversations.appendChild(conversationsButtonText); 

function changeConversationsToWhite(){
    conversationsIcon.src = 'conversationsWhite.svg';
}

function changeConversationsToBlack(){
    conversationsIcon.src = 'conversationsBlack.svg';
}

function YourConversationsLink() {
  
    // change Notification Light To Seen
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let uid = user.uid;
  
        // Changes the color of the "conversation button" under allQuestions, to indicate someone answered you haven't seen.
        database.ref('Settings').child("yourConversations").child("notificationLight").child(uid).set({
          seen: "seen",
        }); 
  
        window.location='yourConversations.html';
      }
    });
     
  }




const you = document.createElement('you');
// you.innerText = "You";
you.onclick = function(){settingsLink()};
you.onmouseover = function(){changeYouToWhite()};
you.onmouseout = function(){changeYouToBlack()};
bottomBox.appendChild(you);

const youIcon = document.createElement('img'); 
youIcon.src = 'youBlack.svg'; 
youIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))"; 
you.appendChild(youIcon); 

const youButtonText = document.createElement('youButtonText');
youButtonText.innerText = "Settings";
you.appendChild(youButtonText); 

function changeYouToWhite(){
    youIcon.src = 'youWhite.svg';
}

function changeYouToBlack(){
    youIcon.src = 'youBlack.svg';
}

function settingsLink(){
    window.location='settings.html';
}


// -----------------------------------------BOTTOM BOX BUTTONS ENDS
// -----------------------------------------BOTTOM BOX BUTTONS ENDS



//Connect to database
let database = firebase.database();

let firebaseTimestamp = 0;
let localNumber = 999999999999999;


database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })





function addEmail() {

    let timestampReverse = localNumber - Object.values(firebaseTimestamp);
    let email = document.getElementById("emailTextArea").value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            
            database.ref('Emails').child(uid).child("email").set({
                
                email: document.getElementById("emailTextArea").value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                timestampReverse: timestampReverse,
                creatorID: uid,
                // seen: "unseen"
                
            });  
        }

        let email = document.getElementById("emailTextArea").value;
        textarea.value = '';    
        textarea.placeholder = 'Email Added: ' + email;  
    });

}


function clearEmailFunction() {

    let timestampReverse = localNumber - Object.values(firebaseTimestamp);
    
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let uid = user.uid;
                
                database.ref('Emails').child(uid).child("email").update({
                    
                    email: "",
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                    creatorID: uid,
                    // seen: "unseen"
                    
                });  

            }
            
            clearEmail.innerText = "Removed";    
            clearEmail.style.backgroundColor = "black";
            clearEmail.style.color = "white";
            clearEmail.style.borderColor = "white";

            
        });

}




// ----------------------------------------------------- CHECKING SETTINGS INFO
setSettingsIfNotSet()
function setSettingsIfNotSet(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK NEW MESSAGE
            database.ref('Emails').child(uid).child("settings").child("newMessage").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Emails').child(uid).child("settings").child("newMessage").set({
                        newMessage: "on",
                    });
                } 
            });

            database.ref('Emails').child(uid).child("settings").child("weekly").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Emails').child(uid).child("settings").child("weekly").set({
                        weekly: "on",
                    });
                } 
            });

            database.ref('Emails').child(uid).child("settings").child("newFeeling").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Emails').child(uid).child("settings").child("newFeeling").set({
                        newFeeling: "on",
                    });
                } 
            });

            database.ref('Emails').child(uid).child("settings").child("love").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Emails').child(uid).child("settings").child("love").set({
                        love: "on",
                    });
                } 
            });

            database.ref('Emails').child(uid).child("settings").child("trustworthy").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Emails').child(uid).child("settings").child("trustworthy").set({
                        trustworthy: "on",
                    });
                } 
            });
        }
    });
}


// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS
// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS
// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS


// ----------------------------------------------------- CHECKING SETTINGS INFO FOR NEW MESSAGE
checkNewMessagesSetting()
function checkNewMessagesSetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("newMessage").child("newMessage").once('value').then(function(snapshot) {

                // SET VISUALS
                if(snapshot.val() == "off"){
                    newMessageButton.style.backgroundColor = "white";
                    newMessageButton.style.color = "black";
                    newMessageButton.style.borderColor = "black";
                    newMessageButton.innerText = "OFF"
           
                } else {
                    newMessageButton.style.backgroundColor = "black";
                    newMessageButton.style.color = "white";
                    newMessageButton.style.borderColor = "black";
                    newMessageButton.innerText = "ON"
                }
              
            });
        }
    });
}

function toggleNewMessages(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
         

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("newMessage").child("newMessage").once('value').then(function(snapshot) {

                if (snapshot.val() == "on") {
                    console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("newMessage").set({newMessage: "off"}); 
                    newMessageButton.style.backgroundColor = "white";
                    newMessageButton.style.color = "black";
                    newMessageButton.style.borderColor = "black";
                    newMessageButton.innerText = "OFF" 
                } else{
                    console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("newMessage").set({newMessage: "on"});
                    newMessageButton.style.backgroundColor = "black";
                    newMessageButton.style.color = "white";
                    newMessageButton.style.borderColor = "black";
                    newMessageButton.innerText = "ON"
                }
            });
        }
    });
}




// ----------------------------------------------------- CHECKING SETTINGS INFO FOR LOVE
checkLoveSetting()
function checkLoveSetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("love").child("love").once('value').then(function(snapshot) {
            
                // SET VISUALS
                if(snapshot.val() == "off"){
                    someoneLoveYouButton.style.backgroundColor = "white";
                    someoneLoveYouButton.style.color = "black";
                    someoneLoveYouButton.style.borderColor = "black";
                    someoneLoveYouButton.innerText = "OFF"
           
                } else {
                    someoneLoveYouButton.style.backgroundColor = "black";
                    someoneLoveYouButton.style.color = "white";
                    someoneLoveYouButton.style.borderColor = "black";
                    someoneLoveYouButton.innerText = "ON"
                }
              
            });
        }
    });
}

function toggleLove(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("love").child("love").once('value').then(function(snapshot) {

                if (snapshot.val() == "on") {
                    console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("love").set({love: "off"}); 
                    someoneLoveYouButton.style.backgroundColor = "white";
                    someoneLoveYouButton.style.color = "black";
                    someoneLoveYouButton.style.borderColor = "black";
                    someoneLoveYouButton.innerText = "OFF" 
                } else{
                    console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("love").set({love: "on"});
                    someoneLoveYouButton.style.backgroundColor = "black";
                    someoneLoveYouButton.style.color = "white";
                    someoneLoveYouButton.style.borderColor = "black";
                    someoneLoveYouButton.innerText = "ON"
                }
            });
        }
    });
}








// ----------------------------------------------------- CHECKING SETTINGS INFO FOR TRUSTWORHY
checkTrustworthySetting()
function checkTrustworthySetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("trustworthy").child("trustworthy").once('value').then(function(snapshot) {
            
                // SET VISUALS
                if(snapshot.val() == "off"){
                    someoneFoundYouTrustworthyButton.style.backgroundColor = "white";
                    someoneFoundYouTrustworthyButton.style.color = "black";
                    someoneFoundYouTrustworthyButton.style.borderColor = "black";
                    someoneFoundYouTrustworthyButton.innerText = "OFF"
           
                } else {
                    someoneFoundYouTrustworthyButton.style.backgroundColor = "black";
                    someoneFoundYouTrustworthyButton.style.color = "white";
                    someoneFoundYouTrustworthyButton.style.borderColor = "black";
                    someoneFoundYouTrustworthyButton.innerText = "ON"
                }
              
            });
        }
    });
}



function toggleTrustworthy(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
           

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("trustworthy").child("trustworthy").once('value').then(function(snapshot) {

                if (snapshot.val() == "on") {
                    console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("trustworthy").set({trustworthy: "off"}); 
                    someoneFoundYouTrustworthyButton.style.backgroundColor = "white";
                    someoneFoundYouTrustworthyButton.style.color = "black";
                    someoneFoundYouTrustworthyButton.style.borderColor = "black";
                    someoneFoundYouTrustworthyButton.innerText = "OFF" 
                } else{
                    console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("trustworthy").set({trustworthy: "on"});
                    someoneFoundYouTrustworthyButton.style.backgroundColor = "black";
                    someoneFoundYouTrustworthyButton.style.color = "white";
                    someoneFoundYouTrustworthyButton.style.borderColor = "black";
                    someoneFoundYouTrustworthyButton.innerText = "ON"
                }
            });
        }
    });
}









// ----------------------------------------------------- CHECKING SETTINGS INFO FOR SUNDAY CONFESSION
checkSundayConfessionSetting()
function checkSundayConfessionSetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
           

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("weekly").child("weekly").once('value').then(function(snapshot) {
            
                // SET VISUALS
                if(snapshot.val() == "off"){
                    sundayConfessionButton.style.backgroundColor = "white";
                    sundayConfessionButton.style.color = "black";
                    sundayConfessionButton.style.borderColor = "black";
                    sundayConfessionButton.innerText = "OFF"
           
                } else {
                    sundayConfessionButton.style.backgroundColor = "black";
                    sundayConfessionButton.style.color = "white";
                    sundayConfessionButton.style.borderColor = "black";
                    sundayConfessionButton.innerText = "ON"
                }
              
            });
        }
    });
}


function toggleSundayConfession(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("weekly").child("weekly").once('value').then(function(snapshot) {

                if (snapshot.val() == "on") {
                    console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("weekly").set({weekly: "off"}); 
                    sundayConfessionButton.style.backgroundColor = "white";
                    sundayConfessionButton.style.color = "black";
                    sundayConfessionButton.style.borderColor = "black";
                    sundayConfessionButton.innerText = "OFF" 
                } else{
                    console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("weekly").set({weekly: "on"});
                    sundayConfessionButton.style.backgroundColor = "black";
                    sundayConfessionButton.style.color = "white";
                    sundayConfessionButton.style.borderColor = "black";
                    sundayConfessionButton.innerText = "ON"
                }
            });
        }
    });
}


// ----------------------------------------------------- CHECKING SETTINGS INFO WEEKLY
// checkWeeklySetting()
function checkWeeklySetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("weekly").child("weekly").once('value').then(function(snapshot) {

                // SET VISUALS
                if(snapshot.val() == "off"){
                    onceAWeekButton.style.backgroundColor = "#00695C";
                    onceAWeekButton.style.color = "white";
                    onceAWeekButton.style.borderColor = "white";
                } else {
                    onceAWeekButton.style.backgroundColor = "#00695C";
                    onceAWeekButton.style.color = "white";
                    onceAWeekButton.style.borderColor = "white";
                }
              
            });
        }
    });
}


function toggleWeekly(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("weekly").child("weekly").once('value').then(function(snapshot) {

                // console.log(snapshot.val());
                if (snapshot.val() == "on") {
                    // console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("weekly").set({weekly: "off"});
                    onceAWeekButton.style.backgroundColor = "#b2dfdb";
                    onceAWeekButton.style.color = "white";
                    onceAWeekButton.style.borderColor = "white";
                } else{
                    // console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("weekly").set({weekly: "on"});
                    onceAWeekButton.style.backgroundColor = "#00695C";
                    onceAWeekButton.style.color = "white";
                    onceAWeekButton.style.borderColor = "white";
                }
            });
        }
    });
}


// ----------------------------------------------------- CHECKING SETTINGS INFO NEW FEELING
// checkNewFeelingSetting()
function checkNewFeelingSetting(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("newFeeling").child("newFeeling").once('value').then(function(snapshot) {

                // SET VISUALS
                if(snapshot.val() == "off"){
                    // newFeelingButton.style.backgroundColor = "#00695C";
                    newFeelingButton.style.color = "white";
                    newFeelingButton.style.borderColor = "white";
                } else {
                    newFeelingButton.style.backgroundColor = "#00695C";
                    newFeelingButton.style.color = "white";
                    newFeelingButton.style.borderColor = "white";
                }
              
            });
        }
    });
}


function toggleNewFeeling(){
  
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            //CHECK SETTINGS
            database.ref('Emails').child(uid).child("settings").child("newFeeling").child("newFeeling").once('value').then(function(snapshot) {

                console.log(snapshot.val());
                if (snapshot.val() == "on") {
                    console.log("turning off");
                    database.ref('Emails').child(uid).child("settings").child("newFeeling").set({newFeeling: "off"});
                    newFeelingButton.style.backgroundColor = "#b2dfdb";
                    newFeelingButton.style.color = "white";
                    newFeelingButton.style.borderColor = "white";
                } else{
                    console.log("turning on");
                    database.ref('Emails').child(uid).child("settings").child("newFeeling").set({newFeeling: "on"});
                    newFeelingButton.style.backgroundColor = "#00695C";
                    newFeelingButton.style.color = "white";
                    newFeelingButton.style.borderColor = "white";
                }
            });
        }
    });
}


//-------------------------------------------- SHOULD BE USED TO SHOW YOU YOUR EMAIL
checkEmailInfo()
function checkEmailInfo(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
        
            //CHECK IF MAIL EXIST
            database.ref('Emails').child(uid).child("email").child("email").once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                    textarea.placeholder = snapshot.val() + " is your current email";
                } 
            });
        }
    });
}



// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS ENDS
// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS ENDS
// ----------------------------------------------------- CHECKING SETTINGS AND TOGGLE FUNCTION FOR ALL SETTINGS ENDS

// checkLanguage()
// function checkLanguage(){

//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             let uid = user.uid;


//             database.ref('Settings').child("allQuestions").child("language").child(uid).child("language").once('value').then(function(snapshot) {

//                 if (!snapshot.exists()) {
//                     database.ref('Settings').child("allQuestions").child("language").child(uid).set({
//                         language: "English",
//                     });
//                 } else {
//                     // console.log(snapshot.val())
                   
//                     selectLanguageID.innerHTML = "Selected Language: " + snapshot.val();
//                 }
//             });
//         }
//     });

// }












checkScreenAspect()
function checkScreenAspect(){

    let w = window.innerWidth;
    let h = window.innerHeight;
    let aspectFactor = w/h;

    if(aspectFactor>1){
        document.getElementById("CenteringBoxID").style.width = "33%";

        document.getElementById("bottomBoxID").style.width = "calc(33% - 4px)";

    } else { // remove topbox for phones
        // topBox.style.display = "none";
        document.getElementById("bottomBoxID").style.width = "calc(100% - 16px)";
    }
}

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

