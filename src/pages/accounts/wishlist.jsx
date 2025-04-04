import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = [
    { slug: "product-a", name: "Product A", price: "$100" },
    { slug: "product-b", name: "Product B", price: "$50" },
  ];

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.slug}>
            <Link to={`/products/${item.slug}`}>{item.name} - {item.price}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
