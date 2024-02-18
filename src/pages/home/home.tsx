import "./home.css"
import heroImg from "../../assets/hero-img.webp"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookListComponent from "./BookList";
import BookSearchComponent from "./Booksearch";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
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
    <Header />
      <section className="section-home">
        <div>
          <div className="hero-section">
            <div>
              <h1>BookLand</h1>
              <p>
                Descubra o mundo literário em BookLand. 
                Sua livraria online especializada em React, onde cada livro é uma porta para a inspiração técnica. 
                Explore, compre e mergulhe nas páginas que expandem seu conhecimento. Bem-vindo à sua nova fonte de aprendizado.
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
        <Footer />
      </section>
    </>
  )
}

export default Home
