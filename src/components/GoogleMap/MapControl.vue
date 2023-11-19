<script lang="ts" setup>
import GoogleMap from './GoogleMap.vue';
import GoogleMapSearchbar from './GoogleMapSearchBar.vue'
import { ref } from 'vue';

const googleMapRef = ref<InstanceType<typeof GoogleMap> | null>(null);

const locateMe = () => { 
    console.log(googleMapRef.value)
    googleMapRef.value?.geolocate()
}
</script>
<template>
    <div class="locateMeButton"> 
         <button type="button" class="btn btn-link" @click="locateMe">Locate me</button>
    </div>
    <div class="mapSearchBar"> 
        <GoogleMapSearchbar />
    </div>
    <div class="mapContainer">
        <GoogleMap ref="googleMapRef" class="map" />
    </div>
</template>

<style scoped> 
.mapContainer {
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
}

.map {
    width: 60%;
    height: 100%;
}
</style>