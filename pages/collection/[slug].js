import { useRouter } from 'next/router'
import client from 'shopify/shopify'
import { Typography, List, Card } from 'antd'
import Link from 'next/link'
const { Title, Paragraph } = Typography;

const CollectionPage = ({ collection }) => {
    const router = useRouter()
    const { slug } = router.query
    console.log(collection)
    return (
        <div>
            <Title>{collection.title}</Title>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={collection.products}
                renderItem={item => (
                    <List.Item>
                        <Link href={`/product/${item.handle}`}>
                            <Card title={item.title}
                                cover={<img alt="example" src={item.images[0].src} />}

                            >
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                >
                                    {item.description}
                                </Paragraph>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />

        </div>

    )
}
export async function getServerSideProps(context) {
    const { slug } = context.params
    const collection = await client.collection.fetchByHandle(slug)

    return {
        props: {
            collection: JSON.parse(JSON.stringify(collection))
        }
    }
    // const products = await client.product.fetchAll()
    // const collections = await client.collection.fetchAllWithProducts()
    // return {
    //     props: {
    //         products: JSON.parse(JSON.stringify(products)),
    //         collections: JSON.parse(JSON.stringify(collections))
    //     }, // will be passed to the page component as props
    // }
}
export default CollectionPage
