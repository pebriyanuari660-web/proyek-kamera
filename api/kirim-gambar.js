const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageBase64 } = req.body;

    try {
      // Mengirim event 'gambar-baru' ke channel 'kamera-channel'
      await pusher.trigger("kamera-channel", "gambar-baru", {
        image: imageBase64,
        waktu: new Date().toLocaleTimeString()
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Gagal mengirim gambar" });
    }
  } else {
    res.status(405).json({ message: "Metode tidak diizinkan" });
  }
}
