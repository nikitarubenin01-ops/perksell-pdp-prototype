interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  size = 14,
  showValue = false,
  className = "",
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = Math.min(Math.max(rating - i, 0), 1);
    return filled;
  });

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {stars.map((fill, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`star-fill-${i}-${rating}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset={`${fill * 100}%`} stopColor="oklch(0.78 0.16 75)" />
              <stop offset={`${fill * 100}%`} stopColor="oklch(0.88 0.006 240)" />
            </linearGradient>
          </defs>
          <path
            d="M8 1.5l1.854 3.756 4.146.603-3 2.924.708 4.127L8 10.75l-3.708 1.16.708-4.127-3-2.924 4.146-.603L8 1.5z"
            fill={`url(#star-fill-${i}-${rating})`}
          />
        </svg>
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-[oklch(0.78_0.16_75)]">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
