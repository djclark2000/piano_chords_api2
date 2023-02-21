let musicData = {}; 

function fetchData(note) {
    if (!note){
        return null; 
    }

    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-RapidAPI-Key': '5e49978076msh8d2264a67bb986ep1b8ecfjsnf016133b7af1',
            'X-RapidAPI-Host': 'piano-chords.p.rapidapi.com'
        }
    };
    
    fetch(`https://piano-chords.p.rapidapi.com/chords/${note}`, options)
        .then(response => response.json())
        .then((response) => {
            musicData = response
            console.log(musicData); 
            updateDom(musicData)
        })
        .catch(err => console.error(err));
}


//event listener to button: 
const getChord = document.querySelector("#search-btn"); 
getChord.addEventListener("click", function (event) {
    event.preventDefault();
    let searchChord = document.querySelector("#chord-search").value;
    fetchData(searchChord.toLowerCase());
    console.log(searchChord);
    
});


/*
//variables for chord object properties: 
const chordName = document.getElementById("name"); 
const notes = document.getElementById("notes");
const intervals = document.getElementById("intervals");
*/


//Update DOM function:
function updateDom(data) {
    console.log(data); 
    console.log(Object.keys(data));
    //this is the generic code for calling the chord name
    //declaring a const variable: cannot be redeclared or re-assigned
    //now returnedNote is assigned to the value that Object.keys(data)[0] is returning
    const returnedNote = Object.keys(data)[0]; 

    console.log(returnedNote);
   
    //data[returnedNote] is the same as data['A'] -assuming A is being passed in
    //it returns the value of the key ie:'A' -objects of the data object, which are "A" values
    console.log(data[returnedNote]);
    console.log(data[returnedNote]['5']);

    //This line is showing the array of notes, held by the object at the key named "5"
    console.log(data[returnedNote]['5'].notes);
    console.log(Object.keys(data[returnedNote]));
    
    const chordValue = Object.keys(data[returnedNote]); 
    
    for (let i = 0; i < chordValue.length; i++) {
        console.log(chordValue[i]);
        
        //Notes array iteration:
        const noteValues = data[returnedNote][chordValue[i]].notes; 
        let notesString = ''; 
        for (let j = 0; j < noteValues.length; j++) {
            
            if(j == noteValues.length - 1){
                notesString += `${noteValues[j]}`;
            } else {
                notesString += `${noteValues[j]}, `; 
            }
            
            // console.log(notesString);
        }

        //Numbers array iteration:
        const numberValues = data[returnedNote][chordValue[i]].intervals; 
        let numberString = ''; 
        for (let k = 0; k < numberValues.length; k++) {
            
            if(k == numberValues.length - 1){
                numberString += `${numberValues[k]}`;
            } else {
                numberString += `${numberValues[k]}, `; 
            }
            
            // console.log(numberString);
        }

        //Container div:
        const containerDiv = document.createElement("div"); 
        containerDiv.textContent = ""; 
        //Chord name div: 
        const newDiv1 = document.createElement("div"); 
        newDiv1.textContent = `Name: ${returnedNote}${chordValue[i]}`;
        //Notes div: 
        const newDiv2 = document.createElement("div");  
        newDiv2.textContent = `Notes: ${notesString}`;
        //Numbers div: 
        const newDiv3 = document.createElement("div"); 
        newDiv3.textContent = `Intervals: ${numberString}`; 
        //Appending: 
        const grandParentDiv = document.querySelector(".container"); 
        grandParentDiv.appendChild(containerDiv); 
        containerDiv.append(newDiv1, newDiv2, newDiv3); 

    }
    console.log(data);
    
}


