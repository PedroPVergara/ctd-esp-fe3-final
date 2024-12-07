// Home.jsx
import { useContext, useState } from 'react';
import Card from '../Components/Card';
import { ContextGlobal } from '../Components/utils/global.context';

const Home = () => {
  const { theme, data } = useContext(ContextGlobal);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className={theme}>
      <div className={`home-container ${theme}`}>
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
            className={theme}
          >
            {"<"}
          </button>
          
          <span className={`page-number ${theme}`}>
            {currentPage}
          </span>

          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className={theme}
          >
            {">"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;