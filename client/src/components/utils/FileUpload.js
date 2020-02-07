import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios'


function FileUpload(props) {

    const [Images, setImages] = useState([])
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the image we chose inside the node server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                } else {
                    alert('Failed to save the Image in Server')
                }
            })



    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={80000000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input{...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                <div onClick>
                    <img />
                </div>
            </div >

        </div >
    )
}

export default FileUpload
