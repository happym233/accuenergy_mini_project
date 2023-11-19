<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { googleMapServices } from "@/api/GoogleService"
import { useSearchMsg } from "@/hooks/useSearchMsg"
const placeTxt = ref<string>("")
const setPlace = (v: any) => {
    placeTxt.value = v.name
}
const { searchMsg, handleMsgChange } = useSearchMsg()
const searchPlace = () => {
    console.log(placeTxt)
    console.log(googleMapServices)
    googleMapServices.searchPlace(placeTxt.value).then((data: any) => {
        console.log(data)
        handleMsgChange(data)
        console.log(searchMsg)
    }).catch((error: any) => {
        handleMsgChange(error)
    }
    )
}

</script>

<template>
    <span>{{ searchMsg }} </span>
    <div class="form-group has-search needs-validation">
        <span class="form-control-feedback">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
        <GMapAutocomplete placeholder="input place here..." class="form-control" @place_changed="setPlace"
            v-on:keyup.enter.prevent="searchPlace" required />

        <GMapAutocomplete placeholder="input place here..." class="form-control" @place_changed="setPlace"
            v-on:keyup.enter.prevent="searchPlace" disabled />
        <button type="submit" class="btn btn-outline-secondary" @click.prevent="searchPlace"
            style="width: 80%; height: 30px;">Search Place</button>
        <button type="button" class="btn btn-outline-secondary" @click="searchPlace" style="width: 80%; height: 30px;"
            disabled>

            <div class="invalid-feedback">
                Please provide a valid place.
            </div>

            <div class="spinner-border" style="width: 20px;height: 20px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>

        <button type="button" class="btn btn-outline-secondary  btn-sm" @click="searchPlace"
            style="width: 20%; height: 30px;">locate me</button>
        <button type="button" class="btn btn-outline-secondary  btn-sm" @click="searchPlace"
            style="width: 20%; height: 30px;" disabled>
            <div class="spinner-border" style="width: 20px;height: 20px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>
    </div>
</template>

<style scoped> .has-search .form-control {
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
</style>