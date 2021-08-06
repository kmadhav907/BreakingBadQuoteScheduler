import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import connectDB from './Db.js';
import { Email } from './EmailModel.js';
import { isValid, sendEmail } from './operations.js';
import cron from 'node-cron';

const app = express();
var error = '';
connectDB();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('Home', { error: error });
});

app.post(
  '/',
  asyncHandler(async (req, res) => {
    error = '';
    let email = req.body.email;

    if (isValid(email)) {
      const emailInDB = await Email.findOne({ email });
      if (emailInDB) {
        error = 'EMAIL Already existed';
        res.redirect('/');
      }
      const newEmail = await Email.create({ email });
      res.redirect('/done');
    } else {
      error = 'EMAIL IS NOT IN THE FORMAT';
      res.redirect('/');
    }
  })
);

app.get('/done', (req, res) => {
  res.render('Done');
});

app.listen(4000, () => {
  console.log('Server is running smoothly');
});

const scheduleMail = async () => {
  const response = await axios.get(
    'https://www.breakingbadapi.com/api/quote/random'
  );
  const quote = response.data.quote;
  const emailList = await Email.find({});
  emailList.map(async (email) => {
    try {
      await sendEmail(email.email, quote);
    } catch (error) {
      console.log(error);
    }
  });
};
