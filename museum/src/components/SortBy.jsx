import {useState} from 'react'

const SortBy = ({setSort}) =>{
    const [sortChoice, setSortChoice] = useState('')
    
    const handleSortChoice = (event) => {
        const choice = event.target.value
        setSort(choice)
        setSortChoice(choice)
    }

   

}