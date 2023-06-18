import "./Products.scss";
import Card from "../../components/card/Card.jsx";
import {useEffect, useRef, useState} from "react";
import {GetAllProducts} from "../../services/GetAllProducts.js";
import LoadMoreBtn from "../../components/load-more-btn/LoadMoreBtn.jsx";
import {useSearchParams} from "react-router-dom";
import {BiCategoryAlt} from "react-icons/bi";
import QueryParamsFilter from "../../components/query-params-filter/QueryParamsFilter.jsx";
import Search from "../../components/search/Search.jsx";
import Loader from "../../components/loader/Loader.jsx";

export default function Products() {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(20);

    const [searchParams, setSearchParams] = useSearchParams();
    const [inputVal, setInputVal] = useState("");
    const inputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryQueryParam, setCategoryQueryParam] = useState("");
    const [brandQueryParam, setBrandQueryParam] = useState("");

    const [isShowQueryParamsFilterContent, setIsShowQueryParamsFilterContent] = useState(false);

    const handleAddFilterQueryParams = () => {
        setSearchParams({
            category: categoryQueryParam,
            brand: brandQueryParam
        })
    }
    const handleClearAllFilterQueryParams = () => {
        searchParams.delete("category");
        searchParams.delete("brand");
        setSearchParams(searchParams);
    }

    const removeSearchQueryParam = (key) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
        inputRef.current.focus();
        setInputVal("");
    }

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const data = await GetAllProducts(searchParams, limit);
            setList(data)
        } catch (err) {
            setError(err)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProducts();
    }, [searchParams, limit]);

    const handleLoadMoreProduct = () => {
        setLimit(limit + 20)
    }

    return (
        <>
            <section className="products">
                {isShowQueryParamsFilterContent &&
                    <QueryParamsFilter
                        setIsShowQueryParamsFilterContent={setIsShowQueryParamsFilterContent}
                        handleAddFilterQueryParams={handleAddFilterQueryParams}
                        setCategoryQueryParam={setCategoryQueryParam}
                        setBrandQueryParam={setBrandQueryParam}
                        handleClearAllFilterQueryParams={handleClearAllFilterQueryParams}
                    />
                }
                <div className="container">
                    <h1>products</h1>
                    <Search
                        inputRef={inputRef}
                        inputVal={inputVal}
                        setInputVal={setInputVal}
                        isLoading={isLoading}
                        setSearchParams={setSearchParams}
                        removeSearchQueryParam={removeSearchQueryParam}
                    />
                    <div className="category-content">
                        <button className="category" onClick={() => setIsShowQueryParamsFilterContent(true)}>
                            <BiCategoryAlt size={25}/>
                        </button>
                    </div>
                    <div className="products-wrapper">
                        {isLoading ? <Loader/> : list?.map((product) => (
                            <Card key={product.id} {...product}/>
                        ))}
                    </div>
                    <LoadMoreBtn
                        handleLoadMoreProduct={handleLoadMoreProduct}
                        textContent={`${list.limit === limit ? "no more data" : "load more"}`}
                        disabled={list.limit === limit}
                        loading={isLoading}
                    />
                </div>
            </section>
        </>
    );
}
