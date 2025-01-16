'use client';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-gray-600">
          This is the home page of our application. Here you can find all the information you need.
        </p>
      </main>
      <Footer />
    </div>
  );
} 