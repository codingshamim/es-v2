export default function PageTitle({ title, subTitle }) {
  return (
    <div className="page-title flex justify-center items-center flex-col py-8 md:py-12 px-4 bg-black text-white">
      {/* Title Badge */}
      <div className="mb-4 md:mb-6">
        <span className="bg-white text-black text-xs md:text-sm font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full uppercase tracking-wide">
          {title}
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-xl md:text-3xl lg:text-2xl font-bold text-white text-center leading-tight max-w-4xl">
        {subTitle}
      </h1>
    </div>
  );
}
