import SmallLoader from "../small-loader/SmallLoader.jsx";
import "./LoadMoreBtn.scss";

export default function LoadMoreBtn(
   {textContent, disabled, handleLoadMoreProduct, loading}) {
   return (
      <>
         <button className="load-more-btn" disabled={disabled} onClick={handleLoadMoreProduct}>
            {loading ? <><SmallLoader/> loading...</> : textContent}
         </button>
      </>
   );
}