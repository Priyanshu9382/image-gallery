import Card from "./components/Card";
import Searchbar from "./components/Searchbar";
import { useState, useEffect } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${
        import.meta.env.VITE_PIXABAY_API_KEY
      }&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [term]);
  return (
    <>
      <div className="container mx-auto">
        <div className="searchbar">
          <Searchbar
            searchText={(text) => {
              setTerm(text);
            }}
          />
        </div>

        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images found...</h1>}
        

        {isLoading ? (
          <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        ) : (
          <div className="mainContent">
            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                <Card key={image.id} image={image} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
