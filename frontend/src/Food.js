import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Carousels from './carousel';
import LabTabs from './CustomTabPanel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useMutation, useQuery } from '@apollo/client';
import { CART, GET_ALLFOOD, GET_ALLORDERDETAILS, ORDER_DETAILS } from './queries';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useParams, useLocation } from "react-router"
import { useNavigate } from 'react-router-dom';
import Favorites from './Favourites';
import { Image } from 'antd';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from '@mui/icons-material/Close';
import './App.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const favStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fa6400',
  '&:hover': {
    backgroundColor: '#ffcdad ',
    color: 'black'
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const initializeArr = () => {
  const item = localStorage.getItem("fav")
  if (item === null) {
    return []
  }
  else {
    return JSON.parse(item)
  }
}

const Food = ({ setIsLogIn }) => {
  // const { user } = useParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState(initializeArr);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [customerSearch, setCustomerSearch] = useState('')
  const navigate = useNavigate();
  const [showFavModal, setShowFavModal] = React.useState(false)
  const [isSelected, setIsSelected] = React.useState('')
  const [orderDetails] = useMutation(ORDER_DETAILS, {
    refetchQueries: [{ query: GET_ALLORDERDETAILS }],
  });
  const user = localStorage.getItem('user')
  const { loading: orderLoading, error: orderError, data: orderData } = useQuery(GET_ALLORDERDETAILS);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const { loading, error, data } = useQuery(GET_ALLFOOD)

  if (loading || orderLoading) return <p>Loading...</p>;
  if (error || orderError) return <p>Error: {error.message}</p>

  let totalPrice = 0;
  console.log('favorites', favorites)
  addedItems.forEach(item => {
    if (item.totalPrice) {
      totalPrice += item.totalPrice;
    } else {
      totalPrice += item.price * item.count;
    }
  })

  const filteredItems = data.getFoodItems.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  )

  const filteredCustomers = orderData.getOrderDetails.filter((item) =>
    item?.user?.toLowerCase().includes(customerSearch?.toLowerCase()) || item?.name.toLowerCase()?.includes(customerSearch?.toLowerCase())
  )

  const myOrderDetails = orderData.getOrderDetails.filter((item) =>
    item?.user === user
  )
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
  };

  const handleSearchInput = (event) => {
    setCustomerSearch(event.target.value)
  }


  const handlemodal = (item) => {
    setShowFavModal(true)
    setIsSelected(item)
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {user !== 'Admin' &&
        <List>
          {["Wish List", "My orders"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => { handlemodal(text) }}>
                <ListItemIcon>
                  {index % 2 === 0 ? <FavoriteBorderIcon /> : <AddShoppingCartIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            setIsLogIn(false)
            localStorage.setItem('isLogin', false)
            navigate('/', { replace: true })
          }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const incrementCount = (itemId) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
            ...item,
            count: (item.count || 0) + 1,
            totalPrice: (item.price * ((item.count || 0) + 1)),
          }
          : item
      )
    );
  };

  const decrementCount = (itemId) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
            ...item,
            count: Math.max((item.count || 0) - 1, 0),
            totalPrice: (item.price * Math.max((item.count || 0) - 1, 0)),
          }
          : item
      )
    );
  };

  const removeFromCart = (item) => {
    setAddedItems(addedItems.filter((name) => name.name !== item.name));
  }

  // const handleSubmit = (event) => {
  //     console.log('data.get contactNum')
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget)
  //     console.log('data', data.get('name'), data.get('key'), data.get('description'), data.get('image'), data.get('price'))
  //     orderDetails({
  //         variables: {
  //             foodInput: {
  //                 name: data.get('name'),
  //                 key: data.get('key'),
  //                 description: data.get('description'),
  //                 image: data.get('image'),
  //                 price: parseInt(data.get('price')),
  //             }
  //         },
  //     })
  //     navigate(`/food/${'Admin'}`);
  // }


  const handlePlaceOrder = () => {
    orderDetails({
      variables: {
        cartInput: addedItems
      },
    })
    setIsSelected('Place order')
    setShowFavModal(true)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list("left")}
      </SwipeableDrawer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <AppBar style={{ backgroundColor: "#ffe8d9" }} position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon style={{ color: "#fa6400" }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#fa6400' }}
              >
                WELCOME, {user.toUpperCase()}
              </Typography>
              {user === 'Admin' &&

                <Button
                  variant="contained"
                  style={{ backgroundColor: '#fa6400' }}
                  // endIcon={<AddIcon />}
                  onClick={() => navigate('/addFood')}
                >
                  Add Food
                </Button>
              }
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  onChange={handleSearchInputChange}
                  value={searchQuery}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
          <Carousels />
          <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "20px", paddingLeft: '10px', fontWeight: "800" }}>
            Choose from popular categories
          </Typography>
          <Grid style={{ marginLeft: '10px' }}>
            <LabTabs data={filteredItems} user={user} setAddedItems={setAddedItems} addedItems={addedItems} setFavorites={setFavorites} favorites={favorites} />
          </Grid>
        </Grid>
        {user === 'Admin' ?
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "30px", fontWeight: "100", fontWeight: "800" }}>
              Customer order details :
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleSearchInput}
                value={customerSearch}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ height: '100vh', overflowY: 'auto', marginTop: '40px' }}>

              {filteredCustomers.map((item) => {
                return (
                  <Card sx={{ display: "flex", flexWrap: 'wrap', padding: '10px', }}>
                    <Grid container spacing={1}>
                      <CardMedia
                        component="img"
                        style={{ height: '100px' }}
                        sx={{ width: 100 }}
                        image={item.image}
                        alt="no img found"
                      />
                      <CardContent sx={{ flex: "1 0 auto", flexDirection: 'column' }}>
                        <Typography component="div" variant="h5">
                          <span style={{ color: '#fa6400' }}> Customer Name: </span> {item.user}
                        </Typography>
                        <Typography component="div" variant="h6">
                          <span style={{ color: '#fa6400' }}> Item : </span>{item.name}
                        </Typography>
                        <span style={{ color: '#fa6400' }}>Quantity:</span>{item.count}

                        <span style={{ color: '#fa6400', marginLeft: '10px' }}>Price: </span>  Rs {item.price}

                      </CardContent>
                    </Grid>
                  </Card>
                );
              })}
            </Box>
          </Grid>
          :
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "30px", fontWeight: "100", fontWeight: "800" }}>
              My Order
            </Typography>
            {addedItems.length > 0 &&
              <Box sx={{ height: '550px', overflowY: 'auto', marginTop: '40px' }}>
                {addedItems.map((item) => {
                  return (
                    <Card sx={{ display: "flex", flexWrap: 'wrap', padding: '10px' }}>
                      <Grid container spacing={1}>
                        <CardMedia
                          component="img"
                          style={{ height: '100px' }}
                          sx={{ width: 100 }}
                          image={item.image}
                          alt="no img found"
                        />

                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h6">
                            {item.name}
                          </Typography>
                          <ButtonGroup sx={{ marginTop: "10px", backgroundColor: "#ffe8d9" }}>
                            <Button style={{ color: "black" }}
                              disabled={item.count === 1}
                              aria-label="reduce"
                              onClick={() => decrementCount(item.id)}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button style={{ color: "black" }}>
                              {item.count || 0}
                            </Button>
                            <Button style={{ color: "black" }} aria-label="increase"
                              onClick={() => incrementCount(item.id)}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </CardContent>
                        <Box >
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            {item.count !== 0 && (
                              <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "20px", fontWeight: "100", marginTop: '25px' }}>
                                <CurrencyRupeeIcon style={{ height: '18px' }} />
                                {item?.totalPrice ? item?.totalPrice : item.price} <DeleteIcon style={{ color: 'gray', marginLeft: '30px' }}
                                  onClick={() => removeFromCart(item)}
                                />
                              </Typography>
                            )}
                          </CardContent>
                        </Box>
                      </Grid>
                    </Card>
                  );
                })}
              </Box>
            }
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {addedItems.length > 0 ? (
                <div className='order'>
                  <Typography variant="h6" component="div">
                    <span style={{ color: '#fa6400' }}> Sub Total:  </span><CurrencyRupeeIcon style={{ height: '18px' }} /> {totalPrice}
                  </Typography>
                  <Typography variant="h6" component="div">
                    <span style={{ color: '#fa6400' }}> Delivery Fee: </span> <CurrencyRupeeIcon style={{ height: '18px' }} />20
                  </Typography>
                  <Typography variant="h6" component="div">
                    <span style={{ color: '#fa6400' }}> Taxes: </span> <CurrencyRupeeIcon style={{ height: '18px' }} />39.40
                  </Typography>
                  <Typography variant="h6" component="div">
                    <span style={{ color: 'green' }}> Total :</span> <CurrencyRupeeIcon style={{ height: '18px' }} />{totalPrice + 20 + 39.40}
                  </Typography>
                  <Button variant="contained" style={{ backgroundColor: "#ffe8d9", color: "#fa6400" }}
                    // onClick={handleOpen}
                    onClick={() => handlePlaceOrder()}
                  >PLACE ORDER</Button>
                </div>
              ) : (
                <Image
                  width='100%'
                  height='512px'
                  preview={false}
                  src='https://www.healthyfoods.net.in/assets/images/cart-empty.jpg'
                />
                // <Typography variant="h6" component="div" sx={{ fontSize: "25px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
                //   <RemoveShoppingCartIcon />
                //   Your cart is Empty
                // </Typography>
              )}
            </div>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showFavModal}
              onClose={handleClose}
              disableBackdropClick={true}
            >
              <Fade in={showFavModal}>
                <Box sx={isSelected == 'Wish List' ? favStyle : modalStyle}>
                  {isSelected == 'Wish List' && <Favorites wishlistItems={favorites} setShowFavModal={setShowFavModal} setAddedItems={setAddedItems} addedItems={addedItems} setFavorites={setFavorites} favorites={favorites} user={user} />}
                  {isSelected == 'My orders' && <>
                    {myOrderDetails.length > 0 ?

                      <Box sx={{ height: '60vh', overflowY: 'auto', marginTop: '40px' }}>
                        <div style={{ display: 'flex', float: 'right' }} >
                          <CloseIcon onClick={() => setShowFavModal(false)} />
                        </div>
                        <Typography variant="h6" component="div">
                          <span style={{ color: 'green' }}> My Orders</span>
                        </Typography>

                        {myOrderDetails.map((item) => {
                          return (
                            <Card sx={{ display: "flex", flexWrap: 'wrap', padding: '10px' }}>
                              <Grid container spacing={1}>
                                <CardMedia
                                  component="img"
                                  style={{ height: '100px' }}
                                  sx={{ width: 100 }}
                                  image={item.image}
                                  alt="no img found"
                                />
                                <CardContent sx={{ flex: "1 0 auto" }}>
                                  <Typography component="div" variant="h6">
                                    <span style={{ color: '#fa6400' }}> Item : </span>{item.name}
                                  </Typography>
                                  <span style={{ color: '#fa6400' }}>Quantity: </span>{item.count}
                                  <span style={{ color: '#fa6400', marginLeft: '10px' }}>Price: </span>Rs {item.price}
                                </CardContent>
                              </Grid>
                            </Card>
                          )
                        })}
                      </Box>
                      : <>
                        <div style={{ display: 'flex', float: 'right' }} >
                          <CloseIcon onClick={() => setShowFavModal(false)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://www.pngfind.com/pngs/m/272-2727925_continue-shopping-empty-cart-png-transparent-png.png"
                            sx={{ width: 200, height: 200 }}
                          />
                        </div>
                        <Typography variant="h6" component="div" sx={{ color: 'red', fontSize: "30px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
                          No order history found
                        </Typography>
                      </>
                    }
                  </>}
                  {isSelected == 'Place order' &&
                    <>
                      <div style={{ display: 'flex', float: 'right' }} >
                        <CloseIcon onClick={() => setShowFavModal(false)} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://img.freepik.com/free-vector/green-eco-loop-leaf-check-mark_78370-658.jpg?w=740&t=st=1700546554~exp=1700547154~hmac=07617d83fb677e2e96df6df4a50261fc3306745d5e9e53b282d84964509ffd34"
                          sx={{ width: 200, height: 200 }}
                        />
                      </div>
                      <div>
                        <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "30px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
                          congratulations !!!
                        </Typography>
                        <Typography variant="h1" component="div" sx={{ color: 'green', fontSize: "25px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
                          Your order placed successfully
                        </Typography>
                      </div>
                    </>
                  }
                  {/* {isSelected === 'Wish List' ?
                    <Favorites wishlistItems={favorites} setShowFavModal={setShowFavModal} setAddedItems={setAddedItems} addedItems={addedItems} setFavorites={setFavorites} favorites={favorites} />
                    :
                    <>
                      <Box sx={{ height: '60vh', overflowY: 'auto', marginTop: '40px' }}>
                        <Typography variant="h6" component="div">
                          <span style={{ color: 'green' }}> My Orders</span>
                        </Typography>
                        {myOrderDetails.map((item) => {
                          return (
                            <Card sx={{ display: "flex", flexWrap: 'wrap', padding: '10px' }}>
                              <Grid container spacing={1}>
                                <CardMedia
                                  component="img"
                                  style={{ height: '100px' }}
                                  sx={{ width: 100 }}
                                  image={item.image}
                                  alt="no img found"
                                />
                                <CardContent sx={{ flex: "1 0 auto" }}>
                                  <Typography component="div" variant="h6">
                                    <span style={{ color: '#fa6400' }}> Item : </span>{item.name}
                                  </Typography>
                                  <span style={{ color: '#fa6400' }}>Quantity:</span>{item.count}
                                  <span style={{ color: '#fa6400', marginLeft: '10px' }}>Price:</span>{item.price}
                                </CardContent>
                              </Grid>
                            </Card>
                          )
                        })}
                      </Box>
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#fa6400' }}
                          onClick={() => setShowFavModal(false)}
                        >

                          Close
                        </Button>
                      </div>
                    </>
                  } */}
                </Box>
              </Fade>
            </Modal>
          </Grid>
        }
      </Grid>
    </Box>
  );
}
export default Food
