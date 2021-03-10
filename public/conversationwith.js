// Checks if user is signed in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
    }  else {
        firebase.auth().signInAnonymously().catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
      }
});

let creatorID
// The person getting the link, is always the creator.
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        let uid = user.uid;
        creatorID = uid
        
    }  
});

// The Trustee is always the answering.
// GET DATA FROM LINK
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?')).split('?');
let answeringID = hashes[1];






let trustGiven = "not"

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
imgLogo.src = '192px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo); 

const titleBox = document.createElement('titleBox');
titleBox.innerText = " Conversation";
titleBox.onclick = function(){home()};
topBox.appendChild(titleBox);

function home(){
    window.location='index.html';
}


// GET CONVERSATION COUNT
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
        
        var ref = database.ref().child("yourConversations").child(answeringID)
        ref.once("value")
        .then(function(snapshot) {
            
            let conversationCount = snapshot.numChildren(); // 1 ("name")
            const description = document.createElement('description');
            description.innerHTML = conversationCount + " people has already talked with this mentor"
            topBox.appendChild(description);

        });

    }  
});



const conversationBox = document.createElement('conversationBox');
conversationBox.appendChild(topBox);
centeringBox.appendChild(conversationBox);

const inputBox = document.createElement('inputBox');
centeringBox.appendChild(inputBox);

const textarea = document.createElement('textarea');
textarea.id = "TextAreaID";
textarea.placeholder = "Acknowledge and be as helpful as possible"
textarea.maxLength = 10000;
inputBox.appendChild(textarea);

const buttonBox = document.createElement('buttonBox');

inputBox.appendChild(buttonBox);

const send = document.createElement('send');
send.onmouseover = function(){changeSendToBlack()};
send.onmouseout = function(){changeSendToWhite()};
send.onclick = function(){sendMessage()};
buttonBox.appendChild(send);

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

// ------------------------------------------ GETS THE SEND BUTTON OR SEND AND ANCHOR BUTTON

const trustworthy = document.createElement('trustworthy');
const trustworthyIcon = document.createElement('img'); 

firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
       
        let uid = user.uid;
        creatorID = uid
        if(uid == creatorID){
       
            checkTrustworthiness()
         
            trustworthy.onmouseover = function(){changeAnchorToWhite()};
            trustworthy.onmouseout = function(){changeAnchorToBlack()};
            trustworthy.onclick = function(){updateTrustworthiness()}
            buttonBox.appendChild(trustworthy);

            const trustworthyIcon = document.createElement('img'); 
            trustworthyIcon.id = "trustworthyIconID"
            trustworthyIcon.src = 'anchorBlack.svg'; 
            trustworthyIcon.style.height = "calc(20px + (48 - 20) * ((100vw - 300px) / (1800 - 300)))";
            trustworthy.appendChild(trustworthyIcon); 

            const trustworthyText = document.createElement('trustworthyText');
            trustworthyText.id = "trustworthyTextID"
            trustworthyText.innerText = "Trustworthy"
            trustworthy.appendChild(trustworthyText);
            
            function changeAnchorToBlack(){
                trustworthyIcon.src = 'anchorBlack.svg';
            }
            
            function changeAnchorToWhite(){
                trustworthyIcon.src = 'anchorWhite.svg';
            }
        }
    }
});


function updateTrustworthiness(){

     // READ IF TRUST HAS BEEN GIVEN OR NOT
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        let uid = user.uid;

            database.ref().child("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).child("trustGiven").once('value').then(function(snapshot) {
                
                if(snapshot.exists()){
                    
                    if(trustGiven == "not"){
                        trustGiven = "null"
                       
                        database.ref().child("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).update({
                            trustGiven: "has",
                        }); 
                        
                        addOneToTrustworthiness();
                    } 
                    if(trustGiven == "has") {
                        trustGiven = "null"
                        
                        database.ref().child("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).update({
                            trustGiven: "not",
                        }); 
                      
                        subtractOneFromTrustworthiness();
                    }
                    
                } else {
                    database.ref().child("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).update({
                        trustGiven: "not",
                    });
                }
            });

        } 
    });

    //FOR SENDING MAIL 
    //check if mail has been sent before or sends one if not.
    firebase.auth().onAuthStateChanged(function(user) {
    
        if (user) {
            
            let uid = user.uid;
                // Checks if already sent a mail, if not: Sends one.
            database.ref('Trust').child(creatorID).child("peopleYouTrust").child(answeringID).child("send").once('value').then(function(snapshot) {
                
                // IF IT*S NOT IT HAS NOT BEEN SEND BEFORE AKA IF IT IS NOT "sent" then we won't continue.
                if(snapshot.val() == null){
                    
                    // update to sent and sent the mail
                    database.ref("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).update({send: "sent"});   

                    // SEND EMAIL IF SETTING IS ON:
                    //CHECK IF SETTING IS ON OR OFF
                    database.ref('Emails').child(answeringID).child("settings").child("trustworthy").child("trustworthy").once('value').then(function(snapshot) {
                    
                        if(snapshot.val() == "on" || null || "null"){
                           
                            //CHECK IF MAIL EXIST
                            database.ref('Emails').child(creatorID).child("email").child("email").once('value').then(function(snapshot) {
                                    
                                Email.send({
                                    SecureToken : "09c52732-99c5-44e6-816a-e3bc58d79108",
                                    To : snapshot.val(),
                                    From : "nearvear.app@gmail.com",
                                    Subject : "Someone Believes you are trustworthy",
                                    Body : "Creators of confessions can give you the rank of trustworhy, for great answers.<br>Your trustworth can be seen here: https://nearvear.com//notifications.html<br><br>If you ever need to unsubscribe: https://nearvear.com//notifications.html<br>Best regards, the Nearvear Team<br><br>If you ever want to give feedback or got ideas, just answer this mail."
                                
                                }).then(
                                   // message => alert(message)
                                );
                            });
                        }
                    });
                } 
            });      
        } 
    });
}

// checkTrustworthiness()
function checkTrustworthiness() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            // READ THE AMOUNT OF TRUST PERSON HAS
            database.ref().child("Trust").child(answeringID).child("trustworthiness").once('value').then(function(snapshot) {

                if(snapshot.exists()){
                    document.getElementById("trustworthyTextID").innerHTML = "Trustworthy: " + snapshot.val();
                } 
            });

            // READ IF TRUST HAS BEEN GIVEN OR NOT
            database.ref().child("Trust").child(creatorID).child("peopleYouTrust").child(answeringID).child("trustGiven").once('value').then(function(snapshot) {

                if(snapshot.exists()){
                    trustGiven = snapshot.val();

                } else {
                    // database.ref().child("Trust").child(creatorID).child(answeringID).update({
                    //     trustGiven: "not",
                    // });
                }
            });
        }
    });
}


function addOneToTrustworthiness() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            database.ref().child("Trust").child(answeringID).child("trustworthiness").once('value').then(function(snapshot) {
                database.ref().child("Trust").child(answeringID).update({
                    trustworthiness: snapshot.val()+1,
                });
                checkTrustworthiness()
            });

        }
    });
}

function subtractOneFromTrustworthiness() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
           
            database.ref().child("Trust").child(answeringID).child("trustworthiness").once('value').then(function(snapshot) {

                database.ref().child("Trust").child(answeringID).update({
                    trustworthiness: snapshot.val()-1,
                });

                checkTrustworthiness()

            });
        }
    });
}


// -----------------------------------------BOTTOM BOX 

const bottomBox = document.createElement('bottomBox');
inputBox.appendChild(bottomBox);

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


//Connect to database
let database = firebase.database();

// ------------------------------------------ SENDING MESSAGES

//TO GET A DAMN PUSH ID
let postsRef = database.ref();
let newPostRef = postsRef.push();
let pushID = newPostRef.key;
let messageID = database.ref().push().key;

let firebaseTimestamp = 0;
let localNumber = 999999999999999;

database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })


// ------------------------------------------ GETS THE CONVERSATION
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let uid = user.uid;
        let rootRef = database.ref().child("Conversations").child(creatorID).child(answeringID).orderByChild("timestamp");
        rootRef.on("child_added", snap => {
            let message = snap.child("message").val(); //The message
            let messageCreatorID = snap.child("creatorID").val(); // poster of message ID, to give color to your posts.
         
            let timestamp = snap.child("timestamp").val();      

            const conversationItem = document.createElement('conversationItem');
            conversationBox.appendChild(conversationItem);
          

            // UI Differences between creatorID and answeringID:: Your messages has a square around them.
            if(messageCreatorID == uid){    
                conversationItem.style.borderColor = "black";
                conversationItem.style.textAlign = "right";
                conversationItem.style.float = "right";
            }

            const conversationText = document.createElement('conversationText');
            conversationText.innerText = message;
            conversationItem.appendChild(conversationText);

            // Checks if you've seen it.
            let seenByYou = snap.child(uid).child("seen").val(); 
            console.log(seenByYou)
            if(seenByYou != "seen"){
                database.ref().child("Conversations").child(creatorID).child(answeringID).child(snap.key).child(uid).update({seen: "seen"});   
                // console.log(snap.key)
            }
            

            if(uid == creatorID){   
                let seenByAnsweringID = snap.child(answeringID).child("seen").val(); 
                if(seenByAnsweringID == "seen"){
                    const conversationCheck = document.createElement('conversationCheck');
                    conversationCheck.innerText = "✓";
                    conversationItem.appendChild(conversationCheck);
                }
            }
            if(uid == answeringID){     
                let seenByCreatorID = snap.child(creatorID).child("seen").val(); 
                if(seenByCreatorID == "seen"){
                    const conversationCheck = document.createElement('conversationCheck');
                    conversationCheck.innerText = "✓";
                    conversationItem.appendChild(conversationCheck);
                }
            }

            conversationBox.scrollTo(0, 5000000);
        });
    }
});


function sendMessage() {
    ifEmailAvailable()
   
    if(document.getElementById("TextAreaID").value == "" ){

    } else{

        let timestampReverse = localNumber - Object.values(firebaseTimestamp);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                let uid = user.uid;
 
                // ------------------------------------------ Adds message to conversation.
                database.ref('Conversations').child(creatorID).child(answeringID).push().set({
                    message: document.getElementById("TextAreaID").value,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                    onMindID: pushID,
                    creatorID: uid,
                    
                }); 
               
                // ------------------------------------------ Conversation Title, for the conversation list.
                // ------------------------------------------ Conversation list not yet implemented.


                // ------------------------------------------ ADD CONVERSATIONS TO CONVERSATION LIST

                if(answeringID == uid){
                    
                    database.ref('yourConversations').child(answeringID).child(creatorID).set({
                    message: document.getElementById("TextAreaID").value,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                    messageID: messageID,
                    answeringID: uid,
                    creatorID: creatorID,
                    seen: "seen",
                    }); 

                    database.ref('yourConversations').child(creatorID).child(answeringID).set({
                    message: document.getElementById("TextAreaID").value,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                    messageID: messageID,
                    answeringID: uid,
                    creatorID: creatorID,
                    seen: "unseen",
                    }); 

                    // Changes the color of the "conversation button" under allQuestions, to indicate someone answered you haven't seen.
                    database.ref('Settings').child("yourConversations").child("notificationLight").child(creatorID).set({
                        seen: "unseen",
                    }); 

                } else { 

                    // ------------------------------------------ TO CREATOR CONVERSATION LIST
                    database.ref('yourConversations').child(creatorID).child(answeringID).set({
                    message: document.getElementById("TextAreaID").value,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                   
                    messageID: messageID,
                    answeringID: answeringID,
                    creatorID: creatorID,
                    seen: "seen",
                    }); 

                    // ------------------------------------------ TO CREATOR CONVERSATION LIST
                    database.ref('yourConversations').child(answeringID).child(creatorID).set({
                    message: document.getElementById("TextAreaID").value,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timestampReverse: timestampReverse,
                   
                    messageID: messageID,
                    answeringID: answeringID,
                    creatorID: creatorID,
                    seen: "unseen",
                    }); 

                    // Changes the color of the "conversation button" under allQuestions, to indicate someone answered you haven't seen.
                    database.ref('Settings').child("yourConversations").child("notificationLight").child(answeringID).set({
                        seen: "unseen",
                    }); 

                }
                
                textarea.value = '';    

            }
        });
    };
}


function ifEmailAvailable(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;

            // CHECKS IF YOU ARE CREATOR OR ANSWER AND SEND THE PERSON ISN*T YOU A MAIL THAT YOU*VE ANSWERED THEM
            if(uid != creatorID ){

                //----------------------------------------------- YOU ARE THE ANSWERING

                //CHECK IF SETTING IS ON OR OFF
                database.ref('Emails').child(answeringID).child("settings").child("newMessage").child("newMessage").once('value').then(function(snapshot) {
                    if(snapshot.val() == "on" || null){
                        
                        //CHECK IF MAIL EXIST
                        database.ref('Emails').child(creatorID).child("email").child("email").once('value').then(function(snapshot) {
                            Email.send({
                                SecureToken : "09c52732-99c5-44e6-816a-e3bc58d79108",
                                To : snapshot.val(),
                                From : "nearvear.app@gmail.com",
                                Subject : "Someone wrote you a message",
                                Body : "Here, take a look: nearvear.com/yourConversations.html<br><br>If you ever need to unsubscribe: nearvear.com/notifications.html<br>Best regards, the Nearvear Team<br><br>Fun fact: Nearvear is misspelling of nærvær, which means to be present<br>If you ever have feedback or thoughts, just reply to this email and we'll get right back to you"
                            
                            }).then(
                                //  message => alert(message)
                            );
                        });
                    }
                });
                
            } else {
                //----------------------------------------------- YOU ARE THE CREATOR
                //CHECK IF SETTING IS ON OR OFF
                database.ref('Emails').child(creatorID).child("settings").child("newMessage").child("newMessage").once('value').then(function(snapshot) {
                    
                    if(snapshot.val() == "on"){
                        
                        //CHECK IF MAIL EXIST
                        database.ref('Emails').child(answeringID).child("email").child("email").once('value').then(function(snapshot) {
                                
                            Email.send({
                              
                                SecureToken : "09c52732-99c5-44e6-816a-e3bc58d79108",
                                To : snapshot.val(),
                                From : "nearvear.app@gmail.com",
                                Subject : "Someone wrote you a message",
                                Body : "Here, take a look: nearvear.com/yourConversations.html<br><br>If you ever need to unsubscribe: nearvear.com/notifications.html<br>Best regards, the Nearvear Team<br><br>Fun fact: Nearvear is misspelling of nærvær, which means to be present<br>If you ever have feedback or thoughts, just reply to this email and we'll get right back to you"
                            
                            })
                        });
                    }
                });
            }
        }
    });
}


// If screen is taller than wide - aka phones: Use the full screen. But if wider than narrow, use the mid.
checkScreenAspect()
function checkScreenAspect(){

    let w = window.innerWidth;
    let h = window.innerHeight;
    let aspectFactor = w/h;
    if(aspectFactor>1){
        document.getElementById("CenteringBoxID").style.width = "33%";

    } else { // remove topbox for phones
        topBox.style.display = "none";
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

