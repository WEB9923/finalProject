import SmallLoader from "../small-loader/SmallLoader.jsx";
import "./Search.scss";

export default function Search({
    inputRef,
    inputVal,
    setInputVal,
    setSearchParams,
    removeSearchQueryParam,
    isLoading}){

    return (
        <>
            <div className="product-search-content">
                <input ref={inputRef} type="text" placeholder="search..." value={inputVal}
                       onChange={(e) => setInputVal(e.target.value)}/>
                <button disabled={inputVal === "" || null} className="search" onClick={() => setSearchParams({q: inputVal})}>{isLoading ? <>
                    <SmallLoader/>loading...</> : "search"}</button>
                <button disabled={inputVal === "" || null} className="delete" onClick={() => removeSearchQueryParam("q")}>clear</button>
            </div>
        </>
    );
}