"use client";

import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-lg font-semibold">Athletic Club</button>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-2">
              Navigate
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => navigate('/')}>Home</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/vitals')}>Vitals / Video</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/check-in')}>Check-In Home</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/physiological')}>Physiological Metrics</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/emotional')}>Emotional Pillars</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/athletic')}>Athletic Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/complete')}>Check-In Complete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
