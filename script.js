const apiKey = 'at_7KFfzWD275dY87Iwx5oAxjsM3HQqn';
var marker; 
let map;

async function getLocation(url1) {
    const response = await fetch(url1); 
    const data = await response.json();
    return {
        "ip": data.ip,
        "location": data.location,
        "isp": data.isp
    };
}

var start_map = ()=> {

    map = L.map('map').setView([51.50, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

}

start_map();//inicializar mapa para empezar a utilizar 

function update_map(viewx, viewy){
    map.setView([viewx, viewy], 19)
    if (marker) {
        map.removeLayer(marker);
    }
     marker = L.marker([viewx, viewy]).addTo(map);

}

function view_ip(){
    const ip = document.getElementById("ip_to_search").value;
    let url1 = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
    getLocation(url1).then(obj => {
        document.getElementById("address").innerText = obj.ip;
        document.getElementById("location").innerText = ` ${obj.location.city}, ${obj.location.region}`;
        document.getElementById("timezone").innerText = `UTC ${obj.location.timezone}`;
        document.getElementById("ISP").innerText = `${obj.isp}`;

        update_map(obj.location.lat, obj.location.lng); 
        //Agregar marcador con coordenadas
    })
}

