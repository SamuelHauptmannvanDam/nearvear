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

const talkButton = document.createElement('talkButton');
talkButton.onclick = function(){talkLink()};
// talkButton.style.backgroundColor = "lightseagreen";
talkButton.onmouseover = function(){changeBackgroundTalk()};
talkButton.onmouseout = function(){changeBackgroundBackTalk()};
document.body.appendChild(talkButton);

const talkButtonTitle = document.createElement('talkButtonTitle');
talkButtonTitle.innerText = 'Confess';
// talkButtonTitle.style.color = "white";
talkButtonTitle.onclick = function(){talkLink()};
talkButtonTitle.onmouseover = function(){changeBackgroundTalk()};
talkButtonTitle.onmouseout = function(){changeBackgroundBackTalk()};
document.body.appendChild(talkButtonTitle);

const listenButton = document.createElement('listenButton');
listenButton.onclick = function(){listenLink()};
// listenButton.style.backgroundColor = "#FF7F50";
listenButton.onmouseover = function(){changeBackgroundListen()};
listenButton.onmouseout = function(){changeBackgroundBackListen()};
document.body.appendChild(listenButton);

const listenButtonTitle = document.createElement('listenButtonTitle');
listenButtonTitle.innerText = 'Confessions';
// listenButtonTitle.style.color = "white";
listenButtonTitle.onclick = function(){listenLink()};
listenButtonTitle.onmouseover = function(){changeBackgroundListen()};
listenButtonTitle.onmouseout = function(){changeBackgroundBackListen()};
document.body.appendChild(listenButtonTitle);


function talkLink() {
    window.location='talk.html';
  }

function listenLink() {
    window.location='allQuestions.html';
}

function changeBackgroundTalk() {
    talkButton.style.backgroundColor = "black";
    talkButtonTitle.style.color = "white";
    listenButton.style.backgroundColor = "white";
    listenButtonTitle.style.color = "black";
    
}

function changeBackgroundBackTalk() {
    talkButton.style.backgroundColor = "white";
    talkButtonTitle.style.color = "black";
    listenButton.style.backgroundColor = "black";
    listenButtonTitle.style.color = "white";
 
}

// function changeBackgroundListen() {
//     listenButton.style.backgroundColor = "black";
    
// }

// function changeBackgroundBackListen() {
//     listenButton.style.backgroundColor = "#FF7F50";

// }

