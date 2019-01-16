<template>
  <div>
    <header>MD-DA-2018</header>
    <div class="interface">
      <select v-model="type">
        <option value="date">По дате</option>
        <option value="volume">По объему</option>
      </select>
      <input type="text" v-model="value" :placeholder="placeholders[type]">
    </div>
    <div class="interface">
      <div class="button" @click="predict()">Предсказать</div>
    </div>
    <div v-if="result" class="res">Результат: {{result}}</div>
  </div>
</template>

<script>
const placeholders = {
  date: "Дата YYYY-MM-DD",
  volume: "Объем",
  def: ""
};
export default {
  data() {
    return {
      placeholders,
      result: "",
      type: "date",
      value: ""
    };
  },
  methods: {
    async predict() {
      let res = await this.$http.post("/predict", {
        type: this.type,
        value: this.value
      });
      if (res && res.body) {
        this.result = res.body;
      }
    }
  }
};
</script>

<style>
header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 32px;
}
input {
  padding: 5px;
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

