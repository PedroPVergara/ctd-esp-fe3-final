// Home.jsx - Implementamos paginación
import { useContext, useState } from 'react'
import Card from '../Components/Card'
import { ContextGlobal } from '../Components/utils/global.context'

const Home = () => {
  const { theme, data } = useContext(ContextGlobal);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  // Calcular índices para la paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  // Generar números de página
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className={theme}>
      <h1>Home</h1>
      <div className='card-grid'>
        {currentCards.map(dentist => (
          <Card 
            key={dentist.id}
            data={dentist}
          />
        ))}
      </div>
      
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        <button 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </main>
  )
}

export default Home