const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => "Your notes..."

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title == title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== title )

    if (notes.length > updatedNotes.length) {
        console.log(chalk.green('Note removed!'))
        saveNotes(updatedNotes)
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blue('Your notes:'))

    notes.forEach((note) => {
        console.log(chalk.blue(note.title))
    })
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}