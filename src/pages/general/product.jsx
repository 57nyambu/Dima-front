import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  return <h1>Product Page - Product ID: {id}</h1>;
}

export default Product;
