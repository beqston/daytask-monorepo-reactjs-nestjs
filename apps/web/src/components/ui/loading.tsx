export function Loading({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2  border-primary-blue-100 border-t-transparent absolute top-[50%] left-[50%] ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="loading"
    />
  );
}