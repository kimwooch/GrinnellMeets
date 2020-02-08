import React, {useEffect, useState} from 'react'
import ImageGallery from 'react-image-gallery';

export default function ClubImage(props) {

    const [Images, setImages] = useState(initialState)
    useEffect(() => {
        // more than one image
        if(props.detail.images && props.detail.images.length > 0) {
            let images = [];
 
            props.detail.images && props.detail.images.map(item => {
            images.push({
                    original: 'http://localhost:5000/${item}',
                    thumbnail: 'http://localhost:5000/${item}'
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