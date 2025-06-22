import { Search, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PropertySearch = () => {
  return (
    <div className="w-full max-w-4xl">
      {/* Search Form - Transparent */}
      <div className="bg-transparent backdrop-blur-none p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mr-32">
          {/* Property Type Dropdown */}
          <div className="md:col-span-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Home className="h-4 w-4" />
                <span>Tip proprietate</span>
              </div>
              <Select>
                <SelectTrigger className="bg-white/20 border-white/20 text-white placeholder:text-white/70 h-12 backdrop-blur-sm">
                  <SelectValue placeholder="Toate proprietățile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartament</SelectItem>
                  <SelectItem value="house">Casă</SelectItem>
                  <SelectItem value="villa">Vilă</SelectItem>
                  <SelectItem value="land">Teren</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Input */}
          <div className="md:col-span-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Search className="h-4 w-4" />
                <span>Zonă / ID proprietate</span>
              </div>
              <Input
                type="text"
                placeholder="Caută după zonă sau ID proprietate..."
                className="bg-white/20 border-white/20 text-white placeholder:text-white/70 h-12 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-3">
            <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 text-base font-bold rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 tracking-wide uppercase border border-red-500/20">
              Caută Proprietăți
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
