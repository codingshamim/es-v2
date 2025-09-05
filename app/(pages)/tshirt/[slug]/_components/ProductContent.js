import ProductOrder from "./ProductOrder";

export default function ProductContent({
  originalPrice,
  title,
  description,
  price,
  discount,
  ability,
  sizes,
  stock,
  id,
}) {
  return (
    <div className="hero-content w-full md:w-[60%]">
      <button className="new-btn !text-white !bg-green-700">
        {discount} % Discount
      </button>
      <h1 className="mt-2 mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-300 mb-2">{description}</p>
      <p>
        <del className="text-gray-300 text-sm mr-2">৳ BDT {originalPrice} </del>{" "}
        ৳ {price}
      </p>
      {ability.length > 0 && ability && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Fabric</h2>
          <ul className="list-disc text-sm text-gray-300 ml-6">
            {ability.map((abil, index) => (
              <li key={index}>{abil}</li>
            ))}
          </ul>
        </div>
      )}
      <ProductOrder stock={stock} sizes={sizes} productId={id} />
    </div>
  );
}
