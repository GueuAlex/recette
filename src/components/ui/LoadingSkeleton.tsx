'use client';

import { motion } from 'framer-motion';

function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-[12px] ${className}`}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{ backgroundSize: '200% 100%' }}
    />
  );
}

export function ExplorerSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Header skeleton */}
      <div className="py-3">
        <Skeleton className="h-[32px] w-[140px] mb-2" />
        <Skeleton className="h-[16px] w-[180px]" />
      </div>

      {/* Filter toolbar skeleton */}
      <div className="py-3 border-b border-hairline flex items-center gap-3">
        <Skeleton className="h-[38px] w-[100px] rounded-full" />
        <Skeleton className="h-[30px] w-[80px] rounded-full" />
        <Skeleton className="h-[30px] w-[70px] rounded-full" />
      </div>

      {/* Recipe grid skeleton */}
      <div className="grid grid-cols-2 gap-[13px] mt-4">
        {/* Feature card (large) */}
        <div className="col-span-2">
          <Skeleton className="h-[180px] rounded-[18px] mb-3" />
          <Skeleton className="h-[18px] w-[70%] mb-2" />
          <Skeleton className="h-[14px] w-[50%]" />
        </div>

        {/* Regular cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <Skeleton className="h-[118px] rounded-t-[18px]" />
            <div className="bg-white rounded-b-[18px] p-3 border border-t-0 border-hairline">
              <Skeleton className="h-[16px] w-[80%] mb-2" />
              <Skeleton className="h-[12px] w-[60%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="fixed inset-0 bg-cream z-50 flex flex-col">
      {/* Hero skeleton */}
      <Skeleton className="h-[256px] rounded-none" />

      {/* Content skeleton */}
      <div className="flex-1 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-[40px] w-[100px] rounded-full" />
          <Skeleton className="h-[40px] w-[100px] rounded-full" />
          <Skeleton className="h-[40px] w-[80px] rounded-full" />
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-[50px] w-full mb-3 rounded-[12px]" />
        ))}
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="w-16 h-16 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-[40px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          🍲
        </motion.span>
      </motion.div>
      <motion.p
        className="text-[14px] text-muted font-medium mt-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Chargement des recettes...
      </motion.p>
    </div>
  );
}
