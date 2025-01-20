
import axiosInstance from '@/lib/axios'
import Details from './_components/Details'
import ImageGallery from './_components/ImageGallery'
export default async  function ProductPage({params}:any) {
  const {id} = await params
  const product = await axiosInstance.get(`/user/product/${id}`)
  console.log(product.data)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ImageGallery images={[product.data.data.imageUrl]} />

        {/* Product Details */}
        <Details product={product.data.data}/>
      </div>
    </div>
  )
}

