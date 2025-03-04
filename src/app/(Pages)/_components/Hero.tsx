import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-6xl font-medium text-nowrap md:font-bold mb-4 drop-shadow-lg">Discover Bold Fashion Statements</h1>
        <p className="md:text-xl text-lg mb-8 max-w-2xl mx-auto">Shop the latest styles in clothes, t-shirts, hoodies, and more on TrendIQ. Express your fierce style with our curated collection.</p>
        <Link href="/products"  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  font-medium ring-offset-background py-3 text-md px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-300">
          Shop Now
        </Link>
      </div>
    </div>
  )
}

