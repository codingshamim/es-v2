export default function loading() {
  return (
    <main className="mt-6 min-h-screen">
      <div className="w-full flex gap-2">
        <div className="bg-gray-600 anim-bg w-full h-4" />
        <div className="bg-gray-600 anim-bg w-[100px] h-4" />
        <div className="bg-gray-600 anim-bg w-[100px] h-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
        <div className="bg-gray-600 anim-bg h-[400px]" />
        <div className="bg-gray-600 anim-bg h-[400px]" />
        <div className="bg-gray-600 anim-bg h-[400px]" />
      </div>
    </main>
  );
}
