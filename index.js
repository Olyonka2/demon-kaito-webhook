export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("Got a message:", JSON.stringify(body));

    const chatId = body.message?.chat?.id;
    const messageText = body.message?.text;

    if (chatId && messageText) {
      const BOT_TOKEN = process.env.BOT_TOKEN;
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Ты написал: ${messageText}`,
        }),
      });
    }

    res.status(200).send("ok");
  } else {
    res.status(200).send("Noxis — тих и холоден");
  }
}

