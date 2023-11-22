import React, { useEffect, useState } from 'react';
import { Tabs, Card } from 'antd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useMutation, useQuery } from '@apollo/client';
import { CART, DELETE_FOOD, EDIT_FOOD, GET_ALLFOOD, GET_USERS } from './queries';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

const { TabPane } = Tabs;
const TabContent = ({ items, setAddedItems, addedItems, favorites, setFavorites, user }) => {

  const [DeleteFood] = useMutation(DELETE_FOOD, {
    refetchQueries: [{ query: GET_ALLFOOD }],
  });

  const [editFood] = useMutation(EDIT_FOOD, {
    refetchQueries: [{ query: GET_ALLFOOD }],
  });

  const [open, setOpen] = React.useState(false);
  const [editedPrice, setEditedPrice] = useState();
  const [id, setId] = useState()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(favorites))
  }, [favorites])

  const isFavorite =favorites.find((item)=>item.user === user)?.fav
  console.log('isFavorite', isFavorite)
  console.log('favorites', favorites)
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
  // const toggleFavorite = (item) => {
  //   setFavorites((prevFavorites) => {
  //     const isFav = !prevFavorites.some((fav) => fav.name === item.name);
  //     if (isFav) {
  //       return [...prevFavorites, { name: item.name, image: item.image, price: item.price, user: user }];
  //     } else {
  //       return prevFavorites.filter((fav) => fav.name !== item.name);
  //     }
  //   })
  // }

  const handleDelete = (id) => {
    DeleteFood({ variables: { id: id } });
  }

  const handleEdit = (id) => {
    setOpen(true)
    setId(id)
  };

  const handleSave = () => {
    if (editedPrice != "") {
      editFood({
        variables: { id: id, foodInput: { price: parseInt(editedPrice) } },
      });
      setOpen(false)
      setEditedPrice()
    }
  }
  const handleClose = () => setOpen(false);
  const isItemAdded = (item) => addedItems?.some((add) => item.name === add.name)

  const toggleAdded = (item) => {
    if (isItemAdded(item)) {
      setAddedItems(addedItems.filter((name) => name.name !== item.name));
    } else {
      setAddedItems((prev) => [...prev, { id: item.id, name: item.name, image: item.image, price: item.price, count: 1, totalPrice: item.price, user: user }]);
    }
  }

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <div style={{ position: 'relative' }}>
              <img alt={item.name} src={item.image} style={{ height: '200px', width: '100%' }} />
              {user != 'Admin' &&
                <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                  <FavoriteIcon
                    style={{ color: isFavorite?.some((fav) => fav.name === item.name) ? 'red' : 'gray' }}
                    onClick={() => toggleFavorite(item)}
                  />
                </div>}
            </div>
            <Card.Meta title={item.name} description={`Price: ${item.price}`} />
            <div style={{ height: '100px', marginTop: '10px' }}>{item.description}</div>

            {user === 'Admin' ?
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <span style={{ color: '#fa6400' }} >
                  <EditIcon onClick={() => handleEdit(item.id)} />
                </span>
                <span style={{ color: 'red' }} >
                  <DeleteIcon onClick={() => handleDelete(item.id)} />
                </span>
              </div>
              :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#fa6400' }}
                  endIcon={<AddIcon />}
                  onClick={() => toggleAdded(item)}
                >
                  {addedItems?.some((add) => add.name === item.name) ? 'REMOVE' : 'ADD'}
                </Button>
              </div>
            }


          </Card>
        </Grid>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#fa6400' }}>
            Edit Price
          </Typography>
          <TextField
            required
            fullWidth
            name="price"
            label="price"
            id="price"
            autoComplete="price"
            onChange={(e) => setEditedPrice(e.target.value)}
          />
          <div style={{ display: 'flex', float: 'right', marginTop: '10px', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: '#53c2c2' }}
              onClick={handleSave}
            >
              Save
            </Button>

          </div>
        </Box>
      </Modal>
    </Grid>
  );
};

const category = [{
  key: 0,
  name: 'All'
}, {
  key: 1,
  name: 'Pizza'
}, {
  key: 2,
  name: 'Burger'
}, {
  key: 3,
  name: 'Dessert'
},{
  key :4,
  name:'Sandwich'
},{
  key :5,
  name:'Hot Drinks'
}
]

const LabTabs = ({ data, addedItems, setAddedItems, setFavorites, favorites, user }) => {
  return <Tabs defaultActiveKey="0" onChange={key => console.log(key)}>
    {category.map((item, index) => {
      return (
        <TabPane key={index} style={{ marginLeft: "20px" }} tab={<span style={{ color: '#9595ed' }}>{item.name}</span>}>
          {item.name === 'All' ? (
            <TabContent items={data} user={user} setAddedItems={setAddedItems} addedItems={addedItems} favorites={favorites} setFavorites={setFavorites} />
          ) : (
            <TabContent items={data.filter(e => e.key == item.key)} user={user} setAddedItems={setAddedItems} addedItems={addedItems} setFavorites={setFavorites} favorites={favorites} />
          )}
        </TabPane>
      );
    })}
  </Tabs>
}

export default LabTabs;
