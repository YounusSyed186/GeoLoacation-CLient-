import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <div className="mt-6 space-x-4">
        <Link href="/register" className="text-blue-600 underline">Register</Link>
        <Link href="/login" className="text-green-600 underline">Login</Link>
      </div>
    </div>
  );
}
