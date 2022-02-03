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
var user_id = [];

var the_id = '';

//console.log('console logging the_id everywhere line 62');

//console.log('the_id in main is ' + the_id + " in line 62");


// create div to show status of authorisation/retrieval process
const status = document.getElementById('status');

// setup authorise link
document.getElementById('authorize').setAttribute('href', 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token&scope=user:read:follows')

function processToken(token) {
    access_token = token;

    status.textContent = 'Got Token. Loading Things';

    myOwn();

    main();

}

//console.log('user id is ' + user_id);
//console.log('access_token is ' + access_token);

// function to call twitch api and return data for visitor's list of followed streamers
function myOwn(id) {

    let code = getId();

    let url = new URL('https://api.twitch.tv/helix/streams/followed?user_id=' + code);
    //console.log(url);
    //console.log(user_id);
    //console.log('the id in myOwn is ' + the_id) + " on line 124";
    //console.log(`code is ${code}`);
    //console.log('same as 768824872');

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
                let user_list = [];
                user_list = resp.data;


                //let resp_length = resp.data.length;
                //document.getElementById('response').textContent = resp_length;

                //console.log(resp.data);
                //console.log(resp.data[0]);
                //console.log(resp.data[0].user_name);
                //console.log(user_list);

                const user_name_list = [];
                const user_login_list = [];
                const view_count_list = [];
                //const pfp_url = [];


                //console.log(user.user_name + " " + user.type + " " + user.title + " " + user.viewer_count);

                function cycle(arr) {
                    arr.forEach(user => {
                        user_name_list.push(user.user_name);
                        user_login_list.push(user.user_login);
                        view_count_list.push(user.viewer_count);

                    });
                }

                cycle(user_list);

                //console.log(user_name_list);
                //console.log(user_login_list);
                //console.log(view_count_list);

                function createUserDiv() {
                    for (let i = 0; i < user_name_list.length; i++) {
                        let div = document.createElement('div');
                        document.getElementById('twitch_extension').appendChild(div);
                        div.classList.add('twitch_div');

                        //let pfp = document.createElement('span');
                        //div.append(pfp);
                        //pfp.classList.add('pfp');

                        let link = document.createElement('a');
                        div.append(link);
                        link.setAttribute('href', `https://www.twitch.tv/${user_login_list[i]}`)

                        let span = document.createElement('span');
                        link.append(span);
                        span.classList.add('twitch_span');

                        let name = document.createElement('p');
                        div.append(name);
                        name.classList.add('name');
                        name.textContent = user_name_list[i];

                        let viewers = document.createElement('p');
                        div.append(viewers);
                        viewers.classList.add('viewers');
                        viewers.textContent = view_count_list[i];
                    }

                }

                createUserDiv();


            } else {
                status.textContent = 'Team Not returned, is the name correct?';
            }
        })
        .catch(err => {
            console.error(err);
            status.textContent = 'An Error Occured loading Teams';
        });


}

function getId() {
    fetch(
        'https://api.twitch.tv/helix/users',
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + access_token
            }
        }
    )
        .then(resp => resp.json())
        .then(resp => {
            //document.getElementById('user_data').innerHTML = `<p>${resp.data[0].id}</p>`;
            let code = resp.data[0].id;
            console.log(code);

            return resp.data[0].id;






            //console.log(resp.data[0].id);
            //console.log(resp.data[0]);
            //console.log(user_id);
        })
        .catch(err => {
            console.log(err);
            document.getElementById('user_data').textContent = 'Something went wrong';
        });
}

let jsondata = [];
let apiURL = 'https://api.twitch.tv/helix/users';

async function getJson(url) {
    let response = await fetch(
        url,
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + access_token
            }
        }
    );
    let data = await response.json();
    console.log(response);
    console.log('before this is response and after is data.data[0[0] and data.data.id');
    console.log(data.data[0][0]);
    console.log(data.data.id);
    console.log(JSON.stringify(data));

    return data;
}

async function main() {
    jsondata = await getJson(apiURL);
    console.log('jsondata[0] is below this');
    console.log(jsondata.data[0].id);
    console.log('jsondata.data[0] above and json data below');
    console.log(jsondata);
    for (let i = 0; i < 5; i++) {
        console.log(jsondata.data[i]);
    }
    
}

console.log(jsondata);

console.log('looking for data.data[0 and deeper hello looking for id and data.data[0[0');
//console.log('user id is ' + user_id);
//console.log('access_token is ' + access_token);

