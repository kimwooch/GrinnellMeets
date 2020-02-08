import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'

const { Panel } = Collapse


const clubs = [
    {
        "_id": 1,
        "name": "Advocacy and Support"
    },
    {
        "_id": 2,
        "name": "Activity"
    },
    {
        "_id": 3,
        "name": "Athletics"
    },
    {
        "_id": 4,
        "name": "Food"
    },
    {
        "_id": 5,
        "name": "Multicultural"
    },
    {
        "_id": 6,
        "name": "Performance, Art, and Publication"
    },
    {
        "_id": 7,
        "name": "Political"
    },
    {
        "_id": 8,
        "name": "Religious and Spiritual"
    },
    {
        "_id": 9,
        "name": "Social Justice and Activism"
    },
    {
        "_id": 10,
        "name": "Other"
    }


]




function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

    }
    const renderCheckboxLists = () => clubs.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked
            />
            <span>{value.name}</span>
        </React.Fragment>
    ))
    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>

        </div>
    )
}

export default CheckBox
