<template>
  <section>
    <div class="container">
      <!-- 標題容器 -->
      <div class="title-container">
        <h2 class="section-title">熱門商品</h2>
        <img class="title-bgi" src="../assets/image/titlebg.svg" alt="" />
      </div>

      <!-- 商品列表 -->
      <div v-if="responseData.length" class="product">
        <div class="product-list">
          <!-- Swiper 輪播 -->
          <swiper
            :loop="true"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }"
            :modules="modules"
            :pagination="{
              type: 'fraction',
              el: '.pagination'
            }"
            :space-between="10"
            @slideChange="onSlideChange"
            class="mySwiper"
            slides-per-view="auto"
            :centeredSlides="true"
          >
            <!-- 單個 Swiper 輪播項目 -->
            <swiper-slide v-for="(cartItem, cartIndex) in responseData" :key="cartIndex">
              <RouterLink :to="`/ProductPage/${cartItem.p_no}`" class="card-product-list">
                <!-- 商品圖片 -->
                <div class="img-product-list">
                  <img :src="parsePic(cartItem.p_img[0])" alt="" />
                </div>
                <!-- 商品詳細信息 -->
                <div class="into-product-list">
                  <!-- 商品名稱 -->
                  <div class="title-product-list">
                    <p>{{ cartItem['f_name'] }}-{{ cartItem['p_name'] }}</p>
                  </div>
                  <!-- 商品價格和加入購物車按鈕 -->
                  <div class="member-product-list">
                    <span>NT.{{ cartItem['p_fee'] }}</span>
                    <div class="car-member-product-list">
                      <button class="cart-shopping">
                        <div class="icon-cart-shopping" id="app">
                          <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <p>加入購物車</p>
                      </button>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- 輪播控制按鈕和分頁器 -->
      <div v-if="responseData.length" class="carousel">
        <div class="slidebutton">
          <!-- 上一頁按鈕 -->
          <div class="swiper-button-prev">
            <img src="../assets/image/leftbutton.svg" alt="" />
          </div>
          <!-- 分頁器 -->
          <div class="pagination">
            <span class="swiper-pagination-current">1</span>
            <p>-</p>
            <span class="swiper-pagination-total">5</span>
          </div>
          <!-- 下一頁按鈕 -->
          <div class="swiper-button-next">
            <img src="../assets/image/rightbutton.svg" alt="" />
          </div>
        </div>
      </div>

      <!-- 更多商品連結 -->
      <div class="moreBtn">
        <RouterLink to="/Product">更多商品</RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

export default {
  data() {
    return {
      responseData: [] // 存儲從 API 獲取的商品數據
    }
  },
  methods: {
    // 解析圖片路徑
    parsePic(file) {
      return new URL(`${import.meta.env.VITE_FILE_URL}${file}`, import.meta.url).href
    },
    // 從後端獲取商品數據
    fetchData() {
      // url='http://localhost/php_g4/product_popular.php'
      fetch(`${import.meta.env.VITE_API_URL}/product_popular.php`, {
        method: 'post'
      })
        .then((res) => res.json())
        .then((json) => {
          this.responseData = json['data']['list']
        })
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    // 當輪播滑動時的事件處理函數
    const onSlideChange = () => {}
    return {
      onSlideChange,
      modules: [Autoplay, Navigation, Pagination] // 使用的 Swiper 模組
    }
  },
  mounted() {
    // 在 Vue 實例掛載後從後端獲取商品數據
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}

section {
  font-size: 16px;
  padding: 3rem 0;
  .container {
    max-width: 1200px; 
    box-sizing: border-box;
    flex-direction: column;
    margin: 0 auto;
    overflow: hidden;

    
  
    .title-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-content: center;
      padding: 5vw 5vh;
      box-sizing: border-box;

      .section-title {
        font-size: 2rem;
        text-align: center;
        color: #144433; 
      }

   
      .title-bgi {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%; 
        max-width: 900px;
      }
    }

    .product {
      overflow: hidden;
      position: relative;
      width: 100%; 
      height: auto;
      .product-list {
        text-align: center;
        align-items: center;
        justify-content: center;
        gap: 1%; 
        height: auto;
        .swiper-slide {
          display: flex;
          justify-content: center;
          width: auto; 
        }
        .card-product-list {
          margin: auto;
          width: 100%; 
          max-width: 380px;
          cursor: pointer;
          text-decoration: none;
        }

        .img-product-list {
          width: 380px; 
          height: 250px; 

          
          img {
            width: 100%; 
            aspect-ratio: 1/0.67; 
            object-fit: cover; 
          }
        }

      
        .into-product-list {
          padding: 25px;

          .title-product-list {
            padding: 27px;
            font-size: 1.2rem;
            color: #144433; 
          
          }

          
          .member-product-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1rem;
            color: #144433; 
      

     
            .car-member-product-list {
           
              .cart-shopping {
                display: flex;
                gap: 6px;
                padding: 7px;
                color: #fff; 
                background-color: #144433;
                border-radius: 20px; 
                border: 1px solid #000; 

               
                &:hover {
                  background-color: #86c232;
                  border: 1px solid #144433; 
                  cursor: pointer; 
                }
              }
            }
          }
        }
      }
    }

 
    .carousel {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0; 

     
      .slidebutton {
        display: flex;
        width: 50%; 
        justify-content: space-evenly;
        @include md() {
          width:70%;
        }


        .swiper-button-prev,
        .swiper-button-next {
          position: relative;
          margin: 0 1rem; 
        }

   
        .pagination {
          width: 50%; 
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

      
        .number-slidebutton {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          flex-grow: 1;

         
          .number {
            font-size: 1rem; 
          }

         
          .border {
            width: 20px; 
            height: 0; 
            border: 1px solid #144433;
          }
        }
      }
    }


    .moreBtn {
      max-width: 100px;
      border: solid 1px #144433; 
      padding: 12px 39px; 
      margin: auto; 
      text-align: center;

      
      @include md() {
        width: 100%; 
        max-width: none; 
        margin: 0;
        border: none; 
        display: flex;
        justify-content: flex-end;
      }

    
      a {
        color: #144433; 
        text-decoration: none; 
        font-size: 1rem; 
        

    
        @include md() {
          &::after {
            content: ''; 
            background-image: url('../assets/image/arrow.png'); 
            width: 25px; 
            height: 25px; 
            transform: translateY(30%); 
            background-size: contain; 
            background-position: center; 
            background-repeat: no-repeat; 
            margin-right: 55px; 
            display: inline-block; 
          }
        }
      }
    }
  }
}
</style>


<!-- centeredSlides 是 Swiper.js 中一個控制輪播項目居中顯示的重要屬性。當設置 centeredSlides: true 時，它會影響輪播容器內每個滑動項目的排列方式，具體解釋如下：

功能說明
Swiper 是一個流行的輪播（Carousel）庫，允許你創建和自定義可滑動的項目列表。當設置 centeredSlides 屬性為 true 時，Swiper 將會將輪播中的每個項目在容器中居中顯示，而不是像普通輪播那樣從左到右排列。

工作原理
居中顯示：

當 centeredSlides 設置為 true 時，Swiper 會自動調整滑動項目的位置，使得當前顯示的項目位於容器的中心位置。
對於偶數個項目：

如果有偶數個項目，Swiper 會選擇兩個項目中心點之間的位置作為居中對齊點。
對於奇數個項目：

如果有奇數個項目，則容器中的中心點將與其中間的那個項目的中心點對齊。
 -->
