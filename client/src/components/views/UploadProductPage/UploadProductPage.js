import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const ClubType = [
    { key: 1, value: "Advocacy and Support" },
    { key: 2, value: "Activity" },
    { key: 3, value: "Athletics" },
    { key: 4, value: "Food" },
    { key: 5, value: "Multicultural" },
    { key: 6, value: "Performance, Art, and Publication" },
    { key: 7, value: "Political" },
    { key: 8, value: "Religious and Spiritual" },
    { key: 9, value: "Social Justice and Activism" },
    { key: 10, value: "Other" }
]

function UploadProductPage(props) {
    const [TitleValue, setTitleValue] = React.useState("")
    const [DescriptionValue, setDescriptionValue] = React.useState("")
    const [ClubValue, setClubValue] = useState(1)

    const [Images, setImages] = useState([])
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    const onClubSelectChange = (event) => {
        setClubValue(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !ClubValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            //TypeError: Cannot read property '_id' of undefined
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            clubs: ClubValue,
        }

        // push the product to / if successful if not alert the failure
        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }
    
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Student Organizations</Title>
            </div>
            <Form onSubmit={onSubmit}>
                {/*Dropzone*/}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />

                <select onChange={onClubSelectChange}>
                    {ClubType.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}

                </select>
                <br />
                <br />
                <Button
                     onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
