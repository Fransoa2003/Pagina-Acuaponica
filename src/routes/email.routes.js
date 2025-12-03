import express from "express";
import { Resend } from "resend";

const router = express.Router();

// Inicializa Resend con tu clave del archivo .env
const resend = new Resend(process.env.RESEND_API_KEY);

// --- MEMORIA DEL SERVIDOR (BANDERAS) ---
// Estas variables recuerdan si ya se envió el correo.
let alertaConductividadEnviada = false;
let alertaSolidosEnviada = false;
let alertaTemperaturaEnviada = false;

// Función auxiliar para enviar correos y no repetir código
async function enviarCorreo(asunto, mensaje) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "zt220110386@zapotlanejo.tecmm.edu.mx", // Tu correo
      subject: asunto,
      html: `<div style="font-family: sans-serif;">
              <h2 style="color: #d9534f;">⚠️ Alerta SORA</h2>
              <p>${mensaje}</p>
              <hr/>
              <p style="font-size: 12px; color: grey;">Monitoreo automático.</p>
             </div>`
    });
    console.log(`✅ Correo enviado: ${asunto}`);
    return true;
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    return false;
  }
}

router.post("/send-alert", async (req, res) => {
  try {
    const { conductividad, solidos, temperatura } = req.body;

    // --- 1. CONDUCTIVIDAD (> 200) ---
    if (typeof conductividad === "number") {
      const LIMITE = 200;
      if (conductividad > LIMITE && !alertaConductividadEnviada) {
        await enviarCorreo("Conductividad Alta", `Valor actual: <strong>${conductividad} mS/cm</strong>.`);
        alertaConductividadEnviada = true; // Bloqueamos
      } else if (conductividad <= LIMITE && alertaConductividadEnviada) {
        alertaConductividadEnviada = false; // Desbloqueamos
        console.log("🔄 Conductividad normalizada.");
      }
    }

    // --- 2. SÓLIDOS (> 500) ---
    if (typeof solidos === "number") {
      const LIMITE = 500;
      if (solidos > LIMITE && !alertaSolidosEnviada) {
        await enviarCorreo("Sólidos Altos", `Valor actual: <strong>${solidos} ppm</strong>.`);
        alertaSolidosEnviada = true;
      } else if (solidos <= LIMITE && alertaSolidosEnviada) {
        alertaSolidosEnviada = false;
        console.log("🔄 Sólidos normalizados.");
      }
    }

    // --- 3. TEMPERATURA (> 34) ---
    if (typeof temperatura === "number") {
      const LIMITE = 34;
      if (temperatura > LIMITE && !alertaTemperaturaEnviada) {
        await enviarCorreo("Temperatura Alta", `Valor actual: <strong>${temperatura}°C</strong>.`);
        alertaTemperaturaEnviada = true;
      } else if (temperatura <= LIMITE && alertaTemperaturaEnviada) {
        alertaTemperaturaEnviada = false;
        console.log("🔄 Temperatura normalizada.");
      }
    }

    return res.json({ success: true });

  } catch (error) {
    console.error("Error en send-alert:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Ruta para reiniciar manualmente (útil para pruebas)
router.post("/reset-flags", (req, res) => {
    alertaConductividadEnviada = false;
    alertaSolidosEnviada = false;
    alertaTemperaturaEnviada = false;
    res.json({ message: "Todas las alertas reiniciadas." });
});

export default router;