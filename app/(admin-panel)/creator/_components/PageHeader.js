import Link from "next/link";

export default function PageHeader({
  title = "Title",
  subTitle = "Sub title",
  actionButton,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-400">{subTitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        {actionButton?.yes && (
          <>
            {actionButton?.target.length > 0 ? (
              <Link
                href={actionButton?.target}
                className="btn flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                {actionButton?.title}
              </Link>
            ) : (
              <button className="btn flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus-icon lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                {actionButton?.title}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
