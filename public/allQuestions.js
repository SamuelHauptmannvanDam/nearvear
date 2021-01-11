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
imgLogo.src = '32px.svg'; 
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

const descriptionDeletionButton = document.createElement('descriptionDeletionButton');
descriptionDeletionButton.innerHTML = "&#10006;"
descriptionDeletionButton.onclick = function(){removeDescription()};
descriptionBox.appendChild(descriptionDeletionButton);


const description = document.createElement('description');
description.innerHTML = "New conversations starts here. Tap Converse to start a conversation. All conversations are 1 on 1. <br /><br />Your messages are browser & device specific. MEANING: To see answers or past conversations or messages, you have to go back to that specific browser on that specific device<br /><br />UNLESS: you upgrade your account under Settings<br /><br />Change the language of posts you want to see here, or later under Settings"
descriptionBox.appendChild(description);


const selectLanguage = document.createElement('selectLanguage');
selectLanguage.innerHTML = "Select Language";
selectLanguage.onclick = function(){ showLanguages() };
descriptionBox.appendChild(selectLanguage);



// -----------------------------------------------------------------              THE BOX FOR ALL THE LANGUAGES YOU CAN PICK FROM:
const languageBox = document.createElement('languageBox');
languageBox.id = "languageBoxID";
descriptionBox.appendChild(languageBox);
// let languageBoxObject = document.getElementById("languageBoxID");
// languageBoxObject.style.display = "none";


// --------------------------------------------------------------------- ALL THE LANGUAGE BUTTONS!!



const Abkhazian = document.createElement('Abkhazian');
Abkhazian.innerHTML = "Abkhazian";
Abkhazian.className = "languageButton"
Abkhazian.onclick = function(){ pickLanguage("Abkhazian") };
languageBox.appendChild(Abkhazian);

// "af": Afrikaans
const Afrikaans = document.createElement('Afrikaans');
Afrikaans.innerHTML = "Afrikaans";
Afrikaans.className = "languageButton"
Afrikaans.onclick = function(){ pickLanguage("Afrikaans") };
languageBox.appendChild(Afrikaans);


// "sq": Albanian
const Albanian = document.createElement('Albanian');
Albanian.innerHTML = "Albanian";
Albanian.className = "languageButton"
Albanian.onclick = function(){ pickLanguage("Albanian") };
languageBox.appendChild(Albanian);


// "ar": Arabic
const Arabic = document.createElement('Arabic');
Arabic.innerHTML = "Arabic";
Arabic.className = "languageButton"
Arabic.onclick = function(){ pickLanguage("Arabic") };
languageBox.appendChild(Arabic);

// "hy": Armenian
const Armenian = document.createElement('Armenian');
Armenian.innerHTML = "Armenian";
Armenian.className = "languageButton"
Armenian.onclick = function(){ pickLanguage("Armenian") };
languageBox.appendChild(Armenian);

// "az": Azerbaijani
const Azerbaijani = document.createElement('Azerbaijani');
Azerbaijani.innerHTML = "Azerbaijani";
Azerbaijani.className = "languageButton"
Azerbaijani.onclick = function(){ pickLanguage("Azerbaijani") };
languageBox.appendChild(Azerbaijani);


// "eu": Basque
const Basque = document.createElement('Basque');
Basque.innerHTML = "Basque";
Basque.className = "languageButton"
Basque.onclick = function(){ pickLanguage("Basque") };
languageBox.appendChild(Basque);


// "be": Belarusian
const Belarusian = document.createElement('Belarusian');
Belarusian.innerHTML = "Belarusian";
Belarusian.className = "languageButton"
Belarusian.onclick = function(){ pickLanguage("Belarusian") };
languageBox.appendChild(Belarusian);

// "bn": Bengali
const Bengali = document.createElement('Bengali');
Bengali.innerHTML = "Bengali";
Bengali.className = "languageButton"
Bengali.onclick = function(){ pickLanguage("Bengali") };
languageBox.appendChild(Bengali);


// "br": Breton
const Breton = document.createElement('Breton');
Breton.innerHTML = "Breton";
Breton.className = "languageButton"
Breton.onclick = function(){ pickLanguage("Breton") };
languageBox.appendChild(Breton);

// "bg": Bulgarian
const Bulgarian = document.createElement('Bulgarian');
Bulgarian.innerHTML = "Bulgarian";
Bulgarian.className = "languageButton"
Bulgarian.onclick = function(){ pickLanguage("Bulgarian") };
languageBox.appendChild(Bulgarian);

// "ca": Catalan
const Catalan = document.createElement('Catalan');
Catalan.innerHTML = "Catalan";
Catalan.className = "languageButton"
Catalan.onclick = function(){ pickLanguage("Catalan") };
languageBox.appendChild(Catalan);

// "ceb": Cebuano
const Cebuano = document.createElement('Cebuano');
Cebuano.innerHTML = "Cebuano";
Cebuano.className = "languageButton"
Cebuano.onclick = function(){ pickLanguage("Cebuano") };
languageBox.appendChild(Cebuano);

// "zh": Chinese
const Chinese = document.createElement('Chinese');
Chinese.innerHTML = "Chinese";
Chinese.className = "languageButton"
Chinese.onclick = function(){ pickLanguage("Chinese") };
languageBox.appendChild(Chinese);

// "hr": Croatian
const Croatian = document.createElement('Croatian');
Croatian.innerHTML = "Croatian";
Croatian.className = "languageButton"
Croatian.onclick = function(){ pickLanguage("Croatian") };
languageBox.appendChild(Croatian);

// "cs": Czech
const Czech = document.createElement('Czech');
Czech.innerHTML = "Czech";
Czech.className = "languageButton"
Czech.onclick = function(){ pickLanguage("Czech") };
languageBox.appendChild(Czech);



// DANISH
const selectDanish = document.createElement('selectDanish');
selectDanish.innerHTML = "Danish";
selectDanish.className = "languageButton"
selectDanish.onclick = function(){ pickLanguage("Danish") };
languageBox.appendChild(selectDanish);

// "nl": Dutch, Flemish
const Dutch = document.createElement('Dutch');
Dutch.innerHTML = "Dutch";
Dutch.className = "languageButton"
Dutch.onclick = function(){ pickLanguage("Dutch") };
languageBox.appendChild(Dutch);

// ENGLISH
const selectEnglish = document.createElement('selectEnglish');
selectEnglish.innerHTML = "English";
selectEnglish.className = "languageButton"
selectEnglish.onclick = function(){ pickLanguage("English") };
languageBox.appendChild(selectEnglish);

// "eo": Esperanto
const Esperanto = document.createElement('Esperanto');
Esperanto.innerHTML = "Esperanto";
Esperanto.className = "languageButton"
Esperanto.onclick = function(){ pickLanguage("Esperanto") };
languageBox.appendChild(Esperanto);

// "et": Estonian
const Estonian = document.createElement('Estonian');
Estonian.innerHTML = "Estonian";
Estonian.className = "languageButton"
Estonian.onclick = function(){ pickLanguage("Estonian") };
languageBox.appendChild(Estonian);


// "fi": Finnish
const Finnish = document.createElement('Finnish');
Finnish.innerHTML = "Finnish";
Finnish.className = "languageButton"
Finnish.onclick = function(){ pickLanguage("Finnish") };
languageBox.appendChild(Finnish);

// "ka": Georgian
const Georgian = document.createElement('Georgian');
Georgian.innerHTML = "Georgian";
Georgian.className = "languageButton"
Georgian.onclick = function(){ pickLanguage("Georgian") };
languageBox.appendChild(Georgian);

// "de": German
const German = document.createElement('German');
German.innerHTML = "German";
German.className = "languageButton"
German.onclick = function(){ pickLanguage("German") };
languageBox.appendChild(German);



// "el": Greek
const Greek = document.createElement('Greek');
Greek.innerHTML = "Greek";
Greek.className = "languageButton"
Greek.onclick = function(){ pickLanguage("Greek") };
languageBox.appendChild(Greek);




// "fo": Faroese
const Faroese = document.createElement('Faroese');
Faroese.innerHTML = "Faroese";
Faroese.className = "languageButton"
Faroese.onclick = function(){ pickLanguage("Faroese") };
languageBox.appendChild(Faroese);

// "fr": French
const French = document.createElement('French');
French.innerHTML = "French";
French.className = "languageButton"
French.onclick = function(){ pickLanguage("French") };
languageBox.appendChild(French);

// "fy": Frisian
const Frisian = document.createElement('Frisian');
Frisian.innerHTML = "Frisian";
Frisian.className = "languageButton"
Frisian.onclick = function(){ pickLanguage("Frisian") };
languageBox.appendChild(Frisian);

// "gd": Scottish Gaelic, Gaelic
const ScotsGaelic = document.createElement('ScotsGaelic');
ScotsGaelic.innerHTML = "Scots Gaelic";
ScotsGaelic.className = "languageButton"
ScotsGaelic.onclick = function(){ pickLanguage("Scots Gaelic") };
languageBox.appendChild(ScotsGaelic);

// "gl": Galician
const Galician = document.createElement('Galician');
Galician.innerHTML = "Galician";
Galician.className = "languageButton"
Galician.onclick = function(){ pickLanguage("Galician") };
languageBox.appendChild(Galician);

// "gu": Gujarati
const Gujarati = document.createElement('Gujarati');
Gujarati.innerHTML = "Gujarati";
Gujarati.className = "languageButton"
Gujarati.onclick = function(){ pickLanguage("Gujarati") };
languageBox.appendChild(Gujarati);

// "ha": Hausa
const Hausa = document.createElement('Hausa');
Hausa.innerHTML = "Hausa";
Hausa.className = "languageButton"
Hausa.onclick = function(){ pickLanguage("Hausa") };
languageBox.appendChild(Hausa);

// "haw": Hawaiian
const Hawaiian = document.createElement('Hawaiian');
Hawaiian.innerHTML = "Hawaiian";
Hawaiian.className = "languageButton"
Hawaiian.onclick = function(){ pickLanguage("Hawaiian") };
languageBox.appendChild(Hawaiian);

// "he": Hebrew
const Hebrew = document.createElement('Hebrew');
Hebrew.innerHTML = "Hebrew";
Hebrew.className = "languageButton"
Hebrew.onclick = function(){ pickLanguage("Hebrew") };
languageBox.appendChild(Hebrew);

// "hi": Hindi
const Hindi = document.createElement('Hindi');
Hindi.innerHTML = "Hindi";
Hindi.className = "languageButton"
Hindi.onclick = function(){ pickLanguage("Hindi") };
languageBox.appendChild(Hindi);


// "hu": Hungarian
const Hungarian = document.createElement('Hungarian');
Hungarian.innerHTML = "Hungarian";
Hungarian.className = "languageButton"
Hungarian.onclick = function(){ pickLanguage("Hungarian") };
languageBox.appendChild(Hungarian);


// "id": Indonesian
const Indonesian = document.createElement('Indonesian');
Indonesian.innerHTML = "Indonesian";
Indonesian.className = "languageButton"
Indonesian.onclick = function(){ pickLanguage("Indonesian") };
languageBox.appendChild(Indonesian);

// "is": Icelandic
const Icelandic = document.createElement('Icelandic');
Icelandic.innerHTML = "Icelandic";
Icelandic.className = "languageButton"
Icelandic.onclick = function(){ pickLanguage("Icelandic") };
languageBox.appendChild(Icelandic);

// "it": Italian
const Italian = document.createElement('Italian');
Italian.innerHTML = "Italian";
Italian.className = "languageButton"
Italian.onclick = function(){ pickLanguage("Italian") };
languageBox.appendChild(Italian);

// "ja": Japanese
const Japanese = document.createElement('Japanese');
Japanese.innerHTML = "Japanese";
Japanese.className = "languageButton"
Japanese.onclick = function(){ pickLanguage("Japanese") };
languageBox.appendChild(Japanese);

// "kn": Kannada
const Kannada = document.createElement('Kannada');
Kannada.innerHTML = "Kannada";
Kannada.className = "languageButton"
Kannada.onclick = function(){ pickLanguage("Kannada") };
languageBox.appendChild(Kannada);

// "kk": Kazakh
const Kazakh = document.createElement('Kazakh');
Kazakh.innerHTML = "Kazakh";
Kazakh.className = "languageButton"
Kazakh.onclick = function(){ pickLanguage("Kazakh") };
languageBox.appendChild(Kazakh);

// "km": Khmer
const Khmer = document.createElement('Khmer');
Khmer.innerHTML = "Khmer";
Khmer.className = "languageButton"
Khmer.onclick = function(){ pickLanguage("Khmer") };
languageBox.appendChild(Khmer);

// "ky": , Kyrgyz
const Kyrgyz = document.createElement('Kyrgyz');
Kyrgyz.innerHTML = "Kyrgyz";
Kyrgyz.className = "languageButton"
Kyrgyz.onclick = function(){ pickLanguage("Kyrgyz") };
languageBox.appendChild(Kyrgyz);

// "tlh": Klingon, tlhIngan-Hol
const Klingon = document.createElement('Klingon');
Klingon.innerHTML = "Klingon";
Klingon.className = "languageButton"
Klingon.onclick = function(){ pickLanguage("Klingon") };
languageBox.appendChild(Klingon);


// "ko": Korean
const Korean = document.createElement('Korean');
Korean.innerHTML = "Korean";
Korean.className = "languageButton"
Korean.onclick = function(){ pickLanguage("Korean") };
languageBox.appendChild(Korean);

// "ku": Kurdish
const Kurdish = document.createElement('Kurdish');
Kurdish.innerHTML = "Kurdish";
Kurdish.className = "languageButton"
Kurdish.onclick = function(){ pickLanguage("Kurdish") };
languageBox.appendChild(Kurdish);


// "lo": Lao
const Lao = document.createElement('Lao');
Lao.innerHTML = "Lao";
Lao.className = "languageButton"
Lao.onclick = function(){ pickLanguage("Lao") };
languageBox.appendChild(Lao);

// "la": Latin
const Latin = document.createElement('Latin');
Latin.innerHTML = "Latin";
Latin.className = "languageButton"
Latin.onclick = function(){ pickLanguage("Latin") };
languageBox.appendChild(Latin);


// "lv": Latvian
const Latvian = document.createElement('Latvian');
Latvian.innerHTML = "Latvian";
Latvian.className = "languageButton"
Latvian.onclick = function(){ pickLanguage("Latvian") };
languageBox.appendChild(Latvian);

// "lt": Lithuanian
const Lithuanian = document.createElement('Lithuanian');
Lithuanian.innerHTML = "Lithuanian";
Lithuanian.className = "languageButton"
Lithuanian.onclick = function(){ pickLanguage("Lithuanian") };
languageBox.appendChild(Lithuanian);

// "mk": Macedonian
const Macedonian = document.createElement('Macedonian');
Macedonian.innerHTML = "Macedonian";
Macedonian.className = "languageButton"
Macedonian.onclick = function(){ pickLanguage("Macedonian") };
languageBox.appendChild(Macedonian);

// "mg": Malagasy
const Malagasy = document.createElement('Malagasy');
Malagasy.innerHTML = "Malagasy";
Malagasy.className = "languageButton"
Malagasy.onclick = function(){ pickLanguage("Malagasy") };
languageBox.appendChild(Malagasy);


// "ms": Malay (macrolanguage)
const Malay = document.createElement('Malay');
Malay.innerHTML = "Malay";
Malay.className = "languageButton"
Malay.onclick = function(){ pickLanguage("Malay") };
languageBox.appendChild(Malay);

// "ml": Malayalam
const Malayalam = document.createElement('Malayalam');
Malayalam.innerHTML = "Malayalam";
Malayalam.className = "languageButton"
Malayalam.onclick = function(){ pickLanguage("Malayalam") };
languageBox.appendChild(Malayalam);

// "mr": Marathi
const Marathi = document.createElement('Marathi');
Marathi.innerHTML = "Marathi";
Marathi.className = "languageButton"
Marathi.onclick = function(){ pickLanguage("Marathi") };
languageBox.appendChild(Marathi);

// "mn": Mongolian
const Mongolian = document.createElement('Mongolian');
Mongolian.innerHTML = "Mongolian";
Mongolian.className = "languageButton"
Mongolian.onclick = function(){ pickLanguage("Mongolian") };
languageBox.appendChild(Mongolian);

// "nd": North Ndebele
const NorthNdebele = document.createElement('NorthNdebele');
NorthNdebele.innerHTML = "North Ndebele";
NorthNdebele.className = "languageButton"
NorthNdebele.onclick = function(){ pickLanguage("North Ndebele") };
languageBox.appendChild(NorthNdebele);

// "ne": Nepali
const Nepali = document.createElement('Nepali');
Nepali.innerHTML = "Nepali";
Nepali.className = "languageButton"
Nepali.onclick = function(){ pickLanguage("Nepali") };
languageBox.appendChild(Nepali);

// "nn": Norwegian Nynorsk
const NorwegianNynorsk = document.createElement('NorwegianNynorsk');
NorwegianNynorsk.innerHTML = "Norwegian Nynorsk";
NorwegianNynorsk.className = "languageButton"
NorwegianNynorsk.onclick = function(){ pickLanguage("Norwegian Nynorsk") };
languageBox.appendChild(NorwegianNynorsk);

// "no": Norwegian
const Norwegian = document.createElement('Norwegian');
Norwegian.innerHTML = "Norwegian";
Norwegian.className = "languageButton"
Norwegian.onclick = function(){ pickLanguage("Norwegian") };
languageBox.appendChild(Norwegian);

// "or": Oriya
const Oriya = document.createElement('Oriya');
Oriya.innerHTML = "Oriya";
Oriya.className = "languageButton"
Oriya.onclick = function(){ pickLanguage("Oriya") };
languageBox.appendChild(Oriya);

// "fa": Persian
const Persian = document.createElement('Persian');
Persian.innerHTML = "Persian";
Persian.className = "languageButton"
Persian.onclick = function(){ pickLanguage("Persian") };
languageBox.appendChild(Persian);

// "pa": Panjabi, Punjabi
const Panjabi = document.createElement('Panjabi');
Panjabi.innerHTML = "Panjabi";
Panjabi.className = "languageButton"
Panjabi.onclick = function(){ pickLanguage("Panjabi") };
languageBox.appendChild(Panjabi);

// "nso": Pedi, Northern Sotho, Sepedi
const Pedi = document.createElement('Pedi');
Pedi.innerHTML = "Pedi";
Pedi.className = "languageButton"
Pedi.onclick = function(){ pickLanguage("EnPedPediiglish") };
languageBox.appendChild(Pedi);

// "pl": Polish
const Polish = document.createElement('Polish');
Polish.innerHTML = "Polish";
Polish.className = "languageButton"
Polish.onclick = function(){ pickLanguage("Polish") };
languageBox.appendChild(Polish);

// PORTUGUESE
const selectPortuguese = document.createElement('selectPortuguese');
selectPortuguese.innerHTML = "Portuguese";
selectPortuguese.className = "languageButton"
selectPortuguese.onclick = function(){ pickLanguage("Portuguese") };
languageBox.appendChild(selectPortuguese);

// "ps": Pushto, Pashto
const Pushto = document.createElement('Pushto');
Pushto.innerHTML = "Pushto";
Pushto.className = "languageButton"
Pushto.onclick = function(){ pickLanguage("Pushto") };
languageBox.appendChild(Pushto);

// "ro": Romanian, Moldavian, Moldovan
const Romanian = document.createElement('Romanian');
Romanian.innerHTML = "Romanian";
Romanian.className = "languageButton"
Romanian.onclick = function(){ pickLanguage("Romanian") };
languageBox.appendChild(Romanian);

// "ru": Russian
const Russian = document.createElement('Russian');
Russian.innerHTML = "Russian";
Russian.className = "languageButton"
Russian.onclick = function(){ pickLanguage("Russian") };
languageBox.appendChild(Russian);

// "sa": Sanskrit
const Sanskrit = document.createElement('Sanskrit');
Sanskrit.innerHTML = "Sanskrit";
Sanskrit.className = "languageButton"
Sanskrit.onclick = function(){ pickLanguage("Sanskrit") };
languageBox.appendChild(Sanskrit);

// "sh": Serbo-Croatian
const SerboCroatian = document.createElement('SerboCroatian');
SerboCroatian.innerHTML = "Serbo-Croatian";
SerboCroatian.className = "languageButton"
SerboCroatian.onclick = function(){ pickLanguage("Serbo-Croatian") };
languageBox.appendChild(SerboCroatian);

// "si": Sinhala, Sinhalese
const Sinhala = document.createElement('Sinhala');
Sinhala.innerHTML = "Sinhala";
Sinhala.className = "languageButton"
Sinhala.onclick = function(){ pickLanguage("Sinhala") };
languageBox.appendChild(Sinhala);

// "sk": Slovak
const Slovak = document.createElement('Slovak');
Slovak.innerHTML = "Slovak";
Slovak.className = "languageButton"
Slovak.onclick = function(){ pickLanguage("Slovak") };
languageBox.appendChild(Slovak);

// "sl": Slovenian, Slovene
const Slovenian = document.createElement('Slovenian');
Slovenian.innerHTML = "Slovenian";
Slovenian.className = "languageButton"
Slovenian.onclick = function(){ pickLanguage("Slovenian") };
languageBox.appendChild(Slovenian);

// "so": Somali
const Somali = document.createElement('Somali');
Somali.innerHTML = "Somali";
Somali.className = "languageButton"
Somali.onclick = function(){ pickLanguage("Somali") };
languageBox.appendChild(Somali);


// "sr": Serbian
const Serbian = document.createElement('Serbian');
Serbian.innerHTML = "Serbian";
Serbian.className = "languageButton"
Serbian.onclick = function(){ pickLanguage("Serbian") };
languageBox.appendChild(Serbian);


// "es": Spanish
const Spanish = document.createElement('Spanish');
Spanish.innerHTML = "Spanish";
Spanish.className = "languageButton"
Spanish.onclick = function(){ pickLanguage("Spanish") };
languageBox.appendChild(Spanish);

// "sv": Swedish
const Swedish = document.createElement('Swedish');
Swedish.innerHTML = "Swedish";
Swedish.className = "languageButton"
Swedish.onclick = function(){ pickLanguage("Swedish") };
languageBox.appendChild(Swedish);

// "sw": Swahili (macrolanguage)
const Swahili = document.createElement('Swahili');
Swahili.innerHTML = "Swahili";
Swahili.className = "languageButton"
Swahili.onclick = function(){ pickLanguage("Swahili") };
languageBox.appendChild(Swahili);

// "tl": Tagalog
const Tagalog = document.createElement('Tagalog');
Tagalog.innerHTML = "Tagalog";
Tagalog.className = "languageButton"
Tagalog.onclick = function(){ pickLanguage("Tagalog") };
languageBox.appendChild(Tagalog);

// "zh-TW" Chinese (Taiwan)
const Taiwanese = document.createElement('Taiwanese');
Taiwanese.innerHTML = "Taiwanese";
Taiwanese.className = "languageButton"
Taiwanese.onclick = function(){ pickLanguage("Traditional Chinese (Taiwan)") };
languageBox.appendChild(Taiwanese);

// "ta": Tamil
const Tamil = document.createElement('Tamil');
Tamil.innerHTML = "Tamil";
Tamil.className = "languageButton"
Tamil.onclick = function(){ pickLanguage("Tamil") };
languageBox.appendChild(Tamil);

// "te": Telugu
const Telugu = document.createElement('Telugu');
Telugu.innerHTML = "Telugu";
Telugu.className = "languageButton"
Telugu.onclick = function(){ pickLanguage("Telugu") };
languageBox.appendChild(Telugu);

// "th": Thai
const Thai = document.createElement('Thai');
Thai.innerHTML = "Thai";
Thai.className = "languageButton"
Thai.onclick = function(){ pickLanguage("Thai") };
languageBox.appendChild(Thai);


// "bo": Tibetan
const Tibetan = document.createElement('Tibetan');
Tibetan.innerHTML = "Tibetan";
Tibetan.className = "languageButton"
Tibetan.onclick = function(){ pickLanguage("Tibetan") };
languageBox.appendChild(Tibetan);

// "tn": Tswana, Setswana
const Tswana = document.createElement('Tswana');
Tswana.innerHTML = "Tswana";
Tswana.className = "languageButton"
Tswana.onclick = function(){ pickLanguage("Tswana") };
languageBox.appendChild(Tswana);


// "ts": Tsonga
const Tsonga = document.createElement('Tsonga');
Tsonga.innerHTML = "Tsonga";
Tsonga.className = "languageButton"
Tsonga.onclick = function(){ pickLanguage("Tsonga") };
languageBox.appendChild(Tsonga);

// "tr": Turkish
const Turkish = document.createElement('Turkish');
Turkish.innerHTML = "Turkish";
Turkish.className = "languageButton"
Turkish.onclick = function(){ pickLanguage("Turkish") };
languageBox.appendChild(Turkish);

// "tw": Twi
const Twi = document.createElement('Twi');
Twi.innerHTML = "Twi";
Twi.className = "languageButton"
Twi.onclick = function(){ pickLanguage("Twi") };
languageBox.appendChild(Twi);

// "uk": Ukrainian
const Ukrainian = document.createElement('Ukrainian');
Ukrainian.innerHTML = "Ukrainian";
Ukrainian.className = "languageButton"
Ukrainian.onclick = function(){ pickLanguage("Ukrainian") };
languageBox.appendChild(Ukrainian);

// "ur": Urdu
const Urdu = document.createElement('Urdu');
Urdu.innerHTML = "Urdu";
Urdu.className = "languageButton"
Urdu.onclick = function(){ pickLanguage("Urdu") };
languageBox.appendChild(Urdu);

// "uz": Uzbek
const Uzbek = document.createElement('Uzbek');
Uzbek.innerHTML = "Uzbek";
Uzbek.className = "languageButton"
Uzbek.onclick = function(){ pickLanguage("Uzbek") };
languageBox.appendChild(Uzbek);

// "ve": Venda
const Venda = document.createElement('Venda');
Venda.innerHTML = "Venda";
Venda.className = "languageButton"
Venda.onclick = function(){ pickLanguage("Venda") };
languageBox.appendChild(Venda);

// "vi": Vietnamese
const Vietnamese = document.createElement('Vietnamese');
Vietnamese.innerHTML = "Vietnamese";
Vietnamese.className = "languageButton"
Vietnamese.onclick = function(){ pickLanguage("Vietnamese") };
languageBox.appendChild(Vietnamese);

// "cy": Welsh
const Welsh = document.createElement('Welsh');
Welsh.innerHTML = "Welsh";
Welsh.className = "languageButton"
Welsh.onclick = function(){ pickLanguage("Welsh") };
languageBox.appendChild(Welsh);

// "xh": Xhosa
const Xhosa = document.createElement('Xhosa');
Xhosa.innerHTML = "Xhosa";
Xhosa.className = "languageButton"
Xhosa.onclick = function(){ pickLanguage("Xhosa") };
languageBox.appendChild(Xhosa);


// "zu": Zulu
const Zulu = document.createElement('Zulu');
Zulu.innerHTML = "Zulu";
Zulu.className = "languageButton"
Zulu.onclick = function(){ pickLanguage("Zulu") };
languageBox.appendChild(Zulu);







// -------------------------------------------------------  UPDATEBOX

const updateBox = document.createElement('updateBox');
checkUpdateDescription()

const updateDeletionButton = document.createElement('updateDeletionButton');
updateDeletionButton.innerHTML = "&#10006;"
updateDeletionButton.onclick = function(){removeUpdateDescription()};
updateBox.appendChild(updateDeletionButton);


const updateDescription = document.createElement('updateDescription');
updateDescription.innerHTML = "If you have any thoughts, feedback or ideas:<br />Nearvear.app@gmail.com<br /><br />Here's what I've done for you since last time:<br /><br />11/01/2021:<br />+ Upgrade Account<br />+ Login: If you upgrade your account, you'll then be able to login and see those conversations on any device you want<br />+ Added deletion of description under Conversations<br />+ Added menu for language<br />+ Added menu for notifications<br />+ Call for Sunday confession Email<br />+ Update Card<br /><br />Best regards, Sam"
updateBox.appendChild(updateDescription);


function removeUpdateDescription() {
  updateBox.style.display = "none";
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let uid = user.uid;
          let rootRef = database.ref().child("Settings").child("allQuestions").child("update").child(uid).set({
              description: "off",
          });
      }        
  });
}


function checkUpdateDescription(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          let uid = user.uid;
       
          database.ref().child("Settings").child("allQuestions").child("update").child(uid).child("description").once('value').then(function(snapshot) {
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
moreButton.innerHTML = "MORE"
moreButton.onclick = function(){getNextOnMindItems()}
midBox.appendChild(moreButton);



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













































//Connect to database
let database = firebase.database();

let firebaseTimestamp = 0;
let localNumber = 999999999999999;

database.ref('Timestamp/').set({timestamp: firebase.database.ServerValue.TIMESTAMP});
database.ref('Timestamp/').once('value', function(snapshot){ firebaseTimestamp = snapshot.val() })

function getOnMindItems(){
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      let uid = user.uid;

      // let rootRef = database.ref().child("allQuestions");
      // let rootRef = database.ref().child("allQuestions").orderByChild('language').equalTo(langaugeSetting).limitToLast(200);
      let rootRef = database.ref().child("allQuestionsByLanguage").child(langaugeSetting).orderByChild("timestampReverse").limitToFirst(20);
      
      rootRef.on("child_added", snap => {
        count = count + 1;
        
        let creatorID = snap.child("creatorID").val(); // Original Poster
        let language = snap.child("language").val();
        let message = snap.child("message").val(); //The message
        let messageID = snap.child("messageID").val(); // ID of the confession
        let timestamp = snap.child("timestamp").val(); // ID of the confession
        let timestampReverse = snap.child("timestampReverse").val(); // ID of the confession

        if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language == "unknown"){
            // if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language != "unknown"){
        } else {


          // USED FOR MOVING TO NEW DATABASE
        //   database.ref('allQuestionsByLanguage').child(language).child(messageID).set({
                 
        //     message: message,
        //     timestamp: timestamp,
        //     timestampReverse: timestampReverse,
        //     language: language,
        //     messageID: messageID,
        //     creatorID: creatorID,
            
        // });  
       
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
        shareIcon.id = "shareIcon"+ count;
        let shareIconID = shareIcon.id;
        shareButton.appendChild(shareIcon); 

        const shareButtonText = document.createElement('shareButtonText');
        shareButtonText.id = "shareButtonTextID" + count;
        let shareButtonTextID = shareButtonText.id;
        shareButtonText.innerHTML = "Share";
        shareButton.appendChild(shareButtonText); 

        // Reduce spacing on phones 
        let w = window.innerWidth;
        let h = window.innerHeight;
        let aspectFactor = w/h;
        
        if(aspectFactor<1){
          onMindItem.style.padding = "20px"
          // onMindItem.style.padding = "20px 20px 10px 20px"
          onMindItem.style.margin = "8px 0px 8px 0px"
          onMindItemMenuBar.style.marginTop = "10px"
          loveButton.style.padding = "0px"
          converseButton.style.padding = "0px"
          shareButton.style.padding = "0px"
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






































//------------------------- GET NEXT ITEMS
function getNextOnMindItems(){
  firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
      let uid = user.uid;

      // let rootRef = database.ref().child("allQuestions").orderByChild('language').equalTo(langaugeSetting).limitToLast(200);
      // let rootRef = database.ref().child("allQuestionsByLanguage").child("English").orderByKey().limitToLast(200).startAt("-MPpvbZ491KUZz6kg_QX");
      let rootRef = database.ref().child("allQuestionsByLanguage").child("English").orderByChild("timestampReverse").limitToFirst(50).startAt(lastReverseTimestamp);
  
      rootRef.on("child_added", snap => {
        count = count + 1;
        
        let creatorID = snap.child("creatorID").val(); // Original Poster
        let language = snap.child("language").val();
        let message = snap.child("message").val(); //The message
        let messageID = snap.child("messageID").val(); // ID of the confession
        let timestamp = snap.child("timesstamp").val(); // ID of the confession
        let timestampReverse = snap.child("timestampReverse").val(); // ID of the confession
       

        if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language == "unknown" || timestampReverse == lastReverseTimestamp){
            // if(message == "" || message == "\n" || message == " " ||message == null|| creatorID == null || messageID == null || language != "unknown"){
        } else {

        console.log(language)
        // console.log(count)
        // console.log(timestampReverse)
        // console.log(message)
        // console.log(messageID)


        lastReverseTimestamp = timestampReverse
        const onMindItem = document.createElement('onMindItem');
        
        const onMindItemText = document.createElement('onMindItemText');
        onMindItemText.id = "onMindItemText"+ count;
        let onMindItemTextID = onMindItemText.id;
        onMindItemText.innerText = message;
        onMindItem.appendChild(onMindItemText);

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
        let shareIconID = shareIcon.id;
        shareButton.appendChild(shareIcon); 

        const shareButtonText = document.createElement('shareButtonText');
        shareButtonText.id = "shareButtonTextID" + count;
        let shareButtonTextID = shareButtonText.id;
        shareButtonText.innerHTML = "Share";
        shareButton.appendChild(shareButtonText); 

        // Reduce spacing on phones 
        let w = window.innerWidth;
        let h = window.innerHeight;
        let aspectFactor = w/h;
        
        if(aspectFactor<1){
          onMindItem.style.padding = "20px"
          // onMindItem.style.padding = "20px 20px 10px 20px"
          onMindItem.style.margin = "8px 0px 8px 0px"
          onMindItemMenuBar.style.marginTop = "10px"
          loveButton.style.padding = "0px"
          converseButton.style.padding = "0px"
          shareButton.style.padding = "0px"
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
                    console.log(snapshot.val())                
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
                                    SecureToken : "be6c47f3-9c8d-4152-a520-ef4d31d618d1",
                                    To : snapshot.val(),
                                    From : "nearvear.app@gmail.com",
                                    Subject : "Someone loved your confession <3",
                                    Body : "Someone loved your confessions <3<br>See. People do care. You are never pushy, greedy or not worth listening to <br>Get it out: https://nearvear.com//talk.html<br><br>If you ever need to unsubscribe: https://nearvear.com//notifications.html<br>Best regards, the Nearvear Team<br><br>Fun fact: Nearvear is misspelling of nærvær, which means to be present<br>If you ever have feedback or thoughts, just reply to this email and we'll get right back to you"
                                
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









































// Added for language detection.



( function(global) {

    var models = {
  "af":"ie  didieen ingan  envan vang te n dverer e v ge bede  vende in tele dererset oor 'n'n at eersteordaarsie waes e saan onis in e ordee basirinonde wel  isande eeide dom ke  omeri woe gr dalewat void it rd  aalik wet d ope tngsse enduit st leenster ree aiesworg vstan s na prn o meal of  vierdleee k deiteerkik e re pn ve ie neeneliwer of datelnieikes etaage virheiir regedes vur proeleionwete l moe mdaasios d he toentardnge ooeurlleienn bekelinraa niontbesrdivoons n adeldignas sa grniskom uimenop insonaeres o son gig moe kors gesnalvole hgebruiangigeoetar wysligas n w asmetgs deut vaalerwditkenssekel huewedinn t seestikan pntwt ieni kan edoealiemegronte honsigeniergewn hor  maindne ek aatn ' skide tadatskagersoon ks i afteend eelhulneewoorikd vn mre artebrlankkeronaamtrestrkanreeleit ograhetevotandenist dobrutoeolgrskuikrwyminlgeg eg onstr vgtewaawe ansesiesevoeepagel hivinnses ws tteieitpre",
  "ar":" الالعلعرعراراق فيفي ين ية ن االمات من ي ا منالأة ااق  وااء الإ أنوالما  عللى ت اون هم اقيام ل اأن م االتلا الاان ها ال ة وا ارهالاميين وللأمنا علىن يالباد القد اذا ه ا باالدب امريلم  إن للسلاأمرريكمة ى اا ي عن هذء ار اكانقتلإسلالحوا  إلا أبالن مالسرة لإسن وهابي وير  كالة يات لاانتن أيكيالرالوة فدة الجقي وي الذالشاميانيذه عن لماهذهول اف اويبرية ل أم لم مايد  أيإرهع اعملولاإلىابين فختطلك نه ني إن دينف الذيي أي ب وأا عالختل تي قد لدي كل معاب اختار النعلام ومع س اكل لاءن بن تي معربم ب وق يقا لا مالفتطادادلمسله هذا محؤلابي ة من لهؤلكن لإرلتي أو ان عما فة أطافعب ل من عور يا  يسا تة براءعالقواقيةلعام يمي ميةنيةأي ابابغدبل رب عماغدامالملييس  بأ بع بغ ومباتبيةذلكعة قاوقييكي م مي ع عر قاا ورى ق اواتوم  هؤا بدامدي راتشعبلانلشعلقوليان هي تي ي وه يحجراجماحمددم كم لاولرهماعن قنة هي  بل به له ويا كاذااع ت متخاخابر ملمتمسلى أيستيطا لأ ليأمناستبعضة تري صداق وقولمد نتخنفسنهاهناأعمأنهائنالآالكحة د مر عربي",
  "az":"lərin ın larda an ir də ki  biən əriarıər dirnda kirinnınəsiini ed qa tə ba olasıilərın yaanı vəndəni araınıınd busi ib aq dəniyanə rə n bsınvə irilə ninəli de mübirn sri ək  az səar bilzərbu danediindmanun ərə halanyyəiyy il ner kə b isna nunır  da həa binəsinyanərb də mə qədırli olarbaazəcanlı nla et göalıaycbayeftistn ineftləycayətəcə laildnı tinldilikn hn moyuraqya əti aradaedəmassı ınaə dələayıiyilmaməkn dti yinyunət azıft i tllin ara  cə gə ko nə oya danacəkeyiilmirllayliylubn ərilrləunuverün ə oəni he ma on paaladeyi mimalməmətparyə ətl al mi sa əladıakıandardartayii ai qi yiliillisən on qolurlastəsə tantelyarədə me rə ve yea kat başdiyentetihəsi iik la mişn nnu qarrantərxanə aə gə t düamab kdileraetmi bkilmiln rqlar srassiysontimyerə k gü so sö te xaai barctidi erigörgüngəlhbəihəikiisilinmaimaqn kn tn vonuqanqəztə xalyibyihzetzırıb ə məze br in ir pr ta to üça oalianianlaqlazibri",
  "bg":"на  нато  пр зата  поитете а па с отза атаия  в е н даа н се кода от анипрене енио нни се  и но анеетоа вва ване па ооторанат ред неа ди п допро съли принияскитела ипо ри  е  каиракатниените зи со состче  раисто п из сае диники мин миа бавае вие полствт н въ ст тоазае оов ст ът и ниятнатра  бъ чеалне сен ести дленнисо оови об сла ратоконносровще  ре с  спватешеи вието вовестаа ка тдатентка леднетористрстъти тър теа за мад анаенои оинаитима скаслетвотерцияят  бе де паатевенви вити зи инарнововаповрезритса ята го щеалив пграе иедиелииликазкитлноменолираз ве гр им ме пъавиакоачавинво говданди до ед ериерождаитоковколлнимерначо золаон онапраравремсиястит птанха ше шенълг ба сиаробълв ргаре еелнемеикоимако коила лгао дозиоитподресриестот кт мт суст би дв дъ ма мо ни осалаансараатиацибешвъре редвемажави киалицаичекиялито бовоодиокапосродседслут итовувациачеся з во ил ск тр цеамиарибатби брабъд",
  "ca":" dees de la  lael que el coents d qu i en er  a ls nt  pee la d enperci ar ue al  seestat  ests  s  praci unresmens edels as p reles l'na a l ca d'elsa pia ns con letata ci da ara a e noant alt ds i dita re a scoms citaonsstaica por a inprotre pauesambiondesun  mada s sa ian mb  aml de dva pretere ee ca mciaunai encitra teonaos t en el cca ciol p trparr lt ae paqunta soameerar ee sadan as q si haalstes va m icintes ls mi aor  moistectlitm s toir a tespranstrom l sst nts meno r dd'al'aatsrias t tasenrs eixtars nn ltale at part mi lltictenser aqinantra fstiol a qforuraersariintactl'e fir se ttorsi stereca r feis em n dcarbre fo vi analii pix elll mposorml li l acfers resseu e mensaraerisa ssius orttotll porora citanassn costnesraca uverontha  tiitzgrat c n a vrencatnal riquat l dot srmauali ss fn ps vte t i bactetammanl tial faic  veblea nalltzaies s'le ompr c ncrtiit rreficanyon  sar ptur",
  "ceb":"ng sa  saangga nga ka ngan  an na ma nia sa non  pa sia ka m baonga iila mgmgaa piyaa aay ka alaingg mn sg nlan gina ni o sg pn n daag pagg syanayoo nsi  moa bg aailg bhana dasunagya manne pankon il laakaakoanabasko od yo  di ko uga ug kkanla lensurug  aiapaaw d sg dg gilenin iy sueneog ot abaahaas imo kia tagabaneronano kranronsilunausa usa gahianier ha i areryon puininakro to ure ed og wailimo n and o a ad du praroi sma n mulound taaraasaatoawadmue nedminamakmunniysanwa  tu una lbayigaikaitakinlismayos  arad aliamaersipaisamaonimt stin ak ap hiaboagpanoatag igangkagpai mihak slawor rs siytag al at ha hu ima hbu e sgmakaslagmonnahngor sra sabsamsulubauha lo readaakiayabahce d nlabpa paks ns stantawte umaura in lua cabiat awobatdaldlaeleg tg ugaygo habhini ei nkabkaplaylinnilpampaspropulta tonugaugmunt co gu mi pi tia oabuadladoaghagkao artbalcitdi dtodunentg egongugia ibaicein inuit kaa",
  "cs":" pr poní pro nana  přch  je neže  že se do ro st v  vepřese ho sta to vy zaou  a to  byla ce e vistle podí p vle ne sje ké by em ých odovaředdy eníkonli ně str záve  ka sve pit ládohorovroztervláím  kohodnispříský mi ob soa palibudednickkteku o sal ci e til ny né odlovárotsouání bu mo o astbylde ek ost mí taes jedky lasm pnesnímranremrosého de kt ni si výat jí ký mi pretaktany vřek ch li ná pa ředa dlednei pi vly mino no vpoltravalvnííchý přej ce kd lea sa zcene kedseklemikl latlo miénovpraskuskéstitavti ty vánvé y ny sí sí vě p dn ně sp čsa na tak dnídohe be mejnenaestinim znalnouná oviovéovýrskstátí třetů udeza é pém í d ir zvaleaněaveckédene zechen erýhlai siérlovmu nebnico bo mpadpotravroprý sedsi t ptictu tě u pu vvá výšzvýčníří ům  bl br ho ja re s  z  zda vaniatoblabriečneřeh vi nie ilairsitekovnoso oo poceodyohloliovoplapočprára ritrodry sd skossdtelu svatveřvitvlay pálnčssšen al",
  "cy":"yn dd  yn y yddethth  i aetd ych od ol edd ga gw'r au ddiad  cy gy ei o iadyr an bodwed bo ddel n y amdi edion  we ym ar rhodd ca maaeloeddaen addaer h yallei  llam eu fodfydl yn gwynd ai gmaeneuos  ned idoddoln cr hwydwyrai ar in rth fy he me yr'n diaesth chaii did r yy b dy haadai bn ioterottesy gyd  ad mr uncyndauddyedoi ci withlaelland odarydtho a  draidainddodydfyngynholio o awchwybyboych br by di fe na o' peartbyddrogall elaimr n nr arhywn ynn on r caed gd od wgangwyn dn fn onedni o'rr dud weiwrt an cw da ni pa pr wyd edaidimeudgwaiddim irilwyn bnolr orwy ch er fo ge hy i' ro sa trbobcwycyfdiodyneithelhynichll mddn rondpror cr gredrhau au cu yy cymdymryw  ac be bl co osadwae af d pefneicen eoles fergelh ghodiedir lafn hna nydodoofyrddrierosstwtwyydayng at de go id oe â 'chac achae'al bl d cd ldanddeddwdirdlaed elaelleneewngydhauhywi ai fiolionl al iliamedmonn sno oblolarefrn thiun ",
  "da":"er en  deet derde for fo i at  atre det handeereingden me oggerter er siand afor  st ti enog ar il r sigetilke r eaf kke ma påom på ed ge endnget se sler skelsernsigne ligr dska vihar be sean ikkllegenn fstet at drin ikes ng verr bsenedemenr i he etig lanmednd rne da ine tmmeund ome ee mherle r ft fså te  soelet e koestske ble fektmarbrue ael ersretsomtteve  la ud veagee de hlsemanrugselser fi op prdt e in mr m an re saionnerrest igetn soneorbt hvisår  frbile kensindommt m hv jedanentftenin mie oe pn onte kuellnasorer hr kstastodagerikunldemerr ar vrekrert otortør få må toboechee vi divekabns oelse t v al bo unansdreirekøborsoverent bør  kaaldbetgt iskkalkomlevn dn iprir prbrsøgtel så te vaal direjefisgsåiscjerkerogsschst t kuge diag d ag iilll alskn aon samstrtetvar moartashatte bhanhavklakonn tnedr ora rrevesvil el kr ovanne uessfrag ag dintngsrdetra åraktasiem gelgymholkanmnan hnskold",
  "de":"en er  dederie  didiescheincheichdenin te ch  eiungn dnd  beveres  zueitgenund un au inchtit ten daent veand geine mir dhenng nde voe dbermenei mit stterrent d ereren sste see sht desistne aufe aiscon rte re wegesuch fü sobeie enenr sachfürierparür  haas ert an pa sa sp wifortagzu dasreihe hrentesenvor scechetzheilann apd st staeselic ab sigte waitikein engeseitrazen im laartim llen wrderecsetstrteitte nie peheersg dnicvon al pran auserfr etzetüruf ag alsar chsendge igeionls n mngsnisnt ords ssse tüahle bedeem lenn iormprorkeruns dwahwerürk meageattellesthatn bollrafs atsc es fo gr jaabeaucbene negelien ur vre ritsag amagtahrbrade erdheritele n pn vor rbert sicwieübe is übchachie fe meriiedmmenerr astit at stis koarbds gann zr fr wranse t iweiwir br npam besd ddeue ge kefoet eutfenhselten rnpdr brhet wtz  fr ih ke maameangd seilel eraerhh di dkann fn lntsochragrd spdsprtio ar en kaarkass",
  "en":" ththehe ed  to iner ingng  annd  ofandto of  coat on in  a d t hee tiones  rere hat sa st haherthatioor  ''en  whe sentn ts aas foris t t beld e ars  waut ve ll al  mae i fo's an est hi mo se prs tatest tereretednt verd a wise e cectns  only toley r t caatits all nohiss oerscone oearf te wwasonssta'' stin astot h weid th  itce  diaved hcouproad ollry d se m soillctite toreveg tit  ch dehavoulty ulduse alarech me outovewitys chit aithoth ab te wos srest wtine be hncet sy te pelehins inte lile  doaidheyne s w as fr trendsai el ne su't ay houivelecn't yebutd oo ty o ho mebe cale ehadple at bu lad bs hsayt i are fghthilighintnotren is pa shayscomn sr ariny a unn com thi miby d ie de nt o bye rerioldomewheyea grar itymplounoneow r ss ftat ba vobousamtimvotaboantds ialinemanmen or poampcandere llesny ot rectesthoicaildir ndeoseouspresteeraperr oredrie bo lealiarsorerics mstr faessie istlaturi",
  "es":" dede  laos la el es  qu coe las que elue en ent en senteresconest ess d lo prlos y do ón ión unciódelo d poa dacistate adopreto para ea lra al e ese proar ia o e reidadadtrapors p a a paracia pacomno  di inienn lad ante smena con un lasnci trcioierntotivn dn eor s cencernio a sicis e madose ae cempicaivol pn cr eta tere desaez mpro as a ca suion cu juan da eneerona recro tar al anbiee per l cn pompten emistnesntao cso teseral dl mlesntro sorerá s qs ystoa aa raridese qiviliclo n aoneoraperpuer lre renunaía adacasereideminn sndoranrno ac ex go noa tabableeceectl al glidnsionsracriostruerust ha le mi mu ob pe pu soa ialeca ctoe ie uesoferficgobjo ma mplo pobis msa sepstestitadtody s ciandcescó dore meciecoesiintizal elarmienerorcrciriatictor as sice dene re tenderiespialidoinaincmito lomeplirass tsidsuptabuenuesuravo vor sa tiablaliasoastcorcticuedivducensetiimiinileco qoceortralrmarocrod",
  "et":"st  kaon ja  va on ja kose astle es as is ud  sada ga  taajasta ku pea kestistks ta al avaid saamiste val etnud teinn se tua value kiselu ma mes miet ikulinad el imene nna ha in ke võa sa tab e sesi la lie veksemalaslesrjutletsitusupauseustvar läaliarjde etei tigailmkuili tul ei me sõaalatadusei nikpeas ks osalsõnterul või el nea jateendi kitakarkorl olt maaolistivadään ju jä kü ma po ütaasaksat ed erihoii ska la nnioidpairitus ütl aa lo to vea eadaaidamianddlae jegagi gu i pidlik inijupkalkaskeskohs es pselsseui  pi siaruedaevafili vidainglääme na ndanimoleotsriss lsiat p en mu ol põ su vä üha la pagaaleapsarve aelaikalleloomalpett kteetisvatäneõnn es fi via ia oaabaapalaaltamaanue pe tealelihaahinivakonku liklm minn toduoonpsari si stut et sti uleuurvasvee ki ni nä raaigakaallatue eeisersi eii iisil imaitskkakuhl klatmajnduni niiomaoolrsoru rvas tseksonstet mtajtamudeuhovai ag os pa re",
  "eu":"en an etata  etizan eko ide baa egiz es giarrbidrenrriarela sku beasuesksuntas izeanekoelaik kubn an itzaubiza zan era baskeran brretentze as koa aa galdanide deeea ek katkonn dontuan du naataegiestk enikntuntzskatua de di ez hea da kak akiakoartatuazibatberitzkunn ho briartetatunezar al ar haakuatzbaidardeadeleenemaerriakiarin inakianarnazneao eorrra stetekzakzekzio da em hi ho ma oiaguateaurbesdindirdutertez eziharherhitia ienikaio ireitek bk gkidkorldan onkoo aoinorirakrearierikrratanteatu unaundunturrutez ezko au eg gu ir ki ora ha jabeagiai ailaitapearideze eeareekerdereezaezkgirgithori eianiekilainkintiraitaituk nkapkoakumlanldemaimanmenn gn una ntao hoa oropenrdiri rtastateltettiktuetziumeun uztzeazenziazin az bi bu el ga jo mu ti un za zia na oa sa ta zabaadiakealaandar audbakbalbegbehbuldaudendu duie be de he oeakeetehaelkenbeteetigabgingo gusgutguzhauibeinbineioairuiuriziizkizo",
  "fa":"ان ای ه ا اي دربه  بردر ران بهی ااز ين می  ازده ست است اس کهکه ايرند اين هايراود  راهای خوته را رایرد ن بکرد و  کرات براد کمانی د انخواشور بان ا ساتمیری اتما اواه ات عراق ر مراقعرای ب تا توار ر ان مه بور يد ی ک ام دا کناهدهد  آن می ني گفد اگفت کشا بنی ها کشو روت کنيوه موی ی ت شوال دارمه ن که ديه  ماامهد بزاروراگزا پيآن انتت افت ه نی خاماباتما مللنامير ی می ه آم ای منانسانيت دردهسازن دنه ورد او بي سو شدادهاندبا ت بر بز ازماستهن ره سوانوز ی ری س هساباام اورتخاخابخودد ددن رهاروزرگزنتخه شه ههستيت يم  دو دي مو نو هم کااد اریانیبر بودت هح هحالرش عه لی وم ژان سلآمراح توسداددامر دره ريکزی سلاشودلاحمريننده عيمايکاپيمگر  آژ ال بو مق مل ویآژاازمازیباربرنر آز سسعهشتهماتن آن پنس ه گوسعيانيومکا کامکند خا سرآورارداقدايمايیبرگت عتن خت د ور خرک زيرفتهقدال تمينن گه آه خه کورکويويوريوييی ک تی ش اق حا حق دس شک عم يکا تا دارجبينت مت وتايدستر حر سرناز بشکالل م کمز ندانواو اورهون ونديمز آو اع فر مت نه هر وز گز",
  "fi":"en in an on istta ja n tsa staaann p onssattatä  ka pasi  jan kllaän eenn vksiettnentaattä vaillitt jo kon s tuia  sua paa la llen mle ttena  ta veat  viutt saisesen ku nä päste ola taismaati a ooitpää pia valaineisiteltti sia kalliinkinstäuomvii ma seenä mua sestisslläloklä n jn otoivenytt liainet inan an nollplotenuställään todenmenokisuosä tääuksvat al ke tea eliitaiteiäisää  plelli tideikkki ntaovaystyt ä päyt ha pe täa naiki pi vnytnäypalteeun  mea messkaupaistuut voi eta heishtei oiikitajoumisninnutsiassävan ty yhaksimeloime n en hn loinomeottouksitstitettieukkä k ra tiajaasientigaiigitejankaakselaalanli näjoletiiusiäjä ova aantavaei erikankkulailisläimatoispelsilstytajtavttutyöyösä o ai pua ja laalarvassienimiimmitäka keskueleelinllooneri t ot ptu valvuo ei he hy my voalialoanoastattaukelielyhtiikakenkkilysminmyöohtomatusumiyksät äälös  ar eu hu naaatalkaluansarjennhankuun ysetsim",
  "fr":"es  dede  leentle nt la s d laionon re  pae le d l'e p co prtions  enne quer llesur en atiue  po d'par a et it  qumenonste  ett d redes unie s l supou au à coner  noaite cse té du  du déce e eis n ds a soe re sourresssieur seemeestus surantiqus puneussl'aprotertreendrs  cee at pun  ma ru réousrisrussseansar come mirencentet l av mo teil me onttena pdanpasquis es s inistllenoupré'unaird'air n eropts  daa sas au denmaimisorioutrmesiotteux a dienn antrommortouvs csontesverère il m  sa vea raisavadi n pstiven miainencforitélaroirremrenrroréssiet atur pe tod'uellerrersideineissmesporransitst t rutivaié lési di n' éta casse tin ndeprerats mstetaitchui uroès  es fo tr'adappauxe àettitilitnalopér dra rairors rtatutéà l afancaraartbrechédree fenslemn rn tndrnneonnposs ttiqure tualeandaveclacoue nembinsjoummerierèssemstrt iuesuniuveé dée  ch do eu fa lo ne raarlattec ical al'ol'émmintaormou r urle",
  "ha":" dada in an ya  wa yana ar a d mawa a aa ka s tawan a  ba kata a yn d ha na su sakinsa ata koa tsu  gaai  sha muwaiyama a wasayanka anishia ba ha camaba nann a muana yia g zai d kuakayi n kannke tar ciikin sko  raki ne a zmathaknine dnnaumandaa nadacikni rinunaarakumakk ce dumann yncisarakiawaci kankararin mandhi n tga owaashkamdanewansaaliami ab doancn rayai nsunuka al nea'acewcinmastakun abakowa rra  ja ƙaen r dsamtsa ruce i aabiidamutn gn jsana ƙharon i msuk ak jiyar'yakwamin 'yanebaninsruwi kn h adaken wshautu ƴabaytanƴanbinduke mn nokayinɗan faa ikkire za alaasuhani ymarranƙasaddarsgabirammau d tsabbabuagagarn b ɗaaciaikam dune si bi wkaskokwam amamfbbadinfangwai swatanoaredaiirima' laalldamikami shetumuni an ai ke kidagmaimfano nsuo dsakum  bi gw kwjamyyaa jfa uta hu'a ansaɗaddahinniyr sbatdargani tntaokiomisala lkacllawadwarammdomr mrassai loatshalkatli lokn cnartinafabubi gisamak",
  "haw":" kana  o ka  ma a  laa ia m i la anaai ia a oa ka ho k kea ai k ho iaua  na mee ke aau ke ma maiaku akahi ha ko e a l nome ku akakanno i aho ou  aii oa po lo aamaa n ani mhani iihokoune  iho iikionahoole e h heina waea akou ikahoe i lu a pahoie ierako u mkuamakoi kaii na ehinane oli hmeawahlake mo nu likaki a wmalhi e nu ohik kue lelera berineabeainalalo  pokon abolehe paumahva elakaunak oekeioia ieram oioa ehohoviehova uaunaarao sawao onauu nwa waihel ae alae ta aik hialeilalelalieikoloonu loauae oolahonmamnan auahalaunuaohooma aoii aluimamauikeapaeloliipoeaianoa ino moka'u ahoei ekaha lu neiholinoo eemaiwaoluadanaapa u kewahualamluao hooku h liahuamuui  il mo seeialaw hu ikaile pli lunuliio kiknohu e saaawaweenahalkollan le nea'uilokapokosa  pehoploaopepe  ad puaheaolia'lailohna'oomaauerikulwe akekeklaari ikukaklimnahnernuionoa udamkumlokmuaumawalwi 'i a'iaanaloetamu oheu pulauwa nuamo",
  "hi":"  हैमें मेने की के है  के की कोों को ा ह कासे ा के कं कया  कि सेका ी क ने औरऔर ना कि भी ी स जा परार  करी ह होही िया इस रहर कुनाता ान े स भी राे ह चु पापर चुननाव कहप्र भाराजहैंा सै कैं नी ल कीं ़ी था री ाव े ब प्क्षपा ले  देला हा ाजप था नहइस कर जपानहीभाजयोंर सहीं अम बा मा विरीकिए े प्या हीं मकारा जे ल ता दि सा हमा ना माक़्ता एक सं स्अमरक़ीताजमरीस्था थार् हुइराएक न कर मराकी जी न इर उन पहकहाते े अ तो सुति ती तो मिलिक ियो्रे अप फ़ लि लो समम कर्टहो ा चाई ानेिन ्य  उस क़ सक सैं पं हगी त कमानर नष्टस कस्ताँ ी बी म्री दो मि मु ले शां सज़ात्रथी लिएसी ़ा ़ारांगे दे म्व  ना बनंग्कांगा ग्रजा ज्यदी न मपारभा रहीरे रेसली सभाा राल ी अीकीे तेश  अं तक याई हकरनतक देशवर्ायाी भेस ्ष  गय जि थी बड यह वांतरअंतक़ गयाटी निकन्हपहलबड़मारर परनेाज़ि इी रे जे व्ट ्टी अब लग वर सीं भउन्क ककियदेखपूरफ़्यह यानरिकरियर्डलेकसकतहोंहोगा अा दा पाद ाराित ी ती पो को द ते नि सर हां दअपनजानत मथितपनीमहलर हलोगव कहनाहल हाँाज्ानािक्िस्",
  "hr":"je  na pr pona  je zaijene  i ti da  ko neli  bi da u ma mo a nih za a sko i sa pkojproju se  goostto va  do toe ni p od rano akoka ni  ka se mo sti nimaja privatsta suatie pta tske inij trcijjennoso s izom troiliitipos ala ia oe sijainiprestrla og ovo svektnjeo podirva nialiminrija ta zatsivao tod ojera  hra ma uhrvim ke o ioviredrivte bi e ogodi dlekumizvodine uenejedji ljenogsu  a  el mi o a daluelei uizvktrlumo doriradstoa kanjavae kmennico joj oveskitvrunavor di no s  ta tvi ii okakrošskovod sa ćea badiamoenigovijuku o noraravrujsmotavtruu pve  in placibitde dišemai mikaištjerki mogniknovnu ojioliplapodst stitratrevo  sm štdane zi tio istkonlo stvu sujeustće ći što dr im liadaaftaniao arsatae temoi kinejemkovlikljimjenafnernihnjaogooizomepotranri roirtkskateru iu ovi vrt me ugak amadrže ee ge mem emeenjenter ereergeurgo i bi zjetksio uodaonaprarebremroptrižav ci eu re te uv veajuan ",
  "hu":" a  az szaz  meen  el hoek gy tt ettsze feés  kitet beet ter kö éshogmegogysztte t azeta mneknt ségszáak  vaan ezera ta  miintköz iseszfelminnakorszer tea aa kis  cseleer mensi tekti  necsaentz ea talaerees lomltemonondrszszattezágány fo maai benel eneik jeltásáll ha le álagyaláiszy azteás  ale aegyelyforlatlt n aogaon re st ságt mán ét ült jegi k aküllamlenlásmáss kvezásoözö taa sa vaszatáetőkezletmagnemszéz mát éteölt de gy ké mo vá éra ba famiat atoattbefdtagyahati slasndtrt szot ktártésvanásáól  bé eg or pá pé vebanekeeküelőervetefogi akisládntenyenyiok omáos ránrássalt evályarágoálaégeényött táadóelhfejhethozilljárkésllomi ny ontrenresrins as esszzt  ez ka ke ko rea ha ndendó efogadgatgyehelk eketlesmánndenisozzt bt it étattosvalz ozakád ályáraésiész ak am es há ny töakaartatóaztbbeberciócsoem etietégali tiniistja kerki korkozl éljályen vni pálrorrólrüls cs ps ss vsokt jt ttartelvat",
  "id":"an  mekanangng  pemen di ke da seeng benganya teah beraka yadandi yann ppera mita pada ataadaya ta  inalaeriia a dn kam ga at eran dter kaa pariembn mri  baaanak ra  itaraelani aliranar erulaha basiawaebagann b hainimer la miandenawan saahalamn inda waa iduag mmi n arustelyak andalh di singminnggtakamibebdengatianih padrgasanua  dea targdareluhari ki mi pikain inyitumban tntupanpensahtantu a kbaneduekag dka kerndentaorausa du maa sai antbasendi dirakamlann sulial apaereertliamemrkasi talung aka aa waniaskentgarhaai iisakedmbeskatoruanuk uka ad toasaayabagdiadunerjmasna rekritsihus  bia hamadibersg shanik kemma n lnitr brjasa  ju or si tia yagaanyas culemeemuenyepaerberlgi h mi akelli melniaopartasiatahulaun unt at bu pu taagialuambbahbiser i tibeir ja k mkarlailallu mpangknjaor pa paspemrakriksebtamtemtoptukuniwar al ga ge ir ja mu na pr su unad adiaktannapobelbulderegaekeemaempeneenjesa",
  "is":"að um  aðir ið ur  ve í na  á  se er ogar og ver miinnnn  fyer fyr ek en ha heekk stki st ði  ba me viig riryri umg flegleins ð s ei þain kkir hr segieinga ingra sta va þeannen milsemtjóarðdi eithafillinsistlljndir ar esegun var bi el fo ge yfandaugbaubigegaelderðfirfooginittn snginumod oodsinta tt viðyfið eð f hr sé þva ea áem gi i fjarjórljam er áreirstrðarðirðustjundvegví ð vþaðþví fj ko sleikendertessfjáfurgirhúsjárn eri tarð þðarðurþes br hú kr le upa seggi sirtja kiðlenmeðmikn bnarnirnunr fr vriðrt stit vti unauppða óna al fr gra vallan da eiðeð fa frag egergiðgt hanhefhelherhrai ai ei vi þikijónjörka królíkm hn angar lramru ráðrónsvoviní bí hð hð kð mörð af fa lí rá sk sv tea ba fa ha ka uafiagnarnastberefuennerbergfi g agariðskerkkelanljólltma miðn vn ínanndanduniðnnannunu r orbergislösé t at htiltinuguvilyggá sð að bórnögnöku at fi fé ka ma no sa si ti áka ma ta ía þafaafsaldarf",
  "it":" dito la  dedi no  core ione d e le delne ti ell la unni i dper peent inonehe ta ziocheo da dna atoe s soi sllaa pli te  al cher  pa siconsta pra c seel ia si e p dae ii pontanoi callazinteon ntio s rii ao aun  anarearie ai eitamenri  ca il no poa santil in a laticiae cro annestglità  que lnta a como cra  le nealiereist ma è io lleme eraicaostprotaruna pida tat miattca mo nonparsti fa i  re suessinintoo lssittoa eamecolei ma o iza  sta aaleancanii miano ponisiotantti loi rociolionaonotra l a reriettlo nzaquestrtertta ba li teasse fenzfornnooloorirestor ci voa ial chie nliapreriauniver spimol al cransensoctic fi moa nce deiggigioitil slitll monolapacsimtituttvol ar fo ha saacce riremanntrratscotrotutva  do gi me sc tu ve via mbercanciti lieritàlliminn pnatndao eo fo uoreoroortstotentivvanartccoci cosdale vi iilainol pn cnitoleomepo riosa  ce es tra bandataderensersgi ialinaittizilanlormil",
  "kk":"ан ен ың  қа баай ндаын  са алді арыды ып  мұ біасыда най жамұнстағанн бұна боныңін ларсын деағатан көбірер меназаындыны меандеріболдыңқазатысы тынғы  кеар зақық алаалыаныараағыгентартертырайдардде ға  қобарің қан бе қыақсгердандарлықлғаынаір іріғас таа бгі едіелейдын кн толарыніп қстқтаң б ай ол соайтдағигелерлыпн аік ақтбағкенн қны ргерғаыр  аралғасабасберге етіна ндене нигрдыры сай ау кү ни от өзаудеп ияллтын жн оосыотырыпрі ткеты ы бы жылыысыі сқар бұ да же тұ құадыайлап атаенійлан мн сндындір мтайтіны тыс інд биа жауыдепдіңекеерийынкеллдыма нанонып жп ор бриярлаудашылы аықті аі біз ілің қ ас ек жо мә ос ре сеалддалдегдейе бет жасй блаулдаметнынсарсі ті ырыытаісің аөте ат ел жү ма то шыа аалтамаарластбұлдайдықек ельесіздікөтлемль н еп ар аресса та ттетұршы ы ды қыз қыт ко не ой ор сұ түальареаттдірев егіедаекіелдергердиядкеркетлыслісмедмпин дні нінп тпекрелртарілрінсенталшілы кы мыст",
  "ky":"ын ан  жаен да  таар ин  каары ал ба билар бо кыалан к сандагантар деандн б кеардменн таранын да мекыр чен ары  когендаркенктауу енеери шаалыат на  кө эматыдандепдынеп ненрын беканлуургытаншайыргүн  ар маагыактаныгы гызды рдаай бирболер н сндыун ча ында кагаайланаап га лгенчап крдытууыны ан өзамаатадинйт лгалоооо ри тиныз ып өрү па эка балгасыаштбизкелктетал не суакыентиндир калн дндеогоондоюнр бр мрансалстасы ураыгы аш ми сы туал артборелгениет жатйлокарн могуп ап жр эсынык юнч бу ура аак алдалубарбербоюге донегиектефтиз катлдын чн эн өндонефон сатторты удаул улаууды бы жы кыл ынаэкеясы ат до жы со чыаасайтастбаабашгаргындө е бек жыли бик ияскызлдалыкмдан жндини нинордрдостота терттитуртынуп ушуфтиыктүп өн  ай бү ич иш мо пр ре өк өта да уа эаймамдаттбекбулголдегегеейтелеенджаки киниириймактоликмакмесн ун шнттол олопарракрүүсырти тикттатөру жу сшкаы мызыылдэмеүрүөлүөтө же тү эл өна жады",
  "la":"um us ut et is  et in qutur presttio auam em aut dientin dict e esur atiionst  utae qua dent  su siituuntrumia es ter rentiraes equiio proit peritaoneiciius cot dbuspram e noeditiaue ibu se ader  fiiliquet ide oru teali peaedcitm dt stattemtist pstite cumereium exratta conctionira s i cu saeninisnteeriomire s aminos ti uer ma uem snemt m mo po uigenictm iriss st auae dom at c geas e ie pne  cainequos p ale enturo tritusuitatuiniiqum postresura ac fua eantnesnimsuntrae as d pa uoecu om tuad cutomns q eiex icutoruid ip mee seraeruiamideips iua sdo e deiuicaim m cm utiu hocatistnaton ptiregrits tsicspe en spdiseliliqlismenmusnumpossio an grabiaccectri uan leeccetegranonse uenuis fa tratee cfilna ni puls fui at ccedami einalegnosoripecropstauiaeneiueiuisiut tt utibtit da nea dandegeequhomimulorm mmnindonero er esittumutua pbisbitcerctadomfuti signintmodndunitribrtitasund aberrersiteitim to p",
  "lt":"as  pa kaai us os is  ne irir ti  prausinis ppasių  ta viiau ko sukaio pusi savo taialitų io jo s kstaiai bu nuiusmo  poiens stas meuvokad iš lato aisie kururi kuijočiaau metje  vaad  apand gr tikalasii pičis is vinko nės buvs a gaaipavimaspritik reetujos daentoliparantarataramagalimoiško s at be į mintin tus n jodarip rei tedžikasninteivie li secijgarlaiartlaurasno o ktą  arėjovičigapravis namenokirašs tietikaintkomtamaugavories b steimko nuspolriasauapime ne sik šii nia iciojasakstiui amelieo tpiečiu di pegriioslialins ds gta uot ja užauti sinomą ojeravdėlntio atojėl  to vyar inalico vseisu  mi pidiniš lansi tus baasaataklaomitat an jialsenajų nuoperrigs mvalytačio rai kliknetnė tistuoytięs ų sadaarido eikeisistlstma nessavsiotau kiaikaudiesoris rska geasteiget iamisamisnamomežiaabaaulikrką ntara tur madieei i tnasrinstotietuvvosų p dėareatsenėiliimakarms niar prods l o e pes ideik ja ",
  "lv":"as  la pa nees  unun  ka vaar s p ar viis ai  noja ijaiemem tu tievielataksienkstiess arakatvtvi ja pika  irir ta  sats  kāās  tiot s n ie taarīparpie prkā  at raam inātā  izjaslai naautiešs s ap ko stiekietjauus rī tikībana  gacijs i uzjums vms var ku majā stas u tādiekaikasska ci dakurlietasa peststāšannesnies ds mval di es reno to umuvaiši  vēkumnu ries tām ad et mu s l beaudturvijviņājubasgadi nikaos a vnototistsaiku aā aāk  toiedstuti u pvēlāci šogi ko pros rtāju su vvisaunks strzina aadīda darenaicikranasstīšu  mēa necii sie iņaju lasr tumsšiebu citi ainama pusra  au se sla saisešiiecikupārs bs ksotādā in li tranaesoikrmanne u k tuan av betbūtim isklīdnavrasri s gstiīdz aiarbcindasentgali plikmā nekpatrētsi traušivei br pu skalsamaedzekaešuiegjiskamlstnākoliprepēcrottāsusiēl ēs  bi de me pāa iaidajāiktkatliclodmi ni prirādrīgsimtrāu lutouz ēc ītā ce jā sva tagaaizatuba ciedu dzidzī",
  "mk":"на  ната атаија прто ја  заа н и а сте ите коот  де поа дво за  во од се несе  доа вка ањеа по пувација оициетоо нанини  влдекекањетќе  е а за иат влаго е нод пре го да ма ре ќеалии ди ниотнатово па ра соовепраштоње а еда датдоне ве де зе сконнитно ониотопарпристат н шта кацива вање пенила ладмакнесноспроренјат ин ме тоа га ма ракеаковорговедоенаи ииракедне ницнијостра ратредскатен ка сп јаа тадеарте ге икатласниоо сри  ба биаваатевнид ндендовдрждуве оен ереерии пи синакојнцио мо ооднпорскиспоствститвоти  об ова балнарабаре кед ентеѓуи оии меѓо дојапотразрашспрстот дци  бе гр др из стаа бидведглаекоендесеетсзаци тизаинсистки ковколку лицо зо иоваолкореориподрањрефржаровртисо торферценцит а  вр гл дп мо ни но оп ота ќабоадаасаашаба ботвааватвотги граде диндумевредуеноераес ењеже заки вилаитукоакоиланлкуложмотндунсто воа оалобров овиовнои ор ормој ретседст тертијтоафорцииѓу  ал ве вм ги ду",
  "mn":"ын  байн байийнуул улулсан  ханийн хгаасыний лсы бой бэн ах болол н боло хэонгголгуунгоыг жил молаглламон тє хуайдны он санхий аж орл ун тулгайгдлыйг  задэсн андэулаээ агаийгvй аа й алынн з аю зєаарад ар гvйзєважиал аюуг хлгvлж сниэснюулйдллыгнхиуудхам нэ сагийлахлєлрєнєгч таилллийлэхрийэх  ер эрвлєерєийллонлєгєвлєнх хоариих ханэр єн vvлж бтэйх хэрх vн ньvндалтйлєнь тєр га суаандааилцйгул алаан нрууэй  тон срилєриааггч лээн орэгсууэрэїїл yн бу дэ ол ту шиyндашиг тиг йл харшинэг єр  их хє хїам ангин йгалсан vн еналнд хууцааэд ээрєл vйладаайналаамтгахд хдалзарл бланн дсэнуллх бхэр бv да зоvрэаадгээлэнн ин энганэ талтынхурэл  на ни онvлэаг аж ай атабарг бгадгїйй хлт н мна ороульчинэж энэээдїй їлэ би тэ энаныдийдээлаллгалд логль н ун їр бралсонтайудлэлтэргєлє vй в  гэ хvарабvрд нд ол хлс лтын гнэгогтолыоёрр трээтавтогуурхоёхэлхэээлэёр  ав ас аш ду со чи эв єраалалдамжандасувэрг удвэжvvлцалэл",
  "no":"er en et  dedet i foril  fo meingom  ha ogter er ti stog tilne  vire  en sete or de kkeke ar ng r sene soe sderan somsteat ed r i av inmen at ko påhar sierepå ndeandelsetttteligt sdent iikkmedn srt serskat ekersenav lerr atene fr er tedeig  rehanllener bl frle  vee tlanmmenge be ik om å ellselstaver et sknteoneorer dske an ladelgenninr fr vse  poir jonmernenommsjo fl saernkomr mr orenvilalees n at f leblie ee ie vhetye  iral e oideitilitnnerant otaltattt  kaansasjge innkonlsepett dvi  utenteriolir pretrisstostrt a gaallapeg sillirakapnn oppr hrin br ope mertgerionkallsknes gj mi prange he reltenni sistjenkanlt nalrestorassdree be pmeln tnseortperregsjet pt v hv nå vaannatoe aestiseiskoilordpolra rakssetoi grak eg eleg aigeighm en fn vndrnskrert mundvarår  he no nyendeteflyg igheierindintlinn dn prnesaksiet btid al pa trag dige de kessholi dlagledn en in oprir bst  fe li ryairaked seasegi",
  "ne":"को का मा हरु नेनेपपालेपा समले  प्प्रकारा सएको भए छ  भा्रम गररुक र भारारत का विभएकालीली ा पीहरार्ो छना रु ालक्या बाएकाने न्ता बाकोार ा भाहर्रोक्षन् ारी निा नी स डुक्रजनायो ा छेवा्ता रात्यन्दहुना कामाी न्दा सेछन्म्बरोतसेवस्तस्रेका्त  बी हुक्तत्ररत र्नर्या राकाुको एक सं सुबीबबीसलकोस्यीबीीसीेकोो स्यक छन जन बि मु स्गर्ताहन्धबारमन्मस्रुललाईा वाई ाल िका त् मा यस रुताकबन्र बरण रुपरेकष्टसम्सी ाएकुकाुक् अध अन तथ थि दे पर बैतथाता दा द्दनी बाटयक्री रीहर्मलकासमसा अा एाट िय ो पो म्न ्ने्षा पा यो हाअधिडुवत भत सथा धिकपमाबैठमुदया युकर नरतिवानसारा आा जा हुद्ुपमुलेुवाैठको ब्तर्य ्यस क् मन रहचारतियदै निरनु पर्रक्र्दसमासुराउनान ानमारणालेि बियोुन्ुरक्त््बन्रा्ष  आर जल बे या साआएकएक कर्जलसणकात रद्रधानधि नकानमानि ममारम रहेराजलस्ला वारसकाहिलहेका तारेिन्िस्े सो नो रोत ्धि्मी्रस दु पन बत बन भनंयुआरमखि ण्डतकातालदी देखनियपनिप्तबतामी म्भर सरम्लमाविशषाकसंया डा मानकालमि भित ी पी रु भुनेे गेखिेर ो भो वो ह्भ ्र  ता नम ना",
  "nl":"en de  deet an  heer  van dvaneenhet geoor eeder enij aargente ver in meaanden weat in  da teeerndetersten v vo ziingn hvoois  optie aaedeerders beemetenkenn e ni veentijnjn meeietn wng nie ischtdatereie ijkn brdear e be amett del ondt h ale wop ren di onal andbijzij bi hi wior r dt v wae hllert anghijmenn an zrs  ome oe vendestn tpar pa pr zee ge pn pordoudraascht eegeichienaatek lenn mngent overd wer ma midaae klijmern gn oom sent bwij hoe melegemhebpenude bo jadiee eelierkle prorij er zae densindke n knd nennter hs ds et z b  co ik ko ovekehouik itilanns t gt m do le zoamse zg vit je ls maan inkerkeuit ha ka mo re st toagealsarkartbene re sertezeht ijdlemr vrtet pzegzicaakaalag alebbech e tebberzft ge ledmstn noekr it ot wteltteuurwe zit af li uiak allautdooe ieneergetegesheejaajkekeekelkomleemoen sortrecs os vtegtijvenwaawel an au bu gr pl ti'' adedage lecheeleftgergt ig ittj dpperda",
  "nr":"okula ngaa n ngna amaa iko  ukelelo elaanga ua kukuaba kuwa enzlelho ni ngoathphaethkhaanaisange nao nthoe ntheha esinyekwetjh kwise uma a nele hlaa elanbenndl noimiundungthinziye isiutho eebehetkutandsa elofunekosebbanuluakaeliwene i ameniba we nel wekuflwai n iszi  lokwalokelwgokonalekhi li ganbon iiingka o iakhanethuulakelmth imga  lendafannoki kendsi o waphhate ualakublunikho lezia lo usisnamemi abhulkus wosekazikhoiini uasiloliniuphuhlkhuno o yakoa bi eo ki l bemal yei indeiphmelekethakunngie kengo s yoso ma mkhjhaiswlwe ezdi a we akulunyumeza anyahlkuheen siiliitjzokihl eske hlohakpheluldlelukda ekaamb sezismbihondlaakujenzin bahami a boo aaliuseilesikhanwokokhhlunyasitanikuzo oufaswaindzaknislisgabmi  em koano elhwaufua ywo  inlimtlokatwakkanthwo zithndiyokyo mitmisaboekuhabinynanezekhealolu manhe ezokupubu zogamhelwanombamknzaolahumkukdu  lakomi yobui boduokwgap kabe  ilaluatje b",
  "nso":"go  go le a le  dia gya lo  yaa mka  kala  t o ya ta kba et wa  mo e a b se ba ma boe gt a o a lo tna o la delodi a so go keleo ang t eo bmo e te megoeo e lngwse e bkgoela wa gae kagoo m kgga ditolot he do d yeanelelwe  tlthuona tht whutanatlawanabaola megware ongt olaoe so sa yaloseta pi aenga ao etho kegwe hahloedi laao  tsakahlaalaswa we bjo ogoragahabgobletke diksa  i oba hlthedira nithbjaye no  samollwati manolee etseo woreto at ethe ykantshgonnetanokarge ho lok sw nai bdipi ooka ge omko emopelnt e amellegtlhme etephea eo no iwalokonyabolodiwegte e nta anyyeokgapolangri it uto mmitiareo fha gatothikao h itsheathaleiriphaahl teohltha rebonlha phdin pero mi omii t faaroasei lne lalogokol wot iomo bemogmoklenilelwema utanseamoa o feokgja pannagekgi iapagetlonra aem yoatltlokeltel kh poe oa wenti ebo ganhetmala fotlutiogasenkwamaeekammekgejala ringlekseplagofewagg yrolepeekoboko padilog",
  "pl":"ie nieem  ni po prdzi naże rzena łemwie w  żego  byprzowaię  do siowi pa zach egoał sięej wałym aniałeto  i  to tee p je z czybyłpanstakie jado  ch cz wiiała ppow mili enizie ta wało ać dy ak e w a  od stniarzyied ktodzcieczeia ielktóo ptórści sp wyjaktakzy  moałęproskitemłęs tre mjesmy  roedzeliiej rza nalean e sestle o si pki  coadaczne te zentny prerząy s ko o acham e no tolipodzia go kaby iegiernośrozspoychząd mnaczadzbiechomnio nostpraze ła  soa mczaiemić obiył yło mu móa tacjci e bichkanmi mieoścrowzenzyd al rea wdenedyił ko o wracśmy ma ra sz tye jiskji ka m sno o zrezwa ów łowść  obecheczezyi wja konmówne ni nownympolpotyde dl sya sakialidlaiczku oczst strszytrzwiay pza  wtchcesziecim la o msa waćy nzaczec gda zardco dare rienm nm wmiamożrawrdztantedtegwiłwtey zznazłoa rawibarcjicządoweż gdyiekje o dtałwalwszzedówięsa ba lu woalnarnba dzoe chodigiligm pmyśo conirelskustey wystz w",
  "ps":" د اؤ  اؤنو ې دره  پهنه چې  چېپه ه دته و اونوو د اوانوونهه ک داه ادې ښې  کېان لو هم و مکښېه مى ا نو ته کښرونکې ده له به رو  همه ووى او توندا  کو کړقام تررانه پې وې پ به خوتو د دد اه تو پيا  خپ دو را مش پرارورې م دمشر شو ورار دى  اد دى مود پلي و ک مق يوؤ دخپلسرهه چور  تا دې رو سر مل کاؤ اارهبرومه ه بو تپښت با دغ قب له وا پا پښد مد هلې ماتمو ه هوي ې بې ک ده قاال اماد نقبره نپار اث بي لا لراثاد خدارريخشرامقانۍ ه ره لولويو کوم دد لو مح مر وواتواريالواندخاند تسې لى نورو لي چړي ښتوې ل جو سيام بانتارتر ثارخو دو ر کل دمونندېو نول وه ى وي دې اې تې ي حک خب نه پوا دتې جوړحکمحکوخبردانر دغه قافمحکوالومتويلى دى ميرهپر کولې ه تي خا وک يا ځاؤ قانۍبى غو ه خو بودايدوړې کال بر قد مي وي کرؤ مات اييتى تياتيرخوادغودم ديمر وقديم خمانمې نيونږ ه يو سو چوانوروونږپورړه ړو ۍ دې ن اه زي سو شي هر هغ ښااتلاق انيبريبې ت اد بد سر مرى عرالانمى نى و خوئ ورکورېون وکړى چيمهيې ښتنکه کړيې خے ش تح تو در دپ صو عر ول يؤ پۀ څوا ا",
  "pt":"de  deos as que coão o d quue  a do ent sea ds de aes  prra da  es pato  o em cono p doestnteção da rema par tearaida e adeis  um poa aa pdadno te  noaçãproal come ds a asa cer mens eaisntoresa sadoists pteme ce sia o so ao ce pstata traura di pear e eserumamosse  cao e naa edesontpor in maecto qrias csteverciadosicastr ao emdase titoizapretos nãadanãoesseveor rans ns ttur ac faa renserina sso si é braespmo nosro um a nao icolizmino nonspritenticões tra magae niliimem ancinhantaspetivam anoarcasscere oeceemoga o mragso são au os saalica emaempiciidoinhissl dla licm cmaioncpecrams q ci en foa oamecarco dereirho io om orar asenter br exa uculdeve uha mprnceocaoverios osa semtesunivenzaççõe ad al an mi mo ve à a ia qalaamoblicencolcosctoe me vedegásiasitaivandoo torer dralreas fsidtrovelvidás  ap ar ce ou pú so via factarrbilcame fe iel forlemlidlo m dmarndeo oomoortperpúbr ureiremrosrressi",
  "pt-br":"eq ent enq eq ig eg ing  ididantete  es inadeag dadde ia ing br saestinqlinmo nq o aseq co li ni o a aa cadoasibradoriq ntao bor q nrassilstrta treus  a  ag an ca e  eq g  i  ir nc q  se veantar ciacone aeirel ig iliimoio ir ncio tro vel ap bo de fr tra ba ea ga vapoas busca cetcindese be setafrei aibuil irola liqnibntio co qos ra re reqs as ssansimtarto ult ba ci el em fi gr gu ia mu pe po re ri si su te via oa sabealcandaraargaribenboccarco do e fe ge le oem emoen es espexeficg ng sgraguaiasicaidiilaileinhl bl eleiloqmosmulnadniont ntoo go roceontoq posq vr br er ir sradranremrg riarios es pstastitigtiltraua ue va xeq '  ab ad ae al am aq ar b  bi bl bu cc ch di et ex fa ic il im is it ll m  me na ne ng nu ob ou pi qu ss st ti ub un v  x ' ca da fa ia na pa tabraciad adaadraerafealvambampan anaanganhanianoanqapaaq atiatoazib nbanbarbigbilbiqbliblubonbrebribsebucc fc icadcafcagcalcancc ",
  "pt-pt":"equentquequiguiuen linguqu uid co vede gueidanteo aa aadedadel ingmo nquntasequ nvel de o  sea cadoar estia inqio iqulino co portporta te  ag eq nc pi po saa da eantas ca ciadesdo gu imol pnciro rtustrtugu suesui  a  an ap ba bi ca fr gu in pe quaguapacondore fe geirfreho i aicaiguiroliqntio bo lo sor r ora reqs csimtarto ue uinult ci en ho mu ni re s  si sua sa vabeag al andanhapoatabanbenbicboicapcarcinco comctodeie be oe secaen er es exeficforgalgraiasichicoidiiliir iraisbla lismbomulna nhoniont o qo ro toc oioomboo os parpe r br er sranre recs as ssansboso statantratreu vugauguxeq ab ad al am aq ar au b  bo c  ch ct cu el es ex fa fi ga gr id ir ne ng nu ob oo pa ps pt r  ra ri ss st ta te tr ub un vi voa fa ia la ma oa rachaciactad afaageagralfalham ambamianaanganqaquaraarbarcargariarrasaatiautazib nbarbatberbigbilbiqbliboaboeborbsec ic lc pcadcamcasch chachechiciococcoicouctrcuecul",
  "ro":" de înde  a ul  coîn re e dea  di prle şi areat conui  şii dii  cue aluiernte cu  laa ccă dine cor ulune terla să tattre ac săestst tă  ca ma pecuristmâna di cnat cei aia in scu miatoaţiie  re sea aintntrtruuriă a fo paateinitulentminpreproa pe pe sei nă parrnarultor in ro tr unal aleartce e ee îfositanteomâostromru strver ex naa flornisrearit al eu noacecerilenalpriri stasteţie au da ju poar au eleereeriinan an cresse t atea că do fia satăcome şeurguvi siceilina recreprilrnertiurouveă p ar o  su videcdreoaronspe rii ad gea ma rainalicarcatecueneeptextiloiu n porisecu puneă cştiţia ch guai aniceae fiscl alicliumarnicnt nulrist ct ptictidu aucr as dr fa nu pu tocradisenţescgenit ivil dn dnd nu ondpenralrivrtestit dta to unixteândînsă s bl st uca ba ia lairastblabricheducdule measediespi li picaicăir iunjudlailulmaimenni pusputra rairopsilti trau sua udeursân întţă  lu mo s  sa sca uan atu",
  "ru":" на прто  нели  поно  в на ть не  и  коом про тоих  каатьото заие ователтор деой сти отах ми стр бе во раая ватей ет же ичеия ов сто обверго и ви пи сии исто восттра теелиерекотльнникнтио срорствчес бо ве да ин но с  со сп ст чталиамивиддете нельескестзали ниваконогоодножнольорировскося терчто мо са этантвсеерреслидеинаиноироитека ко колкомла нияо толоранредсь тивтичых  ви вс го ма слакоаниастбезделе де пем жнои дикаказкакки носо нопаприрроскити товые  вы до ме ни од ро св чиа наетазаатебесв пва е ве ме сез ениза знаиникамкахктоловмерможналницны нымораороот порравресрисросскат нтомчитшко бы о  тр уж чу шка ба ва рабиалаалоальаннатибинвесвново вшидалдатдное зегоелееннентетеи оилиисьит ициковленлькменмы нетни нныногнойномо побновеовнорыперпо прапреразропры се слисовтретсяуроцелчноь вькоьноэтоют я н ан ес же из кт ми мы пе се цеа ма па тавшажеак ал алеанеачиаютбнаболбы в ив сванградаждене к",
  "sk":" pr po ne a ch  na jení je  dona ova v to ho ou  toickterže  st zaostých sepro tee s žea p ktpre by o se kon přa sné ně stiakoistmu ameentky la pod ve obom vat kostaem le a vby e pko eriktesa éhoe vmertel ak sv záhlalaslo  taa nej li ne  saak aniateia sou soeníie  rece e noritic vya tké noso sstrti uje splovo poliová náaledene oku val am ro siniepoltra alalio vtor mo nici o ním  le pa s al atierooverovváních ja z ckée z odbylde dobneppraricspotak vša ae tlitme nejno nýco ta je aen estjí mi slostáu vfornoupospřesi tom vla zly ormrisza zák k at ckýdnodosdy jakkovny resrorstovan opda do e jhodlenný o zpozpriranu s abaj astit ktoo oobyodou pva áníí pým  in miať dovka nskáln an bu sl tre mechedni nkýcnícov příí a aj boa dideo ao dochpovsvoé s kd vo výbudichil ilini nímod oslouhravrozst stvtu u avály sí sí v hl li mea me bh si pi sitiládnemnovopouhlenoensmennesobote vedvláy n ma mu vábezbyvcho",
  "sl":"je  pr po je v  za napreda  daki ti ja ne  inin li no na ni  bijo  nenjee pi pprio pred doanjem ih  bo ki iz se soal  dee vi sko biliraove br obe bi novase za la  jaatiso ter taa sdele d dr oda nar jalji rit ka ko paa banie ser ililovo vtov ir ni voa jbi briitileto ntanše  le teenieriitakatporproalike oliov prari uarve  toa ia vakoarjatedi do ga le lo mero sodaoropod ma mo sia pbode negaju ka ljeravta a oe te zi di vilalitnihodostito varvedvol la no vsa daguajadejdnjedagovguajagjemkonku nijomoočipovrakrjastateva taj ed ejaentev i ii oijoistostskestr ra s  tr šearnbo drži jiloizvjenljansko do iom oraovorazržatakva venžav me čeameavie ie oekagrei tijail itekraljumorniko tobiodnranre stostvudiv ivan am sp st tu ve žeajoaleapodaldrue jednejoeloestetjevaijiik im itvmobnapnekpolposratskitičtomtontratudtvev bvilvsečit av gra zansastavtdane medsfori zkotmi nimo bo ood odloizot parpotrjeroitemval",
  "so":"ka ay da  ayaaloo aan kaan in  inadamaaaba soalibadaddsoo naahaku ta  wayo a somayaa ba ku la ooiyashaa addanabnta da mankauu y iayaha raa dh qaa kalabaadoohadliyoom ha sha da ia naaree ey y kya  ee iyaa aaqgaalam bua ba mad agaamaiyola a ca leenintshewaxyee si uua haasalkdhagu heeii iramado ao kqay ah ca wuankashaxaeeden ga haan an snaanayo dtaau buxuwuxxuu ci do ho taa ga uanaayodhiiinlaglinlkao isanu sunauun ga xa xuaababtaq aqaaraarlcaacireegeelisakallahneyqaarlasadsiiu dwad ad ar di jo ra sa u  yia ja qaadaataayah aleamkarias ayebusdalddudiidu duued egegeyhayhiiidainejoolaalaymarmeen bn dn mno o bo loogoonrgash sidu qunkushxa y d bi gu is ke lo me mu qo uga ea oa wadiadoagual antarkasaawibtabuld adagdando e sgalgayguuh ehaligaihiiriiyekenladlidlshmagmunn hn ina o no woodoororaqabqorrabritrtas osabskato u au hu uud uguulsuudwaaxusy by qy syadyayyih aa bo br go ji mi of ti um wi xoa x",
  "sq":"të  tënë për pë e sht në shse et ë së t sehe jë ër dhe paë në p që dhnjëë m njëshin  meqë  poe ne tishmë së me htë ka sie ke p i anëar  nuundve  ëse s mënukparuaruk jo rë ta ë fen it minhetn eri shqë d do ndsh ën atëhqiistë q gj ng tha ndo endimindir tratë bëri muartashqip koe medherije ka ngasi te ë kësi ma tievehjeiramunon po re  prim lito tur ë eë vët  ku sëe des ga itijetndëolishitje bë z gjekanshkëndës  de kj ru viaragovkjoor r prtorugtetugoaliarrat d tht i pipëizijnën noheshushët etika earëetëhumnd ndroshovarimtosva  fa fia sheni nmarndoporrissa sistësumëvizzit di mbaj anaatadëre aeshimejeslarn sntepolr nranresrrëtarë aë i at jo kë rea kai akthë hëni ii mia mennisshmstrt kt nt së gërkëve ai ci ed ja kr qe ta vea pcilel erëgjihtei tjenjitk dmënn tnyroripasra rierëstoruajyreëm ëny ar du ga jedëse ee zha hmeikainiiteithkohkraku limlisqënrëns st dt ttirtënverë j ba in tr zga aa ma tabr",
  "sr":" на је поје  и  не прга  свог а сих на којога у а пне ни ти  даом  ве сри сско оба нда е нно ного јој  зава е си пма никоброва коа идије пка ко когостсвествститраедиимапокпраразте  бо ви саавобрагосе иелиениза икиио преравраду сју ња  би до стастбојебои ним ку ланнебовоогоослојшпедстрчас го кр мо чла ма оакоачавелветвогедаиститиијеокослосрбчла бе ос от ре сеа ван богбровенграе оикаијакихкомли ну отаојнподрбсредројса снитачтваја ји  ка ов тра јавиаз анобиовикво говдние чегои оиваивоик инеиниипекипликло нашносо тод одионаојипочпрора рисродрстсе спостатићу ду ну очинша једјниће  м  ме ни он па сл теа уаваавеавнанаао атиациајуањабскворвосвскдине уеднезиекаеноетоењаживи ги ии ки тикуичкки крсла лавлитме меннацо но по уоднолиорносноспочепскречрпссвоскисласрпсу та тавтвеу бјезћи  ен жи им му од су та хр ча шт њеа да за ка тадуалоаниасованвачвањведви вновотвојву добдрудседу е бе де мем емаентенц",
  "ss":" ku lela ekua knga nga nngea llo  neetikwendze no l loelaemaentsi  kwtsii lwa lelkute kundni elofunesi sieletintfo tile khatsee lphaungi k emti sa  umisaelindlingsetwe isena angetfkheando n wentinyetfubena eutsletdzaimisekko lokeniye ba nkhebealoo klanga abaseb yehe lwakel te lakuswematiikhnekalakufi nokuatsmtshlawena t nagekuhlkubnguka akafutkankwa likuconkbananaulu se imakhumea ilestimulainilweza fo hul nohanli ipha stiskhuta dzibe emima endo tekea u kaanelekmelelwkunsislonutfanykhokulhlo baufuaphlune shalindiswo suseekwme ndvenguphhatne so lulnomte lolawunellu ha watmenete lwnemakozinkuhshabhagab inalemisteme eo ee twekdzeomewel luembnis ektsau lo ydleutelenswaphemkhntfukesitinye iwo aniphiwetsinnhlmalmbamfufu labsiktawno hlee uekiasealiulwve ekazelntabontekbo sigamaileuletfwmphumakupemtasidluishumtgeno wikeigahakabenetgankisndengiukhbekmo phuselelui tantdvoa yvo humlisdlagamivejenket",
  "st":"ng ho  lele  ho tsa msa la  kaa h diya ka  yaa tengets ba moa l selo  bowa tsaa bna ba  e  a a k maangtsese o ta da sha so o le ho ye ttlatsholoe le mo bo esebebeelathuelee kanae b th hatsoo ao k wakgotswthoo hong lahutditane mea e tlolaedielodi ona kewan o a papatjhhlo sasheletabaloklaoeo a ao smanto  hla nisae dswesetpa  nao mg lhet kggotahaethre e ejhaphelanotlg klekitsekgsenao disg mothe aithhlae ske molpelg hhabbetsanatsmo lwawe alalenntsdipkapiso mmutoaloe nsi ta o wemoswatsiokebedthe pha ywenkenenahwane oreatlanohelmotbo g ti bkgahorngonanno o ntlhshwkelphaetjbonellg sgolthaaledikkolbak ntikao d teohlg y loti hisileg boko ethana omatohoodilelmeldinkaro ouo monhahte me  ito fnenhebingbolbelhlepuolaltlohalophebahatheoarobatko banleho ioletle fekgepanakeg eakaeko perike ymmeamalhaeha faebomohmaeeteaemotsahio putaokgntlpalgeti le fokaseplatahlboteselahlonakga f puaseg amorkannahbohe p",
  "sv":"en  deet er tt om förar de att föing in at i detch an gen ant ssomte  octer halleoch sk sora r a mevarndeär  koon ansintn sna  en fr på st vaandntepå skata  viderällörs omda krika nst hoas stär dt fupp benger staltälör  avgerillng e sektadeeraersharll lldrinrnasäkundinnligns  ma pr upageav ivaktildaornsonts ttaäkr sj tiavtberelsetakolmenn dt kvtaår jukmann fninr irsäsjusso ära sachag bacdenettftehornbaollrnbstetil ef sia ae hed eftga ig it lermedn ind så tiv bl et fi säat dese agargetlanlssostr br ere retstat i ge he rea fallbosetslekletnernnanner frits ssenstotorvavygg ka så tr utad al aree ogonkomn an hngar hrent dtagtartreätt få hä sea da ia paleannarabyggt hanigtkanla n onomnskommr kr pr vs fs kt at pver bo br ku nåa ba edelenses finigem sn pnågor r orbers rt s as nskrt otentioven al ja p  r  saa hbetckedrae fe iedaenoeräessionjagm fne nnspror trarrivrätt et tustvadöre ar by kr miarb",
  "sw":" wawa a ka m ku yaa wya ni  maka a una za ia  naikama alia n amilikwa kwini haameanai n zaa hemai mi ykuwla o wa yatasem laatichii wuwaakili ekaira nca sikikatnch ka kia bajiambra ri rikadamatmbamesyo zi da hi i kja kuttekwan bia aakaao asichaeseezake mojoja hia zendha ji mu shiwat bwakearabw i himbtikwakwal hu mi mk ni ra uma lateeshinaishkimo k ira ialaaniaq azihini aidiimaitarairaqsha ms seaframaanoea elefrigo i iifaiwaiyokuslialiomajmkuno tanuliutawen ala jaadaidariawaba fa ndengenyao yu wua umowazye  ut via da taifdi ereingkinndao noa taitoausautowasyakzo  ji mwa paiaamuangbikbo dele weneengichiriitiitoki kirko kuumarmbomilngingoo longsi ta taku yumuusiuu wam af ba li si zia vamiatuawierifanfurgeri zisiizoleambimwanyeo ho monirezsaasersintattistu uinukiur wi yar da en mp ny ta ul wea ca faisapoayobardhie aekeenyeonhaihanhiyhuri simwkalkwelaklammakmsane nguru salswate ti ukuumaunauru",
  "tl":"ng ang na saan nansa na  ma caay n g anong gaat  paala sia nga g ng mitog cmansang singto ilaina di taagaiyaacag t atayaamalana aquia ca snag bag itan't  cuauag p nios 'y a m n la  lao nyan ayusacayon ya  ital apaatat nuanahaasapag gug ldi magabag aaraa pin anait si cusg buina tas n nhin hia'tali buganumaa dagcaqug d tuaonaricasi nniypina igcasiya'yyaoag ca hanilipansinualn snam lucanditguiy ngalhatnal isbagfra fr sua l coani bi daaloisaitamayo ssiluna in pil nnilo apatsact s uaaguailbindalg hndioonua  haindrans ntinuloengg finilahlo rairintong uinulono'yt a ara bad baycalgyailematn apaura tayy mantbani mnasnayno sti tiagsg gta uituno ib yaa uabiaticapig is la' do puapiayogosgullaltagtiltuny cy syonanoburibaisilamnacnatni ntood pa rgourg m adrastcaggaygsii pinolenlinm gmarnahto' dea hcatcauconiqulacmabminog parsal zaao dooipinodnteuhaula reilllitmacnito'tor orasumy p al mi umacoadaagdcab",
  "tlh":"tlhe' gh i'  'eu'  viatla'  ghej  ho ch mu tlngameywi'be'an ch ganchulh ing'e'hinjatlhi da jao' ughaq cha poey  'a je'ej pang ad  qaoh eh ah ghaje  luholaw' jiongpu'aj vadw' ' jha'is tah' 'angh 'ponam lawmo'qu'hbeol vamaghmu'ahvbejoghuch' vachhug lo quchohvaij  lalu'vis ne pu so ta va'acdi'hu'lahmoh 'o' mdaqhahn hnehu'may'ghoh vmehoy  ma nu'meel  ba be de ng' th dhvioq  wa' l'wihmeli'uq  bobogdelh ph tichvil qe wiahbbanenghaqhohov viq ha ti' n' p'a'hwiighlo'y'  du no yu'mo'vadajdaseghhommucom otlus  bi tu' hchmh qhovnisqaruj ' q'chh mhmojihparwij hu' d'a etlh gh jh llodmaqochwa'yuq di le pe ya'dicheechih ijain j 'j mlhwpa' 'i mi qi ro ru'beanpghighuh bhayhchiq npuod paqqayrdasoh do me qo sa' c' g' s'luamlardas d pgmeh nhtai'vj jjijlenngmqanqmevajwiv mo ni'la'pu'quar armdwig pghdh chamhlahquiloiqaiqij pj tj vladlhomarmugpusq sq trghrmasovta'tintu'u'dvetyliyu' to'ohaqqartat aylaytet hajhar",
  "tn":" di lego le  gong  tsya  yasa tlh mo boa mlo tsa e o ta bwa  kaa ka tka a gengoloo yla  a a detsmo se  tl batsh maba a ltseso na elo seelee do llhoe tdi e g kgditkgoo kanglhae me ewe aneo me ke longsetwanelatsotlao de bolangwgweo babaatla p o a ao aotla so edirthuga  gashwotsakahabhwaagao ggantswanamol kehut meonalelitslaokgadikgot falet waoseno t hsweediatsa ne sokoothkwakar tha ealatiro ndipisagatti anobot nn halenaloanyaroitiirio ssennetke ho maiikaekato ithre g mhatbo g let emoamaisorolfa iwakanshesi ao g kwenlolo obositla ythelwae n laore mmko thae aeo lhebolha  poisii blan nai talene gonrisirabon sag yg gphaogamelro golo w kwi l titlologpor jaa f nehoklot pue yutog thomokg koo famegorta  pents khthogeladiareeteasemonheooroomonennelilenngntlaboogoaranseegoheluo mogsanularagkolte etlbat tepuoamoofelatatiolerabtsiiromanaelegalwera dintlesekingyo a o reaotusoo rerejwaaemlamlek jwgwamok",
  "tr":"laren leran in  bi yaeride  kair arı ba de haın arabir ve sailele ndeda  buanainiınıer ve  yılmayıl olar n bndaayali ası geindn kesilannlaak anıenini nı rınsan ko yemazbaşilirinalıaz halınd da güeleılmığıekigüni biçidenkarsi  ile yna yorek n s içbu e bim ki lenri sın soün  taniniğitanyan sinatnınkanrı çinğı elin aır  aninen yola aral e slikn dsin al düanlne ya ım ına beadaalaamailmor sı yen meatıdi etikenla lı oru gö inande dmenun önea dat e ae gyar kuayıdanediiriünüği ılıemeeğii ki yıla çaa yalkdı edeel ndıra üne südıre kereik imiişimasn hsüryle ad fi gi sea karlaşıiyoklalığnemneyrmestetı unlver sı te toa saşkeklendkalliğmintıruluunuyapye ı işkaştı bü ke kiardartaşan inditi topı b va önakicakey filisiklekurmanncenlenunrakık  en yoa glismakn gtiryas iş yöalebilbulet i diyekilma n en tnu olurlate yönçık ay mü ço çıa aa batadergeli gi iillistldılu mekmlen çonuoplranratrdırkesiysonta tçıtın",
  "ts":" kuku na ka wa a n swa mya a k tiswihi la  ya le hia ta v vani  nandz maa h xia si nelei kanaa lngalo va le akaelairheka vuiwaa x kayi  waisasa ko ta ga wu wi tir ek mi nio yeloawuisiswai thlaa e ta ng laa yri eri rirhiekeumbu tndl yilani veswmbei la re kanglesulati yono wonalawxa nelyo leliko loamb a i y xaanewani sondfanendi ho lu kmbin'wke dyo falamnhlo songno  kou n haho okou hi mo n yonguo ku yatiu lvanuluandmbakumu vwo be ha riwdzasi  eno h hlo teyi ntilalokdzinge mualato a w byarhakutsawakrho'wa ndminlavtimleytikdletinmatlerletselhismellu ikaa angoengo x nkamusiwanienima  nhmi swoetitanmo hamiwe khhanlekntiunghakdzoete tsavahu fumkarvul wukulundi xnhuyisxikbisxi e yra hle huwekanoyena dsisolopfui wnyie nso ki funisotshkonnkuheli be hariimii eindvumntsimekommfuise mfhindlavutgani rbanbyamilintats dyu se xilekelkwa noi fasiza urio mrhae lin'etavoni akho woiki rau eo ezo yininkanyket",
  "uk":" на занняня на  прогого ськ по у відере мі неих ть пер віів  пе щольнми ні не ти атиеннміспрауваникпроравівн табудвлірів ко ріально омущо  виму ревся інн до упавланнкомли лінногупр бу з  роза и нновороостстаті ють мо ні якборва ваненьи пнь овіронстіта у вькоіст в  редо е пзабий нсьо во пприі п ку пі спа пабоансаціватвнии вимика неннічонаої повькиьноізнічн ав ма ор су чи іна зам ає вневтодоментжитзниим итлла нихницоваовиом портьсу рьсяідоільісь ва ді жи че і а ва наливезвноевеезезеництки кихконку ласля можначнимноїо бовуодиою ро роксноспотактвату у пцтвьния зі мії  вс гр де но па се ук їха оавтастаютварденди ду знаи зикоисяитикогменномну о но собуовопларанривробскатантимтисто траудочинчниі вію  а  во да кв ме об ск ти фі є а ра са уак аніартаснв увиквіздовдподівевіенсже и ми сикаичнкі ківміжнанносо уоблоднок олоотрренримрозсь сі тлатіву зугоудічи ше я ня уідпій інаія  ка ни ос си то тр уг",
  "ur":"یں  کیکے  کےنے  کہے ککی میں میہے وں کہ  ہےان ہیںور  کویا  ان نےسے  سے کرستا اواورتانر کی ک اسے ا پا ہو پررف  کاا کی ا ہیدر کو  ایں ک مش ملات صدراکسشرفمشرپاککستی م دی صد یہا ہن کوالیہ ے و بھ دواس ر انہیکا ے سئی ہ ایت ے ہت ک سالے ہا ے ب واار نی کہای ہے م سی لیانہانیر مر پریتن مھا یر  جا جنئے پر ں نہ کی وے د تو تھ گیایکل کنا کر ں میک  باا تدی ن سکیایوںے جال تو ں اے پ چاام بھیتی تے دوسس کملکن اہوریے  مو وکائیارتالےبھاردیری وہ ویزں دھی ی س رہ من نہ ور وہ ہنا ااستت ات پد کز مند وردوکلگی گیاہ پیز ے ت اع اپ جس جم جو سراپناکثتھاثریدیار درت رویسی ملاندووستپروچاہکثرکلاہ ہہندہو ے ل اک دا سن وز پیا چاء اتھاقااہ تھ دو ر بروارے ساتف کقاتلا لاءم مم کمن نوںو اکرنں ہھارہوئہی یش  ام لا مس پو پہانےت مت ہج کدونزیرس سش کف نل ہلاقلی وریوزیونوکھنگا ں سں گھنےھے ہ بہ جہر ی آی پ حا وف گاا جا گاد ادیاعظاہتجس جمہجو ر سر ہرنےس مسا سندسنگظم عظمل ملیےمل موہمہونگھو صورٹوہنکن گھ گے ں جں وں یہ دہن ہوںے حے گے ی اگ بع رو شا",
  "uz":"ан ганларга нг ингнинда ни идаариигаиниар ди  биани боданлга ҳа ва саги илан би б кў таир  маагаалабирри тгаланлика кагиатита адидагрга йи ми па бў қа қиа биллли асии тик илиллаардвчива иб ирилигнгаран ке ўза сахтбўлигикўррдарниса  бе бу да жаа тазиерии аилгйилманпахридти увчхта не со учайтллитла ай фр эт ҳоа қалиаробербилборимиистон ринтертилун фрақил ба олансефтзиркатмилнефсагчи ўра на те эна эам арнат иш ма нларличилшга иш му ўқаравази уиқ моқримучучунши энгқувҳам сў шибарбекдами ҳишиладолиоллориоқдр бра рлаунифт ўлгўқу де ка қўа ўабаамматлб кбошзбеи вим ин ишллаблейминн дндаоқ р мрилсидталтантидтонўзб ам киа ҳангандартаётдиренти ди ми ои эиройтинсуодиор си тиштобэтиқарқда бл ге до ду но пр ра фо қоа ма оайдалоамаблег ндолейрек ергжарзиди ки фий илолдилиблинми мман вн кн ўн ҳозиораосирасришркароқстотинхатшир ав рў ту ўта павтадаазаанлб ббойбу втог эгиндардендунидеионирлишгйхакелкўплио",
  "ve":"ha  vha mna  u a ntshwa a u nangavha ts dz khdzaa vya  yaa tho la  zw muedzvhuga shiza a k ngkha mahumne  ndo nlo dzishu haa do yndaelezwiahoangno  a elaa zhu shai n waanahi kano danoa hzwa th migana lsa handi u tandndiyo thedo ri vhoni ka urisi o tmbeo wanewe zo i te ni hsheusho kzi da a athu laa pzan i a slwaulai daka domisheditali  huiwa lui vhe  kaeloso ambavh sho vi klelu vdzou s fhmo nweo lumiwahisihela iveladztani maththiwi  urhatinele vheanya yhonisaalao aaluudiumb bvash te lilusnyahasledswahuso iumoonendetha itkhongomushake yea ivho mu nhinthomutayofhi satelhulhunuloithma  yolane v phgo i ao uhud pfukazhiuvhdzwingelwilawo mbou diteiswasie kndufheo hmelu bikabo guddzhkonifh tae duth hoi zwanulumadinwothanidiswitou bveetsu iadie mfhanahdalwin sisho inyamlayekaa fi uendi yaloi lusomulta delu k mbpha didadalio spfukhwe a ko nehenmasumeiniishudziraoniluknelisombadzuhomi szwonguaraunz",
  "vi":"ng  th chg t nhông kh trnh  côcôn tyty i tn t ngại  tich y lền  đưhi  gởgởiiềntiềởi  gi le vichoho khá vàhác pham hànáchôi i nượcợc  tôchúiệttôiên úngệt  cóc tcó húnviệđượ nag ci cn cn nt nvà n ln đàngác ất h lnamân ăm  hà là nă qu tạg mnămtạiới  lẹay e gh hi vi đle lẹ ều ời hânnhit t củ mộ về đian củalà mộtvề ànhết ột ủa  bi cáa canhcách ciềum tện  ho's avee'sel g nle'n vo cravs tthitravelận ến  ba cu sa đó đếc cchuhiềhuykhinhânhưongronthuthưtroy cày đếnườiườnề vờng vớcuộg điếtiệnngào tu cuộcvớià cài ơngươnải ộc ức  an lậ ra sẽ số tổa kbiếc nc đchứg vgiagàyhánhônhư hứci gi hi ki piênkhôlậpn kra rênsẽ t cthàtrêtổ u ny tìnhấy ập ổ c má đểai c sgườh vhoahoạinhm nmáyn gngưnhậo noa oànp csố t đy vào áy ăn đó để ướcần ển ớc  bá cơ cả cầ họ kỳ li mạ sở tặ vé vụ đạa đbaycơ g shanhươi skỳ m cn mn po boạiquasở thathátặnvàové vụ y bàn ángơ sầu ật ặngọc ở tững du lu ta to từ ở a vao c vcả du g lgiả",
  "xh":"la  kulo ngaa k ngoku kw uka nukuye a iyo elaelea unyewe wa amae niseababa ho enzo nngokubngeathfuno elelungubako eloezio kthekwana kweange ile ka esio y nae kethpha inkunnziandni ban ye nolwalun okanyzi li  neulua eeligoko lebeundisasebndo ezthoo ido beningkwindlunyalaa aeyoe ukan abthii ki no uo zelwsa sekayoheto oeka umhi bo so isiwenlweapha lya ekoana yokufiniimialiha awuwanentuththaza ulakho iianee aisouph leilezinnts siengnokonghlazwe elokaekilisazi lotsh amufuantiswo anguo s bainteniunewulhulseli euselanke nisemi li isiph ima oakamfu ziinkmalleymannyanekakhume koalotu i untuizwkelizii isi ganaseindi andinelalusisubokutmthkuslekmisnde zo weaniga ikosizno phue ehonondne ithkulgamgenpho izphehatkhuiinhanzo lu ulondaqo zikhelo m lwzisdleuhlmenolomeldelnzaokookwolukuknteswalawenk yai ygaqshaaqoe likhnkqule kaonkthuwo bonkupquba ykqudla eshe anolumbe iga zeo wakumgankete  olze kumemfesh",
  "zu":"okula nga nga n kua kthi ukezie nukule lo hi wa  noa uelawe a ini elezinuthamaelophaingabaathandenzethesima lel um katheungngengothonyekweeniiziye  kwndlho a ena zi hetkane ue iundiseisindakhaba i knomfun ez izke beno eisazwekelka akanzio ne komakwa neanyanghlai umthkubo kanaaneikhebekutha  isaziulusebalaonkbani eazwwen abhana ai nimilanhatlwa nainiakhli ngunkenokumeekeelwyo aphkus es okiph immeli i lo in amkhoza gokseklunkunlweshasikkufhaka ythusa o ukhuayohule aalienglu ne  koeliubadlee eith yoa lnelmis sikula osislokgeno zi aemiumaekaalomaniswthao ilonso uphuhlntuzimmalindwez bao o yi weulapheo yileo lwo welga tu hleokwfan lekazaseanindebo ngiule emmeninyambmbiganifuo santhelikaonai lfut fuze u anhlnin zoendsigu kgabufaishushkuzno gamkuh yenyanezzisdlukatdlatsh seikekuqgu osiswalul ziimae lkupmo nzaasiko kumleksheumtunyyokwanwamameonglismkhahlaleuseo aalugapsi hlonjeomto wokhhe komi s"
    };
  
    global._languageData = (typeof module === "object" && module.exports === global && module || {}).exports = models;
  
  })(this);


(function(global, undefined) {

    var guessLanguage = function() {
  
        var models = global._languageData || {};
  
        if (typeof module === "object" && module.exports === global) {
          models = require('./_languageData') || {};
        }
  
        var MAX_LENGTH = 4096;
        var MIN_LENGTH = 20;
        var MAX_GRAMS = 300;
  
        var NAME_MAP = {
          "ab": "Abkhazian",
          "af": "Afrikaans",
          "ar": "Arabic",
          "az": "Azeri",
          "be": "Belarusian",
          "bg": "Bulgarian",
          "bn": "Bengali",
          "bo": "Tibetan",
          "br": "Breton",
          "ca": "Catalan",
          "ceb": "Cebuano",
          "cs": "Czech",
          "cy": "Welsh",
          "da": "Danish",
          "de": "German",
          "el": "Greek",
          "en": "English",
          "eo": "Esperanto",
          "es": "Spanish",
          "et": "Estonian",
          "eu": "Basque",
          "fa": "Farsi",
          "fi": "Finnish",
          "fo": "Faroese",
          "fr": "French",
          "fy": "Frisian",
          "gd": "Scots Gaelic",
          "gl": "Galician",
          "gu": "Gujarati",
          "ha": "Hausa",
          "haw": "Hawaiian",
          "he": "Hebrew",
          "hi": "Hindi",
          "hmn": "Pahawh Hmong",
          "hr": "Croatian",
          "hu": "Hungarian",
          "hy": "Armenian",
          "id": "Indonesian",
          "is": "Icelandic",
          "it": "Italian",
          "ja": "Japanese",
          "ka": "Georgian",
          "kk": "Kazakh",
          "km": "Cambodian",
          "ko": "Korean",
          "ku": "Kurdish",
          "ky": "Kyrgyz",
          "la": "Latin",
          "lt": "Lithuanian",
          "lv": "Latvian",
          "mg": "Malagasy",
          "mk": "Macedonian",
          "ml": "Malayalam",
          "mn": "Mongolian",
          "mr": "Marathi",
          "ms": "Malay",
          "nd": "Ndebele",
          "ne": "Nepali",
          "nl": "Dutch",
          "nn": "Nynorsk",
          "no": "Norwegian",
          "nso": "Sepedi",
          "pa": "Punjabi",
          "pl": "Polish",
          "ps": "Pashto",
          "pt": "Portuguese",
          "pt-PT": "Portuguese (Portugal)",
          "pt-BR": "Portuguese (Brazil)",
          "ro": "Romanian",
          "ru": "Russian",
          "sa": "Sanskrit",
          "bs": "Serbo-Croatian",
          "sk": "Slovak",
          "sl": "Slovene",
          "so": "Somali",
          "sq": "Albanian",
          "sr": "Serbian",
          "sv": "Swedish",
          "sw": "Swahili",
          "ta": "Tamil",
          "te": "Telugu",
          "th": "Thai",
          "tl": "Tagalog",
          "tlh": "Klingon",
          "tn": "Setswana",
          "tr": "Turkish",
          "ts": "Tsonga",
          "tw": "Twi",
          "uk": "Ukrainian",
          "ur": "Urdu",
          "uz": "Uzbek",
          "ve": "Venda",
          "vi": "Vietnamese",
          "xh": "Xhosa",
          "zh": "Chinese",
          "zh-TW": "Traditional Chinese (Taiwan)",
          "zu": "Zulu"
        };
  
        var IANA_MAP = {
          "ab": 12026,
          "af": 40,
          "ar": 26020,  
          "az": 26030,
          "be": 11890,
          "bg": 26050,
          "bn": 26040,
          "bo": 26601,
          "br": 1361,
          "ca": 3,
          "ceb": 26060,
          "cs": 26080,
          "cy": 26560,
          "da": 26090,
          "de": 26160,
          "el": 26165,
          "en": 26110,
          "eo": 11933,
          "es": 26460,
          "et": 26120,
          "eu": 1232,
          "fa": 26130,
          "fi": 26140,
          "fo": 11817,
          "fr": 26150,
          "fy": 1353,
          "gd": 65555,
          "gl": 1252,
          "gu": 26599,
          "ha": 26170,
          "haw": 26180,
          "he": 26592,
          "hi": 26190,
          "hr": 26070,
          "hu": 26200,
          "hy": 26597,
          "id": 26220,
          "is": 26210,
          "it": 26230,
          "ja": 26235,
          "ka": 26600,
          "kk": 26240,
          "km": 1222,
          "ko": 26255,
          "ku": 11815,
          "ky": 26260,
          "la": 26280,
          "lt": 26300,
          "lv": 26290,
          "mg": 1362,
          "mk": 26310,
          "ml": 26598,
          "mn": 26320,
          "mr": 1201,
          "ms": 1147,
          "ne": 26330,
          "nl": 26100,
          "nn": 172,
          "no": 26340,
          "pa": 65550,
          "pl": 26380,
          "ps": 26350,
          "pt": 26390,
          "ro": 26400,
          "ru": 26410,
          "sa": 1500,
          "bs": 1399,
          "sk": 26430,
          "sl": 26440,
          "so": 26450,
          "sq": 26010,
          "sr": 26420,
          "sv": 26480,
          "sw": 26470,
          "ta": 26595,
          "te": 26596,
          "th": 26594,
          "tl": 26490,
          "tlh": 26250,
          "tn": 65578,
          "tr": 26500,
          "tw": 1499,
          "uk": 26520,
          "ur": 26530,
          "uz": 26540,
          "vi": 26550,
          "zh": 26065,
          "zh-TW": 22
        };
  
        var SINGLETONS = [
          ["Armenian", "hy"],
          ["Hebrew", "he"],
          ["Bengali", "bn"],
          ["Gurmukhi", "pa"],
          ["Greek", "el"],
          ["Gujarati", "gu"],
          ["Oriya", "or"],
          ["Tamil", "ta"],
          ["Telugu", "te"],
          ["Kannada", "kn"],
          ["Malayalam", "ml"],
          ["Sinhala", "si"],
          ["Thai", "th"],
          ["Lao", "lo"],
          ["Tibetan", "bo"],
          ["Burmese", "my"],
          ["Georgian", "ka"],
          ["Mongolian", "mn"],
          ["Khmer", "km"],
          ["Pahawh Hmong", "hmn"]
        ];
  
        var UNKNOWN = 'unknown';
  
        var BASIC_LATIN = ["en", "ceb", "ha", "so", "tlh", "id", "haw", "la", "sw", "eu", "nr", "nso", "zu", "xh", "ss", "st", "tn", "ts"];
        var EXTENDED_LATIN = ["cs", "af", "pl", "hr", "ro", "sk", "sl", "tr", "hu", "az", "et", "sq", "ca", "es", "fr", "de", "nl", "it", "da", "is", "no", "sv", "fi", "lv", "pt", "ve", "lt", "tl", "cy", "vi"];
        var ALL_LATIN = BASIC_LATIN.concat(EXTENDED_LATIN);
        var CYRILLIC = ["ru", "uk", "kk", "uz", "mn", "sr", "mk", "bg", "ky"];
        var ARABIC = ["ar", "fa", "ps", "ur"];
        var DEVANAGARI = ["hi", "ne"];
        var PT = ["pt-BR", "pt-PT"];
  
        // Unicode char greedy regex block range matchers
        var unicodeBlockTests = {
          "Basic Latin": /[\u0000-\u007F]/g,
          "Latin-1 Supplement": /[\u0080-\u00FF]/g,
          "Latin Extended-A": /[\u0100-\u017F]/g,
          "Latin Extended-B": /[\u0180-\u024F]/g,
          "IPA Extensions": /[\u0250-\u02AF]/g,
          "Spacing Modifier Letters": /[\u02B0-\u02FF]/g,
          "Combining Diacritical Marks": /[\u0300-\u036F]/g,
          "Greek and Coptic": /[\u0370-\u03FF]/g,
          "Cyrillic": /[\u0400-\u04FF]/g,
          "Cyrillic Supplement": /[\u0500-\u052F]/g,
          "Armenian": /[\u0530-\u058F]/g,
          "Hebrew": /[\u0590-\u05FF]/g,
          "Arabic": /[\u0600-\u06FF]/g,
          "Syriac": /[\u0700-\u074F]/g,
          "Arabic Supplement": /[\u0750-\u077F]/g,
          "Thaana": /[\u0780-\u07BF]/g,
          "NKo": /[\u07C0-\u07FF]/g,
          "Devanagari": /[\u0900-\u097F]/g,
          "Bengali": /[\u0980-\u09FF]/g,
          "Gurmukhi": /[\u0A00-\u0A7F]/g,
          "Gujarati": /[\u0A80-\u0AFF]/g,
          "Oriya": /[\u0B00-\u0B7F]/g,
          "Tamil": /[\u0B80-\u0BFF]/g,
          "Telugu": /[\u0C00-\u0C7F]/g,
          "Kannada": /[\u0C80-\u0CFF]/g,
          "Malayalam": /[\u0D00-\u0D7F]/g,
          "Sinhala": /[\u0D80-\u0DFF]/g,
          "Thai": /[\u0E00-\u0E7F]/g,
          "Lao": /[\u0E80-\u0EFF]/g,
          "Tibetan": /[\u0F00-\u0FFF]/g,
          "Burmese": /[\u1000-\u109F]/g,
          "Georgian": /[\u10A0-\u10FF]/g,
          "Hangul Jamo": /[\u1100-\u11FF]/g,
          "Ethiopic": /[\u1200-\u137F]/g,
          "Ethiopic Supplement": /[\u1380-\u139F]/g,
          "Cherokee": /[\u13A0-\u13FF]/g,
          "Unified Canadian Aboriginal Syllabics": /[\u1400-\u167F]/g,
          "Ogham": /[\u1680-\u169F]/g,
          "Runic": /[\u16A0-\u16FF]/g,
          "Pahawh Hmong": /[\u16B0-\u16B8]/g,
          "Tagalog": /[\u1700-\u171F]/g,
          "Hanunoo": /[\u1720-\u173F]/g,
          "Buhid": /[\u1740-\u175F]/g,
          "Tagbanwa": /[\u1760-\u177F]/g,
          "Khmer": /[\u1780-\u17FF]/g,
          "Mongolian": /[\u1800-\u18AF]/g,
          "Limbu": /[\u1900-\u194F]/g,
          "Tai Le": /[\u1950-\u197F]/g,
          "New Tai Lue": /[\u1980-\u19DF]/g,
          "Khmer Symbols": /[\u19E0-\u19FF]/g,
          "Buginese": /[\u1A00-\u1A1F]/g,
          "Balinese": /[\u1B00-\u1B7F]/g,
          "Phonetic Extensions": /[\u1D00-\u1D7F]/g,
          "Phonetic Extensions Supplement": /[\u1D80-\u1DBF]/g,
          "Combining Diacritical Marks Supplement": /[\u1DC0-\u1DFF]/g,
          "Latin Extended Additional": /[\u1E00-\u1EFF]/g,
          "Greek Extended": /[\u1F00-\u1FFF]/g,
          "General Punctuation": /[\u2000-\u206F]/g,
          "Superscripts and Subscripts": /[\u2070-\u209F]/g,
          "Currency Symbols": /[\u20A0-\u20CF]/g,
          "Combining Diacritical Marks for Symbols": /[\u20D0-\u20FF]/g,
          "Letterlike Symbols": /[\u2100-\u214F]/g,
          "Number Forms": /[\u2150-\u218F]/g,
          "Arrows": /[\u2190-\u21FF]/g,
          "Mathematical Operators": /[\u2200-\u22FF]/g,
          "Miscellaneous Technical": /[\u2300-\u23FF]/g,
          "Control Pictures": /[\u2400-\u243F]/g,
          "Optical Character Recognition": /[\u2440-\u245F]/g,
          "Enclosed Alphanumerics": /[\u2460-\u24FF]/g,
          "Box Drawing": /[\u2500-\u257F]/g,
          "Block Elements": /[\u2580-\u259F]/g,
          "Geometric Shapes": /[\u25A0-\u25FF]/g,
          "Miscellaneous Symbols": /[\u2600-\u26FF]/g,
          "Dingbats": /[\u2700-\u27BF]/g,
          "Miscellaneous Mathematical Symbols-A": /[\u27C0-\u27EF]/g,
          "Supplemental Arrows-A": /[\u27F0-\u27FF]/g,
          "Braille Patterns": /[\u2800-\u28FF]/g,
          "Supplemental Arrows-B": /[\u2900-\u297F]/g,
          "Miscellaneous Mathematical Symbols-B": /[\u2980-\u29FF]/g,
          "Supplemental Mathematical Operators": /[\u2A00-\u2AFF]/g,
          "Miscellaneous Symbols and Arrows": /[\u2B00-\u2BFF]/g,
          "Glagolitic": /[\u2C00-\u2C5F]/g,
          "Latin Extended-C": /[\u2C60-\u2C7F]/g,
          "Coptic": /[\u2C80-\u2CFF]/g,
          "Georgian Supplement": /[\u2D00-\u2D2F]/g,
          "Tifinagh": /[\u2D30-\u2D7F]/g,
          "Ethiopic Extended": /[\u2D80-\u2DDF]/g,
          "Supplemental Punctuation": /[\u2E00-\u2E7F]/g,
          "CJK Radicals Supplement": /[\u2E80-\u2EFF]/g,
          "KangXi Radicals": /[\u2F00-\u2FDF]/g,
          "Ideographic Description Characters": /[\u2FF0-\u2FFF]/g,
          "CJK Symbols and Punctuation": /[\u3000-\u303F]/g,
          "Hiragana": /[\u3040-\u309F]/g,
          "Katakana": /[\u30A0-\u30FF]/g,
          "Bopomofo": /[\u3100-\u312F]/g,
          "Hangul Compatibility Jamo": /[\u3130-\u318F]/g,
          "Kanbun": /[\u3190-\u319F]/g,
          "Bopomofo Extended": /[\u31A0-\u31BF]/g,
          "CJK Strokes": /[\u31C0-\u31EF]/g,
          "Katakana Phonetic Extensions": /[\u31F0-\u31FF]/g,
          "Enclosed CJK Letters and Months": /[\u3200-\u32FF]/g,
          "CJK Compatibility": /[\u3300-\u33FF]/g,
          "CJK Unified Ideographs Extension A": /[\u3400-\u4DBF]/g,
          "Yijing Hexagram Symbols": /[\u4DC0-\u4DFF]/g,
          "CJK Unified Ideographs": /[\u4E00-\u9FFF]/g,
          "Yi Syllables": /[\uA000-\uA48F]/g,
          "Yi Radicals": /[\uA490-\uA4CF]/g,
          "Modifier Tone Letters": /[\uA700-\uA71F]/g,
          "Latin Extended-D": /[\uA720-\uA7FF]/g,
          "Syloti Nagri": /[\uA800-\uA82F]/g,
          "Phags-pa": /[\uA840-\uA87F]/g,
          "Hangul Syllables": /[\uAC00-\uD7AF]/g,
          "High Surrogates": /[\uD800-\uDB7F]/g,
          "High Private Use Surrogates": /[\uDB80-\uDBFF]/g,
          "Low Surrogates": /[\uDC00-\uDFFF]/g,
          "Private Use Area": /[\uE000-\uF8FF]/g,
          "CJK Compatibility Ideographs": /[\uF900-\uFAFF]/g,
          "Alphabetic Presentation Forms": /[\uFB00-\uFB4F]/g,
          "Arabic Presentation Forms-A": /[\uFB50-\uFDFF]/g,
          "Variation Selectors": /[\uFE00-\uFE0F]/g,
          "Vertical Forms": /[\uFE10-\uFE1F]/g,
          "Combining Half Marks": /[\uFE20-\uFE2F]/g,
          "CJK Compatibility Forms": /[\uFE30-\uFE4F]/g,
          "Small Form Variants": /[\uFE50-\uFE6F]/g,
          "Arabic Presentation Forms-B": /[\uFE70-\uFEFF]/g,
          "Halfwidth and Fullwidth Forms": /[\uFF00-\uFFEF]/g,
          "Specials": /[\uFFF0-\uFFFF]/g
        };
  
        function findRuns(text) {
  
          var relevant_runs = {};
  
          for (var key in unicodeBlockTests) {
  
            // Count the number of characters in each character block.
            var charCount = text.match(unicodeBlockTests[key]);
  
            // return run types that used for 40% or more of the string
            // always return basic latin if found more than 15%
            // and extended additional latin if over 10% (for Vietnamese)
            var pct = (charCount ? charCount.length : 0) / text.length;
  
            relevant_runs[key] = pct;
  
          }
  
          return relevant_runs;
        }
  
        function identify(text, callback) {
  
          var scripts = findRuns(text);
  
          // Identify the language.
          if (scripts["Hangul Syllables"] + scripts["Hangul Jamo"] + scripts["Hangul Compatibility Jamo"] >= 0.4) {
            callback.apply(undefined, ["ko"]);
            return;
          }
  
          if (scripts["Greek and Coptic"] >= 0.4) {
            callback.apply(undefined, ["el"]);
            return;
          }
  
          if (scripts["Hiragana"] + scripts["Katakana"] + scripts["Katakana Phonetic Extensions"] >= 0.2) {
            callback.apply(undefined, ["ja"]);
            return;
          }
  
          if (scripts["CJK Unified Ideographs"] + scripts["Bopomofo"] + scripts["Bopomofo Extended"] + scripts["KangXi Radicals"] >= 0.4) {
            callback.apply(undefined, ["zh"]);
            return;
          }
  
          if (scripts["Cyrillic"] >= 0.4) {
            check(text, CYRILLIC, callback);
            return;
          }
  
          if (scripts["Arabic"] + scripts["Arabic Presentation Forms-A"] + scripts["Arabic Presentation Forms-B"] >= 0.4) {
            check(text, ARABIC, callback);
            return;
          }
  
          if (scripts["Devanagari"] >= 0.4) {
            check(text, DEVANAGARI, callback);
            return;
          }
  
          // Try languages with unique scripts
          for (var i = 0, l = SINGLETONS.length; i < l; i++) {
            if (scripts[SINGLETONS[i][0]] >= 0.4) {
              callback.apply(undefined, [SINGLETONS[i][1]]);
              return;
            }
          }
  
          // Extended Latin
          if (scripts["Latin-1 Supplement"] + scripts["Latin Extended-A"] + scripts["IPA Extensions"] >= 0.4) {
            check(text, EXTENDED_LATIN, function(latin_lang) {
              if (latin_lang == "pt") {
                check(text, PT, callback);
              } else {
                callback.apply(undefined, [latin_lang]);
              }
            });
            return;
          }
  
          if (scripts["Basic Latin"] >= 0.15) {
            check(text, ALL_LATIN, callback);
            return;
          }
  
          callback.apply(undefined, [UNKNOWN]);
        }
  
        function check(sample, langs, callback) {
  
          if (sample.length < MIN_LENGTH) {
            callback.apply(undefined, [UNKNOWN]);
            return;
          }
  
          var scores = {};
          var model = createOrderedModel(sample);
          for (var i = 0, l = langs.length; i < l; i++) {
  
            var lkey = langs[i].toLowerCase();
  
            var known_model = createKnownModel(lkey) || null;
  
            if (!known_model) {
              continue;
            }
  
            scores[lkey] = distance(model, known_model);
  
          }
  
          var scoresArr = [];
          for (var index in scores) {
            scoresArr.push([index, scores[index]]);
          }
  
          if (scoresArr.length == 0) {
            callback.apply(undefined, [UNKNOWN]);
            return;
          }
  
          // we want the lowest score, less distance = greater chance of match
          var sortedScores = scoresArr.sort(function(objA, objB) {
            return objA[1] - objB[1]; // sort low-to-high
          });
  
          // return the best match we've now calculated
          callback.apply(undefined, [sortedScores[0][0]]);
        }
  
        function createOrderedModel(content) {
          // Create a list of trigrams in content sorted by frequency.
          var trigrams = {},
              sortedTrigrams = [];
          var content = content.toLowerCase();
  
          var contentArr = content.split("");
          for (var i = 0, l = contentArr.length - 2; i < l; i++) {
            var trigramKey = contentArr[i] + contentArr[i + 1] + contentArr[i + 2] + "";
            if (!trigrams[trigramKey]) {
              trigrams[trigramKey] = 1;
            } else {
              trigrams[trigramKey] += 1;
            }
          }
  
          // convert object to array
          for (var i in trigrams) {
            sortedTrigrams[sortedTrigrams.length] = [i, trigrams[i]];
          }
  
          // sort array results
          return sortedTrigrams.sort(function(objA, objB) {
            return objB[1] - objA[1]; // sort high-to-low
          });
        }
  
        var knownModelCache = {};
  
        function createKnownModel(key) {
          // Check if known model has been pre-computed in cache
          if (knownModelCache[key]) {
            return knownModelCache[key];
          }
  
          var data = models[key];
          if (!data) {
            return {};
          }
  
          // Extract known trigram model data
          var dataArr = data.match(/([\s\S]{1,3})/g);
          // Contruct known trigram object based on provided raw data
          var known_model = {};
          for (var i = 0, l = dataArr.length; i < l; i++) {
            known_model[dataArr[i]] = i;
          }
  
          // Store in known model pre-computed cache
          knownModelCache[key] = known_model;
  
          return known_model;
        }
  
        function distance(model, known_model) {
          // Calculate the distance to the known model.
          var dist = 0;
  
          for (var i = 0, l = model.length; i < l; i++) {
  
            if (known_model[model[i][0]]) {
  
              dist += Math.abs(model[i][1] - known_model[model[i][0]]);
  
            } else {
  
              dist += MAX_GRAMS;
  
            }
  
          }
  
          return dist;
        }
  
        return {
          detect: function(text, callback) {
            // Return the ISO 639-2 language identifier, i.e. 'en'.
  
            if (!text) {
              callback.apply(undefined, [UNKNOWN]);
              return;
            }
  
            text = text.substr(0, MAX_LENGTH).replace(/[\u0021-\u0040]/g, '');
  
            identify(text, callback);
  
          },
          info: function(text, callback) {
            // Return language info tuple (id, code, name), i.e. ('en', 26110, 'English').
  
            this.detect(text, function(language) {
  
              if (language === UNKNOWN) {
                callback.apply(undefined, [[ UNKNOWN, UNKNOWN, UNKNOWN ]]);
                return;
              }
  
              callback.apply(undefined, [
  
                [ language, IANA_MAP[language], NAME_MAP[language] ]
  
              ]);;
  
            });
  
          },
          code: function(text, callback) {
            // Return the language IANA code, i.e. 26110.
  
            this.detect(text, function(language) {
  
              if (language === UNKNOWN) {
                callback.apply(undefined, [ -1 ]);;
                return;
              }
  
              callback.apply(undefined, [
  
                IANA_MAP[language]
  
              ]);
  
            });
  
          },
          name: function(text, callback) {
            // Return the full language name, i.e. 'English'.
  
            this.detect(text, function(language) {
  
              if (language === UNKNOWN) {
                callback.apply(undefined, [ UNKNOWN ]);;
                return;
              }
  
              callback.apply(undefined, [
  
                NAME_MAP[language]
  
              ]);
  
            });
  
          }
        };
  
    };
  
    global.guessLanguage = (global.module || {}).exports = new guessLanguage();
  
  })(this);
  



