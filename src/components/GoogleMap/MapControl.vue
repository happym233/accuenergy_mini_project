<script lang="ts" setup>
import GoogleMap from './GoogleMap.vue';
import GoogleMapSearchbar from './GoogleMapSearchBar.vue'
import LocateMeButton from './LocateMeButton.vue';
</script>
<template>
    <div class="locateMeButton"> 
        <LocateMeButton />
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
    display: flex;
    justify-content: center;
}

</style>