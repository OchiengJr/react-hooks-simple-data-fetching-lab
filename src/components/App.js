// create your App component here
import React, {useState, useEffect } from 'react'

const App = () => {

    const [images, setImages] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((res) => res.json())
            .then((data) => {
                setImages(data.message)
                setloading(false)
            })
            .catch((error) =>{
                console.error("Error fetching data: " , error)
                setloading(false)
            })
    }, [])

    if(loading){
        return <p>"Loading..."</p>
    }

    return (
        <div>
            <img src={images} alt="A Random Dog" />
        </div>
    )
}

export default App