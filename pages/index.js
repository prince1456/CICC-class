import styled from 'styled-components'
import { Row, Col, Typography, } from 'antd';
import Header from 'components/Header'
const { Title, Paragraph } = Typography

const Section = styled(Row)`

`
const LeftBox = styled(Col)`
  background-color: #EFEFEB;
  padding: 20px;
`
const RightBox = styled(Col)`
  background-color: #EFEFEB;
  padding: 20px;
`
const Image = styled.img`
  width: 90%;
`
function Home() {
  return (
    <>
      <Header />
      <Section>
        <LeftBox sm={{ span: 24 }} md={{ span: 11 }}>
          <Image src="/products/category-image1.png" />
          <Title level={3}>
            New Arrival
          </Title>
          <Paragraph>
            4 items
          </Paragraph>
        </LeftBox>
        <RightBox sm={{ span: 24 }} md={{ span: 11, offset: 2 }}>
          <Image src="/products/category-image1.png" />
          <Title level={3}>
            Sofas
          </Title>
          <Paragraph>
            10 items
          </Paragraph>
        </RightBox>
      </Section>
    </>
  )
}


export default Home;

