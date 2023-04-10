import { Component, OnInit } from '@angular/core';

declare var google: { maps: { Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; disableDefaultUI: boolean; }) => any; InfoWindow: new () => any; ControlPosition: { TOP_CENTER: string | number; }; event: { addListenerOnce: (arg0: any, arg1: string, arg2: () => void) => void; }; }; }

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  public map: any = google.maps.Map;

  constructor() { }

  ngOnInit() { }

  async loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: any = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 21.883182, lng: -102.295248};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
      disableDefaultUI: true,
    });

    const infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "¿Quieres Saber Tu Ubicación?";
    locationButton.classList.add("btn");
    locationButton.classList.add("btn-dark");
    locationButton.classList.add("btn-lg");
    locationButton.classList.add("mt-3");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('<div class="fs-2 fw-bold black btn-dark p-2 rounded"> ¡Estas Aqui Bro...! <i class="fa-solid fa-location-dot"></i> </div>');
            infoWindow.open(this.map);
            this.map.setCenter(pos);
          }
        );
      }
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      /this.renderMarkers();/
      mapEle.classList.add('show-map');
    });
  }
}

/*import { Component, OnInit} from '@angular/core';
  declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number
  }
  title: string
}

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  //public map: any = google.maps.Map;

  map = null

  markers: Marker[] = [
    {
      position: {
        lat: 21.92272827,
        lng: -102.29043457,
      },
      title: 'Centro Comercial Altaria'
    },
    {
      position: {
        lat: 21.83955579,
        lng: -102.35321697,
      },
      title: 'Universidad Tecnológica de Aguascalientes'
    },
    {
      position: {
        lat: 21.86131213,
        lng: -102.32097222,
      },
      title: 'Isla San Marcos'
    },
    {
      position: {
        lat: 21.87956607,
        lng: -102.30289454,
      },
      title: 'Jardín de San Marcos'
    },
    {
      position: {
        lat: 21.87753419294136,
        lng: -102.30392690884104,
      },
      title: 'Instalaciones de la Feria de San Marcos'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.loadMap()
  }

  loadMap(){
    const mapEle: HTMLElement = document.getElementById('map')
    const myLatLng = {lat: 21.891165, lng: -102.265913}

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    })

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map')
    })
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker){
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    })
  }
}*/
