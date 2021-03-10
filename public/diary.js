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
  
  
  //HOME ICON
  const img = document.createElement('img'); 
  img.src = '192px.svg'; 
  img.onclick = function(){home()};
  topBox.appendChild(img);
  
  function home(){
      window.location='index.html';
  }
  
  
  const talkTitle = document.createElement('talkTitle');
  talkTitle.innerText = " Diary";
  talkTitle.onclick = function(){home()};
  topBox.appendChild(talkTitle);
  

  // -------------------------------------------------------------- MID  BOX 
  const midBox = document.createElement('midBox');
  centeringBox.appendChild(midBox);


// ------------------------------------------ GETS THE CONVERSATION
firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
       
        let uid = user.uid;
        let rootRef = database.ref().child("Diary").child(uid).orderByChild('timestampReverse');
        let count = 0;
        rootRef.on("child_added", snap => {
            count = count + 1
            let message = snap.child("message").val(); //The message
            let messageID = snap.child("messageID").val(); // conversationID
            let creatorID = snap.child("creatorID").val(); // Original Poster
            let answeringID = snap.child("answeringID").val();
            let timestamp = snap.child("timestamp").val(); // ID of the confession
            let language = snap.child("language").val();

            const diaryItem = document.createElement('diaryItem');
            diaryItem.id = "diaryItemID" + count
            let diaryItemID = diaryItem.id;
            diaryItem.onclick = function(){deletePopup(messageID, deletePopupID)};

            const onMindItemText = document.createElement('onMindItemText');
            
            onMindItemText.innerText = message;
            diaryItem.appendChild(onMindItemText);

            const dateObject = new Date(timestamp)
            const humanDateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateObject)
    
            const onMindItemDate = document.createElement('onMindItemDate');
            onMindItemDate.innerText = humanDateFormat;
            diaryItem.appendChild(onMindItemDate);

            const deletePopupBox = document.createElement('deletePopupBox');
            deletePopupBox.id = "deletePopupBoxID" + count
            let deletePopupID = deletePopupBox.id;
            deletePopupBox.innerHTML = "Final Delete";
            deletePopupBox.onclick = function(){finalDelete(messageID, diaryItemID, language)};
            diaryItem.appendChild(deletePopupBox);


            // Reduce spacing on phones 
            let w = window.innerWidth;
            let h = window.innerHeight;
            let aspectFactor = w/h;
            
            if(aspectFactor<1){
                diaryItem.style.padding = "10px"
                diaryItem.style.margin = "8px 0px 8px 0px"
             
            } 

            // ADDS THE ITEM
            midBox.appendChild(diaryItem);

        });
    }
});


function deletePopup(messageID, deletePopupID){
    if(document.getElementById(deletePopupID).style.display == "block"){
        document.getElementById(deletePopupID).style.display = "none"
    } else {
        document.getElementById(deletePopupID).style.display = "block"
    }
}

function finalDelete(messageID, diaryItemID, language){
    document.getElementById(diaryItemID).style.display = "none"

    // ----------------------- FOR ALL QUESTIONS
    database.ref('allQuestionsByLanguage').child(language).child(messageID).remove()

    // ----------------------- FOR ALL QUESTIONS
    database.ref('allQuestions').child(messageID).remove()

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            let uid = user.uid;
         
        // ----------------------- ADD TO DIARY
        database.ref('Diary').child(uid).child(messageID).remove()
        }  
      });
}

  
  // -----------------------------------------BOTTOM BOX BUTTONS
  
  const bottomBox = document.createElement('bottomBox');
  bottomBox.id = "bottomBoxID";
  centeringBox.appendChild(bottomBox);
  
  const talk = document.createElement('talk');
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
  
  //Connect to database
  let database = firebase.database();
  
  //TO GET A DAMN PUSH ID
  let postsRef = database.ref();
  let newPostRef = postsRef.push();
  let pushID = newPostRef.key;
  
  
  let firebaseTimestamp = 0;
  let localNumber = 999999999999999;
  let lastConfession = 0
  
  database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
  database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })
  
  
  firebase.auth().onAuthStateChanged(function(user) {
      
      if (user) {
    
          let uid = user.uid;
          database.ref('lastConfession').child(uid).once('value', function(snapshot){ 
              
              if (snapshot.exists()) {
                  lastConfession = snapshot.val()
              } 
              
          })
      } 
  });
  
  
  
  
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
  
  