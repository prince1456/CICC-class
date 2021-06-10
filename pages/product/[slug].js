import { useRouter } from 'next/router';
import client from 'shopify/shopify'
import Image from 'next/image'
import styled from 'styled-components';
import { useState } from 'react'
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
const ProductPage = ({ product, checkout }) => {
    const [amount, setAmount] = useState(1)
    const [isCheckoutHasItem, setIsCheckoutHasItem] = useState(false)
    const variant = product.variants[0]
    console.log({ checkout, product })
    const addItemToCart = () => {
        const checkoutId = checkout.id
        const lineItemsToAdd = [
            {
                variantId: variant.id,
                quantity: amount,
                customAttributes: []
            }
        ];

        // Add an item to the checkout
        client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            console.log(JSON.parse(JSON.stringify(checkout)))
            console.log(checkout.lineItems);
            setIsCheckoutHasItem(true)
        });
    }
    const updateCheckout = () => {
        const checkoutId = checkout.id
        const lineItemsToAdd = [
            {
                id: variant.id,
                quantity: amount,
            }
        ];

        // Add an item to the checkout
        client.checkout.updateLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
            console.log(JSON.parse(JSON.stringify(checkout)))
            console.log(checkout.lineItems);
        });
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
                <Button onClick={!isCheckoutHasItem ? addItemToCart : updateCheckout} size="large" style={{
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
    const checkout = await client.checkout.create()
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            checkout: JSON.parse(JSON.stringify(checkout))
        }
    }
}
export default ProductPage
