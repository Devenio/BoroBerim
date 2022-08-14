<template>
  <div class="relative flex flex-col mt-8 mx-8">
    <button
      class="border mx-2 p-4 rounded"
      type="text"
      @click="showModal = true"
    >
      pick
    </button>
    <div v-show="showModal" class="absolute top-6 p-8 rounded border bg-white">
      <datepicker
        :forward-limit="{ year: 1401, month: 11 }"
        :backward-limit="{ year: 1400, month: 5 }"
        :disabled-map="{ 1400: { 6: { 2: true } } }"
        :holiday-map="{ 1400: { 6: { 3: true } } }"
        lang="Jalali"
        type="range"
        :enable-all-days="true"
        :debug-selector="false"
        size="md"
        :days="[
          {
            date: '1400-10-13',
            holiday: false,
            selectable: true,
            color: 'green',
            x: true,
            y: false,
            z: true,
            price: 345,
            fDays: 2,
            badgeTR: 'blue',
          },
          {
            date: '1400-10-14',
            holiday: true,
            selectable: true,
            color: 'green',
            x: true,
            y: false,
            z: true,
            price: 345,
            fDays: 3,
          },
          {
            date: '1400-10-15',
            holiday: false,
            selectable: true,
            color: 'blue',
            x: true,
            y: false,
            z: true,
            price: 370,
            fDays: 2,
          },
          {
            date: '1400-10-16',
            holiday: false,
            selectable: false,
            color: 'black',
            x: true,
            y: false,
            z: true,
            price: 345,
            fDays: 4,
          },
          {
            date: '1400-10-17',
            holiday: false,
            selectable: true,
            color: 'red',
            x: true,
            y: false,
            z: true,
            price: 320,
            fDays: 3,
            badgeBR: 'blue',
          },
          {
            date: '1400-10-18',
            holiday: false,
            selectable: false,
            color: 'yellow',
            x: true,
            y: false,
            z: true,
            price: 320,
            fDays: 2,
            badgeTR: 'red',
          },
          {
            date: '1400-10-24',
            holiday: false,
            selectable: false,
            color: 'yellow',
            x: true,
            y: false,
            z: true,
            price: 320,
            fDays: 2,
            badgeTR: 'red',
          },
        ]"
        :def-price="320"
        :holiday-price="345"
        @datemodel="handledate"
        @allrange="handleAllRange"
      />
      <!-- <datepicker
        :forward-limit="{
          year: settings.nextMonth.year,
          month: settings.nextMonth.month,
        }"
        :backward-limit="{
          year: settings.previousMonth.year,
          month: settings.previousMonth.month,
        }"
        :disabled-map="{ 1400: { 6: { 2: true } } }"
        :holiday-map="{ 1400: { 6: { 3: true } } }"
        lang="Jalali"
        type="range"
        size="md"
        :debug-selector="false"
        :enable-all-days="false"
        :days="residence.calendars"
        :defPrice="residence.price / 1000"
        :holidayPrice="residence.priceVacation / 1000"
        @datemodel="handledate"
      /> -->
    </div>

    <div>{{ date }}</div>
  </div>
</template>

<script>
import datepicker from '@/components/datepicker1'

export default {
  components: { datepicker },
  data() {
    return {
      date: null,
      allRange: 3,
      showModal: false,
      residence: { price: 50000, priceVacation: 50000 },
      settings: {
        previousMonth: {
          year: 1400,
          month: 9,
        },
        nextMonth: {
          year: 1400,
          month: 11,
        },
      },
    }
  },
  computed: {
    dateObj() {
      return this.date?.dates
    },
  },
  watch: {
    date: {
      deep: true,
      handler(e) {
        if (e.dates.length === 2) {
          this.showModal = false
        }
      },
    },
  },

  methods: {
    handledate(e) {
      this.date = e
    },
    handleAllRange(e) {
      this.allRange = e
    },
    remove3Zeros(num) {
      return Math.round(num / 1000)
    },
  },
}
</script>

<style></style>
