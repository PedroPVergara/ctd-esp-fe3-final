import { useContext, useMemo } from "react";
import Card from "../Components/Card";
import { ContextGlobal } from '../Components/utils/global.context';

const Favs = () => {
  const { theme } = useContext(ContextGlobal);

  const favDentists = useMemo(() => {
    const favsFromStorage = localStorage.getItem("favs");
    return favsFromStorage ? JSON.parse(favsFromStorage) : [];
  }, []);

  return (
    <main className={`favs-container ${theme}`}>
      <h1>Dentists Favs</h1>
      <div className={`card-grid ${theme}`}>
        {favDentists.length > 0 ? (
          favDentists.map(dentist => (
            <Card 
              key={dentist.id}
              data={dentist}
            />
          ))
        ) : (
          <p className={`no-favs ${theme}`}>No tienes dentistas favoritos agregados</p>
        )}
      </div>
    </main>
  );
};

export default Favs;