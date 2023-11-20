<script lang="ts" setup>
import { ref } from 'vue';
import { googleMapServices } from "@/api/GoogleService"
import { useMsg } from "@/hooks/useMsg.js"
import { useLoading } from '@/hooks/useLoading';
import { getCurrentTime } from '@/utils/date'
import { useMapStore } from '@/stores/modules/map';

const mapStore = useMapStore()
const { msg, setMsg } = useMsg()
const { loading, loadingOn, loadingOff } = useLoading()
const placeStr = ref<string>("")
const setPlace = (v: any) => {
    placeStr.value = v.name
}
const searchPlace = () => {
    const autoCompleteEle: any = document.getElementById("autoComplete")
    placeStr.value = autoCompleteEle.value
    if (placeStr.value === "") {
        setMsg("Please provide a place.")
        return
    }
    loadingOn()
    googleMapServices.searchPlace(placeStr.value).then((resData: any) => {
        const data = resData.candidates[0]
        const searchRecord: SearchRecord = {
            name: data.name,
            address: data.formatted_address,
            position: {
                lat: data.geometry.location.lat,
                lng: data.geometry.location.lng,
            },
            time: getCurrentTime(),
            checked: false,
            deleted: false
        }
        mapStore.addNewRecord(searchRecord)
        setMsg("")
    }).catch((error: any) => {
        setMsg(error.message)
    }).finally(() => {
        loadingOff()
    })
}

</script>

<template>
    <span class="danger">{{ msg }} </span>
    <div class="form-group has-search needs-validation">
        <span class="form-control-feedback">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
        <GMapAutocomplete v-if="!loading" id="autoComplete" placeholder="input place here..." class="form-control"
            @place_changed="setPlace" v-on:keyup.enter.prevent="searchPlace" required />

        <GMapAutocomplete v-else placeholder="input place here..." class="form-control" disabled />
        <button v-if="!loading" type="submit" class="btn btn-outline-secondary searchButton"
            @click.prevent="searchPlace">Search Place</button>
        <button v-else type="button" class="btn btn-outline-secondary searchButton" @click="searchPlace" disabled>
            <div class="spinner-border spinnerInside" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </div>
</template>

<style scoped> .danger {
     color: rgb(220, 53, 69);
 }

 .has-search .form-control {
     padding-left: 2.375rem;
 }

 .has-search .form-control-feedback {
     position: absolute;
     z-index: 2;
     display: block;
     width: 2.375rem;
     height: 2.375rem;
     line-height: 2.375rem;
     text-align: center;
     pointer-events: none;
     color: #aaa;
 }

 .has-search .recommend {
     width: 100%;
     z-index: 100;
     background-color: aqua;
 }

 .searchButton {
     width: 100%;
     height: 30px;
 }

 .spinnerInside {
     width: 20px;
     height: 20px;
 }
</style>@/hooks/useMsg