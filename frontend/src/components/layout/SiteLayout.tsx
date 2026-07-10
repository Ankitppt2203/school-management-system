import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { NewsTicker } from '../landing/NewsTicker';

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
