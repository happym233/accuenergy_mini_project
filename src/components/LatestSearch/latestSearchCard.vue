<script lang="ts" setup>
import { googleMapServices } from '@/api/GoogleService';
import { useLoading } from '@/hooks/useLoading';
import { useMapStore } from '@/stores/modules/map';
import { onBeforeUnmount, ref, watch } from 'vue';
import { getTimezoneTime } from '@/utils/date';

interface TimeZoneData {
    dstOffset: number
    rawOffset: number
    status: string
    timeZoneId: string
    timeZoneName: string
}

const mapStore = useMapStore()
const { loading, loadingOn, loadingOff } = useLoading()
const timezoneData = ref<TimeZoneData | null>(null)
const dateStr = ref<string>("")
const interval = ref<any>()

const getTimezone = () => {
    if (mapStore.latestRecord === null) return
    loadingOn()
    clearClock()
    googleMapServices.searchTimeZone(mapStore.latestRecord.position).then((data: any) => {
        timezoneData.value = data as TimeZoneData
        startClock()
    }).finally(() => {
        loadingOff()
    })
}

const updateTime = () => {
    dateStr.value = getTimezoneTime(timezoneData.value?.dstOffset!, timezoneData.value?.rawOffset!)
}

const startClock = () => {
    interval.value = setInterval(updateTime, 1000)
}

const clearClock = () => {
    clearInterval(interval.value)
}

watch(() => mapStore.latestRecord, getTimezone)
onBeforeUnmount(clearClock)
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
            <hr />
            <h5 class="card-subtitle mt-3 mb-2 text-body-secondary">Local time: </h5>
            <p class="card-text date">{{ dateStr.split(" ")[0] }}</p>
            <p class="card-text time">{{ dateStr.split(" ")[1] }}</p>
        </div>
    </div>
</template>

<style scoped> .date {
     margin-top: 20px;
     font-family: sans-serif;
     font-size: 20px;
     font-weight: 600;
 }

 .time {
     font-family: sans-serif;
     font-size: 40px;
     font-weight: 800;
 }
</style>

