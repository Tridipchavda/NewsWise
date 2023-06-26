import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

export default function ViewFashion() {
    const nav = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user") == undefined){
            nav("/");
            return;
        }
    },[])
    return <NewsCard category="fashion" />;
}
