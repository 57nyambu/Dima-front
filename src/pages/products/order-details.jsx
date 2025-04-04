import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { order_id } = useParams();

  return (
    <div>
      <h2>Order Details</h2>
      <p>Displaying details for Order ID: {order_id}</p>
    </div>
  );
};

export default OrderDetails;
