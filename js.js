let defaultC = '#212121';

var counter = 0;

var checkbox = document.querySelector('input[name=theme]');

var toggle1 = document.querySelectorAll('.toggle1');
var darkMode = document.querySelectorAll('dark_mode');


checkbox.addEventListener('change', function () {
    if (this.checked) {
        window.pJSDom[0].pJS.particles.line_linked.color = "#eeeeee";
        window.pJSDom[0].pJS.fn.particlesRefresh();
        counter += 1;
        console.log('screen is black ' + counter);
        defaultC = '#eeeeee';
        $(this).parentsUntil(".container-fluid")
       
    } else {
        window.pJSDom[0].pJS.particles.line_linked.color = '#212121';
        window.pJSDom[0].pJS.fn.particlesRefresh();
        counter += 1;
        console.log('screen is white ' + counter);
        defaultC = '#212121';
        $(this).parentsUntil("#first-layout")
       
    }

    $(this).parentsUntil(".container-fluid")
       .find(".toggle1").toggleClass("dark_mode");
});


//function to make right column expand on span click

$('#expand').on('click', function () {
    $('#right_column').toggleClass('expanded');
    $('#arrow1').toggleClass('twist');
    $('#arrow2').toggleClass('twist');
});

//scripts for crypto prices

let xrp = new WebSocket('wss://stream.binance.com:9443/ws/xrpusdt@trade');
let stockPriceElement = document.getElementById('stock-price1');
let lastPrice = null;

xrp.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let price = parseFloat(stockObject.p).toFixed(2);
    xrpPrice = price;
    stockPriceElement.innerText = `XRP: ${price}`;
    stockPriceElement.style.color = !lastPrice || lastPrice === price ? defaultC : price > lastPrice ? 'green' : 'red';
    lastPrice = price;

}

let shib = new WebSocket('wss://stream.binance.com:9443/ws/shibusdt@trade');
let stockPriceElement2 = document.getElementById('stock-price2');
let lastPrice2 = null;

shib.onmessage = (event) => {
    let stockObject2 = JSON.parse(event.data);
    let price2 = parseFloat(stockObject2.p).toFixed(6);
    stockPriceElement2.innerText = "SHIB: " + price2;
    stockPriceElement2.style.color = !lastPrice2 || lastPrice2 === price2 ? defaultC : price2 > lastPrice2 ? 'green' : 'red';
    lastPrice2 = price2;
}

let quant = new WebSocket('wss://stream.binance.com:9443/ws/qntusdt@trade');
let stockPriceElement3 = document.getElementById('stock-price3');
let lastPrice3 = null;

quant.onmessage = (event) => {
    let stockObject3 = JSON.parse(event.data);
    let price3 = parseFloat(stockObject3.p).toFixed(1);
    stockPriceElement3.innerText = "QUANT: " + price3;
    stockPriceElement3.style.color = !lastPrice3 || lastPrice3 === price3 ? defaultC : price3 > lastPrice3 ? 'green' : 'red';
    lastPrice3 = price3;
}

let xlm = new WebSocket('wss://stream.binance.com:9443/ws/xlmusdt@trade');
let stockPriceElement4 = document.getElementById('stock-price4');
let lastPrice4 = null;

xlm.onmessage = (event) => {
    let stockObject4 = JSON.parse(event.data);
    let price4 = parseFloat(stockObject4.p).toFixed(2);
    stockPriceElement4.innerText = "XLM: " + price4;
    stockPriceElement4.style.color = !lastPrice4 || lastPrice4 === price4 ? defaultC : price4 > lastPrice4 ? 'green' : 'red';
    lastPrice4 = price4;
}

// personal twitch id / redirect
var client_id = 'jm9omolnvrbdhe7i9k774xys65k5ec';
var redirect = 'https://dm16g12.github.io';
// setup a memory space for the token/userID
var access_token = '';

//function to put commas in viewer count
function commaify(num) {
    var num_string,
        i,
        len,
        threes = [],
        remainders;

    num_string = num.toString();
    len = num_string.length;
    remainders = len % 3;


    if (remainders != 0) {
        threes.push(num_string.substr(0, remainders));
    }

    for (i = remainders; i < len; i += 3) {
        threes.push(num_string.substr(i, 3));
    }

    return threes.join();
}


// create div to show status of authorisation/retrieval process
const status = document.getElementById('status');

// setup authorise link
document.getElementById('authorize').setAttribute('href', 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token&scope=user:read:follows')

function processToken(token) {
    access_token = token;

    status.textContent = 'Got Token. Loading Things';

    myOwn();

    //$('#card').toggleClass('hidden');
    //$('#twitch_wrap').toggleClass('hidden');

}

function getUsers(users_ids) {
    let url = new URL('https://api.twitch.tv/helix/users');

    url.search = new URLSearchParams(users_ids).toString();

    console.log('getUsers(users_id) below and users_id.toString beneath');
    console.log(users_ids);
    console.log(users_ids.toString());

    return fetch(
        url,
        {
            "headers": {
                "Client-ID": client_id,
                "Authorization": "Bearer " + access_token
            }
        }
    )
        .then(resp => resp.json())
}

// function to call twitch api and return data for visitor's list of followed streamers
async function myOwn() {

    let code = await getJson(apiURL);
    let code1 = code.data[0].id;

    let url = new URL('https://api.twitch.tv/helix/streams/followed?user_id=' + code1);

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


                const user_name_list = [];
                const user_login_list = [];
                const view_count_list = [];
                const title_list = [];
                const id_search_params = [];
                const pfp_list = [];

                //console.log(user_list);
                //console.log(user.user_name + " " + user.type + " " + user.title + " " + user.viewer_count);

                function cycle(arr) {
                    arr.forEach(user => {
                        user_name_list.push(user.user_name);
                        user_login_list.push(user.user_login);
                        view_count_list.push(user.viewer_count);
                        title_list.push(user.title);
                        id_search_params.push(['id', user.user_id]);


                    });
                    console.log(id_search_params);
                }

                cycle(user_list);

                await getUsers(id_search_params)
                    .then(resp => {
                        if (resp.data.length > 0) {

                            resp.data.forEach(profile => {
                                pfp_list.push(profile.profile_image_url);
                            });
                            console.log('here is pfp_list');
                            console.log(pfp_list);

                        } else {
                            // no one on this page live
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        status.textContent = 'Failed to load streams';
                    });


                function createUserDiv() {
                    for (let i = 0; i < user_name_list.length; i++) {

                        let tester_container = document.createElement('div');
                        document.getElementById('twitch_extension').appendChild(tester_container);
                        tester_container.classList.add('tester_container toggle1');

                        let tester_link = document.createElement('a');
                        tester_container.append(tester_link);
                        tester_link.setAttribute('href', `https://www.twitch.tv/${user_login_list[i]}`);
                        tester_link.classList.add('tester_link');

                        let pfp = document.createElement('span');
                        tester_link.append(pfp);
                        pfp.classList.add('tester_pfp');
                        pfp.style.backgroundImage = `url('${pfp_list[i]}')`;

                        let tester_tri = document.createElement('div');
                        tester_link.append(tester_tri);
                        tester_tri.classList.add('tester_tri_cont');

                        let name_tit_container = document.createElement('div');
                        tester_tri.append(name_tit_container);
                        name_tit_container.classList.add('name_tit_container');

                        let name = document.createElement('div');
                        name.classList.add('name');
                        let name_content = document.createElement('p');
                        name_content.innerText = user_name_list[i];
                        name.append(name_content);
                        name_tit_container.append(name);

                        let title = document.createElement('div');
                        let title_content = document.createElement('p');
                        title_content.textContent = title_list[i];
                        title.append(title_content);
                        title.classList.add('tit');
                        name_tit_container.append(title);

                        let viewers = document.createElement('div');
                        tester_tri.append(viewers);
                        viewers.classList.add('tester_viewers');

                        let red = document.createElement('span');
                        viewers.append(red);
                        red.classList.add('red_button');

                        let viewer_count = document.createElement('div');
                        viewers.append(viewer_count);
                        let count_number = document.createElement('span');
                        viewer_count.appendChild(count_number);
                        count_number.innerText = commaify(view_count_list[i]);


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

let jsondata = '';
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

    return data;
}

//console.log('first working edn');

