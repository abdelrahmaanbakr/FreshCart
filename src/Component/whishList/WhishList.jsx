import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../Context/Token.context";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function WhishList() {
  const { token } = useContext(TokenContext);

  async function fetchWishlist() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "get",
      headers: {
        token,
      },
    };
    return await axios.request(option);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h2>error</h2>;
  }

  // هنا المهم: نوصل للـ array الصح
  const products = data?.data?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 my-4">
      {products.map((product) => (
        <div key={product._id} className="shadow p-2 rounded bg-white">
          <img
            className="w-full"
            src={product.imageCover}
            alt={product.title}
          />
          <h3 className="mt-2 font-semibold">{product.title}</h3>
        </div>
      ))}
    </div>
  );
}
