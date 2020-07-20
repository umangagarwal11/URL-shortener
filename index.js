const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ShortUrls = require('./models/shortURL');

mongoose.connect('mongodb+srv://iste.dedq8.mongodb.net/urlShortener?retryWrites=true&w=majority/',{
  dbName:'urlShortener',
  user:'istevit',
  pass:'istevit',
  useNewUrlParser: true, useUnifiedTopology:true
});

app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res) => {
  res.redirect('https://www.youtube.com/channel/UCVRlM9S7LDPyo_mwNpBrnXg/videos');
});

app.get('/admin',async (req,res) =>{
  const shortUrls=await ShortUrls.find();
  res.render('index',{shortUrls:shortUrls});
});

app.post('/admin', async (req,res) => {
  await ShortUrls.create({full:req.body.fullUrl, short:req.body.shortUrl}, function(err){
  res.redirect('/admin');
  });
});

app.get('/:short', async (req,res) => {
  const og= await ShortUrls.findOne({ short:req.params.short});
  if(og == null) return res.sendStatus(404);

  res.redirect(og.full);
});

app.listen(process.env.PORT||5000);
