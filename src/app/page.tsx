import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Facebook, Twitter, Instagram } from 'lucide-react';
export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'T-shirt',
      price: 20,
      image: '/images/p11-1.jpg',
      slug: 't-shirt',
    },
    {
      id: 2,
      name: 'Canvas',
      price: 15,
      image: '/images/p31-1.jpg',
      slug: 'canvas',
    },
    {
      id: 3,
      name: 'Jeans',
      price: 25,
      image: '/images/p22-1.jpg',
      slug: 'jeans',
    },
    {
      id: 4,
      name: 'Poster Shirt',
      price: 10,
      image: '/images/banner1.jpg',
      slug: 'poster-shirt',
    },
  ];

  const selectedProducts = 0; // TODO: get from user product selection

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b shadow-sm bg-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center font-bold text-xl">
            <span className="mr-2">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.5L5 5.5V10.5C5 14.5 8 18.5 12 20.5C16 18.5 19 14.5 19 10.5V5.5L12 2.5Z" />
              </svg>
            </span>
            Market Zone
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 border rounded-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Products, Cart and Sign In */}
          <div className="flex items-center">
            <Link href="/products" className="font-medium mr-6 hidden md:block">
              Products
            </Link>
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedProducts}
              </span>
            </Link>
            <Button asChild className="bg-black hover:bg-gray-800 text-white ml-4">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-[#0c1221]">
            <Image
              // src="/images/homepage1-img.png"
              src="/images/banner1.jpg"
              alt="Galaxy background"
              fill
              priority
              className="object-cover opacity-80"
            />
          </div>
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative container mx-auto h-full flex items-center px-8">
            <div className="max-w-xl text-white">
              <h1 className="text-5xl font-bold mb-4">Explore Our Universe</h1>
              <p className="text-xl mb-8">Discover our collection of cosmic products</p>
              <Button
                asChild
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-md text-lg"
              >
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-8 bg-white rounded-t-3xl -mt-8 relative">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="group cursor-pointer">
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-square relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-gray-800">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Shop Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-gray-600 hover:text-gray-900">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-gray-600 hover:text-gray-900">
                    Deals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-600 hover:text-gray-900">
                    Shipping Information
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                    Returns & Exchanges
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect With Us Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="https://facebook.com" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://instagram.com" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Market Zone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
