<template>
  <div>
    <div class="text-h2 my-4">Panele Hoş Geldiniz</div>
    <div class="default-content">
      <div style="margin-right: 4rem; margin-bottom: 4rem;">
        <TourListsCard/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {mapActions} from "vuex";
import TourListsCard from "@/components/TourListsCard.vue";

export default {
  name: "DefaultContent",

  components: {
    TourListsCard
  },

  methods: {
    ...mapActions("tourModule", ["getTourListsAction"]),
  },

  mounted() {
    this.getTourListsAction();
  },
}
</script>

<style scoped>
.default-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>