import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Button, Divider, Grid, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Card } from 'antd';

const Favorites = ({ wishlistItems, setShowFavModal, favorites, addedItems, setFavorites, setAddedItems, user }) => {
  const isFavorite = wishlistItems.find((item) => item.user === user)?.fav
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const existingUserIndex = prevFavorites.findIndex((fav) => fav.user === user);

      if (existingUserIndex !== -1) {
        const userFavorites = prevFavorites[existingUserIndex].fav;
        const isFav = userFavorites?.some((favItem) => favItem.name === item.name);

        if (isFav) {
          const updatedFavorites = [...prevFavorites];
          updatedFavorites[existingUserIndex].fav = userFavorites.filter(
            (favItem) => favItem.name !== item.name
          );

          return updatedFavorites;
        } else {
          const updatedFavorites = [...prevFavorites];
          updatedFavorites[existingUserIndex].fav.push({
            name: item.name,
            image: item.image,
            price: item.price,
          });

          return updatedFavorites;
        }
      } else {
        return [
          ...prevFavorites,
          { user: user, fav: [{ name: item.name, image: item.image, price: item.price }] },
        ];
      }
    });
  };
  const isItemAdded = (item) => addedItems?.some((add) => item.name === add.name)
  const toggleAdded = (item) => {
    if (isItemAdded(item)) {
      setAddedItems(addedItems.filter((name) => name.name !== item.name));
    } else {
      setAddedItems((prev) => [...prev, { id: item.id, name: item.name, image: item.image, price: item.price, count: 1 }]);
    }
  }
  console.log('isFavorite', isFavorite)
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px' }}>
          <Typography variant="h4" gutterBottom>My Wishlist</Typography>
          <div >
            <CloseIcon onClick={() => setShowFavModal(false)} />
          </div>
        </div>
        {!isFavorite ?
          (<>  <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt="Remy Sharp"
              src="https://png.pngtree.com/png-vector/20231006/ourmid/pngtree-orange-glossy-circular-shopping-cart-icon-against-a-png-image_10072714.png"
              sx={{ width: 200, height: 200 }}
            />
          </div>
            <div>
              <Typography variant="h6" component="div" sx={{ color: '#fa6400', fontSize: "25px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
                Your wishlist is empty.
              </Typography>
            </div>
          </>)
          :
          (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {isFavorite?.map((item) => (
              <Card style={{ width: '200px' }}>
                <div style={{ position: 'relative' }}>
                  <img alt={item.name} src={item.image} style={{ height: '100px', width: '100%' }} />
                  <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                    <FavoriteIcon
                      style={{ color: isFavorite?.some((fav) => fav.name === item.name) ? 'red' : 'gray' }}
                      onClick={() => toggleFavorite(item)}
                    />
                  </div>
                </div>
                <Card.Meta title={item.name} description={`Price: Rs ${item.price}`} />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#fa6400', marginTop: '5px' }}
                    endIcon={<AddIcon />}
                    onClick={() => toggleAdded(item)}
                  >
                    {addedItems?.some((add) => add.name === item.name) ? 'REMOVE' : 'ADD'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>)}

      </div>



    </>
  );
};

export default Favorites;


//  {wishlistItems.length === 0 ? (
//   <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center' }}>
//   <div style={{display: 'flex',justifyContent:'center'}}>
//     <Avatar
//       alt="Remy Sharp"
//       src="https://png.pngtree.com/png-vector/20231006/ourmid/pngtree-orange-glossy-circular-shopping-cart-icon-against-a-png-image_10072714.png"
//       sx={{ width: 200, height: 200 }}
//     />
//   </div>
//   <div>
//     <Typography variant="h6" component="div" sx={{color:'#fa6400', fontSize: "25px", fontWeight: "100", marginTop: '30px', textAlign: 'center' }}>
//       Your wishlist is empty.
//     </Typography>
//   </div>
// </div>