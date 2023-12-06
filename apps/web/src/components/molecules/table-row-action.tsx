import { IoChevronDown } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type item = {
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

interface Props {
  items: item[];
}

export default function TableRowAction({ items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 data-[state=open]:bg-muted"
          size={"sm"}
        >
          Action
          <IoChevronDown className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {items.map((item, i) => (
          <DropdownMenuItem key={i} className="py-2">
            <div className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
