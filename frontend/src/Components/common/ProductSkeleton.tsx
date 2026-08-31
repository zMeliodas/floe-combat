const ProductSkeleton = () => {
  return (
    <div className="relative aspect-4/5 overflow-hidden bg-white/5 animate-pulse">
      <div className="w-full h-full bg-white/5" />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-3">
        <div className="h-3 w-24 bg-white/10 rounded-sm" />

        <div className="h-6 w-3/4 bg-white/10 rounded-sm" />

        <div className="h-3 w-full bg-white/10 rounded-sm" />
        <div className="h-3 w-2/3 bg-white/10 rounded-sm" />

        <div className="flex gap-1 mt-2">
          <div className="h-5 w-8 bg-white/10 rounded-sm" />
          <div className="h-5 w-8 bg-white/10 rounded-sm" />
          <div className="h-5 w-8 bg-white/10 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;