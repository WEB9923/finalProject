import "./Cart.scss";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetCartAndFavoriteProducts} from "../../services/GetCartAndFavoriteProducts.js";
import {DeleteProduct} from "../../services/DeleteProduct.js";
import Loader from "../../components/loader/Loader.jsx";
import CartCard from "../../components/cart-card/CartCard.jsx";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const getCartProducts = async () => {
        try {
            setIsLoading(true);
            const res = await GetCartAndFavoriteProducts("cart");
            if (res) {
                setCart(res);
            }
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCartProducts();
    }, []);

    const deleteCartProduct = async (id) => {
        try {
            setIsDeleting(true);
            const res = await DeleteProduct("cart", id);
            if (res) {
                navigate(0);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <section className="cart-section">
                {isLoading ? <Loader/> : <div className="container">
                    <h1>cart</h1>
                    <div className="cart-wrapper">
                        {cart?.map((cartProduct) => (
                            <CartCard
                                key={cartProduct.id}
                                id={cartProduct.id}
                                thumbnail={cartProduct.thumbnail}
                                title={cartProduct.title}
                                price={cartProduct.price}
                                isDeleting={isDeleting}
                                deleteCartProduct={() => deleteCartProduct(cartProduct.id)}
                            />
                        ))}
                    </div>
                </div>}
            </section>
        </>
    );
}
