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
    note.style.backgroundColor = colors[i%12]

    const noteLabel = document.createElement('h3')
    noteLabel.className = 'note--label'
    noteLabel.textContent = noteName[i%12]

    note.appendChild(noteLabel)
    noteLabels.push(noteLabel)

    return note
}


function createNotes() {
    for (let i = 0; i < numberOfNotes; i++) {

        const note = createNote(numberOfNotes - i - 1)
        container.appendChild(note)
        notes.push(note)
    }
}

//on update

function updateNote(){

    let distribution = "";
    for (let i = 0; i < numberOfNotes; i++) {


        const counter = i%12

        if (major[counter].weight === 0){
            notes[i].style.display = 'none'
            continue
        }

        const noteWeight = getNoteWeight(counter, slider);

        if (noteWeight < 0.05){
            noteLabels[i].style.display = 'none'
        }
        else {
            noteLabels[i].style.display = 'block'
        }

        distribution += noteWeight + "fr "


        alignLabel(i)

    }


    console.log(distribution)
    container.style.gridTemplateRows = distribution;
}

//align individual label
function alignLabel(i){

    noteLabels[i].style.top = (notes[i].getBoundingClientRect().top) + "px"
    noteLabels[i].style.left = notes[i].getBoundingClientRect().left -30 + "px"
}

//align all labels
function alignLabels(){
    for (let i = 0; i < numberOfNotes; i++) {
        alignLabel(i)
    }
}


const onChangeHandler = () => {
    label.textContent = Math.round(slider.value / slider.max * 100) +'%';
    updateNote()
}

const onResizeHandler = () => {
    alignLabels();
}

slider.addEventListener('input', onChangeHandler);

console.log(body)
body.onresize = onResizeHandler;


console.log(slider)

