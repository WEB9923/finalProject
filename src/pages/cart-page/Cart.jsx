import "./Cart.scss";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetCartAndFavoriteProducts} from "../../services/GetCartAndFavoriteProducts.js";
import {DeleteProduct} from "../../services/DeleteProduct.js";
import Loader from "../../components/loader/Loader.jsx";
import CartCard from "../../components/cart-card/CartCard.jsx";
import {ErrorToaster, SuccessToaster} from "../../components/toaster/Toaster.js";
import {motion} from "framer-motion";

const text = {
    hidden:{
        opacity:0,
        x:"-50vw",
    },
    show:{
        opacity: 1,
        x:0,
        transition:{type:"spring",stiffness:100}
    }
}

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const getCartProducts = async () => {
        try {
            setIsLoading(true);
            const res = await GetCartAndFavoriteProducts("cart");
            if (res) {
                setCart(res);
            }
        } catch (err) {
            ErrorToaster(err.message);
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
                SuccessToaster("Product deleted successfully");
                navigate(0);
            }
        } catch (err) {
            ErrorToaster(err.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <section className="cart-section">
                <div className="container">
                    <motion.h1 style={{width:"fit-content"}}
                        variants={text}
                        initial="hidden"
                        animate="show"
                    >
                        cart
                    </motion.h1>
                    {
                        isLoading ? <Loader/> : <div className="cart-wrapper">
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
                    }
                </div>
            </section>
        </>
    );
}
