
import React from "react";
import { Link } from "react-router-dom";

export const SiteHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold">TradeBot</Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-sm font-medium">Home</Link>
          <Link to="/about" className="text-sm font-medium">About</Link>
          <Link to="/pricing" className="text-sm font-medium">Pricing</Link>
          <Link to="/contact" className="text-sm font-medium">Contact</Link>
          <Link to="/login" className="text-sm font-medium">Login</Link>
          <Link to="/register" className="text-sm font-medium">Register</Link>
        </nav>
      </div>
    </header>
  );
};
