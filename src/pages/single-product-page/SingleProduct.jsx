import {Link, useParams} from "react-router-dom";
import {GetSingleProduct} from "../../services/GetSingleProduct.js";
import {useEffect, useState} from "react";
import "./SingleProduct.scss";
import {AddCartOrFavorites} from "../../services/AddCartOrFavorites.js";
import SmallLoader from "../../components/small-loader/SmallLoader.jsx";
import {FiHeart} from "react-icons/fi";
import {RiShoppingCartLine} from "react-icons/ri";
import Loader from "../../components/loader/Loader.jsx";

export default function SingleProduct() {
    const {productId} = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [isAddCartLoading, setIsAddCartLoading] = useState(false);
    const [isAddFavoritesLoading, setIsAddFavoritesLoading] = useState(false);

    const fetchingData = async () => {
        try {
            setIsLoading(true);
            const res = await GetSingleProduct(productId);
            setProduct(res);
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchingData();
    }, []);

    const addToFavorites = async () => {
        try {
            setIsAddFavoritesLoading(true);
            if (product) {
                await AddCartOrFavorites("favorites", product);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsAddFavoritesLoading(false);
        }
    }

    const addToCart = async () => {
        try {
            setIsAddCartLoading(true);
            if (product) {
                await AddCartOrFavorites("cart", product);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsAddCartLoading(false);
        }
    }
    return (
        <>
            <section className="single-product">
                {
                    isLoading ? <Loader /> : <div className="container">
                        <div className="single-product-image">
                            <img src={product?.images[0]} alt={product?.title}/>
                        </div>
                        <div className="single-product-details">
                            <div className="">
                                <h1 className="title">{product?.title}</h1>
                            </div>
                            <div className="">
                                <h4 className="brand">brand
                                    <Link to={`/products/?brand=${product?.brand}`}>{product?.brand}</Link>
                                </h4>
                            </div>
                            <div className="">
                                <h4 className="category">category
                                    <Link to={`/products/?category=${product?.category}`}>{product?.category}</Link>
                                </h4>
                            </div>
                            <div className="">
                                <h4 className="rating">rating<span>{product?.rating}</span></h4>
                            </div>
                            <div className="">
                                <h4 className="stock">stock<span>{product?.stock}</span></h4>
                            </div>
                            <div className="">
                                <h2 className="price">price<span>${product?.price}</span></h2>
                            </div>
                            <div className="desc">
                                <p>{product?.description}</p>
                            </div>
                            <div className="buttons">
                                <button className="add-cart" onClick={() => addToCart()}>{isAddCartLoading ? <>
                                    <SmallLoader/>loading...</> : <> <RiShoppingCartLine size={22}/>add cart</>}</button>
                                <button className="add-favorites"
                                        onClick={() => addToFavorites()}>{isAddFavoritesLoading ? <>
                                    <SmallLoader/>loading...</> : <><FiHeart size={22}/>add favorites</>}</button>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </>
    );
}
