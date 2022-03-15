import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

export const About = ()=>{
    const a=useContext(noteContext)
    return(
        <div>This is About {a.name} and he will be placed in {a.company}</div>
    )
}

export default About