<script lang="ts" setup>
import { useMapStore } from '@/stores/modules/map';
import { computed, ref, watch } from 'vue';
import { usePagination } from '@/hooks/usePagination'
import TablePagination from './TablePagination.vue';

const mapStore = useMapStore()
const tableData = ref<SearchRecord[]>([])

const { paginationData, setCurrentPage, updatePageData } = usePagination()

const getTableData = () => {
    const pagedRecord = mapStore.getPagedRecords(paginationData)
    updatePageData(pagedRecord)
    tableData.value = pagedRecord.records
}

const deleteChecked = () => {
    const pagedRecord = mapStore.deleteChecked()
    updatePageData(pagedRecord)
    tableData.value = pagedRecord.records
}

const allChecked = computed({
    get: () => mapStore.isAllChecked(),
    set: (v) => mapStore.allCheck(v)
})

watch([() => mapStore.records, () => paginationData.currentPage], getTableData, { immediate: true, deep: true })

</script>

<template>
    <div class="border border-secondary-subtle rounded-1 p-2 mx-1 my-3">
        <div class="d-flex flex-row-reverse mx-2 my-2">
            <button type="button" class="btn btn-danger position-relative" @click="deleteChecked()">
                Delete All Selected
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {{ mapStore.getCheckedNumber() }}
                    <span class="visually-hidden">to be deleted</span>
                </span>
            </button>
        </div>
        <hr />
        <table class="table table-hover htable">
            <thead>
                <tr>
                    <th> <input class="form-check-input" type="checkbox" v-model="allChecked"></th>
                    <th> name</th>
                    <th>address</th>
                    <th class="desktop-display">latitude</th>
                    <th class="desktop-display">longitude</th>
                    <th>time of search</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, index) in tableData" :key="index" :class="record.checked?'checked': ''">
                    <td>
                        <input class="form-check-input" type="checkbox" v-model="record.checked">
                    </td>
                    <td>
                        {{ record.name }}
                    </td>
                    <td>
                        {{ record.address }}
                    </td>
                    <td class="desktop-display">
                        {{ record.position.lat.toFixed(2) }}
                    </td>
                    <td class="desktop-display"> 
                        {{ record.position.lng.toFixed(2) }}
                    </td>
                    <td>
                        {{ record.time }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center w-100">
            <TablePagination :current-page="paginationData.currentPage!" :total-pages="paginationData.totalPages!"
                :set-current-page="setCurrentPage" />
        </div>
    </div>
</template>

<style scoped> 
    .table tbody .checked td{
        background-color: rgba(255, 0, 0, 0.2);
    }

    @media(max-width: 800px) {
        .htable {
            width: 100%;
            table-layout: fixed;
        }

        .desktop-display {
            display: none;
        }
    }
</style>