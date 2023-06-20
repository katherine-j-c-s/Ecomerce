import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 9000); // 60000 milisegundos = 1 minuto

    // Limpiar el timeout cuando el componente se desmonta
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div style={{ color: "black" }}>
      <h1>¡Gracias por su compra!</h1>
      <p className="text-center">
        Su pedido ha sido procesado exitosamente. En breve recibirá un correo electrónico con la confirmación de su compra.
      </p>
      <p>En su perfil puede dejar un comentario y puntuar los productos.</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
}