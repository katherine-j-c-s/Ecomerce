import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Unsuccess() {
  const navigate = useNavigate();
  const initialCountdown = Number(sessionStorage.getItem('countdownRejected')) || 60;
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        sessionStorage.removeItem('countdownRejected');
        return;
      }
      setCountdown(prevCountdown => {
        const newCountdown = prevCountdown - 1;
        sessionStorage.setItem('countdownRejected', newCountdown);
        return newCountdown;
      });
    }, 1000);

    if (countdown <= 0) {
      navigate("/");
      sessionStorage.removeItem('countdownRejected');
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [navigate, countdown]);

  return (
    <div style={{ color: "black" }} className="w-full h-screen flex md:flex-row flex-col justify-center items-center ">
      <div className="md:w-1/2 w-full">
        <img className="w-full select-none" src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%20194.png?alt=media&token=b41edf2b-1398-4004-81b0-c9bea0cdf501" alt="familia con ropa deportiva" />
      </div>
      <div className="md:w-1/2 md:px-28 px-4 w-full">
        <div className="flex justify-center my-4 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>

        </div>

        <h1 className="font-bold my-10 md:text-5xl text-3xl">Compra rechazada</h1>
       
        <p className="text-center">
            Lo sentimos, tu transacción no se ha podido completar en este momento. Por favor, verifica los detalles de tu método de pago e intenta nuevamente. Si el problema persiste, contacta a nuestro equipo de soporte. ¡Gracias por tu comprensión!
        </p>
        <button className="mt-10 mb-4 bg-cyan-400 justify-center items-center flex flex-row h-16 w-full" onClick={() => navigate("/")}>
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

          </div>
          <span className="ml-4 text-white">Volver a comprar </span>

        </button>
          {countdown > 0 ? `(Cierra en ${countdown} segundos)` : ''}
      </div>
    </div>
  );
}