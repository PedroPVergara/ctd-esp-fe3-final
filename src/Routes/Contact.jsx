// Contact.jsx
import { useContext } from 'react'
import Form from '../Components/Form'
import { ContextGlobal } from '../Components/utils/global.context'

const Contact = () => {
  const { theme } = useContext(ContextGlobal);

  return (
    <main className={`contact-container ${theme}`}>
      <div className="contact-content">
        <h1>Necesita mas informacion?</h1>
        <p>Envienos sus consultas y un ejecutivo le contactara</p>
        <Form/>
      </div>
    </main>
  )
}

export default Contact