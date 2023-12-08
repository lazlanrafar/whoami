import { Skeleton } from "../ui/skeleton";

interface Props {
  className?: string;
}

export default function SkeletonProject({ className }: Props) {
  return (
    <div className={`${className} space-y-2`}>
      <Skeleton className="w-full h-[140px]" />
      <Skeleton className="w-2/3 h-5" />
      <Skeleton className="w-full h-3" />
      <div className="flex gap-1">
        <Skeleton className="w-14 h-5" />
      </div>
    </div>
  );
}
