function sendAddress() {
    let addressInformation = document.getElementById("addressData");
    let numberData = document.getElementById("numberData");
    numberData.classList.remove("hidden");
    addressInformation.classList.add("hidden");
}
function sendNumber() {
    let numberData = document.getElementById("numberData");
    let successInformation = document.getElementById("success-information");
    successInformation.classList.remove("hidden")
    numberData.classList.add("hidden");
}

function initMap(latitude, longitude){
    let fillAddress = true;
    if (isEmptyVariable(latitude) || isEmptyVariable(longitude)){
        latitude = 6.42375;
        longitude = -66.58973;
        fillAddress = false;
    }
    const vzlaCoords = {lat: latitude, lng: longitude};
    const mpDiv = document.getElementById("map");
    mpDiv.innerHTML= "!!! Hola !!!";
    let map = new google.maps.Map(mpDiv, {
        center: vzlaCoords,
        zoom: 16, 
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false
    });
    let marker = new google.maps.Marker({
        position: vzlaCoords,
        map: map,
        draggable: true
    });
    marker.addListener('click', () => {
        marker.getMap().setZoom(16)
        marker.getMap().setCenter(marker.getPosition())
    });
    marker.addListener('dragend', () => {
        marker.getMap().setZoom(16);
        marker.getMap().setCenter(marker.getPosition());
        getAddressDirectionByCoords(marker);
    });
    initAutocomplete(map, marker);
    return marker;
}

/** Obtiene la dirección desde las coordenadas del marcador.
 */
function getAddressDirectionByCoords(marker)
{
    const geocoder = new google.maps.Geocoder()
    console.log('getAddressDirectionByCoords');
    console.log(marker);
    geocoder.geocode({location: marker.getPosition()})
        .then(({results})=> {
            const { address_components, formatted_address, geometry, place_id, plus_code } =
                results[0]
            console.log(formatted_address);
            document.getElementById("place_input").value = formatted_address;
        }
        ).catch((e) => console.log("Geocoder failed due to: " + e)); 
}

/** Inicializa el autoComplete en el campo de dirección. */
function initAutocomplete(map, marker){
    let autocomplete;
    const input = document.getElementById("place_input");
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function(){
        const place = autocomplete.getPlace();
        //console.log(place);
        map.setCenter(place.geometry.location);
        map.setZoom(18);
        marker.setPosition(place.geometry.location);
    })
}

/** Obtiene las coordenadas a partir de las coordenadas del navegador. */
function getUbication() {
    console.log("Esta es mi ubicación.");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({coords : {latitude, longitude}}) => {
                const coords = {
                    lat: latitude,
                    lng: longitude
                };
                //console.log(coords);
                let marker = initMap(latitude, longitude);
                getAddressDirectionByCoords(marker);
            },
            () => {
                console.log("Ocurrio un error obteniendo la dirección de tu navegador.");
            }
        );
    } else {
        console.log("Tu navegador no dispone de geolocalización.");
    }
}
/** NOTE: Usar esta función desde el site. */
function isEmptyVariable(variable) {
	if (variable === null || variable === 'null') return true
	if (variable === undefined || variable === 'undefined') return true
	if (variable === '') return true
	if (typeof variable === 'object') {
		if (
			variable.nodeName !== '' &&
			variable.nodeName !== undefined &&
			variable.nodeName !== null
		)
			return false
		return Object.entries(variable).length === 0
	}
	return false
}