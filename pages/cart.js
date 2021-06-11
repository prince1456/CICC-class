import { useEffect, useState } from 'react'
import styled from 'styled-components'
import client from 'shopify/shopify'
import { Typography, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
const { Paragraph, Title, Text } = Typography

const getDataFromStorage = (key) => {
    const storage = window.localStorage;
    return JSON.parse(storage.getItem(key))
}
const setDataToStorage = (key, data) => {
    const storage = window.localStorage;
    storage.setItem(key, JSON.stringify(data))
}
const parseData = (data) => {
    return JSON.parse(JSON.stringify(data))
}
const Container = styled.div`
    margin-top: 50px;
`
const ListItem = styled.div`
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Cart = () => {
    const [checkout, setCheckout] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkout = getDataFromStorage('checkout')
            console.log(checkout)
            if (checkout) {
                client.checkout.fetch(checkout.id).then((response) => {
                    setCheckout(response)
                });
            }
        }
    }, [])
    const removeItemFromCart = async (check, item) => {
        console.log("im here", check)
        const checkoutId = check.id
        const lineItemIdsToRemove = [
            item.id
        ];

        // Remove an item from the checkout
        const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove)
        setDataToStorage("checkout", checkout)
        setCheckout(parseData(checkout))
    }
    console.log({ checkout })
    if (!checkout) {
        return (
            <div>
                <Title level="1">Your Cart</Title>
                <Paragraph>You dont have any item in your cart</Paragraph>
            </div>
        )
    }
    return (
        <Container>
            <Title level="1">Your Cart</Title>
            <List
                itemLayout="horizontal"
                dataSource={checkout && checkout.lineItems || []}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<img style={{ marginLeft: 50 }} width="100" src={item.variant.image.src} height="75" />}
                            description={
                                <ListItem>
                                    <p style={{ color: 'black' }} level="5">{item.title}</p>
                                    <p style={{ marginRight: 50, fontWeight: 600, color: 'black' }} level="5">
                                        ${item.variant.price * item.quantity}
                                        <DeleteOutlined onClick={() => removeItemFromCart(checkout, item)} style={{ marginLeft: 10, cursor: 'pointer' }} />
                                    </p>

                                </ListItem>
                            }
                        />
                    </List.Item>
                )}
            />
            <a href={checkout.webUrl}>Proceed to checkout </a>
        </Container>
    )
}
export default Cart