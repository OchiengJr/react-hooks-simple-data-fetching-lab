import React, { useState, useEffect } from 'react'

const App = () => {
    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }
                return res.json()
            })
            .then((data) => {
                setImages(data.message)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
                setError(error.message)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            {images && <img src={images} alt="A Random Dog" />}
        </div>
    )
}

export default App
