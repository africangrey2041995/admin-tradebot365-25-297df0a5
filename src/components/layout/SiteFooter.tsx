
import React from "react";
import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TradeBot</h3>
            <p className="text-sm text-muted-foreground">
              Automated trading solutions for everyone
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm">About</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal" className="text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <address className="text-sm not-italic">
              <p>Email: info@tradebot.com</p>
              <p>Phone: +1 234 567 890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-zinc-800 pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TradeBot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
