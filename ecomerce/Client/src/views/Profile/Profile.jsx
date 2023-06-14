import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  const [view, setView] = useState("perfil");

  const [enabled, setEnabled] = useState(false);

  const [form, setForm] = useState({
    mail: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    mail: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    image: "",
  });

  const perfilVistaRef = useRef(null);
  const comprasVistaRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { userData } = useSelector((state) => state);

  console.log(userData);

  const handleRating = (event) => {
    const selectedRating = parseInt(event.target.getAttribute("target"));
    console.log(selectedRating);
    setRating(selectedRating);
    if (selectedRating === rating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleView = (event) => {
    const value = event.target.value;
    if (value === "perfil") {
      setView("perfil");
    } else if (value === "compras") {
      setView("compras");
    }
  };

  const isPerfilView = view === "perfil";
  const isComprasView = view === "compras";

  const handleEdit = (event) => {
    event.preventDefault();
    setEnabled(!enabled);
  };

  function validate(form) {
    const errors = {};
    if (!form.first_name) {
      errors.first_name = "Debe haber un nombre";
    } else if (form.first_name.length < 3) {
      errors.first_name = "el nombre debe tener al menos tres letras";
    } else if (!form.last_name) {
      errors.last_name = "Debe haber un apellido";
    } else if (form.last_name.length < 3) {
      errors.last_name = "el apellido debe tener al menos tres letras";
    } else if (!form.mail) {
      errors.mail = "Debe haber un email";
    } else if (!regexEmail.test(form.mail)) {
      errors.mail = "Debe ser un email válido";
    } else if (!form.password) {
      errors.password = "Debe haber un password";
    } else if (form.password.length < 8) {
      errors.password = "Debe tener al menos 8 caracteres";
    } else if (!form.address) {
      errors.address = "Debe haber una direccion";
    }
    return errors;
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
    setErrors(
      validate({
        ...form,
        [name]: value,
      })
    );
  };
  function handleProfileSubmit(event) {
    event.preventDefault();

    let user = {
      mail: form.mail || user.mail,
      password: form.password || user.password,
      first_name: form.nombre || user.nombre,
      last_name: form.apellido || user.apellido,
      address: form.address || user.address,
      image: profileImage || user.image,
    };

    dispatch();

    if (Object.keys(errors).length === 0) {
      setForm({
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
      });
      setErrors({
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
      });
    }
  }

  return (
    <div>
      <h2>{"Hola" + " " + userData.name + "!"}</h2>

      <section>
        <button id="perfil" onClick={handleView} value="perfil">
          Mi Cuenta
        </button>
        <button id="compras" onClick={handleView} value="compras">
          Compras
        </button>
      </section>

      {isPerfilView && (
        <section id="perfilVista" ref={perfilVistaRef}>
          <form onSubmit={handleProfileSubmit}>
            <button onClick={handleEdit} disabled={enabled}>
              Editar
            </button>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              placeholder="Nombre"
              disabled={!enabled}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Apellido"
              name="last_name"
              value={form.last_name}
              disabled={!enabled}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mail"
              value={form.mail}
              placeholder="Correo Electronico"
              disabled={!enabled}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Direccion"
              disabled={!enabled}
              onChange={handleChange}
              name="address"
              value={form.address}
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Contraseña"
              disabled={!enabled}
              onChange={handleChange}
            />
            <input type="text" placeholder="Dirección" />
            <input
              type="text"
              id="profileImage"
              onChange={handleChange}
              placeholder="URL"
              name="image"
              value={form.image}
              disabled={!enabled}
            />

            <button type="submit" disabled={!enabled}>
              Confirmar cambios
            </button>
          </form>
        </section>
      )}

      {isComprasView && (
        <section id="comprasVista" ref={comprasVistaRef}>
          <h2>Formulario de Puntuación y Reseña</h2>
          ALGO.map
          {
            <form>
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />

                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`fa fa-heart ${
                      value <= rating ? "checked" : ""
                    }`}
                    onClick={handleRating}
                    target={value}
                    style={{ color: value <= rating ? "red" : "" }}
                  ></span>
                ))}
              </div>
              <div className="review">
                <textarea
                  name="review"
                  value={review}
                  placeholder="Escribe tu reseña aquí"
                  onChange={handleReviewChange}
                ></textarea>
              </div>
              <input type="submit" value="Enviar" />
            </form>
          }
        </section>
      )}
    </div>
  );
}
