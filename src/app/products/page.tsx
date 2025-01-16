'use client';
import Footer from '@/components/Footer';

export default function Products() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sample product cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">Product {item}</h2>
              <p className="text-gray-600">Product description goes here...</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 