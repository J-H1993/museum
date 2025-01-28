import {useState} from 'react'
import {createPersonalExhibit} from './PersonalExhibitonStorage'

const CreatePersonalExhibit = ({onPersonalExhibitCreated}) =>{
    const [exhibitName, setExhibitName] = useState('')

    const handleCreateExhibit = () =>{
        if(createPersonalExhibit(exhibitName)){
            onPersonalExhibitCreated()
        }
        setExhibitName("")
    }


return (
    <div>
        <h3>Create your own exhibit</h3>
        <input
        type='text'
        value={exhibitName}
        onChange={(event)=> setExhibitName(event.target.value)}
        placeholder='Enter your collections name'
        />
        <button onClick={handleCreateExhibit }>Create Exhibit</button>
    </div>
)
}

export default CreatePersonalExhibit