import Hero from './_components/Hero'
import TrendingProducts from './_components/TrendingProducts'
import ShopByCategory from './_components/ShopByCategory'
import AboutUs from './_components/AboutUs'
import PageContainer from '@/components/Layout/PageContainer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mt-2">
      <div className="flex-grow">
        <Hero />
        <PageContainer>
        <TrendingProducts />
        </PageContainer>
        <AboutUs />
        <ShopByCategory />
      </div>
    </div>
  )
}

