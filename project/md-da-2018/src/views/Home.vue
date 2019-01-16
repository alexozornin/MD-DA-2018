<template>
  <div>
    <header>MD-DA-2018</header>
    <div class="desc">
      Введите дату 2019 года для предсказания стоимости акций компании ExxonMobil (XOM).
    </div>
    <div class="interface">
      <input type="text" v-model="value" placeholder="Дата YYYY-MM-DD">
    </div>
    <div class="interface">
      <div class="button" @click="predict()">Предсказать</div>
    </div>
    <div v-if="result" class="res">Результат: {{result}}</div>
    <div class="subs">
      Озорнин Александр, Матросова Наталья
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
      value: ""
    };
  },
  methods: {
    async predict() {
      let res = await this.$http.post("/predict", {
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
.desc {
  margin: 5px;
  text-align: center;
  font-size: 16px;
}
.subs {
  margin: 30px;
  text-align: right;
  font-size: 14px;
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

