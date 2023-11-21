<script lang="ts" setup>
import { useMapStore } from '@/stores/modules/map';
import { useMsg } from '@/hooks/useMsg';
import { useLoading } from '@/hooks/useLoading';

const { loading, loadingOn, loadingOff } = useLoading()
const { msg, setMsg } = useMsg()
const mapStore = useMapStore()

const geolocate = () => {
    loadingOn()
    navigator.geolocation.getCurrentPosition((position) => {
        mapStore.setCenter(position.coords.latitude, position.coords.longitude)
        mapStore.setZoom(16)
        setMsg(`Your location: latitude ${position.coords.latitude.toFixed(2)}, longitude ${position.coords.longitude.toFixed(2)}`)
        loadingOff()
    });
}

</script>

<template>
    <div class="locate-me-btn-container">
        <div class="locate-me-btn">
            <button v-if="!loading" type="button" class="btn btn-outline-secondary" @click="geolocate"> Locate me</button>
            <button v-else type="button" class="btn btn-link" disabled>
                <div class="spinner-border" style="width: 20px;height: 20px;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
        </div>
        <div v-if="msg !== ''" class="alert alert-primary msg-container" role="alert">
            {{ msg }}
        </div>
    </div>
</template>

<style scoped>
.locate-me-btn-container {
    margin: 5px 10px;
}

.locate-me-btn {
    align-items: center;
    width: 25%;
    height: 50px;
}

.msg-container {
    align-items: center;
    width: 75%;
    height: 50px;
}
</style>