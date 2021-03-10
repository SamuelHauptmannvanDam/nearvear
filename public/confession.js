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

const imgLogo = document.createElement('img'); 
imgLogo.src = '192px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo); 

const listenTitle = document.createElement('listenTitle');
listenTitle.innerText = " Confession";
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





// const descriptionBox = document.createElement('descriptionBox');
// checkDescription adds the description box if settings has been set to "off"
// checkDescription()

// const descriptionDeletionButton = document.createElement('descriptionDeletionButton');
// descriptionDeletionButton.innerHTML = "&#10006;"
// descriptionDeletionButton.onclick = function(){removeDescription()};
// descriptionBox.appendChild(descriptionDeletionButton);

// const description = document.createElement('description');
// description.innerHTML = "Forgiving is a public endevor. You need to be trustworthy to be able to participate in forgiving.<br /><br />Trustworthy is given by confessors to great answers in 1 on 1 conversations.<br />Tap Converse on the confession to give a great answer<br /><br />Find out how Trustworthy you are under Settings"
// descriptionBox.appendChild(description);

function checkDescription(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
         
            database.ref().child("Settings").child("converse").child("description").child(uid).child("description").once('value').then(function(snapshot) {
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

function removeDescription() {
    descriptionBox.style.display = "none";
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            let rootRef = database.ref().child("Settings").child("converse").child("description").child(uid).set({
                description: "off",
            });
        }        
    });
}









// ------------------------------------------------------  MIDBOX HERE
const midBox = document.createElement('midBox');
centeringBox.appendChild(midBox);

const onMindItem = document.createElement('onMindItem');
midBox.appendChild(onMindItem);

const debateItems = document.createElement('debateItems');
midBox.appendChild(debateItems);

// -----------------------------------------BOTTOM BOX 

const bottomBox = document.createElement('bottomBox');
bottomBox.id = "bottomBoxID";
centeringBox.appendChild(bottomBox);


// -----------------------------------------BOTTOM BOX INPUT

// ----------------------------------------- CHECK TRUSTWORTH
const bottomBoxInput = document.createElement('bottomBoxInput');
bottomBox.prepend(bottomBoxInput);
// firebase.auth().onAuthStateChanged(function(user) {

//     if (user) {
//         let uid = user.uid;
        
//         // CHECK YOUR TRUSTWORTHINESS:
//         database.ref().child("Trust").child(uid).child("trustworthiness").once('value').then(function(snapshot) {
//             if (snapshot.exists()) {
//                 if(0 <= snapshot.val()){

//                     bottomBox.prepend(bottomBoxInput);
                
//                 } 
//             } 
//         });
//     } 
// });

const textarea = document.createElement('textarea');
textarea.id = "TextAreaID";
textarea.placeholder = "Acknowledge and forgive"
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
      
            database.ref('Forgive').child(messageID).child(pushID).set({
                message: document.getElementById("TextAreaID").value,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                timestampReverse: timestampReverse,
                messageCreatorID: uid,
            }); 


            textarea.value = ''; 
            textarea.style.height = "50px"
        }  
    });
}

// ------------------------------------------ GETS THE MESSAGES
function getMessages(creatorID){
    firebase.auth().onAuthStateChanged(function(user) {
    
        if (user) {
           
            let uid = user.uid;
            let rootRef = database.ref().child("Forgive").child(messageID);
    
            rootRef.on("child_added", snap => {
    
                let message = snap.child("message").val(); //The message
                let messageCreatorID = snap.child("messageCreatorID").val(); // poster of message ID, to give color to your posts.
    
                const conversationItem = document.createElement('conversationItem');
                conversationItem.style.borderColor = "black";
         
                console.log("messageCreatorID: " + messageCreatorID)
                if(messageCreatorID == creatorID){
                    conversationItem.style.borderColor = "white";
                }
                conversationItem.innerText = message;
                debateItems.append(conversationItem);
                // conversationBox.scrollTo(0, 5000000);
    
            });
           
        }
    
    });
}























const bottomBoxMenu = document.createElement('bottomBoxMenu');
bottomBox.appendChild(bottomBoxMenu);

// -----------------------------------------BOTTOM BOX BUTTONS

const talk = document.createElement('talk');
// talk.innerText = "Confess";
talk.onclick = function(){talkLink()};
talk.onmouseover = function(){changeConfessToWhite()};
talk.onmouseout = function(){changeConfessToBlack()};
bottomBoxMenu.appendChild(talk);

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
bottomBoxMenu.appendChild(listen);

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
bottomBoxMenu.appendChild(you);

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



getOnMindItem()
function getOnMindItem(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    
        let uid = user.uid;

      
        database.ref().child("allQuestionsByLanguage").child(language).child(messageID).once('value').then(function(snapshot) {

            count = 1;
            // let messageID = snapshot.child("messageID").val(); // ID of the confession
            let creatorID = snapshot.child("creatorID").val(); // Original Poster
            getMessages(creatorID);
            let message = snapshot.child("message").val(); //The message
            let language = snapshot.child("language").val();


            const onMindItemText = document.createElement('onMindItemText');
            onMindItemText.id = "onMindItemText"+ count;
            let onMindItemTextID = onMindItemText.id;
            onMindItemText.innerText = message;
            onMindItem.appendChild(onMindItemText);

            // MENU BAR
            const onMindItemMenuBar = document.createElement('onMindItemMenuBar');
            onMindItemMenuBar.id = "onMindItemMenuBarID";
            onMindItem.appendChild(onMindItemMenuBar);

           

            // LOVE BUTTON
            const loveButton = document.createElement('loveButton');
            loveButton.onclick = function(){changeIcon(loveIconID, messageID, creatorID, language)};
            loveButton.onmouseover = function(){loveIconToWhite(loveIconID)};
            loveButton.onmouseout = function(){loveIconToBlack(loveIconID)};
            onMindItemMenuBar.appendChild(loveButton);

            const loveIcon = document.createElement('img'); 
            loveIcon.src = 'loveEmptyBlack.svg'; 
            loveIcon.style.height = "calc(20px + (48 - 20) * ((100vw - 300px) / (1800 - 300)))";
        
            // Chances icon
            let loveValue = snapshot.child(uid).child("love").val();
        
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
            converseIcon.style.height = "calc(20px + (48 - 20) * ((100vw - 300px) / (1800 - 300)))";
            converseIcon.id = "converseIcon"+ count;
            let converseIconID = converseIcon.id;
            converseButton.appendChild(converseIcon); 

            const converseButtonText = document.createElement('converseButtonText');
            converseButtonText.innerText = "Converse";
            converseButton.appendChild(converseButtonText); 


            // SHARE BUTTON
            const shareButton = document.createElement('shareButton');
            shareButton.id = "shareButtonID"
            shareButton.onclick = function(){shareLink(messageID)};
            shareButton.onmouseover = function(){shareIconToWhite(shareIconID)};
            shareButton.onmouseout = function(){shareIconToBlack(shareIconID)};
            onMindItemMenuBar.appendChild(shareButton);

            const shareIcon = document.createElement('img'); 
            shareIcon.src = 'shareBlack.svg'; 
            shareIcon.style.height = "calc(20px + (48 - 20) * ((100vw - 300px) / (1800 - 300)))";
            shareIcon.id = "shareIcon"+ count;
            let shareIconID = shareIcon.id;
            shareButton.appendChild(shareIcon); 

            const shareButtonText = document.createElement('shareButtonText');
            shareButtonText.id = "shareButtonTextID"
            shareButtonText.innerHTML = "Share";
            shareButton.appendChild(shareButtonText); 




            


            if (uid == creatorID){
                
                const editButton = document.createElement('editButton');
                editButton.id = "editButton"+ count;
                editButton.innerHTML = "edit";
                let editID = editButton.id;
                editButton.onclick = function(){editText(onMindItemTextID, onMindItemHeight, count, editID, message, messageID, creatorID)};
                onMindItem.appendChild(editButton);
            
            }

            // ADD THE OnMindIem
            // midBox.prepend(onMindItem);

            // midBox.scrollTo(0, 50000);
            let onMindItemHeight = document.getElementById(onMindItemTextID).offsetHeight;


        
           

            });
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

function shareIconToWhite(shareIconID){

    let specificShareIcon = document.getElementById(shareIconID)
    specificShareIcon.src = 'shareWhite.svg';

}

function shareIconToBlack(shareIconID){

    let specificShareIcon = document.getElementById(shareIconID)
    specificShareIcon.src = 'shareBlack.svg';
    
}

// Happens when clicking Love
// If it's the first time, it sends a mail to the person otherwise, it just saves the setting of that icon for that onMindItem

// 3 things are needed when changing love icon
// loveIconID: what love icon it is, each love icon for every confession has an ID.
// messageID such that your settings for the confession can be added.
// creatorID needed to sent them an email.
function changeIcon(loveIconID, messageID, creatorID, language){

    let specificLoveIcon = document.getElementById(loveIconID)

    // Check filename if heart icon is empty or filled
    let isEmpty = specificLoveIcon.src.includes("loveEmptyWhite");
    let isFilled = specificLoveIcon.src.includes("loveFilledWhite");

    if(isEmpty == true){
        specificLoveIcon.src = 'loveFilledWhite.svg';

        //sets setting:
        firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
                
                let uid = user.uid;
                database.ref().child("allQuestionsByLanguage").child(language).child(messageID).child(uid).update({love: "filled"});     
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
                database.ref().child("allQuestionsByLanguage").child(language).child(messageID).child(uid).update({love: "empty"});        
                subtractOneToCollectiveLove()
                
            } 
        });

    }

    //check if mail sent and sent if not.
    firebase.auth().onAuthStateChanged(function(user) {
    
        if (user) {
            
            let uid = user.uid;
                // Checks if already sent a mail, if not: Sends one.
            database.ref().child("allQuestionsByLanguage").child(language).child(messageID).child(uid).child("send").once('value').then(function(snapshot) {
                
                //SET VISUALS
                if(snapshot.val() == null){
                    
                    // update to sent and sent the mail
                    database.ref().child("allQuestionsByLanguage").child(language).child(messageID).child(uid).update({send: "sent"});   

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


function shareLink(messageID){
    
    var copyText = "https://nearvear.com/confession.html?" + messageID
    document.getElementById("shareButtonTextID").innerHTML = "Copied";
  
    // WHAT A FUCKING HACK
    const copyTextArea = document.createElement('textarea');
    copyTextArea.value = copyText;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    copyTextArea.setSelectionRange(0, 99999)
    document.execCommand('copy');
    document.body.removeChild(copyTextArea);
  
  }

// TEXT EDITING
// THE REASON I DO IT SO CONVOLUTED IS TO PRACTISE ELEMENTS AND SEE THE LIMITS. THEN REDUCE, CLEARLY IT COULD BE REDUCED HEAVILY, BUT HAD TO GET HERE TO SEE IT.
function editText(onMindItemID, onMindItemHeight, count, editID, message, messageID, creatorID){
   

    let onMindItemTextarea = document.createElement('textarea');
    onMindItemTextarea.innerHTML = message;
    onMindItemTextarea.id = "onMindItemTextarea" + count;
    let onMindItemTextareaID = onMindItemTextarea.id;
 
    document.getElementById(onMindItemID).replaceWith(onMindItemTextarea)

    const saveButton = document.createElement('saveButton');
    saveButton.id = "saveButton"+ count;
    saveButton.innerText = "save";
    let saveID = saveButton.id;
    saveButton.onclick = function(){saveText(onMindItemTextareaID, onMindItemHeight, count, saveID, message, messageID, creatorID)};

    document.getElementById(editID).replaceWith(saveButton)

}


// THE REASON I DO IT SO CONVOLUTED IS TO PRACTISE ELEMENTS AND SEE THE LIMITS.
function saveText(onMindItemTextareaID, onMindItemHeight, count, saveID, message, messageID, creatorID){


    const onMindItem = document.createElement('onMindItem');
    let newMessage = document.getElementById(onMindItemTextareaID).value;
    onMindItem.innerText = newMessage

    // onMindItemText
    
    // onMindItem.onclick = function(){conversationLink(message, messageID, creatorID)};
    onMindItem.id = "onMindItem"+ count;
    let onMindItemID = onMindItem.id;
    
    document.getElementById(onMindItemTextareaID).replaceWith(onMindItem);


    const editButton = document.createElement('editButton');
    editButton.id = "editButton"+ count;
    editButton.innerText = "edit";
    let editID = editButton.id;
    editButton.onclick = function(){editText(onMindItemID, onMindItemHeight, count, editID, newMessage, messageID, creatorID)};

    document.getElementById(saveID).replaceWith(editButton)

    firebase.auth().onAuthStateChanged(function(user) {
    
        if (user) {
            // User is signed in.
            let uid = user.uid;


            database.ref().child("allQuestionsByLanguage").child(language).child(messageID).update({
                    
                message: newMessage,
                // seen: "unseen"
                
            });  
        } 
    });
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



