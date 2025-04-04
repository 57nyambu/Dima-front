import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    { slug: "product-a", name: "Product A" },
    { slug: "product-b", name: "Product B" },
    { slug: "product-c", name: "Product C" },
  ];

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.slug}>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
