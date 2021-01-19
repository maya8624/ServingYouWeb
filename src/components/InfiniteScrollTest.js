import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMenus } from "../services/menuService";

const InfiniteScrollTest = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [items, setItems] = useState([]);

  const getPhotos = async (page) => {
    setLoading(true);
    await axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
        //"https://jsonplaceholder.typicode.com/photos?_limit=20"
      )
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    //getPhotos(1);
    setItems(getMenus());
    console.log(items);
  }, []);

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={2}
        next={(prevData) => setItems([...prevData, ...items])}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row my-5">
          {items.map((photo) => (
            <div key={photo.id} className="col-md-2 my-3 text-center">
              <span>{photo.id}</span>
              <img src={photo.image.url} alt="" />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollTest;
