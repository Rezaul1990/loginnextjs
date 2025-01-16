'use client';
import Footer from '@/components/Footer';

export default function Orders() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((order) => (
            <div key={order} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">Order #{order}</h2>
              <p className="text-gray-600">Order details go here...</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
} 