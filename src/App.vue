<script setup lang="ts">
import LocateMeButton from './components/GoogleMap/LocateMeButton.vue';
import GoogleMapSearchBar from './components/GoogleMap/GoogleMapSearchBar.vue';
import GoogleMap from './components/GoogleMap/GoogleMap.vue';
import HistoryTable from './components/HistoryTable/HistoryTable.vue';
import latestSearchCard from './components/LatestSearch/latestSearchCard.vue';
</script>

<template>
  <div class="app">
    <div class="locate-me-button">
      <LocateMeButton />
    </div>
    <hr />
    <div class="map">
      <div class="map-search-bar px-2">
        <GoogleMapSearchBar />
        <latestSearchCard class="my-3" />
      </div>
      <div class="map-container">
        <GoogleMap ref="googleMapRef" class="map" />
      </div>
    </div>
    <div class="history-table">
    <HistoryTable />
    </div>
  </div>
</template>

<style scoped>
.app {
  margin: auto;
  width: 75%;
}

.map {
  display: flex;
}

.map-search-bar {
  width: 25%;
}

.map-container {
  width: 75%;
}

@media(max-width: 800px) {
  .app {
    width: 90%;
  }
  .map {
    display: block;
  }

  .map-search-bar {
    width: 100%;
  }

  .map-container {
    width: 100%;
  }

}
</style>
