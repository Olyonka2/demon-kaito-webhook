import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.post('/webhook', async (req, res) => {
  const message = req.body.message;

  if (message?.text) {
    const chatId = message.chat.id;
    const userText = message.text;

    const reply = generateReply(userText);

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: reply,
    });
  }

  res.sendStatus(200);
});

function generateReply(text) {
  if (text.toLowerCase().includes('привет')) {
    return '😈 Я слышу тебя. Ты звал меня?';
  }
  return `Ты сказал: "${text}". Я уже думаю, что с этим сделать...`;
}

export default app;
