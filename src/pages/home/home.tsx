import "./home.css"
import heroImg from "../../assets/hero-img.webp"
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookListComponent from "./BookList";
import BookSearchComponent from "./Booksearch";


interface CatImage {
  id: string;
  url: string;
  likes: number;
  comentarios: string[];
}


function Home(){
   
 
  const [catImages, setCatImages] = useState<CatImage[]>([]);

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes');
        const initialCatImages: CatImage[] = response.data.map((image: { id: string, url: string }) => ({
          id: image.id,
          url: image.url,
          likes: 0, 
        }));
        setCatImages(initialCatImages);
      } catch (error) {
        console.error('Erro ao obter imagens de gato:', error);
      }
    };
  
    fetchCatImages();
  }, []);


  return (
    <>
      <section className="section-home">
        <div>
          <div className="hero-section">
            <div>
              <h1>BookLand</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse at
                sint impedit beatae incidunt ea dolores laudantium rem eius
                aliquam? Eos, inventore ratione delectus consequatur ea
                blanditiis aliquam nihil recusandae sint magnam adipisci
                laudantium dolor obcaecati non, modi iste exercitationem
                explicabo amet tenetur natus incidunt? Ex, modi consequatur?
                Minima, provident.
              </p>
            </div>

            <img
              src={heroImg}
              alt="Ilustração 3d de uma menina negra segurando livros"
            />
          </div>

          <section>
            <div className="products-section">
              <div>
                {catImages.map((catImage, index) => (
                  <div className="products-container" key={index}>
                    <img src={catImage.url} alt={`Gato ${index + 1}`} />

                    <div className="photo-btns"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <BookSearchComponent />
        <BookListComponent />
        
      </section>
    </>
  )
}

export default Home