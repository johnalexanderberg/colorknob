const container = document.querySelector('.container');
const body = document.querySelector('body');
const slider = document.querySelector('#color_slider');
const label = document.querySelector('#color_value');

const notes = [];
const noteLabels = [];

const numberOfNotes = 13;


createNotes();
alignLabels();

function createNote(i) {

    const note = document.createElement('div')
    note.className = 'note'
    note.style.backgroundColor = colors[i % 12]

    const noteLabel = document.createElement('h3')
    noteLabel.className = 'note--label'
    noteLabel.textContent = noteName[i % 12]

    note.appendChild(noteLabel)
    noteLabels.push(noteLabel)

    return note
}


function createNotes() {
    for (let i = 0; i < numberOfNotes; i++) {

        const note = createNote(i)
        container.appendChild(note)
        notes.push(note)
    }
}

//on update

function updateNote() {
console.log(slider.value)
    let distributionString = "";

    for (let i = 0; i < numberOfNotes; i++) {

        let noteWeight;

        //use counter to map i to note in octave
        const counter = i % 12

        //ignore notes outside of scale
        if (scale[counter].weight === 0) {
            notes[i].style.display = 'none'
            continue
        }

        //if counter is 0, the current note is root
        if (counter === 0) {
            noteWeight = 1;

        } else {
            noteWeight = getNoteWeight(counter, slider);
            noteLabels[i].textContent = noteName[i];

            if (noteWeight < 0.05) {
                noteLabels[i].style.display = 'none'
            } else {
                noteLabels[i].style.display = 'block'
            }


        }


        distributionString += noteWeight + "fr "


        alignLabel(i)

    }



    container.style.gridTemplateRows = distributionString;
}

//align individual label
function alignLabel(i) {

    noteLabels[i].style.top = (notes[i].getBoundingClientRect().top) + "px"
    noteLabels[i].style.left = notes[i].getBoundingClientRect().left - 30 + "px"
}

//align all labels
function alignLabels() {
    for (let i = 0; i < numberOfNotes; i++) {
        alignLabel(i)
    }
}


const onChangeHandler = () => {
    label.textContent = Math.round(slider.value / slider.max * 100) + '%';
    console.log(slider.value)
    updateNote()
}

const onResizeHandler = () => {
    alignLabels();
}

slider.addEventListener('input', onChangeHandler);

body.onresize = onResizeHandler;



