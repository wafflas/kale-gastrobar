interface ReviewBoxProps {
  reviewSite: string;
  reviewText: string;
  authorName: string;
}

export default function ReviewBox({
  reviewSite,
  reviewText,
  authorName,
}: ReviewBoxProps) {
  return (
    <div className="bg-cream border border-darkbrown/40 flex flex-col overflow-hidden w-[280px] sm:w-[350px] md:w-[380px] h-[320px] sm:h-[380px] md:h-[400px]">
      <div className="px-4 sm:px-5 py-2 border-b border-darkbrown/40 flex items-center justify-between shrink-0">
        <div className="flex gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              className="sm:w-[18px] sm:h-[18px] text-[#D4AF37]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <span className="text-[14px] sm:text-[16px] opacity-40 text-darkbrown font-ubuntu">
          {reviewSite}
        </span>
      </div>

      <div className="flex flex-col flex-1 justify-between overflow-hidden">
        <div className="p-4 sm:p-6 flex-1 flex items-center overflow-hidden">
          <p className="text-[18px] sm:text-[20px] md:text-[22px] text-darkbrown font-vollkorn leading-relaxed">
            {reviewText}
          </p>
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 shrink-0">
          <p className="text-[14px] sm:text-[16px] opacity-40 text-darkbrown font-ubuntu">
            Author
          </p>
          <p className="text-[14px] sm:text-[16px] text-darkbrown font-vollkorn mt-0.5">
            {authorName}
          </p>
        </div>
      </div>
    </div>
  );
}
