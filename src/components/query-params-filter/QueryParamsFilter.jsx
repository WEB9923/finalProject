import {IoClose} from "react-icons/io5";
import {BiChevronDown} from "react-icons/bi";
import {FiFilter} from "react-icons/fi";
import {brands, categories} from "./data.js";
import {AiOutlineClear} from "react-icons/ai";
import "./QueryParamsFilter.scss";
import {useState} from "react";


export default function QueryParamsFilter({
        setIsShowQueryParamsFilterContent,
        handleAddFilterQueryParams,
        setCategoryQueryParam,
        setBrandQueryParam,
        handleClearAllFilterQueryParams}
    ){
        const [showCategory,setShowCategory] = useState(false);
        const [showBrand,setShowBrand] = useState(false);
    return (
        <>
            <div className="filter-content">
                <div className="filter-close">
                    <button className="close" onClick={() => setIsShowQueryParamsFilterContent(false)}>
                        <IoClose size={24}/>
                    </button>
                </div>
                <div className="filter-header">
                    <h3>filter params</h3>
                </div>
                <div className="filter-wrapper">
                    <button className={`show-category ${showCategory && "touchedActive"}`} onClick={() => setShowCategory(!showCategory)}>category <BiChevronDown size={25}/></button>
                    {showCategory && <div className="categories-filter">
                        {
                            categories.map((filter) => (
                                <label htmlFor={filter.category} key={filter.id}>
                                    <input type="radio" id={filter.category} value={filter.category}
                                           name="categories" onChange={(e) => setCategoryQueryParam(e.target.value)}/>
                                    {filter.category}
                                </label>
                            ))
                        }
                    </div>}
                    <button className={`show-brand ${showBrand && "touchedActive"}`} style={{marginTop: "20px"}} onClick={() => setShowBrand(!showBrand)}>brand <BiChevronDown size={25}/></button>
                    {showBrand && <div className="brand-filter">
                        {
                            brands.map((filter) => (
                                <label htmlFor={filter.brand} key={filter.id}>
                                    <input type="radio" id={filter.brand} value={filter.brand}
                                           name="brand" onChange={(e) => setBrandQueryParam(e.target.value)}/>
                                    {filter.brand}
                                </label>
                            ))
                        }
                    </div>}
                    <button className="filter" onClick={handleAddFilterQueryParams}><FiFilter size={25}/>filter</button>
                    <button className="clear-filter-querys" onClick={handleClearAllFilterQueryParams}><AiOutlineClear
                        size={25}/>clear
                    </button>
                </div>
            </div>
        </>
    );
}