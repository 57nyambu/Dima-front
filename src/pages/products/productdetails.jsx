import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { slug } = useParams();

  return (
    <div>
      <h2>Product Details</h2>
      <p>Details for product: {slug.replace("-", " ")}</p>
    </div>
  );
};

export default ProductDetails;
