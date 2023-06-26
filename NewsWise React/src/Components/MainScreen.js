import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import axios from "axios";
import logo from "../logo.png";
import NewsBox from "./newsBox";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [headlines, setHeadlines] = React.useState([{}]);

  const nav = useNavigate();

  React.useEffect(() => {
    if(localStorage.getItem("user") == undefined){
      nav("/");
    }
    const fetchData = async () => {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a63a67b2473841dfb20a515e2a6049c4"
      );
      console.log(res.data.articles);
      setHeadlines(res.data.articles);

    };

    return () => {
      fetchData();
    };
  }, []);


  return (
    <>
    <h1 style={{textAlign:'center',fontFamily:'fantasy',color:'#0077be'}}>Top Trendings & Headlines</h1>
    <center>
    <Box sx={{width:1280,marginTop: 5 }}>
        <Grid container spacing={2}>
          {headlines.map((headline,index)=>{
            return <NewsBox headline={headline} index={index}/>;
          })}
        </Grid>
    </Box>
    </center>
    </>
  );
}
