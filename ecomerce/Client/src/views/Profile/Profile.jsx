import React, { useState, useRef } from "react";

export default function Profile() {
  const [view, setView] = useState("perfil");
  const perfilVistaRef = useRef(null);
  const comprasVistaRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

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

  return (
    <div>
      <h2>Mi Perfil</h2>

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
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
            <input type="text" placeholder="Correo Electronico" />
            <input type="password" placeholder="Contraseña" />
            <input type="text" placeholder="Dirección" />
          </form>
        </section>
      )}

      {isComprasView && (
        <section id="comprasVista" ref={comprasVistaRef}>
          <h2>Formulario de Puntuación y Reseña</h2>

          <form>
            <div>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
              />

              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`fa fa-heart ${value <= rating ? "checked" : ""}`}
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
        </section>
      )}
    </div>
  );
}
