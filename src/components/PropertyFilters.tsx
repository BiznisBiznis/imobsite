import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

const PropertyFilters = () => {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-red-100 lg:sticky lg:top-24 mb-4 lg:mb-0">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-800">
          Filtrare proprietăți
        </h2>
        <p className="text-xs text-slate-600">172 rezultate</p>
      </div>

      <Separator className="bg-red-200 mb-3 sm:mb-4" />

      {/* Property Type */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-slate-800">
          Tip proprietate
        </label>
        <Input
          placeholder="Caută după zonă..."
          className="bg-slate-50 border-red-200 text-slate-800 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm"
        />
      </div>

      {/* Zone */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-slate-800">
          Zonă
        </label>
        <Select>
          <SelectTrigger className="bg-slate-50 border-red-200 text-slate-800 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm">
            <SelectValue placeholder="Selectează tipul" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartament">Apartament</SelectItem>
            <SelectItem value="casa">Casă</SelectItem>
            <SelectItem value="vila">Vilă</SelectItem>
            <SelectItem value="teren">Teren</SelectItem>
            <SelectItem value="comercial">Spațiu comercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-slate-800">
          Preț (€)
        </label>
        <div className="flex gap-1">
          <Input
            placeholder="Min"
            className="bg-slate-50 border-red-200 text-slate-800 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm"
          />
          <Input
            placeholder="Max"
            className="bg-slate-50 border-red-200 text-slate-800 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm"
          />
        </div>
      </div>

      {/* Rooms */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-slate-800">
          Camere
        </label>
        <div className="grid grid-cols-4 gap-1">
          {[1, 2, 3, "4+"].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="border-red-200 text-slate-700 hover:bg-red-50 hover:border-red-300 h-7 sm:h-8 text-xs"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      {/* Useful Area */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-slate-800">
          Suprafața utilă
        </label>
        <div className="flex gap-1">
          <Input
            placeholder="Min"
            className="bg-slate-50 border-red-200 text-slate-800 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm"
          />
          <Input
            placeholder="Max"
            className="bg-slate-50 border-red-200 text-slate-800 placeholder:text-slate-500 focus:border-red-500 focus:ring-red-500 h-8 sm:h-9 text-sm"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm">
        <SlidersHorizontal className="h-3 w-3 mr-2" />
        Aplică filtrele
      </Button>
    </div>
  );
};

export default PropertyFilters;
