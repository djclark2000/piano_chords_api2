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
            //musicData is now storing the response:
            musicData = response
            console.log(musicData);
            //Calling the updateDom() function and plugging in musicData as the argument 
            updateDom(musicData)
        })
        .catch(err => console.error(err));
}



//Selects the button element and stores it to the getChord variable:
const getChord = document.querySelector("#search-btn"); 
//Adds an event listener to the button/getChord:
getChord.addEventListener("click", function (event) {
    event.preventDefault();
    //Selects the text input value and stores it to the searchChord variable:
    let searchChord = document.querySelector("#chord-search").value;
    //Calls the fetchData() function with searchChord as the argument:
    //searchChord will be the /${note} of the fetch in the fetchData() function
    fetchData(searchChord.toLowerCase());
    // console.log(searchChord); 
});



//Update DOM function:
function updateDom(data) {
    console.log(data); 
    //this is the generic code for calling the chord name
    //returns an array of the data's keys (Which in this case is a list of chord names['C', 'D', 'E', 'F', etc])
    console.log(Object.keys(data));
    
    //returns a string of the key that has been passed (ie: C); 
    const returnedNote = Object.keys(data)[0]; 
    console.log(returnedNote);
   
    //data[returnedNote] is the same as data['A'] -assuming A is being passed in
    //it returns the value of the key ie:'A' -objects of the data object, which are "A" values
    console.log(data[returnedNote]);
    
    //This log shows the array of notes, held by the object at the key named "5"
    console.log(data[returnedNote]['5'].notes);

    //The log below is showing the array of the 'second layer' of keys,
    // which allows us to iterate over the chord values (ie: dim, maj, min, etc)
    const chordValue = Object.keys(data[returnedNote]); 
    console.log(chordValue);
    
    //This for loop iterates through the length of chordValue
    for (let i = 0; i < chordValue.length; i++) {
        console.log(chordValue[i]);
        
        //Notes array iteration:
        //The variable below stores the calling of the individual chord notes
        //We're calling chordValue[i] because we're able to get the iteration of every chord's individual notes
        const noteValues = data[returnedNote][chordValue[i]].notes; 
        console.log(noteValues);
        //Creating a variable with an empty string to store the iteration of noteValues: 
        let notesString = ''; 
        for (let j = 0; j < noteValues.length; j++) {
            
            //this conditional removes the comma from the end of the notes list
            if(j == noteValues.length - 1){
                notesString += `${noteValues[j]}`;
            } else {
                notesString += `${noteValues[j]}, `; 
            }
            
            // console.log(notesString);
        }

        //Numbers array iteration:
        //The variable below stores the access of the individual chord numbers
        //We're calling chordValue[i] because we're able to get the iteration of every chord's individual numbers
        const numberValues = data[returnedNote][chordValue[i]].intervals; 
        //Creating a variable with an empty string to store the iteration of numberValues:
        let numberString = ''; 
        for (let k = 0; k < numberValues.length; k++) {
            
            //this conditional removes the comma from the end of the notes list
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
    // console.log(data);
    
}


