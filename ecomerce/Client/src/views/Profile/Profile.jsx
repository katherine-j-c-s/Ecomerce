import React, { useState, useRef } from "react";

export default function Profile() {
  const [view, setView] = useState("perfil");
  const perfilVistaRef = useRef(null);
  const comprasVistaRef = useRef(null);

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
          </form>
        </section>
      )}

      {isComprasView && (
        <section id="comprasVista" ref={comprasVistaRef}>
          <h2>Formulario de Puntuación y Reseña</h2>

          <form>
            <div className="rating">
              <input type="radio" id="rating1-5" name="rating1" value="5" />
              <label htmlFor="rating1-5"></label>
              <input type="radio" id="rating1-4" name="rating1" value="4" />
              <label htmlFor="rating1-4"></label>
              <input type="radio" id="rating1-3" name="rating1" value="3" />
              <label htmlFor="rating1-3"></label>
              <input type="radio" id="rating1-2" name="rating1" value="2" />
              <label htmlFor="rating1-2"></label>
              <input type="radio" id="rating1-1" name="rating1" value="1" />
              <label htmlFor="rating1-1"></label>
            </div>
            <div className="review">
              <textarea
                name="review1"
                placeholder="Escribe tu reseña aquí"
              ></textarea>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
