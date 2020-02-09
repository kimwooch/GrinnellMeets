import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
// import { clubs } from './Sections/Datas';
//export const ClubInfo = (props) => {
function ProductInfo(props) {

    const [Product, setProduct] = useState({})
    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    return (
        <div>
            <Descriptions title="Club Info">
                <Descriptions.Item label="Club Name"> {Product.title}</Descriptions.Item>
                <Descriptions.Item label="Club Email">{Product.email}</Descriptions.Item>
                <Descriptions.Item label="Primary Contact"> {Product.contact}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button>
            </div> */}
        </div>
    )
}

export default ProductInfo