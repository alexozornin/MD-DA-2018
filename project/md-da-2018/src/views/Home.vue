<template>
  <div>
    <header>
      MD-DA-2018
    </header>
    <div class="interface">
      <input type="text" v-model="date" placeholder="Дата YYYY-MM-DD">
      <input type="text" v-model="volume" placeholder="Предполагаемый объем">
    </div>
    <div class="interface">
      <div class="button" @click="predict()">Предсказать</div>
    </div>
    <div v-if="result" class="res">Результат: {{result}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
      date: "",
      volume: ""
    }
  },
  methods: {
    async predict() {
      console.log({
        date: this.date,
        volume: this.volume
      });
      let res = await this.$http.post("/predict", {
        date: this.date,
        volume: this.volume
      });
      if (res && res.body) {
      this.result = res.body;
      }
    }
  }
}
</script>

<style>
header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 32px;
}
input {
  margin: 5px;
}
.interface {
  display: flex;
  justify-content: center;
}
.res {
  margin: 5px;
  text-align: center;
  font-size: 20px;
}
.button {
  font-size: 16px;
  text-align: center;
  background-color: black;
  margin: auto;
  margin-top: 10px;
  cursor: pointer;
  color: white;
  width: 200px;
  padding: 10px;
  max-height: 20px;
}
</style>

