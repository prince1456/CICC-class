import Head from 'next/head'
import styled from 'styled-components'
import Link from 'next/link'
import { Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
const Container = styled.div`
    max-width: ${(props) => props.theme.maxWidth}px;
    width: 100%;
    padding: 0 20px;
    margin: auto;
`
const TopNav = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
 `
const Logo = styled.span`
    font-size: 22px;
 `

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
`
const MenuItem = styled.li`
    list-style-type: none;
    margin: 0 10px;
    display: flex;
    align-items: center;
`

const Layout = ({ children }) => {
    return (
        <Container>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <TopNav>
                <Logo>MY Custom</Logo>
                <Menu>
                    {NAV_CONSTANT.map((item, index) => {
                        return (
                            <MenuItem key={index}>
                                <Link href={item.url}>{item.text}</Link>
                            </MenuItem>
                        )
                    })}
                    <MenuItem>
                        <Badge count={5} size="small">
                            <Link href='/cart'>
                                <ShoppingCartOutlined />
                            </Link>
                        </Badge>
                    </MenuItem>
                </Menu>
            </TopNav>
            {children}
        </Container>
    )
}
const NAV_CONSTANT = [
    { url: '/', text: 'Home' },
    { url: '/new-arrival', text: 'New Arrival' },
    { url: '/sofas', text: 'Sofas' },
    { url: '/aboutus', text: 'About us' },
]

export default Layout;