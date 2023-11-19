<script lang="ts" setup>
    import { useMapStore } from '@/stores/modules/map';
    import { useLoading } from '@/hooks/useLoading';
    const { loading, loadingOn, loadingOff } = useLoading();
    const mapStore =  useMapStore()

const geolocate = () => { 
    loadingOn()
    navigator.geolocation.getCurrentPosition((position) => {
        mapStore.setCenter(position.coords.latitude,  position.coords.longitude)
        mapStore.setZoom(14)
        loadingOff()
        console.log(mapStore.center.zoom)
    });
}

</script>

<template> 
    <button v-if="!loading" type="button" class="btn btn-link" @click="geolocate"> Locate me</button>
    <button v-else type="button" class="btn btn-link" disabled> 
            <div class="spinner-border" style="width: 20px;height: 20px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
    </button>
</template>