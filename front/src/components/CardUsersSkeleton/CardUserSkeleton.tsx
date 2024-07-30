import {Skeleton} from "@nextui-org/react";

export default function CardUserSkeleton() {
  return (
    <div className="container flex flex-col justify-between w-full h-[340px] max-w-xs overflow-hidden bg-white hover:scale-105 transition-all rounded-lg shadow-lg">
      
      
      <div className="flex flex-col items-center p-6 space-y-6">
        
       
        <Skeleton className="w-24 h-24 rounded-full" />
        
        
        <div className="flex flex-col items-center space-y-4 w-full">
          <Skeleton className="w-56 h-16" />
          
          <Skeleton className="w-48 h-6" />
          
          <Skeleton className="w-48 h-12" />
        </div>
      </div>
      
      
    </div>

  );
}