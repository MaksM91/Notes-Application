
const chalk = require('chalk');
const { argv } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.1.0');

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: "string"
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: "string"
        }
    },
    handler() {
        notes.removeNote(argv.title)
    }
});

// creates read command
yargs.command({
    command: 'read',
    describe: ' Lets you read a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler() {
        notes.readNote(argv.title)
    }
});


// creates list command
yargs.command({
    command: 'list',
    describe: 'List all saved notes',
    handler() {
        notes.listNotes();
    }
});

yargs.parse();