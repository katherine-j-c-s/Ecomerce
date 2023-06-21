import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const initialCountdown = Number(sessionStorage.getItem('countdown')) || 60;
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        sessionStorage.removeItem('countdown');
        return;
      }
      setCountdown(prevCountdown => {
        const newCountdown = prevCountdown - 1;
        sessionStorage.setItem('countdown', newCountdown);
        return newCountdown;
      });
    }, 1000);

    if (countdown <= 0) {
      navigate("/");
      sessionStorage.removeItem('countdown');
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [navigate, countdown]);

  return (
    <div style={{ color: "black" }} className="w-full h-screen flex md:flex-row flex-col justify-center items-center ">
      <div className="md:w-1/2 w-full">
        <img className="w-full select-none" src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%20193%20(2).png?alt=media&token=5d658b52-de39-4d8b-98d1-b0d6d2c60443" alt="familia con ropa deportiva" />
      </div>
      <div className="md:w-1/2 md:px-28 px-4 w-full">
        <div className="flex justify-center my-4 text-cyan-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>

        <h1 className="font-bold my-10 md:text-5xl text-3xl">¡Gracias por su compra!</h1>
       
        <p className="text-center">
          Su pedido ha sido procesado exitosamente. En breve recibirá un correo electrónico con la confirmación de su compra. En su perfil puede dejar un comentario y puntuar los productos
        </p>
        <button className="mt-10 mb-4 bg-cyan-400 justify-center items-center flex flex-row h-16 w-full" onClick={() => navigate("/")}>
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <span className="ml-4 text-white">Volver a la tienda </span>

        </button>
          {countdown > 0 ? `(Cierra en ${countdown} segundos)` : ''}
      </div>
    </div>
  );
}