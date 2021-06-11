import client from 'shopify/shopify'
import Image from 'next/image'
import styled from 'styled-components';
import { useState, useEffect } from 'react'
import { Row, Col, Typography, Button, InputNumber } from 'antd';
const { Title, Text, Paragraph } = Typography;

const Container = styled(Row)`
    margin: 50px 0px;
`;
const CustomButton = styled.div`
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid black;
    border-radius: 2px;
    cursor: pointer;
`
const parseData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
const getDataFromStorage = (key) => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem(key))
}
const setDataToStorage = (key, data) => {
    const storage = window.localStorage;
    storage.setItem(key, JSON.stringify(data))
}
const ProductPage = ({ product }) => {
    const [amount, setAmount] = useState(1)
    const [checkout, setCheckout] = useState(null)
    const [checkoutHasItem, setCheckoutHasItem] = useState(false)
    const variant = product.variants[0]
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tempCheckout = getDataFromStorage('checkout')
            if (tempCheckout) {
                tempCheckout.lineItems && tempCheckout.lineItems.forEach(lineItem => {
                    if (lineItem.title === product.title) {
                        setAmount(lineItem.quantity)
                        setCheckoutHasItem(true)
                    }
                })
                setCheckout(tempCheckout)
                console.log("this is useEffect log ==>", tempCheckout)
            }
        }
    }, [])

    const addItemToCart = async () => {
        try {
            let checkoutTemp = null
            if (getDataFromStorage('checkout')) {
                checkoutTemp = getDataFromStorage('checkout')
            } else {
                checkoutTemp = await client.checkout.create()
            }
            let checkout = parseData(checkoutTemp)
            const checkoutId = checkout.id
            const lineItemsToAdd = [
                {
                    variantId: variant.id,
                    quantity: amount,
                    customAttributes: []
                }
            ];

            checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
            console.log(parseData(checkout))
            setCheckout(parseData(checkout))
            setDataToStorage('checkout', checkout)
            setCheckoutHasItem(true)
        } catch (error) {
            console.log(error)
        }
    }
    const updateCheckout = async () => {
        try {
            const [lineItem] = checkout.lineItems.filter((lineItem) => lineItem.title === product.title)
            const checkoutId = checkout.id
            const lineItemToUpdate = [
                {
                    id: lineItem.id,
                    quantity: amount,
                }
            ];
            console.log(lineItemToUpdate, checkoutId)
            const tempCheckout = await client.checkout.updateLineItems(checkoutId, lineItemToUpdate)
            setDataToStorage('checkout', tempCheckout)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{
                backgroundColor: "#EFEFEB"
            }}>
                <Image width="400" height="400" layout="responsive" src={product.images[0].src} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: '0 50px' }}>
                <Title>{product.title}</Title>
                <Paragraph>{product.description}</Paragraph>
                <Paragraph> <Text strong>{variant.priceV2.currencyCode} {variant.priceV2.amount}</Text></Paragraph>
                <Row>
                    <CustomButton onClick={() => setAmount(amount + 1)}>+</CustomButton>
                    <InputNumber value={amount} onChange={() => setAmount(amount + 1)} />
                    <CustomButton onClick={() => setAmount(amount - 1)}>-</CustomButton>
                </Row>
                <Button onClick={!checkoutHasItem ? addItemToCart : updateCheckout} size="large" style={{
                    color: 'black',
                    borderColor: 'black',
                    marginTop: 50,
                }}
                    ghost block>Add To Cart</Button>
            </Col>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const { slug } = context.params
    const product = await client.product.fetchByHandle(slug)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),

        }
    }
}
export default ProductPage
