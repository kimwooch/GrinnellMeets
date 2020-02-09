import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {Row, Col} from 'antd';
import ClubImage from './Sections/ClubImage';
import ClubInfo from './Sections/ClubInfo';

function DetailedClubPage(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            //fetch production info from the database
            setProduct(response.data[0])
        })
    }, [])

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ClubImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ClubInfo
                        detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailedClubPage
