import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const ClubType = [
    { key: 1, value: "Academic/Career/Intellectual" },
    { key: 2, value: "Arts/Creativity" },
    { key: 3, value: "Athletics" },
    { key: 4, value: "Educational Activism" },
    { key: 5, value: "Environmental Activism" },
    { key: 6, value: "Food" },
    { key: 7, value: "Health" },
    { key: 8, value: "Identity" },
    { key: 9, value: "Outdoors/Agricultural/Environmental" },
    { key: 10, value: "Political Activism" },
    { key: 11, value: "Social Activism" },
    { key: 12, value: "Support/Discussion" },
    { key: 13, value: "Other" },
]

function UploadProductPage(props) {
    const [TitleValue, setTitleValue] = React.useState("")
    const [DescriptionValue, setDescriptionValue] = React.useState("")
    const [ContactValue, setContactValue] = React.useState("")
    const [EmailValue, setEmailValue] = React.useState("")
    const [ClubValue, setClubValue] = useState(1)

    const [Images, setImages] = useState([])
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    const onContactChange = (event) => {
        setContactValue(event.currentTarget.value)
    }
    const onEmailChange = (event) => {
        setEmailValue(event.currentTarget.value)
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
            return alert('fill in the name, description, and category of clubs and upload images for your club!')
        }

        const variables = {
            //TypeError: Cannot read property '_id' of undefined
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            clubs: ClubValue,
            contact: ContactValue,
            email: EmailValue,
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
                <Title level={2}> Upload Your Student Organization</Title>
            </div>
            <Form onSubmit={onSubmit}>
                {/*Dropzone*/}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Name</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />

                <label>Primary Contact</label>
                <Input
                    onChange={onContactChange}
                    value={ContactValue}
                />
                <br />
                <br />

                <label>Group Email Address</label>
                <Input
                    onChange={onEmailChange}
                    value={EmailValue}
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
