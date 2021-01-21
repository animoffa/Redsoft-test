<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="header-container">
          <div class="menu">
            <img src="./assets/img/logo.svg" class="logo-img">
            <nav class="nav">
              <a class="menu__item" href="#">Каталог</a>
              <a class="menu__item" href="#">Доставка</a>
              <a class="menu__item" href="#">Оплата</a>
              <a class="menu__item" href="#">Контакты</a>
              <a class="menu__item" href="#">О галерее</a>
            </nav>
          </div>
          <form class="search-container">
            <input placeholder="Поиск по названию картины" v-model.trim="search"/>
            <button class="button">Найти</button>
          </form>
        </div>
      </div>
    </header>
    <div class="body">
      <div class="container">
        <h1>Картины эпохи Возрождения</h1>
        <div class="cards-container">
          <Card v-for="(card,i) of filtredCards" :key="i" :shoppingCart="shoppingCart" :loadingIds="loadingIds"
                :card="card" @buy="buy"/>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <div class="footer-container">
          <div class="menu">
            <img src="./assets/img/logo.svg" class="logo-img">
            <nav class="nav">
              <a class="menu__item">Каталог</a>
              <a class="menu__item">Доставка</a>
              <a class="menu__item">Оплата</a>
              <a class="menu__item">Контакты</a>
              <a class="menu__item">О галерее</a>
            </nav>
          </div>
          <div class="contacts">
            <div class="phone">
              <img src="./assets/img/phone.svg" alt="phone" class="phone-img"/>
              <a class="phone-number" href="tel:84955555555">+7 (495) 555-55-55</a>
            </div>
            <div class="address">
              <img src="./assets/img/location.svg" alt="address" class="address-img"/>
              <a class="address-text" href="https://yandex.ru/maps/-/CCUIrJuqkA">г. Москва, ул. Расплетина, 24</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Card from './components/card.vue'
  import {JsonPlaceholderAPIService, ReqresApiService} from './assets/api'

  export default {
    name: 'app',
    data() {
      return {
        search: '',
        shoppingCart: [],
        loadingIds: [],
        cards: [
          {
            id: 1,
            img: require("./assets/img/Venera.png"),
            title: "Рождение Венеры",
            artist: "Сандро Боттичелли",
            available: true,
            price: 2000000,
            newPrice: 1000000
          },
          {
            id: 2,
            img: require("./assets/img/vecherya.png"),
            title: "Тайная вечеря",
            artist: "Леонардо да Винчи",
            available: true,
            price: 3000000
          },
          {
            id: 3,
            img: require("./assets/img/Adam.png"),
            title: "Сотворение Адама",
            artist: "Микеланджело",
            available: true,
            price: 6000000,
            newPrice: 5000000
          },
          {
            id: 3,
            img: require("./assets/img/anatomy.png"),
            title: "Урок анатомии",
            artist: "Рембрандт",
            available: false,
          }
        ]
      }
    },
    components: {
      Card
    },
    computed: {
      filtredCards() {
        const searchByTitle = (item) => item.title.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
        return this.cards.filter(item => searchByTitle(item));
      },
    },
    mounted() {
      this.shoppingCart = JSON.parse(window.localStorage.getItem('shoppingCart')) || [];
      console.log(this.shoppingCart)
    },
    watch: {
      shoppingCart() {
        window.localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
      },
    },
    methods: {
      buy(id) {
        console.log(this.shoppingCart);
        if (this.shoppingCart.indexOf(id) !==-1) {
          this.shoppingCart.splice(this.shoppingCart.indexOf(id), 1)
          return;
        }

        this.loadingIds = [...this.loadingIds, id];
        JsonPlaceholderAPIService.buy()
          .then(() => {
            this.shoppingCart = [...this.shoppingCart, id];
          })
          .catch(() => {
            ReqresApiService.buy(id)
              .then(() => {
                this.shoppingCart.splice(id, 1, id);
              })
              .catch(error => console.log(error))
          })
          .finally(() => {
            this.loadingIds.splice(this.loadingIds.indexOf(id), 1);
          });
      },

    }
  }
</script>

<style lang="scss">
  @import "./assets/fonts/fonts";

  $border-gray: #e1e1e1;

  %default-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .phone-img,.address-img{
    width:1.4rem;
    height:1.4rem;
  }
.logo-img{
  width:4.8rem;
  height:4.8rem;
}
  #app {
    font-family: 'Merriweather', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    color: #2c3e50;
  }

  header {
    padding: 2.3rem;
    border-bottom: 1px solid $border-gray;
    margin-bottom: 4.7rem;
  }

  .header-container, .footer-container {
    @extend %default-flex;

    .menu {
      width: 61.6rem;
      @extend %default-flex;
    }

    .nav {
      @extend %default-flex;
      width: 52rem;

      .menu__item {
        font-size: 1.4rem;
        line-height: 2.1rem;
        color: #2c3e50;
        font-weight: 500;
      }
    }
  }

  .body {
    min-height: 72.2rem;
  }

  .search-container {
    width: 41.6rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      font-size: 1.4rem;
      width: 29.4rem;
      font-family: 'Merriweather', serif;
      height: 4.8rem;
      border: 1px solid $border-gray;
      background: #f6f3f3;
      padding-left: 1.6rem;
    }


    input::placeholder {
      color: #9f9f9f;
    }

    input:active, input:focus {
      border: 1px solid #b5b5b5;
    }

    .button {
      width: 12.2rem;
    }
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .contacts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 44.9rem;
  }

  footer {
    background: #eceaea;
    padding: 0.5rem 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: auto;
  }

  .phone, .address {
    display: flex;
    align-items: center;

    img {
      margin-right: 1rem;
    }
  }

  h1 {
    font-size: 2.4rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 3.8rem;
    line-height: 3.6rem;
  }

  h2 {
    font-size: 1.8rem;
    line-height: 2.7rem;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 2.4rem;
  }

  h4 {
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 2.1rem;
  }

  h5 {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }

  h6 {
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 300;
  }
  .phone-number,.address-text {
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 300;
    color:#2c3e50;
  }

  .button {
    width: 11.8rem;
    height: 4.8rem;
    font-size: 1.4rem;
    font-family: 'Merriweather', serif;
    line-height: 2.1rem;
    color: #F4F6F9;
    background: #403432;
    transition: .5s;
    border: none;
  }

  .button:hover {
    background: #776763;
  }

  .button_disable, .button_loading {
    background: #c1b4b1;
  }

  .button_completed {
    background: #5B3A32;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem 0 0.8rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }

  html {
    font-family: 'Merriweather', serif;
    font-size: 62.5%;
    font-style: normal;
    background: #f9f9f9;
    font-weight: 500;
    -webkit-animation: bugfix infinite 1s;
    line-height: 1.2;
    margin: 0;
    color: #343030;
    height: 100vh;
    padding: 0;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    height: 100vh;
  }

  body,
  input,
  textarea {
    font-size: 62.5%;
    font-style: normal;
    font-weight: normal;
    -webkit-animation: bugfix infinite 1s;
    line-height: 1.2;
    position: relative;
    margin: 0;
    padding: 0;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  button,
  input,
  a,
  textarea {
    outline: none;
    cursor: pointer;
  }

  button:focus,
  input:focus,
  a:focus,
  textarea:focus {
    outline: none;
  }

  button:active,
  input:active,
  a:active,
  textarea:active {
    outline: none;
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .container {
    width: 131.6rem;
    margin: 0 auto;
    padding: 0 5rem;
    position: relative;
    max-width: unset;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  @media (max-width: 112em) {
    html {
      font-size: 9px;
    }
  }

  @media (max-width: 105em) {
    html {
      font-size: 8.75px;
    }
  }

  @media (max-width: 91.5em) {
    html {
      font-size: 7.9px;
    }
  }

  @media (max-width: 91em) {
    html {
      font-size: 8.4px;
    }
  }

  @media (max-width: 90em) {
    html {
      font-size: 7.9px;
    }
  }

  @media (max-width: 80em) {
    html {
      font-size: 7.2px;
    }
  }

  @media (max-width: 72em) {
    html {
      font-size: 6.5px;
    }
  }

  @media (max-width: 64em) {
    html {
      font-size: 5.5px;
    }
  }

  @media (max-width: 48em) {
    html {
      font-size: 10px;
      -webkit-text-size-adjust: none;
    }
  }


  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

</style>
