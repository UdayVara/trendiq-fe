
import axiosInstance from '@/lib/axios'
import Details from './_components/Details'
import ImageGallery from './_components/ImageGallery'
import PageContainer from '@/components/Layout/PageContainer'
export default async  function ProductPage({params}:any) {
  const {id} = await params
  const product = await axiosInstance.get(`/product/${id}`)
  return (
    <div className=""><PageContainer>

      <div className="grid grid-cols-12 gap-8 my-8">
        {/* Image Gallery */}
        <ImageGallery images={[...product.data.data.product_images]} />

        {/* Product Details */}
        <Details product={product.data.data}/>
      </div>
    </PageContainer>
    </div>
  )
}

