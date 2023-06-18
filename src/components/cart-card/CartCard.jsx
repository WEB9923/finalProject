import "./CartCard.scss";
import {Link} from "react-router-dom";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useState} from "react";
import SmallLoader from "../small-loader/SmallLoader.jsx";
import {BsTrash} from "react-icons/bs";

export default function CartCard({id,thumbnail,title,price,deleteCartProduct,isDeleting}) {
    const [pcs,setPcs] = useState(1);
    const handleDecrement = () => {
        if(pcs !== 1){
            return setPcs(pcs - 1)
        }
        return false;
    }
    const handleIncrement = () => {
        if(pcs !== 100){
            return setPcs(pcs + 1)
        }
        return false;
    }
    return (
        <>
            <div className="cart-card">
                <div className="cart-card-left-side">
                    <div className="cart-card-image">
                        <img src={thumbnail} alt=""/>
                    </div>
                    <div className="cart-card-title-price">
                        <Link className="cart-product-title" to={`/product/${id}`}>{title}</Link>
                        <h4>price <span>${price}</span></h4>
                        <div className="pcs">
                            <button onClick={handleDecrement}><FaMinus size={22}/></button>
                            <h3>{pcs}</h3>
                            <button onClick={handleIncrement}><FaPlus size={22}/></button>
                        </div>
                    </div>
                </div>
                <div className="cart-card-right-side">
                    <div className="">
                        <button className="delete-cart-product" onClick={() => deleteCartProduct()}>
                            {isDeleting ? <><SmallLoader/></> : <><BsTrash size={20}/></>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}