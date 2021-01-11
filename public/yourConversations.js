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

const flexBox = document.createElement('flexBox');
flexBox.id = "flexBoxID";
document.body.appendChild(flexBox);

const centeringBox = document.createElement('centeringBox');
centeringBox.id = "CenteringBoxID";
flexBox.appendChild(centeringBox);

// TOPBOX HERE
const topBox = document.createElement('topBox');
centeringBox.appendChild(topBox);

const imgLogo = document.createElement('img'); 
imgLogo.src = '32px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo); 

const pageTitle = document.createElement('pageTitle');
pageTitle.innerText = " Conversations";
pageTitle.onclick = function(){home()};
topBox.appendChild(pageTitle);


function home(){
    window.location='index.html';
}

const pageDescription = document.createElement('pageDescription');
pageDescription.innerHTML = "As soon as you or someone else has answered a confession, you'll see the conversations here.<br><br>You'll only be able to see conversations and answers to your posts, given from this specific browser on this specific device<br><br>Add your email under settings, to get notified, whenever someone answers";
topBox.appendChild(pageDescription);

const conversationListBox = document.createElement('conversationListBox');

centeringBox.appendChild(conversationListBox);


//Connect to database
let database = firebase.database();

// ------------------------------------------ GETS THE CONVERSATION
firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
       
        let uid = user.uid;
        // database.ref('Users/'+uid).set({profileID: uid});   
 
        let rootRef = database.ref().child("yourConversations").child(uid).orderByChild('timestampReverse');
        let count = 0;
        rootRef.on("child_added", snap => {
            count = count + 1
            let message = snap.child("message").val(); //The message
            let conversationID = snap.child("conversationID").val(); // conversationID
            let creatorID = snap.child("creatorID").val(); // Original Poster
            let answeringID = snap.child("answeringID").val();
            let seen = snap.child("seen").val(); // Information can be seen or unseen and changes look depending on it.

            const conversationItem = document.createElement('conversationItem');
            conversationItem.onclick = function(){conversationLink(conversationID, creatorID, answeringID)};

            conversationItem.onmouseover = function(){converseIconToWhite(converseIconID)};
            conversationItem.onmouseout = function(){converseIconToBlack(converseIconID)};

            const onMindItemText = document.createElement('onMindItemText');
            // onMindItemText.id = "onMindItemText"+ count;
            let onMindItemTextID = onMindItemText.id;
            onMindItemText.innerText = message;
            conversationItem.appendChild(onMindItemText);

            // MENU BAR
            const onMindItemMenuBar = document.createElement('onMindItemMenuBar');
            onMindItemMenuBar.onclick = function(){}; 
            conversationItem.appendChild(onMindItemMenuBar);

            // CONVERSATION BUTTON
            const converseButton = document.createElement('converseButton');
            onMindItemMenuBar.appendChild(converseButton);

            const converseIcon = document.createElement('img'); 
            converseIcon.src = 'converseBlack.svg'; 
            converseIcon.id = "converseIcon"+ count;
            let converseIconID = converseIcon.id;
            converseButton.appendChild(converseIcon); 

            const converseButtonText = document.createElement('converseButtonText');
            converseButtonText.innerText = "Converse";
            converseButton.appendChild(converseButtonText); 

            // CHECKS IF ITEM IS SEEN
            if(seen == "unseen"){
                conversationItem.style.backgroundColor = "black";
                conversationItem.style.color = "white";
                conversationItem.style.borderColor = "white";
                converseIcon.src = 'converseWhite.svg'; 
            }

            // Reduce spacing on phones 
            let w = window.innerWidth;
            let h = window.innerHeight;
            let aspectFactor = w/h;
            
            if(aspectFactor<1){
                conversationItem.style.padding = "20px"
                conversationItem.style.margin = "8px 0px 8px 0px"
                onMindItemMenuBar.style.marginTop = "10px"
                converseButton.style.padding = "0px"
            } 

            // ADDS THE ITEM
            conversationListBox.appendChild(conversationItem);

        });
    }
});

let firebaseTimestamp = 0;
let localNumber = 999999999999999;

database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })

// ----------------------- LINK TO CONVERSATION
function conversationLink(conversationID, creatorID, answeringID) {
    localStorage.setItem("conversationID", conversationID);
    localStorage.setItem("creatorID", creatorID);
    localStorage.setItem("answeringID", answeringID);

    console.log("creatorID: " + creatorID);
    console.log("answeringID: " + answeringID);
    console.log("conversationI: D" + conversationID);

    let timestampReverse = localNumber - Object.values(firebaseTimestamp);

// ----------------------- CREATE CONVERSATION PATH
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            if (answeringID == uid){

                // ----------------------- UPDATE TO SEEN
                database.ref('yourConversations').child(uid).child(creatorID).update({
                seen: "seen",

                });
            } else {
                // ----------------------- UPDATE TO SEEN
                database.ref('yourConversations').child(uid).child(answeringID).update({
                seen: "seen",
                });

            }
            window.location = 'conversation.html';
        }
    });

  }


function converseIconToWhite(converseIconID){

    let specificConverseIcon = document.getElementById(converseIconID)
    specificConverseIcon.src = 'converseWhite.svg';

}

function converseIconToBlack(converseIconID){

    let specificConverseIcon = document.getElementById(converseIconID)
    specificConverseIcon.src = 'converseBlack.svg';
    
}


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
// yourConversations.innerText = "Conversations";
yourConversations.onclick = function(){YourConversationsLink()};
yourConversations.onmouseover = function(){changeConversationsToWhite()};
yourConversations.onmouseout = function(){changeConversationsToBlack()};
bottomBox.appendChild(yourConversations);

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
    window.location='yourConversations.html';
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

// If screen is taller than wide - aka phones: Use the full screen. But if wider than narrow, use the mid.
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