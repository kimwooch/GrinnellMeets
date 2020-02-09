import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

//export default function ClubImage(props) {
function ClubImage(props) {

<<<<<<< HEAD
    const [Images, setImages] = useState()
=======
    const [Images, setImages] = useState([])
>>>>>>> fbfe3e7c06b5aae5adbe4370ed437342c56ab991
    useEffect(() => {
        // more than one image
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
<<<<<<< HEAD
                images.push({
                    original: 'http://localhost:5000/${item}',
                    thumbnail: 'http://localhost:5000/${item}'
=======
            images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
>>>>>>> fbfe3e7c06b5aae5adbe4370ed437342c56ab991
                })
            })
            setImages(images)

        }
        // get props.detail.image from the below bracket
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ClubImage