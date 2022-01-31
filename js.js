//scripts for crypto prices

let xrp = new WebSocket('wss://stream.binance.com:9443/ws/xrpusdt@trade');
let stockPriceElement = document.getElementById('stock-price1');
let lastPrice = null;

xrp.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);
    xrpPrice = price;
    stockPriceElement.innerText = `XRP: ${price}`;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? '#fff' : price > lastPrice ? 'green' : 'red';
    lastPrice = price;

}

let shib = new WebSocket('wss://stream.binance.com:9443/ws/shibusdt@trade');
let stockPriceElement2 = document.getElementById('stock-price2');
let lastPrice2 = null;

shib.onmessage = (event) => {
    let stockObject2 = JSON.parse(event.data);
    let price2 = parseFloat(stockObject2.p).toFixed(6);
    stockPriceElement2.innerText = "SHIB: " + price2;
    stockPriceElement2.style.color = !lastPrice2 || lastPrice2 === price2 ? '#fff' : price2 > lastPrice2 ? 'green' : 'red';
    lastPrice2 = price2;
}

let quant = new WebSocket('wss://stream.binance.com:9443/ws/qntusdt@trade');
let stockPriceElement3 = document.getElementById('stock-price3');
let lastPrice3 = null;

quant.onmessage = (event) => {
    let stockObject3 = JSON.parse(event.data);
    let price3 = parseFloat(stockObject3.p).toFixed(1);
    stockPriceElement3.innerText = "QUANT: " + price3;
    stockPriceElement3.style.color = !lastPrice3 || lastPrice3 === price3 ? '#fff' : price3 > lastPrice3 ? 'green' : 'red';
    lastPrice3 = price3;
}

let xlm = new WebSocket('wss://stream.binance.com:9443/ws/xlmusdt@trade');
let stockPriceElement4 = document.getElementById('stock-price4');
let lastPrice4 = null;

xlm.onmessage = (event) => {
    let stockObject4 = JSON.parse(event.data);
    let price4 = parseFloat(stockObject4.p).toFixed(2);
    stockPriceElement4.innerText = "XLM: " + price4;
    stockPriceElement4.style.color = !lastPrice4 || lastPrice4 === price4 ? '#fff' : price4 > lastPrice4 ? 'green' : 'red';
    lastPrice4 = price4;
}

// personal twitch id / redirect
var client_id = 'jm9omolnvrbdhe7i9k774xys65k5ec';
var redirect = 'https://dm16g12.github.io';
// setup a memory space for the token/userID
var access_token = '';
var user_id = '';


// create div to show status of authorisation/retrieval process
const status = document.getElementById('status');

// setup authorise link
document.getElementById('authorise').setAttribute('href', 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token&scope=user:read:follows')

function processToken(token) {
    access_token = token;

    status.textContent = 'Got Token. Loading Things';

    myOwn(60600844);

}

// function to call twitch api and return data for visitor's list of followed streamers
function myOwn(id) {
    let url = new URL('https://api.twitch.tv/helix/streams/followed?user_id=60600844');


    fetch(
        url,
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + access_token
            }
        }
    )
        .then(resp => resp.json())
        .then(async resp => {

            if (resp.data.length > 0) {
                let team = resp.data;
                let user_list = []
                user_list = resp.data;


                let resp_length = resp.data.length;
                document.getElementById('response').textContent = resp_length;

                console.log(resp.data);
                console.log(resp.data[0]);
                console.log(resp.data[0].user_name);
                console.log(user_list);

                user_list.forEach(user => {
                    console.log(user.user_name + " " + user.type + " " + user.title + " " + user.viewer_count);
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    link.setAttribute('href', `https://www.twitch.tv/${user.user_login}`);
                    link.appendChild(li);
                    li.appendChild(document.createTextNode(`${user.user_name} ${user.viewer_count}`));
                    document.querySelector('ul.collection').appendChild(link);

                });


            } else {
                status.textContent = 'Team Not returned, is the name correct?';
            }
        })
        .catch(err => {
            console.error(err);
            status.textContent = 'An Error Occured loading Teams';
        });


}

