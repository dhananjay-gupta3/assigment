const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const useRouter = require('./routes/product')

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', useRouter);
app.use('/', useRouter)
app.use('/', useRouter);
app.use('/', useRouter)
app.use('/', useRouter);
app.use('/', useRouter);
app.use('/', useRouter);
app.use('/', useRouter);
app.use('/', useRouter);


app.listen(3001, () => {
    console.log("server is running on port 3001");
})
