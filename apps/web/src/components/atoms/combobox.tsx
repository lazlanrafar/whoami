"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "../ui/badge";

type ISelect = {
  label: string;
  value: string;
};

interface ComboboxProps {
  label?: string;
  message?: string;
  items: ISelect[];
  values: ISelect[];
  onValueChange: (value: ISelect[]) => void;
}

export function Combobox({
  label,
  message,
  items,
  values,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const handlePushValue = (value: string) => {
    if (values.find((item) => item.value === value)) return;

    onValueChange([
      ...values,
      items.find((item) => item.value === value) || { label: "", value: "" },
    ]);
  };

  const handlePopValue = (value: string) => {
    onValueChange(values.filter((item) => item.value !== value));
  };

  return (
    <>
      <div className="mb-2 flex gap-2">
        <p className="text-sm text-foreground font-medium">
          {label ?? "Input"}
        </p>
        <p>
          <span className="text-sm text-muted-foreground">
            {message ? " - " + message : ""}
          </span>
        </p>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Select framework...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search framework..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="max-h-48 overflow-auto">
              {items.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item.label}
                  onSelect={() => {
                    handlePushValue(item.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.find((e) => e.value == item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground mt-1">
        Click the badge to remove the Tech Stack.
      </p>
      <div className="my-3 flex gap-1 flex-wrap">
        {values.map((item: ISelect) => (
          <Badge
            key={item.value}
            className="cursor-pointer group"
            onClick={() => handlePopValue(item.value)}
          >
            {item.label}
            <X className="hidden group-hover:block" size={16} />
          </Badge>
        ))}
      </div>
    </>
  );
}
