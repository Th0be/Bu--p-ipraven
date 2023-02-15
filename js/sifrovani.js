//POSLOUCHÁNÍ STRÁNKY PRO JEDNOTLIVÉ EVENTY
document
  .querySelector("#typeOfCipher")
  .addEventListener("change", typeOfCipher);
document
  .querySelector("#typeOfEncryption")
  .addEventListener("change", typeOfEncryption);
document.querySelector("#encryption").addEventListener("click", encryption);
document.querySelector("#copyCipherInput").addEventListener("click", copyInput);
document
  .querySelector("#copyCipherOutput")
  .addEventListener("click", copyOutput);
document.addEventListener("copy", copy);

//GLOBÁLNÍ PROMĚNNÁ
var outputErrorText = "Musíš zadat text, jenž chceš zašifrovat";
//PROMĚNNÉ FUNKCE********************************************************************************************************************************************************
//ŠIFRACE ČI DEŠIFRACE
function typeOfEncryption() {
  let confirmation;
  let encryptionType = document.querySelector("#typeOfEncryption").value;
  let input = document.querySelector("#cipherInput").value;
  let output = document.querySelector("#cipherOutput").textContent;
  if (
    input == "" &&
    (output == "" ||
      output == outputErrorText ||
      output == "Zde nalezneš tvůj text zašifrovaný" ||
      output == "Zde nalezneš tvůj text dešifrovaný" ||
      output == "Zadanou šifru nelze takto dešifrovat")
  ) {
    confirmation = 1;
  } else {
    confirmation = confirm(
      "Veškerý vstup i výstup bude smazán! Opravdu to chceš udělat?"
    );
  }
  if (confirmation) {
    document.querySelector("#cipherInput").value = "";
    badOutputStyling();
    if (encryptionType == "encryption") {
      /*document.querySelector("#automatic").style.display="none";*/
      document.querySelector("#copyCipherInput").textContent =
        "Kopírovat nezašifrované";
      document.querySelector("#copyCipherOutput").textContent =
        "Kopírovat zašifrované";
      document.querySelector("#encryption").textContent = "Zašifrovat";
      document.querySelector("#cipherInput").placeholder =
        "Zde zadej text, jenž chceš zašifrovat";
      document.querySelector("#cipherOutput").textContent =
        "Zde nalezneš tvůj text zašifrovaný";
      OutputErrorText = "Musíš zadat text, jenž chceš zašifrovat";
      /*if(cipher=="automatic")
                document.querySelector("#typeOfCipher").value = "phoneCipher";*/
    } else {
      /*document.querySelector("#automatic").style.display="block";*/
      document.querySelector("#copyCipherInput").textContent =
        "Kopírovat zašifrované";
      document.querySelector("#copyCipherOutput").textContent =
        "Kopírovat dešifrované";
      document.querySelector("#encryption").textContent = "Dešifrovat";
      document.querySelector("#cipherInput").placeholder =
        "Zde zadej text, jenž chceš dešifrovat";
      document.querySelector("#cipherOutput").textContent =
        "Zde nalezneš tvůj text dešifrovaný";
      outputErrorText = "Musíš zadat text, jenž chceš dešifrovat";
    }
    typeOfCipher();
  } else {
    if (encryptionType == "encryption")
      document.querySelector("#typeOfEncryption").value = "decryption";
    else document.querySelector("#typeOfEncryption").value = "encryption";
  }
}
//ROZCESTNÍK PRO STYLOVÁNÍ A O ŠIFŘE
function typeOfCipher() {
  let cipher = document.querySelector("#typeOfCipher").value;
  let encryptionType = document.querySelector("#typeOfEncryption").value;
  if (encryptionType == "encryption") {
    if (cipher == "tobsCipher")
      typeOfCipherStyling(
        "25px 30px",
        "7px auto",
        "0px 5px 7px 5px",
        "left",
        "block",
        cipher
      );
    else if (cipher == "ceasarCipher")
      typeOfCipherStyling(
        "20px 30px",
        "10px auto",
        "10px auto",
        "none",
        "block",
        cipher
      );
    else if (cipher == "morseCode")
      typeOfCipherStyling(
        "10px 30px",
        "7px auto",
        "0px 5px 7px 5px",
        "left",
        "block",
        cipher
      );
    else
      typeOfCipherStyling(
        "15px 30px",
        "20px auto",
        "20px auto",
        "none",
        "block",
        "basic"
      );
  } else {
    if (cipher == "ceasarCipher")
      typeOfCipherStyling(
        "17px 30px",
        "20px auto",
        "20px auto",
        "none",
        "none",
        cipher
      );
    else if (cipher == "morseCode")
      typeOfCipherStyling(
        "10px 30px",
        "15px auto",
        "0px 5px 15px 5px",
        "left",
        "none",
        cipher
      );
    else
      typeOfCipherStyling(
        "25px 30px",
        "30px auto",
        "30px auto",
        "none",
        "none",
        "basic"
      );
  }
  typeOfCipherAbout(cipher);
}
//STYLOVÁNÍ DLE TYPU ŠIFRY
function typeOfCipherStyling(
  padding,
  marginBasic,
  marginAdvanced,
  float,
  numberOfWords,
  cipher
) {
  for (let el of document.querySelectorAll(".cipherSecondPart"))
    el.style.padding = padding;
  for (let el of document.querySelectorAll(".numberOf"))
    el.style.margin = marginBasic;
  for (let el of document.querySelectorAll(".typeOfBox"))
    el.style.margin = marginBasic;
  document.querySelector("#encryption").style.margin = marginBasic;
  document.querySelector("#copyCipherInput").style.margin = marginAdvanced;
  document.querySelector("#copyCipherOutput").style.margin = marginAdvanced;
  document.querySelector("#ceasarCipherBox").style.margin = marginBasic;
  for (let el of document.querySelectorAll(".morseCodeCharacters"))
    el.style.margin = marginBasic;
  for (let el of document.querySelectorAll(".tobsCipherNumbers"))
    el.style.margin = marginBasic;
  document.querySelector("#copyCipherInput").style.float = float;
  document.querySelector("#copyCipherOutput").style.float = float;
  document.querySelector("#numberOfWordsBox").style.display = numberOfWords;
  document.querySelector("#morseCodeBox").style.display = "none";
  document.querySelector("#ceasarCipherBox").style.display = "none";
  document.querySelector("#tobsCipherBox").style.display = "none";
  if (cipher !== "basic")
    document.querySelector("#" + cipher + "Box").style.display = "block";
}
//O ŠIFŘE DLE TYPU ŠIFRY
function typeOfCipherAbout(cipher) {
  if (cipher == "morseCode") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Morseova abeceda</h1><p class='cipherDifficulty'>Středně těžké</p><p class='cipherEncryptedCharacters'>Šifrují se písmena, česká diaktritika, číslice, mezery a tečky</p><p>Princip je založen na tom, že znak má svůj unikátní kód složený z teček a čárek. Písmena se oddělují lomící čárou, mezery dvěmi, věty třemi a konec zprávy čtyřmi lomícími čarami.</p>";
  } else if (cipher == "ceasarCipher") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Ceasarova šifra</h1><p class='cipherDifficulty'>Středně těžké</p><p class='cipherEncryptedCharacters'>Šifrují se pouze písmena a česká diakritika</p><p>Princip je založen na tom, že všechna písmena zprávy jsou během šifrování zaměněna posunuta o daný počet písmen dle abecedy. Písmena lze posunout o -26 až 26 písmen</p>";
  } else if (cipher == "tobsCipher") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Tobova šifra</h1><p class='cipherDifficulty'>Těžké</p><p class='cipherEncryptedCharacters'>Šifrují se poue písmena a česká diakritika</p><p>Princip je založen na tom, že každé písmeno má za sebou vygenerované jednociferné číslo jenž značí, kolik znaků se nachází mezi tím číslem a dalším znakem textu. Malé písmena se převadí při šifrování na velké.</p>";
  } else if (cipher == "phoneCipher") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Mobilová šifra</h1><p class='cipherDifficulty'>Středně těžké</p><p class='cipherEncryptedCharacters'>Šifrují se pouze písmena a česká diakritika</p><p>Princip je založen na tom, že každé písmeno má podle vzoru mobilní klávesnice své unikátní číslo. Čísla jsou složeny z jedné až čtyř stejných cifer a oddělují se mezerou.</p>";
  } else if (cipher == "reverseCipher") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Návratová šifra</h1><p class='cipherDifficulty'>Jednoduché</p><p class='cipherEncryptedCharacters'>Šifrují se veškeré znaky</p><p>Princip je založen na tom, že se obrátí celá zpráva, veškeré písmena, čísla a jiné speciální znaky. Při dešifrování se čte šifra tedy pozpátku.</p>";
  } else if (cipher == "reverseAlphabetCipher") {
    document.querySelector("#cipherAboutInformation").innerHTML =
      "<h1>Obrácená abeceda</h1><p class='cipherDifficulty'>Jednoduché</p><p class='cipherEncryptedCharacters'>Šifrují se pouze písmena a česká diakritika</p><p>Princip je založen na tom, že se písmeno první od začátku přemění na první písmeno od konce. Písmeno A se tudíž mění v Z a naopak.</p>";
  }
  /*else if(cipher=="automatic"){
        document.querySelector("#cipherAboutInformation").innerHTML="<h1>Automatická dešifrace</h1><p>Princip dešifrování je založen na slovníku složeného z českých slov. Spolehlivost automatického překladu je poměrně malá, a nedokáže prozatím moc efektivně šifru dešifrovat.</p>";
    }*/
}
//ZAŠIFROVÁNÍ ČI DEŠIFROVÁNÍ
function encryption() {
  let input = document.querySelector("#cipherInput").value.trim();
  let length = numberOfCharacters(input);
  let cipher = document.querySelector("#typeOfCipher").value;
  let encryptionType = document.querySelector("#typeOfEncryption").value;
  if (input == "") {
    badOutputStyling();
    document.querySelector("#cipherOutput").textContent = outputErrorText;
  } else {
    document.querySelector("#cipherOutput").style.paddingTop = "0";
    if (document.body.scrollWidth <= 1200)
      document.querySelector("#cipherOutput").style.fontSize = "18px";
    else document.querySelector("#cipherOutput").style.fontSize = "21px";
    document.querySelector("#cipherOutput").style.userSelect = "text";
    document.querySelector("#cipherOutput").textContent = "";
    if (encryptionType == "encryption") {
      numberOfWords(input);
      window[cipher](input, length);
    } else {
      if (
        cipher == "tobsCipher" ||
        cipher == "morseCode" ||
        cipher == "phoneCipher"
      )
        window[cipher + "Decryption"](input, length);
      else window[cipher](input, length);
    }
  }
}
//OUTPUT PRO ERROR
function badOutputStyling() {
  if (document.body.scrollWidth <= 1200)
    document.querySelector("#cipherOutput").style.paddingTop = "90px";
  else document.querySelector("#cipherOutput").style.paddingTop = "100px";
  document.querySelector("#cipherOutput").style.fontSize = "16px";
  document.querySelector("#cipherOutput").style.userSelect = "none";
}
//OUTPUT PRO TEXT
//NEPROMĚNNÉ NEFUNKCE****************************************************************************************************************************************************
//POČET SLOV
function numberOfWords(input) {
  if (input == "") document.querySelector("#numberOfWords").textContent = 0;
  else {
    let words = input.trim().split(/\s+/).length; //TRIM ODSTRANÍ HRANIČNÍ BÍLÉ ZNAKY; /\s+/ ZNAMENÁ RŮZNĚ ČETNÉ BÍLÉ ZNAKY7
    document.querySelector("#numberOfWords").textContent = words;
  }
}
//POČET ZNAKŮ
function numberOfCharacters(input) {
  let characters = input.length;
  document.querySelector("#numberOfCharacters").textContent = characters;
  return characters;
}
//KOPÍROVÁNÍ VSTUPU A ZMĚNA DANÉHO TLAČÍTKA
function copyInput() {
  if (document.querySelector("#cipherInput").value == "")
    document.querySelector("#cipherOutput").textContent =
      "Nemůžeš zkopírovat neexistující text";
  else {
    document.querySelector("#cipherInput").select();
    document
      .querySelector("#cipherInput")
      .setSelectionRange(0, 99999); /*FOR MOBILE PHONES*/
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.querySelector("#copyCipherInput").classList.add("buttonClick");
  }
}
//KOPÍROVÁNÍ VÝSTUPU A ZMĚNA DANÉHO TLAČÍTKA
function copyOutput() {
  let input = document.querySelector("#cipherOutput").textContent;
  if (
    input == "Zde nalezneš tvůj text zašifrovaný" ||
    input == "Musíš zadat text, jenž chceš zašifrovat" ||
    input == "Nemůžeš zkopírovat neexistující text"
  ) {
    document.querySelector("#cipherOutput").textContent =
      "Nemůžeš zkopírovat neexistující text";
  } else {
    let range = document.createRange();
    range.selectNode(document.querySelector("#cipherOutput"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.querySelector("#copyCipherOutput").classList.add("buttonClick");
  }
}
//MAZÁNÍ FORMÁTOVÁNÍ U KOPÍROVÁNÍ - CIZÍ KÓD
function copy(e) {
  const text_only = document.getSelection().toString();
  const clipdata = e.clipboardData || window.clipboardData;
  clipdata.setData("text/plain", text_only);
  clipdata.setData("text/html", text_only);
  e.preventDefault();
}
//POUZE DANÁ ČÍSLA U ŠIFER
function numbersOnly(min, max, name) {
  let number = document.querySelector("#" + name).value;
  if (number >= min && number <= max)
    document.querySelector("#" + name).value = number;
  else document.querySelector("#" + name).value = "";
}
//ŠIFROVÁNÍ****************************************************************************************************************************************************************
//MORSEOVA ABECEDA
function morseCode(input, length) {
  let letter, nextLetter;
  var dot = document.querySelector("#morseCodeFirstSign").value;
  var comma = document.querySelector("#morseCodeSecondSign").value;
  var slash = document.querySelector("#morseCodeThirdSign").value;
  input = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (dot == "") dot = ".";
  if (comma == "") comma = "-";
  if (slash == "") slash = "/";
  var morseCode = new Array(
    "a",
    dot + comma,
    "b",
    comma + dot + dot + dot,
    "c",
    comma + dot + comma + dot,
    "d",
    comma + dot + dot,
    "e",
    dot,
    "f",
    dot + dot + comma + dot,
    "g",
    comma + comma + dot,
    "h",
    dot + dot + dot + dot,
    "i",
    dot + dot,
    "j",
    dot + comma + comma + comma,
    "k",
    comma + dot + comma,
    "l",
    dot + comma + dot + dot,
    "m",
    comma + comma,
    "n",
    comma + dot,
    "o",
    comma + comma + comma,
    "p",
    dot + comma + comma + dot,
    "q",
    comma + comma + dot + comma,
    "r",
    dot + comma + dot,
    "s",
    dot + dot + dot,
    "t",
    comma,
    "u",
    dot + dot + comma,
    "v",
    dot + dot + dot + comma,
    "w",
    dot + comma + comma,
    "x",
    comma + dot + dot + comma,
    "y",
    comma + dot + comma + comma,
    "z",
    comma + comma + dot + dot,
    "1",
    dot + comma + comma + comma + comma,
    "2",
    dot + dot + comma + comma + comma,
    "3",
    dot + dot + dot + comma + comma,
    "4",
    dot + dot + dot + dot + comma,
    "5",
    dot + dot + dot + dot + dot,
    "6",
    comma + dot + dot + dot + dot,
    "7",
    comma + comma + dot + dot + dot,
    "8",
    comma + comma + comma + dot + dot,
    "9",
    comma + comma + comma + comma + dot,
    "0",
    comma + comma + comma + comma + comma,
    " ",
    slash,
    ",",
    slash,
    ".",
    slash
  );
  for (let i = 0; i < length; i++) {
    letter = input.charAt(i);
    if (i < length - 1) {
      //ověření písmena "ch"
      nextLetter = input.charAt(i + 1);
      if (letter == "c" && nextLetter == "h") {
        letter = comma + comma + comma + comma + slash;
        continue;
      }
    }
    if (morseCode.indexOf(letter) != -1) {
      letter = morseCode[morseCode.lastIndexOf(letter) + 1]; //last index kvůli blbnutí tečky převedené na f
      if (morseCode.indexOf(letter) < morseCode.indexOf(" ")) letter += slash;
    } else letter = "";
    // letter = letter.replace(letter, "<span class='differentLetter'>" + letter + slash + "</span>");
    document.querySelector("#cipherOutput").innerHTML += letter;
  }
  document.querySelector("#cipherOutput").innerHTML += slash + slash;
}
//MOBILOVÁ ŠIFRA
function phoneCipher(input, length) {
  let letter;
  input = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let phoneCipher = new Array(
    "a",
    "2",
    "b",
    "22",
    "c",
    "222",
    "d",
    "3",
    "e",
    "33",
    "f",
    "333",
    "g",
    "4",
    "h",
    "44",
    "i",
    "444",
    "j",
    "5",
    "k",
    "55",
    "l",
    "555",
    "m",
    "6",
    "n",
    "66",
    "o",
    "666",
    "p",
    "7",
    "q",
    "77",
    "r",
    "777",
    "s",
    "7777",
    "t",
    "8",
    "u",
    "88",
    "v",
    "888",
    "w",
    "9",
    "x",
    "99",
    "y",
    "999",
    "z",
    "9999"
  );
  for (let i = 0; i < length; i++) {
    letter = input.charAt(i);
    if (phoneCipher.indexOf(letter) != -1) {
      letter = phoneCipher[phoneCipher.indexOf(letter) + 1];
      letter += " ";
    } else letter = "";
    // letter = letter.replace(letter, "<span class='differentLetter'>" + letter + slash + "</span>");
    document.querySelector("#cipherOutput").innerHTML += letter;
  }
}
//TOBOVA ŠIFRA
function tobsCipher(input, length) {
  let letter, number, filling;
  let min = document.querySelector("#tobsMin").value;
  let max = document.querySelector("#tobsMax").value;
  input = input
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (min == "") min = 0;
  if (max == "") max = 9;
  for (i = 0; i < length; i++) {
    letter = input.charCodeAt(i);
    nextLetter = input.charCodeAt(i + 1);
    if (letter >= 65 && letter <= 90) {
      letter = String.fromCharCode(letter);
      document.querySelector("#cipherOutput").innerHTML += letter;
      number = Math.floor(Math.random() * (max - min + 1) + min);
      if (i < length - 1 && nextLetter >= 65 && nextLetter <= 90) {
        document.querySelector("#cipherOutput").innerHTML += number;
        for (j = 0; j < number; j++) {
          filling = Math.floor(Math.random() * 2 + 1);
          if (filling == 1)
            letter = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
          else if (filling == 2)
            letter = String.fromCharCode(Math.floor(Math.random() * 10 + 48));
          document.querySelector("#cipherOutput").innerHTML += letter;
        }
      }
    } else {
      //letter = String.fromCharCode(letter);
      //letter = letter.replace(letter, "<span class='differentLetter'>" + letter + "</span>");
      //document.querySelector("#cipherOutput").innerHTML += letter;
    }
  }
}
//CEASAROVA ŠIFRA
function ceasarCipher(input, length) {
  let letter, letterNew;
  let index = Number(document.querySelector("#ceasarIndex").value);
  if (index == "") index = 0;
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (i = 0; i < length; i++) {
    letterNew = input.charCodeAt(i) + index;
    letter = input.charCodeAt(i);
    if ((letter >= 65 && letter <= 90) || (letter >= 97 && letter <= 122)) {
      //ABECEDA NEDOSTATEČNÁ
      if (letterNew > 122 || (letterNew > 90 && letter <= 90)) {
        letterNew -= 26;
      } else if ((letterNew < 97 && letter >= 97) || letterNew < 65) {
        letterNew += 26;
      }
      document.querySelector("#cipherOutput").innerHTML +=
        String.fromCharCode(letterNew);
    } else {
      letter = String.fromCharCode(letter);
      letter = letter.replace(
        letter,
        "<span class='differentLetter'>" + letter + "</span>"
      );
      document.querySelector("#cipherOutput").innerHTML += letter;
    }
  }
}
//NÁVRATOVÁ ŠIFRA
function reverseCipher(input, length) {
  let letter;
  for (i = length - 1; i >= 0; i--) {
    letter = input.charAt(i);
    document.querySelector("#cipherOutput").textContent += letter;
  }
}
//OBRÁCENÁ ABECEDA
function reverseAlphabetCipher(input, length) {
  let letter;
  input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (i = 0; i < length; i++) {
    letter = input.charCodeAt(i);
    if (letter >= 65 && letter <= 90) {
      letter += 25 - (letter - 65) * 2;
      letter = String.fromCharCode(letter);
    } else if (letter >= 97 && letter <= 122) {
      letter += 25 - (letter - 97) * 2;
      letter = String.fromCharCode(letter);
    } else {
      letter = String.fromCharCode(letter);
      letter = letter.replace(
        letter,
        "<span class='differentLetter'>" + letter + "</span>"
      );
    }
    document.querySelector("#cipherOutput").innerHTML += letter;
  }
}
//DEŠIFROVÁNÍ************************************************************************************************************************************************************
function tobsCipherDecryption(input, length) {
  let character, letter;
  for (i = 0; i < length; i++) {
    letter = input.charAt(i);
    document.querySelector("#cipherOutput").innerHTML += letter;
    i++;
    character = Number(input.charAt(i));
    if (!(character >= 0 && character <= 9)) {
      badOutputStyling();
      document.querySelector("#cipherOutput").textContent =
        "Zadanou šifru nelze takto dešifrovat";
      break;
    }
    i += character;
  }
}
function morseCodeDecryption(input, length) {
  let character,
    nextCharacter,
    letter = "";
  var dot = document.querySelector("#morseCodeFirstSign").value;
  var comma = document.querySelector("#morseCodeSecondSign").value;
  var slash = document.querySelector("#morseCodeThirdSign").value;
  if (dot == "") dot = ".";
  if (comma == "") comma = "-";
  if (slash == "") slash = "/";
  var morseCode = new Array(
    "a",
    dot + comma,
    "b",
    comma + dot + dot + dot,
    "c",
    comma + dot + comma + dot,
    "d",
    comma + dot + dot,
    "e",
    dot,
    "f",
    dot + dot + comma + dot,
    "g",
    comma + comma + dot,
    "h",
    dot + dot + dot + dot,
    "i",
    dot + dot,
    "j",
    dot + comma + comma + comma,
    "k",
    comma + dot + comma,
    "l",
    dot + comma + dot + dot,
    "m",
    comma + comma,
    "n",
    comma + dot,
    "o",
    comma + comma + comma,
    "p",
    dot + comma + comma + dot,
    "q",
    comma + comma + dot + comma,
    "r",
    dot + comma + dot,
    "s",
    dot + dot + dot,
    "t",
    comma,
    "u",
    dot + dot + comma,
    "v",
    dot + dot + dot + comma,
    "w",
    dot + comma + comma,
    "x",
    comma + dot + dot + comma,
    "y",
    comma + dot + comma + comma,
    "z",
    comma + comma + dot + dot,
    "1",
    dot + comma + comma + comma + comma,
    "2",
    dot + dot + comma + comma + comma,
    "3",
    dot + dot + dot + comma + comma,
    "4",
    dot + dot + dot + dot + comma,
    "5",
    dot + dot + dot + dot + dot,
    "6",
    comma + dot + dot + dot + dot,
    "7",
    comma + comma + dot + dot + dot,
    "8",
    comma + comma + comma + dot + dot,
    "9",
    comma + comma + comma + comma + dot,
    "0",
    comma + comma + comma + comma + comma,
    " ",
    slash,
    ",",
    slash,
    ".",
    slash
  );
  var morseCodeBreak = new Array(
    "",
    slash,
    " ",
    slash + slash,
    " ",
    slash + slash + slash,
    " ",
    slash + slash + slash + slash
  );
  for (i = 0; i < length; i++) {
    character = input.charAt(i);
    if (character == dot || character == comma || character == slash) {
      letter += character;
      if (i < length - 1) nextCharacter = input.charAt(i + 1);
      else {
        nextCharacter = 0;
      }
      if (
        (character == dot || character == comma) &&
        (nextCharacter == slash || nextCharacter == 0)
      ) {
        if (morseCode.indexOf(letter) != -1)
          letter = morseCode[morseCode.indexOf(letter) - 1];
        else {
          letter = letter.replace(
            letter,
            "<span class='differentLetter'>" + letter + "</span>"
          );
        }
        document.querySelector("#cipherOutput").innerHTML += letter;
        letter = "";
      } else if (
        character == slash &&
        (nextCharacter == dot || nextCharacter == comma || nextCharacter == 0)
      ) {
        if (morseCodeBreak.indexOf(letter) != -1)
          letter = morseCodeBreak[morseCodeBreak.indexOf(letter) - 1];
        else {
          letter = letter.replace(
            letter,
            "<span class='differentLetter'>" + letter + "</span>"
          );
        }
        document.querySelector("#cipherOutput").innerHTML += letter;
        letter = "";
      }
    } else {
      badOutputStyling();
      document.querySelector("#cipherOutput").textContent =
        "Zadanou šifru nelze takto dešifrovat";
      break;
    }
  }
}
function phoneCipherDecryption(input, length) {
  console.log("XD");
  let character,
    letter = "";
  var phoneCipher = new Array(
    "a",
    "2",
    "b",
    "22",
    "c",
    "222",
    "d",
    "3",
    "e",
    "33",
    "f",
    "333",
    "g",
    "4",
    "h",
    "44",
    "i",
    "444",
    "j",
    "5",
    "k",
    "55",
    "l",
    "555",
    "m",
    "6",
    "n",
    "66",
    "o",
    "666",
    "p",
    "7",
    "q",
    "77",
    "r",
    "777",
    "s",
    "7777",
    "t",
    "8",
    "u",
    "88",
    "v",
    "888",
    "w",
    "9",
    "x",
    "99",
    "y",
    "999",
    "z",
    "9999"
  );
  for (i = 0; i < length; i++) {
    character = input.charAt(i);
    if (character >= "0" && character <= "9") {
      letter += character;
      if (i == length - 1) {
        if (phoneCipher.indexOf(letter) != -1)
          letter = phoneCipher[phoneCipher.indexOf(letter) - 1];
        else
          letter = letter.replace(
            letter,
            "<span class='differentLetter'>" + letter + "</span>"
          );
        document.querySelector("#cipherOutput").innerHTML += letter;
        letter = "";
      }
    } else if (character == " ") {
      if (phoneCipher.indexOf(letter) != -1)
        letter = phoneCipher[phoneCipher.indexOf(letter) - 1];
      else
        letter = letter.replace(
          letter,
          "<span class='differentLetter'>" + letter + "</span>"
        );
      document.querySelector("#cipherOutput").innerHTML += letter;
      letter = "";
      console.log("XDdd");
    } else {
      badOutputStyling();
      document.querySelector("#cipherOutput").textContent =
        "Zadanou šifru nelze takto dešifrovat";
      console.log("XDddd");
      break;
    }
  }
}
