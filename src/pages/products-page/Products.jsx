import "./Products.scss";
import Card from "../../components/card/Card.jsx";
import {useEffect, useRef, useState} from "react";
import {GetAllProducts} from "../../services/GetAllProducts.js";
import LoadMoreBtn from "../../components/load-more-btn/LoadMoreBtn.jsx";
import {useSearchParams} from "react-router-dom";
import {BiCategoryAlt} from "react-icons/bi";
import QueryParamsFilter from "../../components/query-params-filter/QueryParamsFilter.jsx";
import Search from "../../components/search/Search.jsx";
import {ErrorToaster} from "../../components/toaster/Toaster.js";
import {motion} from "framer-motion";

const text = {
   hidden: {
      opacity: 0,
      x: "-50vw",
   },
   show: {
      opacity: 1,
      x: 0,
      transition: {type: "spring", stiffness: 100}
   }
}


export default function Products() {
   const [list, setList] = useState([]);
   const [limit, setLimit] = useState(20);
   const [xTotalCount, setXtotalCount] = useState(0);

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
         setList(data.products)
         setXtotalCount(parseInt(data.totalCount));
      } catch (err) {
         ErrorToaster(err.message);
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


   console.log(
      "limit->", limit,
      "total->", xTotalCount,
      limit === xTotalCount
   )

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
               <motion.h1
                  style={{width: "fit-content"}}
                  variants={text}
                  initial="hidden"
                  animate="show"
               >
                  products
               </motion.h1>
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
                  {list?.map((product) => (
                     <Card key={product.id} {...product}/>
                  ))}
               </div>
               <LoadMoreBtn
                  handleLoadMoreProduct={handleLoadMoreProduct}
                  textContent={`${limit === xTotalCount ? "no more data" : "load more"}`}
                  disabled={limit === xTotalCount}
                  loading={isLoading}
               />
            </div>
         </section>
      </>
   );
}
