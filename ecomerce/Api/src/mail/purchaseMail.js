const nodemailer = require("nodemailer")
const nodemailerConfig = require("./nodemailerConfig")

const sendPurchaseMail = async (email, orderId, data) => {
    let template = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        .container {
          max-width: 600px;
          box-shadow: 16px 16px rgba(0,0,0,.2);
          margin: auto;
          padding: 20px;
          border: 1px solid #31B5FF;
          border-radius: 10px;
          margin-top: 100px;
          margin-bottom: 100px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
        }
        .content {
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 14px;
          color: #888888;
        }
        .title {
          color: #31B5FF;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/image%2054.png?alt=media&token=2ce714d1-43f2-4134-9679-ed204166a77b" alt="sportwear">
          <h2 class="title">¡Gracias por tu compra!</h2>
        </div>
        <div class="content">
          <p>Hola!</p>
          <p>¡Nos complace confirmar que tu pedido ha sido recibido con éxito! Ahora estamos preparándolo para que llegue a tu puerta. Gracias por escoger nuestra tienda para adquir sus productos❤️ </p>
          <p>Tu número de pedido es: ${orderId}.</p>
          <p>Tus productos son:</p>
          <ul>
            ${data?.map(el => `<li>${el.title}</li>`).join('')}
          </ul>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <p>¡Muchas gracias por elegirnos!</p>
        </div>
        <div class="footer">
          <p>SportWear® | Henry | sportwear.group@gmail.com</p>
        </div>
      </div>
    </body>
    </html>`

    let message = {
        from: 'sportwear@app.com',
        to: email,
        subject: 'SportWear® compra',
        html: template,
    }

    let transport = nodemailer.createTransport(nodemailerConfig)
    return await transport.sendMail(message)
}

module.exports = sendPurchaseMail