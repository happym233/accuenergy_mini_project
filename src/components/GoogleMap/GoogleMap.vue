<script lang="ts" setup>
import { ref } from 'vue';
import { useMapStore } from '@/stores/modules/map'

const mapStore = useMapStore()

const mapRef = ref<any>()

const zoomin = () => {
    if (mapStore.center.zoom === 19) return
    mapRef.value.$gmapApiPromiseLazy().then((google: any) => console.log(google.maps.places))
    mapStore.setZoom(mapStore.center.zoom + 1)
}

const zoomout = () => {
    if (mapStore.center.zoom === 1) return
    mapStore.setZoom(mapStore.center.zoom - 1)
}
</script>

<template>
    <div class="Gmap-container ">
        <GMapMap :center="mapStore.center.position" :zoom="mapStore.center.zoom" map-type-id="hybrid" ref="mapRef"
            class="gmap" :options="{
                zoomControl: false,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
            }">
            <GMapMarker :key="index" v-for="(m, index) in mapStore.getMarkers()" :position="m" :clickable="true"
                :draggable="true" @click="mapStore.setCenter(m.lat, m.lng)" />


            <!--naive google map zoom button would overwrite zoom property-->
            <div class="gmap-control-button">
                <button class="btn btn-light" @click="zoomout">-</button>
                <button class="btn btn-light" @click="zoomin">+</button>
            </div>
        </GMapMap>

    </div>
</template>

<style scoped> .Gmap-container {
     width: 100%;
     height: 600px;
 }

 .gmap {
     position: relative;
     width: 100%;
     height: 100%;
 }

 .gmap-control-button {
     bottom: 15px;
     left: 50%;
     margin-left: -80px;
     position: absolute;
 }

 .gmap-control-button button {
     margin: 10px;
     width: 50px;
     height: 50px;
     font-size: 25px;
     font-weight: 500;
 }
</style>