firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        let uid = user.uid;
        console.log("We are logged in") 
        console.log(uid) 

    }  else {
        
        console.log("logging in anonymously.") 

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

const growthBox = document.createElement('growthBox');
centeringBox.appendChild(growthBox);

const centeringVerticallyBox = document.createElement('centeringVerticallyBox');
growthBox.appendChild(centeringVerticallyBox);

//HOME ICON
const img = document.createElement('img'); 
img.src = '192px.svg'; 
img.onclick = function(){home()};
topBox.appendChild(img);

const pageTitle = document.createElement('pageTitle');
pageTitle.innerText = " Login";
pageTitle.onclick = function(){home()};
topBox.appendChild(pageTitle);

function home(){
    window.location='index.html';
}

const pageDescription = document.createElement('pageDescription');
pageDescription.innerHTML = "Login anywhere, but first you need to upgrade your account. After you upgrade, you'll be able to login from any device with email and password and get your conversations on that device.<br><br>CAREFUL: Your email can ONLY be connected to one account<br><br>To upgrade a specific account, to go that device & browser and upgrade from that device & browser.";
topBox.appendChild(pageDescription);

const inputEmail = document.createElement('input');
inputEmail.id = "emailInputID";
inputEmail.autocomplete = "email";
inputEmail.placeholder = "Add Email";
centeringVerticallyBox.appendChild(inputEmail);

const inputPassword = document.createElement('input');
inputPassword.id = "passwordInputID";
inputPassword.type = "password"
inputPassword.autocomplete = "password";
inputPassword.placeholder = "Add password";
centeringVerticallyBox.appendChild(inputPassword);

const feedbackMessage = document.createElement('feedbackMessage');
feedbackMessage.id = "feedbackMessageID"
feedbackMessage.innerText = "You are amazing.";
centeringVerticallyBox.appendChild(feedbackMessage);

const loginButton = document.createElement('loginButton');
loginButton.innerText = "Login";
loginButton.onclick = function(){loginFunction()};
loginButton.className = "Button"
centeringVerticallyBox.appendChild(loginButton);


function loginFunction(){

    var password = document.getElementById('passwordInputID').value;
    var email = document.getElementById('emailInputID').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
            let uid = user.uid;

            console.log("signed in!")
            window.location='yourConversations.html';
             
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("Error upgrading anonymous account", error);
            feedbackMessage.style.color = "red"
            document.getElementById("feedbackMessageID").innerHTML = errorMessage;

        });
}


const logoutButton = document.createElement('logoutButton');
logoutButton.innerText = "Logout";
logoutButton.onclick = function(){logoutFunction()};
logoutButton.className = "Button"
centeringVerticallyBox.appendChild(logoutButton);


function logoutFunction(){
    if((firebase.auth().currentUser.email) == null){
        feedbackMessage.style.color = "red"
        document.getElementById("feedbackMessageID").innerHTML = "You aren't logged in";

    } else {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logged out")
        feedbackMessage.style.color = "green"
        document.getElementById("feedbackMessageID").innerHTML = "You've been logged out";

      }).catch((error) => {
        // An error happened.
        
      });
    }


}

var auth = firebase.auth();

// Email is set when running: Check Email
let emailAddress = "null"
const forgotPasswordButton = document.createElement('forgotPasswordButton');
forgotPasswordButton.innerText = "Reset Passsword";
forgotPasswordButton.onclick = function(){resetPassword(emailAddress)};
forgotPasswordButton.className = "Button"
centeringVerticallyBox.appendChild(forgotPasswordButton);


function resetPassword(emailAddress){

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        console.log(emailAddress)
        // Email sent.

        feedbackMessage.style.color = "green"
        document.getElementById("feedbackMessageID").innerHTML = "An email has been sent";
      }).catch(function(error) {
        // An error happened.

        feedbackMessage.style.color = "black"
        document.getElementById("feedbackMessageID").innerHTML = error;
      });

   
}



const haventUpgradedYet = document.createElement('haventUpgradedYet');
haventUpgradedYet.innerText = "Haven't upgraded yet?";
haventUpgradedYet.onclick = function(){goToUpgrade()};
centeringVerticallyBox.appendChild(haventUpgradedYet);

function goToUpgrade(){
    window.location='upgrade.html';
}

const bottomBox = document.createElement('bottomBox');
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
database.ref();

//-------------------------------------------- SHOULD BE USED TO SHOW YOU YOUR EMAIL
checkEmailInfo()
function checkEmailInfo(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;
            //CHECK IF MAIL EXIST
            database.ref('Emails').child(uid).child("email").child("email").once('value').then(function(snapshot) {
                if (snapshot.exists()) {
                    inputEmail.value = snapshot.val();
                    emailAddress = snapshot.val();
                } 
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

    } else { // remove topbox for phones
        // topBox.style.display = "none";
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