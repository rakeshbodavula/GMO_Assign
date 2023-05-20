import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Component1 from './Component1'
import Component2 from './Component2'

const SecondPage = () => {
    const navigate = useNavigate()
    const [localDetails,setLocalDetails] = useState(null)
    
    // set up to redirect to first page if details are not entered.
    useEffect(() => {
        const details = localStorage.getItem('details')
        setLocalDetails(details)
        if (!details) {
            navigate('/')
            alert("You need to enter details to access second page")
        }
    }, [])

    return (
        <>
        {localDetails && <h2>SecondPage</h2> }
        <Component1></Component1>
        <Component2></Component2>
        </>
    )
}

export default SecondPage