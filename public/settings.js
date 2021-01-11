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
pageTitle.innerText = " Settings";
pageTitle.onclick = function(){home()};
topBox.appendChild(pageTitle);


function home(){
    window.location='index.html';
}

// ----------------------------------------------------- TRUSTWORTHY SETTINGS

const descriptionTrustworthy = document.createElement('descriptionTrustworthy');
descriptionTrustworthy.innerText = "Trustworthy";
descriptionTrustworthy.className = "description"
midBox.appendChild(descriptionTrustworthy);

const trustworthyBox = document.createElement('trustworthyBox');
midBox.appendChild(trustworthyBox);

const trustworthyAmount = document.createElement('trustworthyAmount');
trustworthyAmount.innerHTML = "Given to great answers<br>Trustworthy: ";
trustworthyBox.appendChild(trustworthyAmount);

const trustworthyIcon = document.createElement('img'); 
trustworthyIcon.src = 'anchorBlack.svg'; 
trustworthyBox.appendChild(trustworthyIcon); 



// ----------------------------------------------------- CHECKING HOW MUCH TRUSTWORTH YOU HAVE
checkYourTrustworthiness()
function checkYourTrustworthiness(){
    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            let uid = user.uid;
         
            //CHECK SETTINGS
            database.ref('Trust').child(uid).child("trustworthiness").once('value').then(function(snapshot) {
                if(snapshot.exists){
                    if(snapshot.val() == null ){
                        trustworthyAmount.innerHTML = "Given to great answers<br>Trustworthy: " + 0;      
                    } else {
                    trustworthyAmount.innerHTML = "Given to great answers<br>Trustworthy: " + snapshot.val();
                    }
                }
            });
        } 
    });
} 








// --------------------------------------------------------- BUTTONS FOR LANGUAGE AND NOTIFICATIONS
const descriptionButtons = document.createElement('descriptionButtons');
descriptionButtons.innerText = "Menus:";
descriptionButtons.className = "description"
midBox.appendChild(descriptionButtons);


const buttonToNofications = document.createElement('buttonToNofications');
buttonToNofications.innerText = "Notification";
buttonToNofications.className = "button"
buttonToNofications.onclick = function(){notifications()};
midBox.appendChild(buttonToNofications);


function notifications(){
    window.location='notifications.html';
}


const buttonToLanguage = document.createElement('buttonToLanguage');
buttonToLanguage.innerText = "Language";
buttonToLanguage.className = "button"
buttonToLanguage.onclick = function(){language()};
midBox.appendChild(buttonToLanguage);

function language(){
    window.location='language.html';
}


const descriptionUpgradeAndLogin = document.createElement('descriptionUpgradeAndLogin');
descriptionUpgradeAndLogin.innerText = "Upgrade & Login:";
descriptionUpgradeAndLogin.className = "description"
midBox.appendChild(descriptionUpgradeAndLogin);

const buttonToUpgrade = document.createElement('buttonToUpgrade');
buttonToUpgrade.innerText = "Upgrade";
buttonToUpgrade.className = "button"
buttonToUpgrade.onclick = function(){upgrade()};
midBox.appendChild(buttonToUpgrade);

function upgrade(){
    window.location='upgrade.html';
}

const buttonToLogin = document.createElement('butbuttonToLogintonToUpgrade');
buttonToLogin.innerText = "Login/Logout";
buttonToLogin.className = "button"
buttonToLogin.onclick = function(){login()};
midBox.appendChild(buttonToLogin);

function login(){
    window.location='login.html';
}










// ---------------------------------------------------------  ADD EMAIL

const descriptionEmail = document.createElement('descriptionEmail');
descriptionEmail.innerText = "Add your email to get notifications:";
descriptionEmail.className = "description"
midBox.appendChild(descriptionEmail);

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