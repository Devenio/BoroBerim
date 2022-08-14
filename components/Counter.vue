<template>
  <div class="timer" v-if="(m >= 0 && h >= 0)">
    <p>زمان باقی مانده</p>
    <div>
      <div class="hour">
        <span>{{ s }}</span>
      </div>
      <span> : </span>
      <div class="minute">
        <span>{{ m }}</span>
      </div>
      <span> : </span>
      <div class="second">
        <span>{{ h }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        s: 0,
        m: 0,
        h: 0
      }
    },
    props: {
      hour: 0,
      minute: 0
    },
    mounted: function() {
      this.s = 60;
      this.m = this.minute;
      this.h = this.hour;
    },
    methods: {
      minusSecond() {
        if(this.m >= 0 && this.h >= 0) {
          this.s -= 1;
          if(this.s === -1) {
            this.s = 60;
            this.m -= 1;
            if(this.m === -1) {
              this.h -= 1;
              if(this.h === -1) {
                this.m = -1;
              } else {
                this.m = 60;
              }
            }
          }
        }
      }
    },
    created() {
      this.interval = setInterval(() => this.minusSecond(), 1000);
    }
  }
</script>
