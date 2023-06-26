import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewSearchedNews(props) {
    const {search} = useParams();
    const [searchVal,setSearchVal] = useState(search);

    const nav = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user") == undefined){
            nav("/");
            return;
        }
    },[])

    useEffect(()=>{
        setSearchVal(searchVal);
        console.log(props.search);
    },[])

    return <NewsCard category={searchVal}/>;
}
