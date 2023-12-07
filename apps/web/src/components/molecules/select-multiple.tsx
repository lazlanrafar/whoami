import React from "react";
import { FormDescription, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

export type ISelectMultiple = {
  label: string;
  value: string;
};

interface Props {
  label: string;
  items: ISelectMultiple[];
  values: ISelectMultiple[];
  onValueChange: (value: ISelectMultiple[]) => void;
}

export default function SelectMultiple({
  label,
  items,
  values,
  onValueChange,
}: Props) {
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
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={(value) => handlePushValue(value)} value="">
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>

          <SelectContent>
            {items.map((item: ISelectMultiple) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <FormDescription>
          Click the badge to remove the {label}.
        </FormDescription>
      </FormItem>

      <div className="my-3 flex gap-1 flex-wrap">
        {values.map((item: ISelectMultiple) => (
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
