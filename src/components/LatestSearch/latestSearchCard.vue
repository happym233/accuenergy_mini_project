<script lang="ts" setup>
import { googleMapServices } from '@/api/GoogleService';
import { useLoading } from '@/hooks/useLoading';
import { useMapStore } from '@/stores/modules/map';
import { ref, watch } from 'vue';

interface TimeZoneData {
    dstOffset: number
    rawOffset: number
    status: string
    timeZoneId: string
    timeZoneName: string
}

const mapStore = useMapStore()
const { loading, loadingOn, loadingOff } = useLoading()
const timezoneData = ref<TimeZoneData|null>(null)

const getTimezone = () => {
    loadingOn()
    if (mapStore.latestRecord === null) return
    googleMapServices.searchTimeZone(mapStore.latestRecord.position).then((data: any) => {
        timezoneData.value = data as TimeZoneData
    }).finally(() => { 
        loadingOff()
    })
}

watch(() => mapStore.latestRecord, getTimezone)
</script>

<template>
    <div v-if="mapStore.latestRecord == null" class="card">
    </div>
    <div v-else-if="loading" class="card">
    </div>
    <div v-else class="card">
        <div class="card-body">
            <h5 class="card-title">{{ mapStore.latestRecord.name }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ mapStore.latestRecord.address }}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ timezoneData?.timeZoneId }}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ timezoneData?.timeZoneName }}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                content.</p>
        </div>
    </div>
</template>