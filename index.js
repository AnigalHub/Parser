const axios = require('axios');
const { parse } = require('node-html-parser');

function Parse(){
    axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    axios.get('https://stolichki.ru/search?name=%D0%BA%D0%B5%D1%82%D0%BE%D0%BD%D0%B0%D0%BB')
        .then(response => {
           // console.log(response.data)
            const root = parse(response.data)
            const all = root.querySelectorAll('.product-info')
            const all_title = root.querySelectorAll('.product-title')
            const all_price = root.querySelectorAll('.price-with-discount')
          //  console.log(all_title);console.log(all_price);console.log(all)
            for (let i=0; i< all.length ; i++){
                let title =  all_title[i].childNodes[1].childNodes[0]._rawText;
                let price = all_price[i].childNodes[0]._rawText;
                console.log(title + ": "+ price.split('&')[0] + "руб");
            }
            console.log("  ")
        })
        .catch(
            error => console.log(error)
        );
}
function RandomNumber(min, max, step){
    return step * Math.floor(Math.random() * (max - min) / step + min / step);
}

let timerId = setInterval(() => Parse(), RandomNumber(1000, 60000, 1000));
console.log(timerId)
setTimeout(() => { clearInterval(timerId); }, 60000);