export default function SecondaryLoadingBtn({
  loading,
  onClick,
  children,
  className,
}) {
  return (
    <button className={className} onClick={onClick}>
      {loading ? (
        <>
          <span className="mr-2 inline-block w-[10px] h-[10px] border text-black border-black rounded-full anim border-r-transparent" />
          Loading
        </>
      ) : (
        children
      )}
    </button>
  );
}
