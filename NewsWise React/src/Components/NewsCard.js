import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import MyCircularProgress from "./MyCircularProgress";
import axios from "axios";

export default function NewsCard(props) {
  const [businessNews, setBusinessNews] = React.useState([{}]);

  React.useEffect(() => {
    const getData = async () => {
      try{
        const resp = await axios.post(`http://127.0.0.1:5000/${props.category}`);
        console.log(resp);
        
        if(resp.data.length == 0){
          setBusinessNews(undefined);
        }else{
          setBusinessNews(resp.data);
        }
      }catch(e){
        alert(e.message);
      }
      
    };

    getData();
  },[]);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {
        businessNews == undefined?
        <h1>No News Found</h1>
        :
      businessNews[0]['url'] === undefined?
        <center style={{marginTop:300}}>
          <CircularProgress/>
        <p>Please Wait...</p>
        </center>
      :
      businessNews.map((news, value) => {
        return (
          <Card key={news['url']} sx={{ width: 650, margin: 2, borderRadius: 0 }}>
            <a href={news['url']} target="_blank">
              <CardMedia
                component="img"
                height="300"
                width="400"
                image={news["urlToImage"]}
                alt="News Image"
              />
            </a>
            <CardHeader
              action={ <Tooltip title={news["FakeMeter"]<33? "Probably Fake" :news["FakeMeter"]<66? "Low Chances but can be Fake" : " Genuiene News" }>
                          <p><MyCircularProgress value={news["FakeMeter"]}/></p>
                        </Tooltip>}
              title={<Typography sx={{paddingRight:4,fontSize:22}}> {news["title"] }</Typography>}
              subheader={
                <div style={{display:"flex"}}>
                  <Typography sx={{ color: "#004670" }}>
                    {news["publishedAt"].substring(0,10)}
                  </Typography>
                </div>
              }
              sx={{ color: "#0077be" }}
            />
            <CardContent>
              <Typography variant="body2">{news["description"]}</Typography>
              <Typography variant="body2" sx={{marginTop:3,marginLeft:60}}>{"~"+news["source"]["name"]}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
