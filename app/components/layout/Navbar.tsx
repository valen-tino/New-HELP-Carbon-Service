'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, BarChart2, UserCircle, Leaf, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Recommendations', href: '/recommendations', icon: Leaf },
];

export function Navbar() {
  const pathname = usePathname();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block">Carbon Tracker</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  <span className="flex items-center gap-x-2">
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <UserCircle className="h-4 w-4" />
                Profile
                <ChevronDown className="h-3 w-3" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-md">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/activitylog"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Activity Log
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other controls here if needed */}
          </div>
          <nav className="flex items-center">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            </Link>
            <Link href="/register">
            <Button variant="ghost" size="sm">
              Register
            </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden">
          <nav className="flex items-center gap-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </nav>
  );
}
