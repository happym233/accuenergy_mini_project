<script lang="ts" setup>
import { reactive, ref } from 'vue';

interface MapPosition {
    position: Position
}

const center = reactive<MapPosition>({
    //ottawa
    position: {
        lat: 45.4215,
        lng: -75.6972
    }
})
const markers = ref<MapPosition[]>([])
const zoom = ref<number>(7)

const geolocate = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        center.position.lat = position.coords.latitude
        center.position.lng = position.coords.longitude
        zoom.value = 14
    });
}

defineExpose({geolocate})

</script>

<template>
    <GMapMap :center="center.position" :zoom="zoom" map-type-id="hybrid" ref="mapRef" class="Gmap">
        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true"
            @click="center.position = m.position" />
    </GMapMap>
</template>

<style scoped> 
.Gmap {
    width: 100%;
    height: 100%;
}
</style>