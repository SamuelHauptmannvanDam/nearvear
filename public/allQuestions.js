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


// CONCEPT IS SIMPLE: 
// FLEXBOX KEEPS SCREEN AREA
// CENTERBOX KEEPS CENTER ON WIDESCREENS
// 3 BOXES IN CENTERBOX:: TOPBOX, MIDBOX, BOTTOMBOX

let lastReverseTimestamp = 0
let count = 0;

let langaugeSetting = "English"
firebase.auth().onAuthStateChanged(function(user) {
        
    if (user) {
        
        uid = user.uid;
        database.ref().child("Settings").child("allQuestions").child("language").child(uid).child("language").once('value').then(function(snapshot) {

          if (snapshot.exists() && snapshot.val() != "unknown") {
             langaugeSetting = snapshot.val()
               getOnMindItems()
          } else{
         
            let rootRef = database.ref().child("Settings").child("allQuestions").child("language").child(uid).set({
              language: "English",
          });
            getOnMindItems()
          } 

      });
       
    } 
});

const flexBox = document.createElement('flexBox');
flexBox.id = "flexBoxID";
document.body.appendChild(flexBox);

const centeringBox = document.createElement('centeringBox');
centeringBox.id = "CenteringBoxID";
flexBox.appendChild(centeringBox);

// ------------------------------------------------------  TOPBOX HERE
const topBox = document.createElement('topBox');
centeringBox.appendChild(topBox);

const imgLogo = document.createElement('img'); 
imgLogo.src = '192px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo); 

const listenTitle = document.createElement('listenTitle');
listenTitle.innerText = " Confessions";
listenTitle.onclick = function(){home()};
topBox.appendChild(listenTitle);

function home(){
    window.location='index.html';
}

const collectiveLoveBox = document.createElement('collectiveLoveBox');
topBox.appendChild(collectiveLoveBox);

const collectiveLove = document.createElement('collectiveLove');
collectiveLove.innerHTML = "Collective Love Given: ";
collectiveLoveBox.appendChild(collectiveLove);

const collectiveLoveImg = document.createElement('img'); 
collectiveLoveImg.src = 'loveFilledBlack.svg'; 
collectiveLoveImg.style.height = "12px";
// collectiveLoveBox.appendChild(collectiveLoveImg); 

const descriptionBox = document.createElement('descriptionBox');
// checkDescription adds the description box if settings has been set to "off"
checkDescription()


const description = document.createElement('description');
description.innerHTML = "All conversations are 1 on 1. Your messages are browser & device specific. <br /><br />MEANING: To see answers or past conversations or messages, you have to go back to that specific browser on that specific device<br /><br />UNLESS: you upgrade your account under Settings"
descriptionBox.appendChild(description);

const descriptionDeletionButton = document.createElement('descriptionDeletionButton');
descriptionDeletionButton.innerHTML = "&#10006;"
descriptionDeletionButton.onclick = function(){removeDescription()};
descriptionBox.appendChild(descriptionDeletionButton);


// -------------------------------------------------------  UPDATEBOX
const updateBox = document.createElement('updateBox');
checkUpdateDescription()


const updateDescription = document.createElement('updateDescription');
updateDescription.innerHTML = "Here's what we've done for you since last time<br /><br />06/03/2021<br />+ Added infinite scroll<br />"
updateBox.appendChild(updateDescription);


const updateDeletionButton = document.createElement('updateDeletionButton');
updateDeletionButton.innerHTML = "&#10006;"
updateDeletionButton.onclick = function(){removeUpdateDescription()};
updateBox.appendChild(updateDeletionButton);

function removeUpdateDescription() {
  updateBox.style.display = "none";
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let uid = user.uid;
          let rootRef = database.ref().child("Settings").child("allQuestions").child("update").child(uid).set({
              description2: "off",
          });
      }        
  });
}


function checkUpdateDescription(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let uid = user.uid;
       
          database.ref().child("Settings").child("allQuestions").child("update").child(uid).child("description2").once('value').then(function(snapshot) {
              if (snapshot.exists()) {
                  if(snapshot.val() == "off"){
                      // do nothing 
                  }
                  
              } else{
                topBox.appendChild(updateBox);
              } 
          });
      }
  });
}

























// ------------------------------------------------------  MIDBOX HERE
const midBox = document.createElement('midBox');
centeringBox.appendChild(midBox);


const onMindBox = document.createElement('onMindBox');
midBox.appendChild(onMindBox);

const moreButton = document.createElement('moreButton');
moreButton.id = "moreButtonID"
moreButton.innerHTML = "MORE"
moreButton.onclick = function(){getNextOnMindItems()}
midBox.appendChild(moreButton);





//Connect to database
let database = firebase.database();

let firebaseTimestamp = 0;
let localNumber = 999999999999999;

database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })



//---------------------------------------------------------------------------------- GET  ITEMS
function getOnMindItems(){
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      let uid = user.uid;

      // let rootRef = database.ref().child("allQuestions");
  
      let rootRef = database.ref().child("allQuestionsByLanguage").child(langaugeSetting).orderByChild("timestampReverse").limitToFirst(10);
      
      rootRef.on("child_added", snap => {
        count = count + 1;
        
        let creatorID = snap.child("creatorID").val(); // Original Poster
        let language = snap.child("language").val();
        let message = snap.child("message").val(); //The message
        let messageID = snap.child("messageID").val(); // ID of the confession
        let timestamp = snap.child("timestamp").val(); // ID of the confession
        let timestampReverse = snap.child("timestampReverse").val(); // ID of the confession


        if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language == "unknown"){
          //  DON*T SHOW
        } else {

        lastReverseTimestamp = timestampReverse
        
//------------------------- Adds language to post, if language isn't there.
        if(!snap.child("language").exists()){
            guessLanguage.name(message, function(languageName) {
                database.ref().child("allQuestions").child(messageID).update({
                    language: languageName,
                });
            });
        }

        const onMindItem = document.createElement('onMindItem');
        
        const onMindItemText = document.createElement('onMindItemText');
        onMindItemText.id = "onMindItemText"+ count;
        let onMindItemTextID = onMindItemText.id;
        onMindItemText.innerText = message;
        onMindItem.appendChild(onMindItemText);

        const dateObject = new Date(timestamp)
        const humanDateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateObject)

        const onMindItemDate = document.createElement('onMindItemDate');
        onMindItemDate.innerText = humanDateFormat;
        onMindItem.appendChild(onMindItemDate);

    

        // MENU BAR
        const onMindItemMenuBar = document.createElement('onMindItemMenuBar');
        onMindItemMenuBar.onclick = function(){}; 
        onMindItem.appendChild(onMindItemMenuBar);

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
        loveButtonText.innerText = "Love";
        loveButton.appendChild(loveButtonText); 

        // CONVERSATION BUTTON
        const converseButton = document.createElement('converseButton');
        converseButton.onclick = function(){conversationLink(message, messageID, creatorID)};
        converseButton.onmouseover = function(){converseIconToWhite(converseIconID)};
        converseButton.onmouseout = function(){converseIconToBlack(converseIconID)};
        onMindItemMenuBar.appendChild(converseButton);

        const converseIcon = document.createElement('img'); 
        converseIcon.src = 'converseBlack.svg'; 
        converseIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        converseIcon.id = "converseIcon"+ count;
        let converseIconID = converseIcon.id;
        converseButton.appendChild(converseIcon); 

        const converseButtonText = document.createElement('converseButtonText');
        converseButtonText.innerText = "Converse";
        converseButton.appendChild(converseButtonText); 

        // SHARE BUTTON
        const shareButton = document.createElement('shareButton');
        shareButton.id = "shareButtonID"
        shareButton.onclick = function(){shareLink(messageID, shareButtonTextID, language)};
        shareButton.onmouseover = function(){shareIconToWhite(shareIconID)};
        shareButton.onmouseout = function(){shareIconToBlack(shareIconID)};
        onMindItemMenuBar.appendChild(shareButton);

        const shareIcon = document.createElement('img'); 
        shareIcon.src = 'shareBlack.svg'; 
        shareIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        shareIcon.id = "shareIcon"+ count;
        let shareIconID = shareIcon.id;
        shareButton.appendChild(shareIcon); 

        const shareButtonText = document.createElement('shareButtonText');
        shareButtonText.id = "shareButtonTextID" + count;
        let shareButtonTextID = shareButtonText.id;
        shareButtonText.innerHTML = "Share";
        shareButton.appendChild(shareButtonText); 


        // FORGIVE BUTTON
        const forgiveButton = document.createElement('forgiveButton');
        forgiveButton.id = "forgiveButtonID"
        forgiveButton.onclick = function(){goToForum(messageID, language)};
        forgiveButton.onmouseover = function(){forgiveIconToWhite(forgiveIconID)};
        forgiveButton.onmouseout = function(){forgiveIconToBlack(forgiveIconID)};
        onMindItemMenuBar.appendChild(forgiveButton);

        const forgiveIcon = document.createElement('img'); 
        forgiveIcon.src = 'forumBlack.svg'; 
        forgiveIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        forgiveIcon.id = "forgiveIcon"+ count;
        let forgiveIconID = forgiveIcon.id;
        forgiveButton.appendChild(forgiveIcon); 


        const forgiveButtonText = document.createElement('forgiveButtonText');
        forgiveButtonText.id = "forgiveButtonTextID" + count;
        // let forgiveButtonTextID = forgiveButtonText.id;
        forgiveButtonText.innerHTML = "Forum";
        forgiveButton.appendChild(forgiveButtonText); 


        let ref = database.ref().child("Forgive").child(messageID);
        ref.once("value")
          .then(function(snapshot) {
            let numberOfMessages = snapshot.numChildren(); // 1 ("name")
            if(0 < numberOfMessages )
            forgiveButtonText.innerHTML = "Forgive: " + numberOfMessages;
          });


        // Reduce spacing on phones 
        let w = window.innerWidth;
        let h = window.innerHeight;
        let aspectFactor = w/h;
        
        if(aspectFactor<1){
          onMindItem.style.padding = "20px 20px 10px 20px"
          // onMindItem.style.padding = "20px 20px 10px 20px"
          onMindItem.style.margin = "8px 0px 8px 0px"
          onMindItemMenuBar.style.marginTop = "10px"
          loveButton.style.padding = "0px"
          converseButton.style.padding = "0px"
          shareButton.style.padding = "0px"
          forgiveButton.style.padding = "0px"
        } 

        if (uid == creatorID){
            
            const editButton = document.createElement('editButton');
            editButton.id = "editButton"+ count;
            editButton.innerHTML = "edit";
            let editID = editButton.id;
            editButton.onclick = function(){editText(onMindItemTextID, onMindItemHeight, count, editID, message, messageID, creatorID)};
            onMindItem.appendChild(editButton);
        
        }

        // ADD THE OnMindIem
        onMindBox.appendChild(onMindItem);

        // midBox.scrollTo(0, 50000);
        let onMindItemHeight = document.getElementById(onMindItemTextID).offsetHeight;

        }
      });
    } 
  });
}




//---------------------------------------------------------------------------------- GET NEXT ITEMS
function getNextOnMindItems(){
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      let uid = user.uid;
      
      let rootRef = database.ref().child("allQuestionsByLanguage").child(langaugeSetting).orderByChild("timestampReverse").limitToFirst(10).startAt(lastReverseTimestamp);
  
      rootRef.on("child_added", snap => {
        count = count + 1;
        
        let creatorID = snap.child("creatorID").val(); // Original Poster
        let language = snap.child("language").val();
        let message = snap.child("message").val(); //The message
        let messageID = snap.child("messageID").val(); // ID of the confession
        let timestamp = snap.child("timestamp").val(); // ID of the confession
        let timestampReverse = snap.child("timestampReverse").val(); // ID of the confession

        if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language == "unknown" || timestampReverse == lastReverseTimestamp){
            // if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language != "unknown"){
        } else {

        lastReverseTimestamp = timestampReverse
        const onMindItem = document.createElement('onMindItem');
        
        const onMindItemText = document.createElement('onMindItemText');
        onMindItemText.id = "onMindItemText"+ count;
        let onMindItemTextID = onMindItemText.id;
        onMindItemText.innerText = message;
        onMindItem.appendChild(onMindItemText);

        const dateObject = new Date(timestamp)
        const humanDateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateObject)

        const onMindItemDate = document.createElement('onMindItemDate');
        onMindItemDate.innerText = humanDateFormat;
        onMindItem.appendChild(onMindItemDate);

        // MENU BAR
        const onMindItemMenuBar = document.createElement('onMindItemMenuBar');
        onMindItemMenuBar.onclick = function(){}; 
        onMindItem.appendChild(onMindItemMenuBar);

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
        // console.log(loveValue)
        if(loveValue == "filled"){
            loveIcon.src = 'loveFilledBlack.svg'; 
        } 
        
        loveIcon.id = "loveIcon"+ count;
        let loveIconID = loveIcon.id;
        loveButton.appendChild(loveIcon); 

        const loveButtonText = document.createElement('loveButtonText');
        loveButtonText.innerText = "Love";
        loveButton.appendChild(loveButtonText); 

        // CONVERSATION BUTTON
        const converseButton = document.createElement('converseButton');
        converseButton.onclick = function(){conversationLink(message, messageID, creatorID)};
        converseButton.onmouseover = function(){converseIconToWhite(converseIconID)};
        converseButton.onmouseout = function(){converseIconToBlack(converseIconID)};
        onMindItemMenuBar.appendChild(converseButton);

        const converseIcon = document.createElement('img'); 
        converseIcon.src = 'converseBlack.svg'; 
        converseIcon.id = "converseIcon"+ count;
        converseIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        let converseIconID = converseIcon.id;
        converseButton.appendChild(converseIcon); 

        const converseButtonText = document.createElement('converseButtonText');
        converseButtonText.innerText = "Converse";
        converseButton.appendChild(converseButtonText); 

        // SHARE BUTTON
        const shareButton = document.createElement('shareButton');
        shareButton.id = "shareButtonID"
        shareButton.onclick = function(){shareLink(messageID, shareButtonTextID, language)};
        shareButton.onmouseover = function(){shareIconToWhite(shareIconID)};
        shareButton.onmouseout = function(){shareIconToBlack(shareIconID)};
        onMindItemMenuBar.appendChild(shareButton);

        const shareIcon = document.createElement('img'); 
        shareIcon.src = 'shareBlack.svg'; 
        shareIcon.id = "shareIcon"+ count;
        shareIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        let shareIconID = shareIcon.id;
        shareButton.appendChild(shareIcon); 

        const shareButtonText = document.createElement('shareButtonText');
        shareButtonText.id = "shareButtonTextID" + count;
        let shareButtonTextID = shareButtonText.id;
        shareButtonText.innerHTML = "Share";
        shareButton.appendChild(shareButtonText); 

        // FORGIVE BUTTON
        const forgiveButton = document.createElement('forgiveButton');
        forgiveButton.id = "forgiveButtonID"
        forgiveButton.onclick = function(){goToForum(messageID, language)};
        forgiveButton.onmouseover = function(){forgiveIconToWhite(forgiveIconID)};
        forgiveButton.onmouseout = function(){forgiveIconToBlack(forgiveIconID)};
        onMindItemMenuBar.appendChild(forgiveButton);

        const forgiveIcon = document.createElement('img'); 
        forgiveIcon.src = 'forumBlack.svg'; 
        forgiveIcon.style.height = "calc(30px + (48 - 30) * ((100vw - 300px) / (1800 - 300)))";
        forgiveIcon.id = "forgiveIcon"+ count;
        let forgiveIconID = forgiveIcon.id;
        forgiveButton.appendChild(forgiveIcon); 


        const forgiveButtonText = document.createElement('forgiveButtonText');
        forgiveButtonText.id = "forgiveButtonTextID" + count;
        // let forgiveButtonTextID = forgiveButtonText.id;
        forgiveButtonText.innerHTML = "Forum";
        forgiveButton.appendChild(forgiveButtonText); 


        let ref = database.ref().child("Forgive").child(messageID);
        ref.once("value")
          .then(function(snapshot) {
            let numberOfMessages = snapshot.numChildren(); // 1 ("name")
            if(0 < numberOfMessages )
            forgiveButtonText.innerHTML = "Forgive: " + numberOfMessages;
          });
          

        // Reduce spacing on phones 
        let w = window.innerWidth;
        let h = window.innerHeight;
        let aspectFactor = w/h;

        if(aspectFactor<1){
          onMindItem.style.padding = "20px 20px 10px 20px"
          // onMindItem.style.padding = "20px 20px 10px 20px"
          onMindItem.style.margin = "8px 0px 8px 0px"
          onMindItemMenuBar.style.marginTop = "10px"
          loveButton.style.padding = "0px"
          converseButton.style.padding = "0px"
          shareButton.style.padding = "0px"
          forgiveButton.style.padding = "0px"
        } 

        if (uid == creatorID){
            
            const editButton = document.createElement('editButton');
            editButton.id = "editButton"+ count;
            editButton.innerHTML = "edit";
            let editID = editButton.id;
            editButton.onclick = function(){editText(onMindItemTextID, onMindItemHeight, count, editID, message, messageID, creatorID)};
            onMindItem.appendChild(editButton);
        
        }

        // ADD THE OnMindIem
        onMindBox.appendChild(onMindItem);

        // midBox.scrollTo(0, 50000);
        let onMindItemHeight = document.getElementById(onMindItemTextID).offsetHeight;

        }
      });
    } 
  });
}


function loveIconToWhite(loveIconID){
  let specificLoveIcon = document.getElementById(loveIconID)
  // Check filename if heart icon is empty or filled
  let isEmpty = specificLoveIcon.src.includes("loveEmptyBlack");
  let isFilled = specificLoveIcon.src.includes("loveFilledBlack");
  if(isEmpty == true){
      specificLoveIcon.src = 'loveEmptyWhite.svg';
  }
  if(isFilled == true){
      specificLoveIcon.src = 'loveFilledWhite.svg';
  }
}

function loveIconToBlack(loveIconID){

  let specificLoveIcon = document.getElementById(loveIconID)

  // Check filename if heart icon is empty or filled
  let isEmpty = specificLoveIcon.src.includes("loveEmptyWhite");
  let isFilled = specificLoveIcon.src.includes("loveFilledWhite");

  if(isEmpty == true){
      specificLoveIcon.src = 'loveEmptyBlack.svg';
  }

  if(isFilled == true){
      specificLoveIcon.src = 'loveFilledBlack.svg';
  }
}

function converseIconToWhite(converseIconID){

    let specificConverseIcon = document.getElementById(converseIconID)
    specificConverseIcon.src = 'converseWhite.svg';

}

function converseIconToBlack(converseIconID){

    let specificConverseIcon = document.getElementById(converseIconID)
    specificConverseIcon.src = 'converseBlack.svg';
    
}

function shareIconToWhite(shareIconID){

  let specificShareIcon = document.getElementById(shareIconID)
  specificShareIcon.src = 'shareWhite.svg';

}

function shareIconToBlack(shareIconID){

  let specificShareIcon = document.getElementById(shareIconID)
  specificShareIcon.src = 'shareBlack.svg';
  
}


function forgiveIconToWhite(forgiveIconID){

  let specificForgiveIcon = document.getElementById(forgiveIconID)
  specificForgiveIcon.src = 'forumWhite.svg';

}

function forgiveIconToBlack(forgiveIconID){

  let specificForgiveIcon = document.getElementById(forgiveIconID)
  specificForgiveIcon.src = 'forumBlack.svg';
  
}




// Happens when clicking Love
// If it's the first time, it sends a mail to the person otherwise, it just saves the setting of that icon for that onMindItem

// 3 things are needed when changing love icon
// loveIconID: what love icon it is, each love icon for every confession has an ID.
// messageID such that your settings for the confession can be added.
// creatorID needed to sent them an email.
function changeIcon(loveIconID, messageID, creatorID){

  let specificLoveIcon = document.getElementById(loveIconID)


  // Check filename if heart icon is empty or filled, as file used is set when innitiated
  let isEmpty = specificLoveIcon.src.includes("loveEmptyWhite");
  let isFilled = specificLoveIcon.src.includes("loveFilledWhite");

  if(isEmpty == true){
      specificLoveIcon.src = 'loveFilledWhite.svg';

      //sets setting:
      firebase.auth().onAuthStateChanged(function(user) {
      
          if (user) {
              
              let uid = user.uid;
              database.ref("allQuestionsByLanguage").child(langaugeSetting).child(messageID).child(uid).update({love: "filled"});     
              addOneToCollectiveLove()   
              
          } 
      });

  }

  if(isFilled == true){
      specificLoveIcon.src = 'loveEmptyWhite.svg';

      //sets setting:
      firebase.auth().onAuthStateChanged(function(user) {

          if (user) {
              
              let uid = user.uid;
              database.ref("allQuestionsByLanguage").child(langaugeSetting).child(messageID).child(uid).update({love: "empty"});        
              subtractOneToCollectiveLove()
              
          } 
      });

  }

  //check if mail has been sent before or sends one if not.
  firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
      let uid = user.uid;
          // Checks if already sent a mail, if not: Sends one.
      database.ref("allQuestionsByLanguage").child(langaugeSetting).child(messageID).child(uid).child("send").once('value').then(function(snapshot) {
        //SET VISUALS
        if(snapshot.val() == null){
          // update to sent and sent the mail
          database.ref("allQuestionsByLanguage").child(langaugeSetting).child(messageID).child(uid).update({send: "sent"});   

          // SEND EMAIL IF SETTING IS ON:
          //CHECK IF SETTING IS ON OR OFF
          database.ref('Emails').child(creatorID).child("settings").child("love").child("love").once('value').then(function(snapshot) {
            if(snapshot.val() == "on" || null || "null"){
              //CHECK IF MAIL EXIST
              database.ref('Emails').child(creatorID).child("email").child("email").once('value').then(function(snapshot) {
                Email.send({
                    SecureToken : "09c52732-99c5-44e6-816a-e3bc58d79108",
                    To : snapshot.val(),
                    From : "nearvear.app@gmail.com",
                    Subject : "Someone loved your confession <3",
                    Body : "Someone loved your confessions <3<br>See. People do care. You are never pushy, greedy or not worth listening to <br>Get it out: https://nearvear.com//talk.html<br><br>If you ever need to unsubscribe: https://nearvear.com//notifications.html<br>Best regards, the Nearvear Team<br><br>Fun fact: Nearvear is misspelling of nærvær, which means to be present<br>If you ever have feedback or thoughts, just reply to this email and we'll get right back to you"
                
                })
              });
            }
          });
        } 
      });      
    } 
  });
}



function vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh)) + 'px';
  }


function conversationLink(message, messageID, creatorID) {
  localStorage.setItem("message", message);
  localStorage.setItem("messageID", messageID);
  localStorage.setItem("creatorID", creatorID);

  let timestampReverse = localNumber - Object.values(firebaseTimestamp);

  // ----------------------- CREATE CONVERSATION PATH
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let uid = user.uid;
      localStorage.setItem("answeringID", uid);

      //CHECK IF CONVERSATION message EXIST: such that we don't add message to conversation twice.
      database.ref('Conversations').child(creatorID).child(uid).child(messageID).once('value').then(function(snapshot) {
  
      if (snapshot.exists()) {

// ----------------------- Take us to conversation
        window.location = 'conversation.html';

         } else{ 

// ----------------------- If Original feeling doesn't exists, Add Original feeling and then take us to conversation.
            database.ref('Conversations').child(creatorID).child(uid).child(messageID).set({
                message: message,
                messageID: messageID,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                timestampReverse: timestampReverse,
                creatorID: creatorID,
                answeringID: uid, 
                
            }); 

            window.location = 'conversation.html';

         }

         });

        }
    });
    
}

// TEXT EDITING
// THE REASON I DO IT SO CONVOLUTED IS TO PRACTISE ELEMENTS AND SEE THE LIMITS. THEN REDUCE, CLEARLY IT COULD BE REDUCED HEAVILY, BUT HAD TO GET HERE TO SEE IT.
function editText(onMindItemTextID, onMindItemHeight, count, editID, message, messageID, creatorID){

    let onMindItemTextarea = document.createElement('textarea');
    onMindItemTextarea.innerText = message;

    onMindItemTextarea.id = "onMindItemTextarea" + count;
    let onMindItemTextareaID = onMindItemTextarea.id;

    document.getElementById(onMindItemTextID).replaceWith(onMindItemTextarea)

    const saveButton = document.createElement('saveButton');
    saveButton.id = "saveButton"+ count;
    saveButton.innerText = "save";
    let saveID = saveButton.id;
    saveButton.onclick = function(){saveText(onMindItemTextareaID, onMindItemTextID, onMindItemHeight, count, saveID, messageID, creatorID)};

    document.getElementById(editID).replaceWith(saveButton)

}


// THE REASON I DO IT SO CONCOLUTED IS TO PRACTISE ELEMENTS AND SEE THE LIMITS.
function saveText(onMindItemTextareaID, onMindItemTextID, onMindItemHeight, count, saveID, messageID, creatorID){

  const newOnMindItemText = document.createElement('onMindItemText');
  newOnMindItemText.id = onMindItemTextID;

  let newMessage = document.getElementById(onMindItemTextareaID).value;
  newOnMindItemText.innerText = newMessage

  document.getElementById(onMindItemTextareaID).replaceWith(newOnMindItemText);

  const editButton = document.createElement('editButton');
  editButton.id = "editButton"+ count;
  editButton.innerText = "edit";
  let editID = editButton.id;

  editButton.onclick = function(){editText(onMindItemTextID, onMindItemHeight, count, editID, newMessage, messageID, creatorID)};

  document.getElementById(saveID).replaceWith(editButton)
  firebase.auth().onAuthStateChanged(function(user) {
  
    if (user) {
      // User is signed in.
      let uid = user.uid;
      database.ref('allQuestions').child(messageID).update({
        message: newMessage,
        // seen: "unseen"
          
      });  
        
      database.ref('allQuestionsByLanguage').child(langaugeSetting).child(messageID).update({
        message: newMessage,
        // seen: "unseen"
          
        });  

      database.ref('Diary').child(uid).child(messageID).update({
        message: newMessage,
        // seen: "unseen"
      });  

    } 
  });
}




function removeDescription() {
    descriptionBox.style.display = "none";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            let rootRef = database.ref().child("Settings").child("allQuestions").child("description").child(uid).set({
                description: "off",
            });
        }        
    });
}


function checkDescription(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
         
            database.ref().child("Settings").child("allQuestions").child("description").child(uid).child("description").once('value').then(function(snapshot) {
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





checkCollectiveLove()
function checkCollectiveLove() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
         
            database.ref().child("collectiveLove").child("loveCounter").once('value').then(function(snapshot) {

                collectiveLove.innerHTML = "Collective Love Given: " + snapshot.val() + " &#10084;";

            });

        }
    });
}


function addOneToCollectiveLove() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            
            database.ref().child("collectiveLove").child("loveCounter").once('value').then(function(snapshot) {

                database.ref().child("collectiveLove").update({
                    loveCounter: snapshot.val()+1,
                });

                checkCollectiveLove()

            });

        }
    });
}

function subtractOneToCollectiveLove() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            
            database.ref().child("collectiveLove").child("loveCounter").once('value').then(function(snapshot) {

                database.ref().child("collectiveLove").update({
                    loveCounter: snapshot.val()-1,
                });

                checkCollectiveLove()

            });

        }
    });
}


function showLanguages(){
  let languageBoxObject = document.getElementById("languageBoxID");
  if (languageBoxObject.style.display === "none") {
    languageBoxObject.style.display = "block";
  } else {
    languageBoxObject.style.display = "none";
  }
 
}

function pickLanguage(language){
  // console.log(language)

  firebase.auth().onAuthStateChanged(function(user) {
          
      if (user) {
          
          uid = user.uid;

          let rootRef = database.ref().child("Settings").child("allQuestions").child("language").child(uid).set({
            language: language,
          });
          location.reload();

      } 
  });

} 


function shareLink(messageID, shareButtonTextID, language){
    
  var copyText = "https://nearvear.com/confession.html?" + messageID + "?" + language;

  document.getElementById(shareButtonTextID).innerHTML = "Copied";

  // WHAT A FUCKING HACK
  const copyTextArea = document.createElement('textarea');
  copyTextArea.value = copyText;
  document.body.appendChild(copyTextArea);
  copyTextArea.select();
  copyTextArea.setSelectionRange(0, 99999)
  document.execCommand('copy');
  document.body.removeChild(copyTextArea);

}

function goToForum(messageID, language){
  window.location = "https://nearvear.com/confession.html?" + messageID + "?" + language;
}

// -----------------------------------------INFINITE SCROLL

window.onscroll = function(e) {
  console.log(isScrolledIntoView(moreButton))
  if(isScrolledIntoView(moreButton)){
    document.getElementById("moreButtonID").click();
  }

};

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}



// -----------------------------------------BOTTOM BOX BUTTONS

const bottomBox = document.createElement('bottomBox');
bottomBox.id = "bottomBoxID";
centeringBox.appendChild(bottomBox);

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


