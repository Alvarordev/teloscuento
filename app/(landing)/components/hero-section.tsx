/* eslint-disable @next/next/no-img-element */
"use client";

import { MapPin, Search, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Distrito } from "@/types/database";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  distritos: Distrito[];
}

export function HeroSection({ distritos }: HeroSectionProps) {
  const [open, setOpen] = useState(false);
  const [selectedDistrito, setSelectedDistrito] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (selectedDistrito) {
      router.push(`/alojamientos?districts=${selectedDistrito}`);
    } else {
      router.push("/alojamientos");
    }
  };

  const handleTrendClick = (filter: string) => {
    router.push(`/alojamientos?${filter}`);
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-semibold text-foreground leading-[1.1] my-6">
              Encuentra alojamientos transitorios en Lima
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Encuentra y reserva habitaciones por horas en los mejores hoteles
              de Lima. Sin complicaciones, discreto y seguro.
            </p>

            <div className="bg-white p-2 rounded-xl shadow-md border border-gray-200">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="flex-1 px-4 py-3">
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Distrito
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full flex items-center gap-2 text-sm text-left hover:bg-accent transition-colors rounded-lg p-1 cursor-pointer"
                        aria-expanded={open}
                      >
                        <MapPin className="text-gray-400" width={16} />
                        <span
                          className={cn(
                            "flex-1",
                            selectedDistrito
                              ? "text-gray-700"
                              : "text-gray-400",
                          )}
                        >
                          {selectedDistrito
                            ? distritos.find((d) => d.slug === selectedDistrito)
                                ?.nombre
                            : "¿A dónde vas?"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-75 md:w-105 p-0">
                      <Command>
                        <CommandInput placeholder="Buscar distrito..." />
                        <CommandList>
                          <CommandEmpty>
                            No se encontró el distrito.
                          </CommandEmpty>
                          <CommandGroup>
                            {distritos.map((distrito) => (
                              <CommandItem
                                key={distrito.id}
                                value={distrito.nombre}
                                onSelect={() => {
                                  setSelectedDistrito(distrito.slug);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedDistrito === distrito.slug
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {distrito.nombre}
                                <span className="ml-auto text-xs text-gray-500">
                                  {distrito.telos || 0}
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="p-2 md:pl-4 flex items-center">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group"
                  >
                    <Search
                      width={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span className="md:hidden">Buscar</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <span>Tendencias:</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrendClick("amenities=jacuzzi")}
                  className="px-2 py-1 h-auto text-xs hover:border-primary hover:text-primary"
                >
                  Jacuzzi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrendClick("districts=lince")}
                  className="px-2 py-1 h-auto text-xs hover:border-primary hover:text-primary"
                >
                  Lince
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTrendClick("amenities=wifi")}
                  className="px-2 py-1 h-auto text-xs hover:border-primary hover:text-primary"
                >
                  Wifi
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop"
                className="rounded-2xl object-cover h-64 w-full shadow-lg transform translate-y-8"
                alt="Hotel room"
              />
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop"
                className="rounded-2xl object-cover h-64 w-full shadow-lg"
                alt="Jacuzzi suite"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
