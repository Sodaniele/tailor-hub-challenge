import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-white border-b">
      <div className="font-bold">✳︎ tailor</div>
      <div className="space-x-4">
        <Link href="/">Inicio</Link>
        <Link href="/restaurants">Restaurantes</Link>
      </div>
    </nav>
  );
}