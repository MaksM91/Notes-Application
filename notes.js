const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    const noteDuplicate = notes.find(note => note.title === title);

    if (!noteDuplicate) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note created'));
    } else {
        console.log(chalk.red.inverse('Title of note already taken'));
    }
};

const removeNote = (title) => {
    let notes = loadNotes();
    const newNotes = notes.filter(note => title !== note.title)
    if (newNotes.length !== notes.length) {
        console.log(chalk.green.inverse(`You removed note with title ${title}`));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.inverse('There is no note with this title'));
    }
};

const listNotes = () => {
    let notes = loadNotes();
    console.log(chalk.bold.green("Your notes:"))
    notes.forEach(note => console.log(note.title));
};

const readNote = (title) => {
    const notes = loadNotes();
    let note = notes.find(note => title === note.title);
    if(note){
        console.log(chalk.green(note.title))
        console.log(note.body)
    } else{
        console.log(chalk.red.inverse("ERROR. There is no such note."))
    }
};

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);

};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};