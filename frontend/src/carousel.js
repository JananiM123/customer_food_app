import { Carousel, Image } from 'antd';
import React from 'react';

const Carousels = () => {
  const contentStyle = {
    height: '100%',
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
  };

  const images = ['https://www.restroapp.com/blog/wp-content/uploads/2020/03/online-food-ordering-statistics-RestroApp.jpg','https://i.pinimg.com/736x/71/fb/2b/71fb2b316d8b6012ca76b81683358fa8.jpg', 'https://media.istockphoto.com/id/908663850/photo/various-fast-food-products.jpg?s=1024x1024&w=is&k=20&c=L1ySH-gOjuoJtskRFyh0YU2pMsKlEkvY8PciyWFhC7Q=','https://png.pngtree.com/thumb_back/fw800/background/20230902/pngtree-a-collage-of-hamburgers-pizza-slices-fries-and-donuts-image_13156242.jpg']

  return (
    <div>
      <Carousel autoplay>
        <Carousel autoplay>
          {images.map((image, index) => (
            <div key={index} style={{ width: "100%", height: "50px" }}>
              <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: "500px" }} />
            </div>
          ))}
        </Carousel>
      </Carousel>
    </div>
  );
};

export default Carousels


