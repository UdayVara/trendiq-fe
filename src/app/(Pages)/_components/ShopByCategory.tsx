import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import PageContainer from '@/components/Layout/PageContainer'

const categories = [
  { name: 'Statement Tees', image: '/placeholder.svg?height=300&width=300', link: '#' },
  { name: 'Bold Hoodies', image: '/placeholder.svg?height=300&width=300', link: '#' },
  { name: 'Edgy Jeans', image: '/placeholder.svg?height=300&width=300', link: '#' },
  { name: 'Fierce Dresses', image: '/placeholder.svg?height=300&width=300', link: '#' },
  { name: 'Daring Accessories', image: '/placeholder.svg?height=300&width=300', link: '#' },
  { name: 'Rebel Shoes', image: '/placeholder.svg?height=300&width=300', link: '#' },
]

export default function ShopByCategory() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <PageContainer>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover rounded-md"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <h3 className="font-semibold text-center text-red-600">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div></PageContainer>
      </div>
    </section>
  )
}

