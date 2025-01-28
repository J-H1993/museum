import {useState} from 'react'
import CreatePersonalExhibit from '../components/CreatePersonalExhibit'
import ListOfPersonalExhibits from '../components/PersonalExhibitPage'
import PersonalExhibitItems from '../components/PersonalExhibitItems'
import Header from '../components/Header'

const ManagePersonalExhibitsPage = () =>{
    const [selectedPersonalExhibit, setSelectedPersonalExhibit] = useState(null)

    const personalExhibitClear = () =>{
        setSelectedPersonalExhibit(null)
    }

    return (
        <div>
            <Header />
            <h1>Manage Your Personal Exhibitions</h1>
            <CreatePersonalExhibit onPersonalExhibitCreated={personalExhibitClear}/>
            <ListOfPersonalExhibits onExhibitSelected={setSelectedPersonalExhibit} />
            {selectedPersonalExhibit && <PersonalExhibitItems personalExhibitName={selectedPersonalExhibit} />}

        </div>
    )
}

export default ManagePersonalExhibitsPage