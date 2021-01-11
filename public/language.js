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

//Connect to database
let database = firebase.database();

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


//HOME ICON
const imgLogo = document.createElement('img'); 
imgLogo.src = '32px.svg'; 
imgLogo.style.height = "calc(20px + (30 - 20) * ((100vw - 300px) / (1800 - 300)))";
imgLogo.onclick = function(){home()};
topBox.appendChild(imgLogo);


const pageTitle = document.createElement('pageTitle');
pageTitle.innerText = " Language";
pageTitle.onclick = function(){home()};
topBox.appendChild(pageTitle);

function home(){
    window.location='index.html';
}




const descriptionLanguage = document.createElement('descriptionLanguage');
descriptionLanguage.innerText = "Choose Language:";
descriptionLanguage.className = "description"
midBox.appendChild(descriptionLanguage);

function showLanguages(){
    let languageBoxObject = document.getElementById("languageBoxID");
    if (languageBoxObject.style.display === "none") {
      languageBoxObject.style.display = "block";
    } else {
      languageBoxObject.style.display = "none";
    }
}
  
  function pickLanguage(language){
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



const selectLanguage = document.createElement('selectLanguage');
selectLanguage.id = "selectLanguageID";
selectLanguage.innerHTML = "Selected Language";
selectLanguage.onclick = function(){ showLanguages() };
midBox.appendChild(selectLanguage);


// -----------------------------------------------------------------              THE BOX FOR ALL THE LANGUAGES YOU CAN PICK FROM:
const languageBox = document.createElement('languageBox');
languageBox.id = "languageBoxID";
midBox.appendChild(languageBox);
// let languageBoxObject = document.getElementById("languageBoxID");
// languageBoxObject.style.display = "none";





checkLanguage()
function checkLanguage(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let uid = user.uid;


            database.ref('Settings').child("allQuestions").child("language").child(uid).child("language").once('value').then(function(snapshot) {

                if (!snapshot.exists()) {
                    database.ref('Settings').child("allQuestions").child("language").child(uid).set({
                        language: "English",
                    });
                } else {
                    // console.log(snapshot.val())
                   
                    selectLanguageID.innerHTML = "Selected Language: " + snapshot.val();
                }
            });
        }
    });

}


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

