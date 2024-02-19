import "./home.css"
import heroImg from "../../assets/hero-img.webp"
import BookListComponent from "./BookList";
import BookSearchComponent from "./Booksearch";


function Home(){
   
  return (
    <>
      <section className="section-home">
        <div>
          <div className="hero-section">
            <div>
              <h1>BookLand</h1>
              <p>
                Descubra o mundo literário em BookLand. Sua livraria online
                especializada em React, onde cada livro é uma porta para a
                inspiração técnica. Explore, compre e mergulhe nas páginas que
                expandem seu conhecimento. Bem-vindo à sua nova fonte de
                aprendizado.
              </p>
            </div>

            <img
              src={heroImg}
              alt="Ilustração 3d de uma menina negra segurando livros"
            />
          </div>

        </div>
        <BookSearchComponent />
        <BookListComponent />

      </section>
    </>
  )
}

export default Home
