<script lang="ts" setup>
import { useMapStore } from '@/stores/modules/map'

const mapStore = useMapStore()

const zoomin = () => { 
    if (mapStore.center.zoom === 20) return
    mapStore.setZoom(mapStore.center.zoom + 1)
}

const zoomout = () => { 
    if (mapStore.center.zoom === 1) return
    mapStore.setZoom(mapStore.center.zoom - 1)
}
</script>

<template>
    <div class="Gmap-container">
        <GMapMap :center="mapStore.center.position" :zoom="mapStore.center.zoom" map-type-id="hybrid" ref="mapRef"
            class="gmap" :options="{
                zoomControl: false,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
            }">
            <GMapMarker :key="index" v-for="(m, index) in mapStore.getMarkers()" :position="m" :clickable="true"
                :draggable="true" @click="mapStore.setCenter(m.lat, m.lng)" />


        <div class="gmap-control-button">
            <button class="btn btn-light" @click="zoomin"> +</button>
            <button class="btn btn-light" @click="zoomout"> - </button>
        </div>
        </GMapMap>

    </div>
</template>

<style scoped> .Gmap-container {
     width: 80%;
     height: 600px;
 }

 .gmap {
    position: relative;
     width: 100%;
     height: 100%;
 }

 .gmap-control-button {
    bottom: 30px;
    right: 20%;
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