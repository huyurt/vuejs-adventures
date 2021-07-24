<template>
  <v-container>
    <div class="text-h4 mb-10">
      Farklı şehirlerin iki haftalık hava durumu
    </div>
    <div class="v-picker--full-width d-flex justify-center" v-if="loading">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate>
      </v-progress-circular>
    </div>

    <v-select @change="fetchWeatherForecast"
              v-model="selectedCity"
              :items="cities"
              label="Şehir"
              persistent-hint
              return-object
              single-line
              clearable
    ></v-select>
    
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Tarih</th>
          <th class="text-left">Şehir</th>
          <th class="text-left">&#8451;</th>
          <th class="text-left">&#8457;</th>
          <th class="text-left">Durum</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in weatherForecast" :key="item.date">
          <td>{{ item.date }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.temperatureC }}</td>
          <td>{{ item.temperatureF }}</td>
          <td>
            <v-chip :color="getColor(item.summary)" dark>
              {{ item.summary }}
            </v-chip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import {mapActions, mapGetters} from "vuex";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import {getWeatherForecastV2Axios} from "@/api/weather-forecast-services";

export default {
  name: "WeatherForecast",

  async mounted() {
    this.loading = true;
    dayjs.extend(relativeTime);
    await this.fetchWeatherForecast(this.selectedCity);
    this.loading = false;
    await this.getTourListsAction();
    this.cities = this.lists.map(p1 => p1.city);
  },

  data() {
    return {
      weatherForecast: [],
      cities: [],
      selectedCity: "Ankara",
      loading: false,
    };
  },

  computed: {
    ...mapGetters("tourModule", {
      lists: "lists",
    }),
  },

  methods: {
    ...mapActions("tourModule", ["getTourListsAction"]),
    async fetchWeatherForecast(city = "Oslo") {
      this.loading = true;
      try {
        const {data} = await getWeatherForecastV2Axios(city);
        this.weatherForecast = data?.map(w => {
          const formattedData = {...w};
          let date = w.date;
          formattedData.date = dayjs(date).fromNow();
          return formattedData;
        });
      } catch (e) {
        alert("Hata oluştu. Lütfen daha sonra deneyiniz.");
      } finally {
        this.loading = false;
      }
    },

    getColor(summary: string) {
      switch (summary) {
        case "Freezing":
          return "indigo";
        case "Bracing":
          return "blue";
        case "Chilly":
          return "light-blue";
        case "Cool":
          return "cyan";
        case "Mild":
          return "teal";
        case "Warm":
          return "yellow";
        case "Balmy":
          return "amber";
        case "Hot":
          return "orange";
        case "Sweltering":
          return "deep-orange";
        case "Scorching":
          return "red";
        default:
          return "grey";
      }
    },
  },
}
</script>

<style scoped>

</style>