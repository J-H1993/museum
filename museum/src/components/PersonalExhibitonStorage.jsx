export const  createPersonalExhibit = (exhibitName) =>{
    if(!exhibitName){
        alert("Exhibit name must not be empty!")
        return false
    }

    const savedExhibits = JSON.parse(localStorage.getItem('exhibits')) || {}

    if(savedExhibits[exhibitName]){
        alert("An exhibit already exists with this name, please choose a different name for your exhibit.")
        return false
    }

    savedExhibits[exhibitName] = []
    localStorage.setItem('exhibits', JSON.stringify(savedExhibits))
    alert(`The ${exhibitName} exhibit has been sucessfully created!`)
    return true
}



export const buildStandardObject = (artifact, apiCollection) => {
    if(apiCollection === 'Metropolitan Museum') {
        return {
            id:artifact.objectID,
            collection:'Metropolitan Museum'
        }
    }else{
        return{
            id:artifact.id,
            collection:'The Art Institute of Chicago'
        }
    }
}

export const handleSaveToExhibit = (artifact, myExhibitName, collection) =>{
    const savedExhibits = JSON.parse(localStorage.getItem('exhibits'))

    if(!savedExhibits[myExhibitName]){
        alert('Exhibit does not exist!')
        return false
    }

    const objectToSave = buildStandardObject(artifact, collection)


    const duplicateItemWarning = savedExhibits[myExhibitName].some((item)=> item.id === objectToSave.id)
    if(duplicateItemWarning){
        alert("This item is already part of your exhibit!")
        return false
    }

    savedExhibits[myExhibitName].push(objectToSave)
    localStorage.setItem('exhibits', JSON.stringify(savedExhibits))
    alert(`Item has been added to ${myExhibitName}!`)
    return true
}

export const deletePersonalExhibit = (exhibitName) => {
    const savedExhibits = JSON.parse(localStorage.getItem('exhibits')) || {};

    if (savedExhibits[exhibitName]) {
        delete savedExhibits[exhibitName];
        localStorage.setItem('exhibits', JSON.stringify(savedExhibits));

        alert(`${exhibitName} has been deleted!`);
        return true;
    } else {
        alert("Exhibit not found.");
        return false;
    }
};


