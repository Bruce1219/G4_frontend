<template>
  <section>
    <h1>關於果籽</h1>
    <div class="aboutus">
      <div class="card-up">
        <div class="card-txt">
          <p>
            食安問題層出不窮，架設果籽網站，期望能讓民眾重視食品安全，宣導購買原型食物及有機耕種的觀念，支持在地小農以友善土地的方式耕種，讓民眾吃得健康，土地也得以永續
          </p>
        </div>
        <div class="cardpic">
          <img src="../../src/assets/image/abour-img1.png" alt="" />
          <div class="img-circle" v-for="i in 3" :key="i" :class="'circle' + i"></div>
        </div>
      </div>
      <div class="card-dwon">
        <div class="cardpic">
          <img src="../../src/assets/image/about-img2.png" alt="" />
          <div class="img-circle" v-for="i in 3" :key="i" :class="'circle' + i"></div>
        </div>

        <div class="card-txt">
          <div class="txt">
            <ul>
              <li>向民眾宣導購買原型食物</li>
              <li>介紹有機耕種的在地小農</li>
              <li>協助在地小農推廣有機作物</li>
              <li>讓民眾吃得健康</li>
              <li>土地得以永續</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <SvgAnimation />
    <div class="switchbox">
      <h3>果籽協助小農推廣有機耕種及農產品</h3>
      <h3>期望達成聯合國永續發展目標（SDGs）</h3>
      <div class="btns">
        <button class="btn" :class="{ 'btn-active': activeButton === 0 }" @click="switchContent(0)">
          11永續城鄉
        </button>
        <button class="btn" :class="{ 'btn-active': activeButton === 1 }" @click="switchContent(1)">
          12負責任消費與生產
        </button>
        <button class="btn" :class="{ 'btn-active': activeButton === 2 }" @click="switchContent(2)">
          15陸地生態
        </button>
      </div>
      <div class="sdgs-info">
        <div v-if="currentIndex === 0" class="SDGs">
          <div class="SDGspic">
            <img src="../../src/assets/image/SDGs11.png" alt="SDGs11" />
          </div>
          <div class="sdgs-text">
            <h4>永續發展目標11:永續城鄉。</h4>
            <p>
              小農經營的傳統農業不僅維護了在地文化，更是生物多樣性的守護者。他們的農地為野生動植物提供棲息地且有助於維護生態系統的平衡。
            </p>
          </div>
        </div>
        <div v-if="currentIndex === 1" class="SDGs">
          <div class="SDGspic">
            <img src="../../src/assets/image/SDGs12.png" alt="SDGs12" />
          </div>
          <div class="sdgs-text">
            <h4>永續發展目標12:促進負責任的消費。</h4>
            <p>
              小農種植的農作物通常採用較少化學肥料和農藥，此種耕種方式更環保且對土地影響較小，有助於促進可持續的生產模式。<br />小農所提供的環保的食材，也減少了食物運輸過程中的碳足跡，符合負責任消費的理念。
            </p>
          </div>
        </div>
        <div v-if="currentIndex === 2" class="SDGs">
          <div class="SDGspic">
            <img src="../../src/assets/image/SDGs15.png" alt="SDGs15" />
          </div>
          <div class="sdgs-text">
            <h4>永續發展目標15:關注維護陸地生態系統。</h4>
            <p>
              小農因生產規模較小，對土地的利用較為節約。此舉避免大規模過度開墾。透過友善環境的農業實踐，小農也在努力保育土壤和生物多樣性，維護地球村莊的環境品質。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SvgAnimation from '@/components/SvgAnimation.vue'

export default {
  data() {
    return {
      currentIndex: 0,
      activeButton: 0
    }
  },
  components: {
    SvgAnimation
  },
  methods: {
    switchContent(index) {
      this.currentIndex = index;
      this.activeButton = index;
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
}

section {
  width: 100%;
  margin: auto;
  max-width: 1200px;
  text-align: center;
  overflow: hidden;
  
  h1 {
    padding: 20px;
    font-size: 2.5em;
    color: #144433;
    @include md() {
      font-size: 1.75em;
    }
  }
  
  .aboutus {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .card-up, .card-dwon {
      max-width: 1200px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      line-height: 1.5rem;
      @include md() {
        justify-content: space-around;
      }
      @include sm() {
        flex-direction: column-reverse;
      }

      .card-txt {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #397d5a;
        width: 40%;
        aspect-ratio: 1.5/1;
        border-radius: 20px;
        @include sm() {
          width: 70%;
          margin: 5%;
          padding: 5%;
        }
        
        p, .txt ul {
          width: 85%;
          font-size: 1.25em;
          line-height: 2;
          color: #ffffff;
          text-align: left;
          @include lg() {
            font-size: 1em;
          }
          @include md() {
            font-size: 0.8em;
          }
          @include sm() {
            font-size: 1em;
          }
        }
        
        .txt ul {
          list-style: disc;
          padding-left: 20px;
        }
        li{
          width: 110%;
        }
      }
      
      .cardpic {
        width: 120px;
        height: 120px;
        position: relative;
        @include s2bmd() {
          width: 300px;
          height: 300px;
        }
        @include s2blg() {
          width: 400px;
          height: 400px;
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          vertical-align: top;
          border-radius: 500px;
        }
        
        .img-circle {
          width: 120px;
          height: 120px;
          border-radius: 500px;
          border: solid 1px #144433;
          position: absolute;
          top: 1px;
          @include s2bmd() {
            width: 300px;
            height: 300px;
          }
          @include s2blg() {
            width: 400px;
            height: 400px;
          }
        }

        .circle1 {
          transform-origin: 60px 59px;
          animation: rotate 2s linear infinite;
          @include s2bmd() {
            transform-origin: 150px 149px;
          }
          @include s2blg() {
            transform-origin: 200px 199px;
          }
        }

        .circle2 {
          right: 1px;
          transform-origin: 59px 59px;
          animation: rotate 3s linear infinite;
          @include s2bmd() {
            transform-origin: 149px 149px;
          }
          @include s2blg() {
            transform-origin: 199px 199px;
          }
        }

        .circle3 {
          top: -1px;
          right: 1px;
          transform-origin: 59px 61px;
          animation: rotate 2s linear infinite;
          @include s2bmd() {
            transform-origin: 149px 151px;
          }
          @include s2blg() {
            transform-origin: 199px 201px;
          }
        }
      }
    }
    
    .card-dwon {
      @include sm() {
        flex-direction: column;
      }
    }
  }
}

.switchbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  
  h3 {
    font-size: 1.75em;
    padding: 0.5em;
    color: #144433;
    @include lg() {
      font-size: 1.5em;
    }
    @include md() {
      font-size: 1.25em;
    }
    @include sm() {
      font-size: 1em;
      padding: 1.5em;
    }
  }
  
  .btns {
    width: 93%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
   
    .btn {
      padding: 20px;
      color: #ffffff;
      background-color: #357a56;
      border: none;
      cursor: pointer;
      width: 33.33%;
      font-size: 1.2em;
      transition: background-color 0.3s ease;
      
      @include lg() {
        font-size: 1.1em;
        padding: 18px;
      }
      @include md() {
        font-size: 1em;
        padding: 15px;
      }
      @include sm() {
        font-size: 0.9em;
        padding: 12px;
      }
    }

    .btn:hover, .btn-active {
      background-color: #144433;
    }
  }

  .sdgs-info {
    display: flex;
    justify-content: center;
    width: 100%;
    
    .SDGs {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      // max-width: 900px;
      margin: auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 10px;
      
      @include sm() {
        flex-direction: column;
      }

      .SDGspic {
        width: 250px;
        height: 250px;
        flex-shrink: 0;
        
        @include lg() {
          width: 220px;
          height: 220px;
        }
        @include md() {
          width: 180px;
          height: 180px;
        }
        @include sm() {
          width: 150px;
          height: 150px;
        }
      
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
          object-fit: cover;
        }
      }

      .sdgs-text {
        width: calc(100% - 250px);
        padding: 0 20px;
        
        @include sm() {
          width: 100%;
          padding: 20px 0 0 0;
        }

        h4 {
          font-size: 1.4em;
          text-align: center;
          font-weight: bold;
          padding-bottom: 15px;
          color: #144433;
          
          @include lg() {
            font-size: 1.3em;
          }
          @include md() {
            font-size: 1.2em;
          }
          @include sm() {
            font-size: 1.1em;
          }
        }

        p {
          color: #144433;
          text-align: center;
          line-height: 1.6;
          
          @include lg() {
            font-size: 1em;
          }
          @include md() {
            font-size: 0.95em;
          }
          @include sm() {
            font-size: 0.9em;
          }
        }
      }
    }
  }
}
</style>