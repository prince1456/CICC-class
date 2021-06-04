import styled from 'styled-components'
import Layout from 'components/Layout'
import { Row, Col, Typography, Button } from 'antd';

const { Title } = Typography
const HeaderContainer = styled(Row)`
  margin: 30px 0px;
  background-color: #9DC3F8;
`
const LeftColumn = styled(Col)`
  padding-left: 30px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const RightColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  img {
    width: 80%;
  }
`
const SubTitleWrapper = styled(Row)`
  border-left: 3px solid black;
  margin-bottom: 20px;
  padding-left: 16px;
`
const ShopNowBtn = styled(Button)`
  align-self: flex-start;
  color: black !important;
  border-color: black!important;
  margin-bottom: 10px;
`
const PriceText = styled(Title)`
  margin-top: 0!important;
`

const Header = () => {
    return (
        <HeaderContainer>
            <LeftColumn sm={{ span: 24 }} md={{ span: 12 }}>
                <SubTitleWrapper>
                    <Title level={5}>
                        Sofas <br />
            2021
        </Title>
                </SubTitleWrapper>
                <Title>
                    Mod leather Sofa
        </Title>
                <PriceText level={4}>
                    From $200
        </PriceText>
                <ShopNowBtn ghost>
                    Shop Now
        </ShopNowBtn>
                <Title level={5}>
                    Designed By <br />
            Ali Alizada
        </Title>
            </LeftColumn>
            <RightColumn sm={{ span: 24 }} md={{ span: 12 }}>
                <img src="/HomeBanner.png" />
            </RightColumn>
        </HeaderContainer>
    )
}

export default Header;