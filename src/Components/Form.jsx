import { useState, useContext } from "react";
import { ContextGlobal } from "./utils/global.context";

const Form = () => {
  const { theme } = useContext(ContextGlobal);
  const [formData, setFormData] = useState({
    fullName: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    if (formData.fullName.length <= 5) {
      setError("El nombre debe tener más de 5 caracteres");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingrese un email válido");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (validateForm()) {
      console.log("Form data:", formData);
      setSuccess(`Gracias ${formData.fullName}, te contactaremos cuando antes vía mail`);
      setFormData({ fullName: "", email: "" }); // Reset form
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`form-container ${theme}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={theme}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={theme}
        />
        <button type="submit" className={theme}>Enviar</button>
        {error && <p className="error">Por favor verifique su información nuevamente</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Form;