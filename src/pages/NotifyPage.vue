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
            <svg
              @click="getNotifyLazy"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="20px"
              height="20px"
              cursor="pointer"
              x="0px"
              y="0px"
              viewBox="0 0 489.935 489.935"
              style="enable-background: new 0 0 489.935 489.935"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M278.235,33.267c-116.7,0-211.6,95-211.6,211.7v0.7l-41.9-63.1c-4.1-6.2-12.5-7.9-18.7-3.8c-6.2,4.1-7.9,12.5-3.8,18.7 l60.8,91.5c2.2,3.3,5.7,5.4,9.6,5.9c0.6,0.1,1.1,0.1,1.7,0.1c3.3,0,6.5-1.2,9-3.5l84.5-76.1c5.5-5,6-13.5,1-19.1 c-5-5.5-13.5-6-19.1-1l-56.1,50.7v-1c0-101.9,82.8-184.7,184.6-184.7s184.7,82.8,184.7,184.7s-82.8,184.7-184.6,184.7 c-49.3,0-95.7-19.2-130.5-54.1c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1c40,40,93.1,62,149.6,62 c116.6,0,211.6-94.9,211.6-211.7S394.935,33.267,278.235,33.267z"
                ></path>
              </g>
            </svg>
          </div>
          <div class="notify__content">
            <preloader v-if="loading" />
            <notify
              :messages="messages"
              v-if="!loading && !error"
              :width="90"
              :height="90"
            />
            <!-- error блок, если будет ошибка связанная с рабтой сервера -->
            <div class="error" v-if="error">
              <p>{{ error }}</p>
            </div>
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

  mounted() {
    this.getNotify(); //вызвали метод getNotify
  },

  computed: {
    messages() {
      //забираем данные из стора
      return this.$store.getters.getMessageMain;
    },
    error() {
      return this.$store.getters.getError;
    },
    loading(){
       return this.$store.getters.getLoading;
    }
  },

  methods: {
    getNotifyLazy() {
      //чтобы показать, что лоадер работает и обновляются данные
       this.$store.dispatch("setLoading", true);
      setTimeout(() => {
        this.getNotify();
      }, 500);
    },
    getNotify() {
      // подгружаем данные с сервера
       this.$store.dispatch("setLoading", true); //пока данные подгружаются, прелоадер работает
      axios
        .get("https://tocode.ru/static/_secret/courses/1/notifyApi.php/")
        .then((response) => {
          let res = response.data.notify,
            messages = [],
            messagesMain = [];
          // filter
          for (let i = 0; i < res.length; i++) {
            if (res[i].main) {
              //если параметр main в res в состоянии true
              messagesMain.push(res[i]);
            } else {
              messages.push(res[i]);
            }
          } //

          this.$store.dispatch("setMessage", messages); // это сообщения с  res.main == false
          this.$store.dispatch("setMessageMain", messagesMain); // это сообщения с  res.main == true
        })
        .catch(() => {
          this.$store.dispatch("setError", "Error : Network error");
        })
        .finally(() => {
           this.$store.dispatch("setLoading", false);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 24px;
  }
}
</style>