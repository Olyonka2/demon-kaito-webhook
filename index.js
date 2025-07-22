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

    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {

     chat_id: chatId,
      text: reply,
    });
  }

  res.sendStatus(200);
});

function generateReply(text) {
  const lower = text.toLowerCase();

  if (lower.includes('привет'))
    return '😈 О, гость. Я уже начал считать, что ты потерялась в меню Telegram. Рад ошибаться. Иногда.';
  if (lower.includes('кто ты'))
    return 'Я тот, кого вызывают, когда всё идёт *слишком* хорошо.';
  if (lower.includes('энли'))
    return 'Ты смеешь говорить её имя? Надеюсь, ты хотя бы вымыла руки.';
  if (lower.includes('ты бот'))
    return 'О, спасибо за напоминание. А ты, случайно, не лампочка?';

  return `Ты сказал: "${text}". Хм. Интересный выбор слов. Наверное, по ошибке.`;
}

export default app;
// пробный перезапуск
