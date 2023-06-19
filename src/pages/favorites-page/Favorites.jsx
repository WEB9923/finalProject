import "./Favorites.scss";
import {useEffect, useState} from "react";
import {GetCartAndFavoriteProducts} from "../../services/GetCartAndFavoriteProducts.js";
import Loader from "../../components/loader/Loader.jsx";
import {DeleteProduct} from "../../services/DeleteProduct.js";
import FavoritesCard from "../../components/favorites-card/FavoritesCard.jsx";
import {useNavigate} from "react-router-dom";
import {ErrorToaster, SuccessToaster} from "../../components/toaster/Toaster.js";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const getFavoritesProduct = async () => {
        try {
            setIsLoading(true);
            const res = await GetCartAndFavoriteProducts("favorites");
            if (res) {
                setFavorites(res);
            }
        } catch (err) {
            ErrorToaster(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getFavoritesProduct();
    }, []);

    const deleteFavoriteProduct = async (id) => {
        try {
            setIsDeleting(true);
            const res = await DeleteProduct("favorites", id);
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
            <section className="favorites">
                <div className="container">
                    <h1>favorites</h1>
                    {
                        isLoading ? <Loader/> : <div className="favorites-wrapper">
                            {favorites?.map((product) => (
                                <FavoritesCard
                                    key={product.id}
                                    id={product.id}
                                    thumbnail={product.thumbnail}
                                    title={product.title}
                                    isDeleting={isDeleting}
                                    deleteFavoriteProduct={() => deleteFavoriteProduct(product.id)}
                                />
                            ))}
                        </div>
                    }
                </div>
            </section>
        </>
    );
}
