import {Link} from "react-router-dom";
import "./FavoritesCard.scss";
import {BsTrash} from "react-icons/bs";
import SmallLoader from "../small-loader/SmallLoader.jsx";

export default function FavoritesCard({id,thumbnail,title,deleteFavoriteProduct,isDeleting}) {
    return (
        <>
            <div className="favorite-card">
                <div className="favorite-card-top">
                    <img src={thumbnail} alt={`${title}-image`}/>
                </div>
                <div className="favorite-card-body">
                    <div className="favorite-product-title">
                        <Link to={`/product/${id}`}>
                            <h3>{title}</h3>
                        </Link>
                    </div>
                </div>
                <div className="favorite-card-footer">
                    <button className="delete-favorite-product" onClick={() => deleteFavoriteProduct()}>
                        {isDeleting ? <><SmallLoader/>deleting...</> :
                            <><BsTrash size={20}/>delete</>}
                    </button>
                </div>
            </div>
        </>
    );
}