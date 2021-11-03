const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('feedback1')
})
<<<<<<< Updated upstream
app.post('', ()=>{
    
})
=======



>>>>>>> Stashed changes
app.get('/feedback2', (req, res) => {
    res.render('feedback2')
})

app.listen(port, ()=> console.info('listening on 5000'));