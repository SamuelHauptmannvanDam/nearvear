// Checks if user is signed in
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        let uid = user.uid;

    }  else {
        
   

        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

      }
});


//Connect to database
let database = firebase.database();

let firebaseTimestamp = 0;
let localNumber = 999999999999999;

database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })

// GET DATA FROM LINK
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?')).split('?');
const messageID = hashes[1];
let language = hashes[2];




// CONCEPT IS SIMPLE: 
// FLEXBOX KEEPS SCREEN AREA
// CENTERBOX KEEPS CENTER ON WIDESCREENS
// 3 BOXES IN CENTERBOX:: TOPBOX, MIDBOX, BOTTOMBOX

const flexBox = document.createElement('flexBox');
flexBox.id = "flexBoxID";
document.body.appendChild(flexBox);

const centeringBox = document.createElement('centeringBox');
centeringBox.id = "CenteringBoxID";
flexBox.appendChild(centeringBox);

// ------------------------------------------------------  TOPBOX HERE
const topBox = document.createElement('topBox');
centeringBox.appendChild(topBox);

const titleBox = document.createElement('titleBox');
topBox.appendChild(titleBox);

const imgLogo = document.createElement('img'); 
imgLogo.src = '192px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
titleBox.appendChild(imgLogo); 

const voteTitle = document.createElement('voteTitle');
voteTitle.innerText = " Vote";
voteTitle.onclick = function(){home()};
titleBox.appendChild(voteTitle);

function home(){
    window.location='index.html';
}

const descriptionBox = document.createElement('descriptionBox');
checkDescription()

function removeDescription() {
    descriptionBox.style.display = "none";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            let rootRef = database.ref().child("Settings").child("vote").child("description").child(uid).set({
                description: "off",
            });
        }        
    });
}


function checkDescription(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            database.ref().child("Settings").child("vote").child("description").child(uid).child("description").once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                    if(snapshot.val() == "off"){
                        // do nothing 
                    }
                } else{
                    topBox.appendChild(descriptionBox);
                } 
            });
        }
    });
}

const descriptionDeletionButton = document.createElement('descriptionDeletionButton');
descriptionDeletionButton.innerHTML = "&#10006;"
descriptionDeletionButton.onclick = function(){removeDescription()};
descriptionBox.appendChild(descriptionDeletionButton);

const description = document.createElement('description');
description.innerHTML = "Suggest or vote on features, you'd like to see"
descriptionBox.appendChild(description);

// ------------------------------------------------------  MIDBOX HERE
const midBox = document.createElement('midBox');
centeringBox.appendChild(midBox);

const sortingBox = document.createElement('suggestionSortingBox');
// midBox.appendChild(sortingBox);

const newestBox = document.createElement('mostRecennewestBoxtBox');
newestBox.innerHTML = "Newest"
sortingBox.appendChild(newestBox);

const mostLovedBox = document.createElement('mostLovedBox');
mostLovedBox.innerHTML = "Most Loved"
sortingBox.appendChild(mostLovedBox);

const implementedBox = document.createElement('implementedBox');
implementedBox.innerHTML = "Implemented"
sortingBox.appendChild(implementedBox);


// ------------------------------------------ GETS THE SUGGESTIONS
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
        let rootRef = database.ref('Vote').child("Suggestion");

        let count = 0;
        rootRef.on("child_added", snap => {
            count = count + 1
            let timestamp = snap.child("timestamp").val(); 
            let suggestion = snap.child("suggestion").val(); 
            let love = snap.child("love").val(); 

            const dateObject = new Date(timestamp)
            const humanDateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateObject)

            const suggestionItem = document.createElement('suggestionItem');
            const suggestionText = document.createElement('suggestionText');
            suggestionText.innerText = suggestion;
            suggestionItem.appendChild(suggestionText);
    
            const dateText = document.createElement('dateText');
            dateText.innerText = humanDateFormat;
            suggestionItem.appendChild(dateText);

            // MENU BAR
            const onMindItemMenuBar = document.createElement('onMindItemMenuBar');
            onMindItemMenuBar.onclick = function(){}; 
            suggestionItem.appendChild(onMindItemMenuBar);

            // LOVE BUTTON
            const loveButton = document.createElement('loveButton');
            loveButton.onclick = function(){changeIcon(loveIconID, messageID, creatorID)};
            loveButton.onmouseover = function(){loveIconToWhite(loveIconID)};
            loveButton.onmouseout = function(){loveIconToBlack(loveIconID)};
            onMindItemMenuBar.appendChild(loveButton);

            const loveIcon = document.createElement('img'); 
            loveIcon.src = 'loveEmptyBlack.svg'; 
            loveIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        
            // Chances icon
            let loveValue = snap.child(uid).child("love").val();
        
            if(loveValue == "filled"){
                loveIcon.src = 'loveFilledBlack.svg'; 
            } 
            
            loveIcon.id = "loveIcon"+ count;
            let loveIconID = loveIcon.id;
            loveButton.appendChild(loveIcon); 

            const loveButtonText = document.createElement('loveButtonText');
            loveButtonText.innerText = "Love: " + love;
            loveButton.appendChild(loveButtonText); 

            // ADDS THE ITEM
            midBox.appendChild(suggestionItem);
        });
    }
});


// -----------------------------------------BOTTOM BOX 

const bottomBox = document.createElement('bottomBox');
bottomBox.id = "bottomBoxID";
centeringBox.appendChild(bottomBox);

// -----------------------------------------BOTTOM BOX INPUT

const bottomBoxInput = document.createElement('bottomBoxInput');
bottomBox.prepend(bottomBoxInput);

const textarea = document.createElement('textarea');
textarea.id = "TextAreaID";
textarea.placeholder = "Your Suggestion"
textarea.maxLength = 10000;
bottomBoxInput.appendChild(textarea);

const send = document.createElement('send');
send.onmouseover = function(){changeSendToBlack()};
send.onmouseout = function(){changeSendToWhite()};
send.onclick = function(){sendMessage()};
bottomBoxInput.appendChild(send);

const sendIcon = document.createElement('img'); 
sendIcon.src = 'sendBlack.svg'; 
sendIcon.style.height = "calc(20px + (48 - 20) * ((100vw - 300px) / (1800 - 300)))";
send.appendChild(sendIcon); 

function changeSendToBlack(){
    sendIcon.src = 'sendWhite.svg';
}

function changeSendToWhite(){
    sendIcon.src = 'sendBlack.svg';
}

const sendText = document.createElement('sendText');
sendText.innerText = "Send"
send.appendChild(sendText);

function sendMessage(){

    firebase.auth().onAuthStateChanged(function(user) {

        //TO GET A DAMN PUSH ID
        let postsRef = database.ref();
        let newPostRef = postsRef.push();
        let pushID = newPostRef.key;

        let timestampReverse = localNumber - Object.values(firebaseTimestamp);

        if (user) {
            let uid = user.uid;
      
            database.ref('Vote').child("SuggestionByLove").child(pushID).set({
                suggestion: document.getElementById("TextAreaID").value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                timestampReverse: timestampReverse,
                suggestionCreatorID: uid,
                pushID: pushID,
                love: 0,
            }); 

            database.ref('Vote').child("SuggestionByTimestamp").child(pushID).set({
                suggestion: document.getElementById("TextAreaID").value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                timestampReverse: timestampReverse,
                suggestionCreatorID: uid,
                pushID: pushID,
                love: 0,
            }); 


            textarea.value = ''; 
            textarea.style.height = "50px"
        }  
    });
}


const bottomBoxMenu = document.createElement('bottomBoxMenu');
bottomBox.appendChild(bottomBoxMenu);

// -----------------------------------------BOTTOM BOX BUTTONS

const talk = document.createElement('talk');
talk.classList.add("bottomMenuButton");
talk.onclick = function(){talkLink()};
talk.onmouseover = function(){changeConfessToWhite()};
talk.onmouseout = function(){changeConfessToBlack()};
bottomBoxMenu.appendChild(talk);

const confessIcon = document.createElement('img'); 
confessIcon.classList.add("bottomMenuButtonIcon");
confessIcon.src = 'confess.svg'; 
confessIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
talk.appendChild(confessIcon); 

const confessButtonText = document.createElement('confessButtonText');
confessButtonText.classList.add("bottomMenuButtonText");
confessButtonText.innerText = "Confess";
talk.appendChild(confessButtonText); 

function talkLink(){
    window.location='talk.html';
}

const listen = document.createElement('listen');
listen.classList.add("bottomMenuButton");
listen.onclick = function(){allQuestionsLink()};
listen.onmouseover = function(){changeListenToWhite()};
listen.onmouseout = function(){changeListenToBlack()};
bottomBoxMenu.appendChild(listen);

const listenIcon = document.createElement('img'); 
listenIcon.classList.add("bottomMenuButtonIcon");
listenIcon.src = 'confessionsBlack.svg'; 
listenIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
listen.appendChild(listenIcon); 

const listenButtonText = document.createElement('listenButtonText');
listenButtonText.classList.add("bottomMenuButtonText");
listenButtonText.innerText = "Confessions";
listen.appendChild(listenButtonText); 

// Changed to allQuestions, instead of your feelings.
function allQuestionsLink() {
    window.location='allQuestions.html';
}

const yourConversations = document.createElement('yourConversations');
yourConversations.classList.add("bottomMenuButton");
yourConversations.onclick = function(){YourConversationsLink()};
bottomBoxMenu.appendChild(yourConversations);

checkNotificationLight()
function checkNotificationLight(){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
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
conversationsIcon.classList.add("bottomMenuButtonIcon");
conversationsIcon.src = 'conversationsBlack.svg'; 
conversationsIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
yourConversations.appendChild(conversationsIcon); 

const conversationsButtonText = document.createElement('listenButtonText');
conversationsButtonText.classList.add("bottomMenuButtonText");
conversationsButtonText.innerText = "Conversations";
yourConversations.appendChild(conversationsButtonText); 

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

const vote = document.createElement('vote');
vote.classList.add("bottomMenuButton");
vote.onclick = function(){voteLink()};
vote.onmouseover = function(){changeVoteToWhite()};
vote.onmouseout = function(){changeVoteToBlack()};
bottomBoxMenu.appendChild(vote);

const voteIcon = document.createElement('img'); 
voteIcon.classList.add("bottomMenuButtonIcon");
voteIcon.src = 'voteBlack.svg'; 
voteIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
vote.appendChild(voteIcon); 

const voteButtonText = document.createElement('voteButtonText');
voteButtonText.classList.add("bottomMenuButtonText");
voteButtonText.innerText = "Vote";
voteButtonText.style.fontWeight = "900";
voteButtonText.style.textDecoration = "underline";
vote.appendChild(voteButtonText); 

function voteLink(){
    window.location='vote.html';
}



const settings = document.createElement('settings');
settings.classList.add("bottomMenuButton");
settings.onclick = function(){settingsLink()};
settings.onmouseover = function(){changeYouToWhite()};
settings.onmouseout = function(){changeYouToBlack()};
bottomBoxMenu.appendChild(settings);

const settingsIcon = document.createElement('img'); 
settingsIcon.classList.add("bottomMenuButtonIcon");
settingsIcon.src = 'youBlack.svg'; 
settingsIcon.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
settings.appendChild(settingsIcon); 

const settingsButtonText = document.createElement('youButtonText');
settingsButtonText.classList.add("bottomMenuButtonText");
settingsButtonText.innerText = "Settings";
settings.appendChild(settingsButtonText); 

function settingsLink(){
    window.location='settings.html';
}

// -----------------------------------------BOTTOM BOX ENDS!!!


function vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
}


checkScreenAspect()
function checkScreenAspect(){

    let w = window.innerWidth;
    let h = window.innerHeight;
    let aspectFactor = w/h;
   
    if(aspectFactor>1){

        document.getElementById("CenteringBoxID").style.width = "33%";
        document.getElementById("bottomBoxID").style.width = "calc(33% - 4px)";

    } else { // UI changes for phones / screens taller than wide.
     
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



