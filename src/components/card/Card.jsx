import "./Card.scss";
import img from "../../assets/banner1.svg"
import {Link} from "react-router-dom";

export default function Card({...props}) {
    // eslint-disable-next-line react/prop-types
    const {id,thumbnail,title,description,price} = props;
    return (
        <>
            <div className="card">
                <div className="card-top">
                    <img src={thumbnail} alt={`${title}-image`}/>
                </div>
                <div className="card-body">
                    <div className="product-title">
                        <Link to={`/product/${id}`}>
                            <h1>{title}</h1>
                        </Link>
                    </div>
                    <div className="product-desc">
                        <p>{description || null}</p>
                    </div>
                    <div className="product-price">
                        <h3><span>price:</span> ${price}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}