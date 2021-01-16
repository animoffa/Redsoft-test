<template>
  <div class="card">
    <div class="card__overlay" v-if="card.available===false"></div>
    <div class="img-container">
      <img :src="card.img"/>
    </div>
    <div class="description">
      <h2>«{{card.title}}»</h2>
      <h2>{{card.artist}}</h2>
      <div class="card__bottom">
        <template v-if="card.available===false">
          <h3>Продана на аукционе</h3>
        </template>
        <template v-else>
          <div class="price">
            <div v-if="card.newPrice" class="sale">
              <p class="old-price">{{formatNum(card.price)}} $</p>
              <h3>{{formatNum(card.newPrice)}} $</h3>
            </div>
            <template v-else>
              <h3>{{formatNum(card.price)}} $</h3>
            </template>
          </div>
          <button v-if="loadingIds.indexOf(card.id) !== -1" class="button button_loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></button>
          <button v-else :class="getCardState(card.id)" class="button"
                  @click="buy(card.id)">
            <template v-if="shoppingCart.indexOf(card.id) !== -1"><img src="../assets/img/check.svg"/><span>В корзине</span>
            </template>
            <template v-else>Купить</template>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        info: '',
      }
    },
    props: ["card","shoppingCart","loadingIds"],

    methods: {
      getCardState(id) {
        if (this.shoppingCart.indexOf(id) !== -1) {
          return 'button_completed'
        }
      },
      formatNum(num) {
        const n = num.toString();
        const separator = " ";
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
      },
      buy(id) {
        this.$emit("buy", id);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .card {
    width: 28rem;
    display: flex;
    position:relative;
    border: 1px solid #e1e1e1;
    flex-direction: column;
    margin-right: 3.2rem;

    .img-container {
      width: 100%;
      height: auto;

      img {
        width: 100%;
      }
    }

    .description {
      padding: 1.2rem 2.3rem 2.2rem;
    }

    .card__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2.2rem;
      height: 4.8rem;
    }

    h2 {
      text-align: left;
      margin: 0;
      font-weight: 500;
    }
  }
  h3,p{
    margin:0;
  }

  .card:nth-child(4n+4) {
    margin-right: 0;
  }

  .old-price {
    text-decoration: line-through;
    color: #a0a0a0;
    font-size: 1.4rem;
    margin: 0.1rem 0 0.3rem;
    font-weight: 300;
  }

  .sale {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .card__overlay{
    width:100%;
    height:100%;
    position: absolute;
    background: rgba(255, 255, 255, 0.49);
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width:4rem;
    height: 4rem;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.6rem;
    border: 0.1rem solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .button_loading{
    display:flex;
    align-items: center;
    justify-content: center;
  }


</style>
