import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  message?: string;
}

export default function DataNotFound({ className, message }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <img
        src="/not-found.svg"
        alt="Not Found"
        className="h-20 w-2h-20 mb-5 text-foreground"
      />
      <p className="text-muted-foreground text-sm">
        {message ?? "Data not found"}
      </p>
    </div>
  );
}
