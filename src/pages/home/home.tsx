import "./home.css"
import heroImg from "../../assets/hero-img.webp"
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookListComponent from "./BookList";
import BookSearchComponent from "./Booksearch";
import { Link } from "react-router-dom";


interface Books {
  id: string;
  url: string;
  likes: number;
  comentarios: string[];
}


function Home(){
   
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

    <Link to="/carrinho">
      Carrinho
    </Link>
        </div>
        <BookSearchComponent />
        <BookListComponent />
        
      </section>
    </>
  )
}

export default Home