<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- wrapper -->
        <div class="notify__wrapper">
          <!-- title -->
          <div class="notify-title">
            <p>Notify App</p>
            <!-- svg -->
          </div>
          <div class="notify__content">
            <preloader v-if="loading" />
            <notify
              :messages="messages"
              v-if="!loading"
              :width="90"
              :height="90"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import notify from "@/components/Notify.vue";
// UI
import preloader from "@/components/UI/Preloader.vue";

export default {
  components: { notify, preloader },
  data() {
    return {
      loading: false, //если loading в состоянии true, показываем preloader
      messages: [],
    };
  },
  mounted() {
    this.getNotify(); //вызвали метод getNotify
  },
  methods: {
    getNotify() {
      // подгружаем данные с сервера
      this.loading = true; //пока данные подгружаются, прелоадер работает
      axios
        .get("https://tocode.ru/static/_secret/courses/1/notifyApi.php/")
        .then((response) => {
          let res = response.data.notify;
          this.messages = res;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.notify__wrapper {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 22px 0 rgba(0, 0, 0, 0.1);
}

.notify__content {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
}

.notify-title {
  p {
    font-size: 24px;
  }
}
</style>