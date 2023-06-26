import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import BusinessIcon from "@mui/icons-material/Business";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MemoryIcon from "@material-ui/icons/Memory";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../logo.png";
import { InputBase, Paper } from "@mui/material";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";

const pages = [
  {
    name: "Fashion",
    link: "/fashion",
    icon: <LocalMallIcon sx={{  width: 30 }} />,
  },
  {
    name: "Business",
    link: "/business",
    icon: <BusinessIcon sx={{ width: 30 }} />,
  },
  {
    name: "TechCrunch",
    link: "/techcrunch",
    icon: <MemoryIcon sx={{ width: 30 }} />,
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchVal,setSearchVal] = React.useState("");
  const [anchorElNav,setAnchorElNav] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{marginBottom:5}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            width="50px"
            height="50px"
            style={{ marginRight: "15px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "fantasy",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NewsWise
          </Typography>

          <Box
            sx={{
              marginLeft: 10,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  placeItems:"center",
                }}
              >
                {page.icon}
                <Link className="lin" to={page.link}><p>{page.name}</p></Link>
              </Button>
            ))}
          </Box>

          <Paper
            component="form"
            sx={{
              p: "2px 2px",
              display: "flex",
              width: 300,
              marginLeft:30,
              marginRight:3,
              height:30,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search "
              onChange={(e)=>{setSearchVal(e.target.value)}}
              value={searchVal}
              inputProps={{ "aria-label": "News Search" }}
            />
            <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
              <a href={`/anything/${searchVal}`}><Search /></a>
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
