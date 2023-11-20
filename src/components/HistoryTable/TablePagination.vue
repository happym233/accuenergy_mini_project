<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps<{
    currentPage: number,
    totalPages: number,
    setCurrentPage: Function
}>()

const pageArr = computed(() => Array.from({ length: props.totalPages }, (_, index) => index + 1))

const pageBefore = () => {
    if (props.currentPage === 1) return
    props.setCurrentPage(props.currentPage - 1)
}

const pageNext = () => {
    if (props.currentPage === props.totalPages) return
    props.setCurrentPage(props.currentPage + 1)
}

const pageTo = (page: number) => {
    props.setCurrentPage(page)
}
</script>

<template>
    <ul class="pagination">
        <li :class="'page-item ' + ((currentPage === 1) ? 'disabled' : '')" @click="pageBefore">
            <button class="page-link">
                <span aria-hidden="true">&laquo;</span>
            </button>
        </li>
        <li v-for="(page, index) in pageArr" :class="'page-item ' + ((page === currentPage) ? 'active' : '')" :key="index"
            @click="pageTo(page)">
            <button class="page-link">{{ page }}</button>
        </li>
        <li :class="'page-item ' + ((currentPage === totalPages) ? 'disabled' : '')" @click="pageNext">
            <button class="page-link">
                <span aria-hidden="true">&raquo;</span>
            </button>
        </li>
    </ul>
</template>

<style>
.pagination {
    border-width: 0;
}

.pagination>li>button {
    border-width: 0;
    color: #505050;
}

.pagination>.active>button {
    background-color: #696969;
}
</style>