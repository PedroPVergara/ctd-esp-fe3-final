import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ContextGlobal } from '../Components/utils/global.context'

const Detail = () => {
  const { id } = useParams()
  const { theme } = useContext(ContextGlobal)
  const [dentist, setDentist] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setDentist(data))
      .catch(err => console.error("Error fetching dentist:", err))
  }, [id])

  return (
    <main className={`detail ${theme}`}>
      <h1>Detail Dentist {id}</h1>
      {dentist ? (
        <div className="card">
          <img 
            src="/images/doctor.jpg"
            alt={dentist.name}
            className="card-img"
          />
          <div className="detail-info">
            <h2>{dentist.name}</h2>
            <p>Email: {dentist.email}</p>
            <p>Phone: {dentist.phone}</p>
            <p>Website: {dentist.website}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}

export default Detail