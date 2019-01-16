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
    <div v-if="result" :class="resclass">{{result}}</div>
    <div class="subs">
      Озорнин Александр, Матросова Наталья
    </div>
  </div>
</template>

<script>
const successClasses = {
  true: 'success',
  false: 'fail'
}
export default {
  data() {
    return {
      result: "",
      value: "",
      resclass: "success"
    };
  },
  methods: {
    async predict() {
      this.resclass = "success";
      this.result = "Подождите...";
      let res = await this.$http.post("/predict", {
        value: this.value
      });
      if (res && res.body && res.body.msg) {
        this.result = res.body.msg;
        this.resclass = successClasses[res.body.success]
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
.success {
  margin: 5px;
  text-align: center;
  font-size: 20px;
}
.fail {
  color: darkred;
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

