import { useRouter } from 'next/router'
const ProductPage = () => {
    const router = useRouter()
    const { productId } = router.query
    return (
        <div>
            hi this product page {productId}
        </div>
    )
}
export default ProductPage
