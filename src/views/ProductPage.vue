<script>
import Swal from 'sweetalert2';
import { useAdminStore } from '@/stores/userLogin';
export default {
  data() {
    return {
      responseData: [],
      displayData: [],
      count: 1,
      mainImage: '', // 主圖片
      m_no: '',
      cart: [],
      cartcount: 0
    };
  },
  computed: {
    userId() {
      return this.$route.params.productId;
    },
    filteredImages() {
      const product = this.displayData;
      if (product && product.p_img) {
        // 确保只返回三张次要小圖
        return product.p_img.filter(img => this.parsePic(img) !== this.mainImage).slice(0, 3);
      }

      return [];
    }

  },
  methods: {
    parsePic(file) {//修改照片路徑
      return `${import.meta.env.VITE_FILE_URL}${file}`;
    },
    add() {
      this.count += 1;
      if (this.m_no != 0) {
        localStorage.setItem(this.m_no + `product` + this.displayData.p_no, this.count);
        console.log(this.count)
      }
    },
    subtraction() {
      if (this.count <= 1) {
        return
      };
      this.count -= 1;
      if (this.m_no != 0) {
        localStorage.setItem(this.m_no + `product` + this.displayData.p_no, this.count);
        console.log(this.count)
      }
    },
    async fetchData() {
      let body = {
        "p_no": this.$route.params.productId,
        "userNo": this.m_no,
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product_detail.php`, {
          method: "POST",
          body: JSON.stringify(body)
        });
        const json = await response.json();
        this.responseData = json["data"]["list"]
        this.displayData = this.responseData.find((item) => item.p_no == this.userId);
        console.log(this.displayData);
        this.mainImage = this.parsePic(this.displayData.p_img[0]);
        let elementcount = parseInt(0);
        elementcount = localStorage.getItem(this.m_no + 'product' + this.displayData.p_no)
        if (elementcount != null) {
          this.count = parseInt(elementcount);
          console.log(this.displayData)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    imAddCart() {
      this.fetchcart(true, this.displayData.p_no)
    }
    , addCart() {
      if (this.m_no != 0) {
        if (this.displayData.isaddCart === false) {
          this.displayData.isaddCart = true;
          localStorage.setItem(this.m_no + `product` + this.displayData.p_no, this.count);
        } else {
          this.displayData.isaddCart = false;
          localStorage.removeItem(this.m_no + `product` + this.displayData.p_no)
        }
        console.log(this.displayData)
        this.fetchcart(this.displayData.isaddCart, this.userId, this.displayData.isImage1)
      } else {
        Swal.fire({
          icon: "warning",
          title: "請先登入",
          showConfirmButton: false,
          timer: 1500
        });
        this.$router.push(`/user?page=${encodeURIComponent(this.$route.fullPath)}`); // 導向登入頁
      }
    },
    fetchcart(isaddCart, id) {
      let body = {
        "isaddCart": isaddCart,
        "userNo": this.m_no,
        "p_no": id
      }
      // const url='http://localhost/php_G4/addcartandfavorite.php'
      const url = `${import.meta.env.VITE_API_URL}/addcartandfavorite.php`
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(data => {
        });
    },


    changeMainImage(imgIndex) {
      const product = this.displayData;
      console.log(product);
      const selectedIndex = product.p_img.findIndex(img => img === this.filteredImages[imgIndex]);
      this.mainImage = this.parsePic(product.p_img[selectedIndex]);
    }
  },
  created() {

  },
  mounted() {
    let account = localStorage.getItem('currentUser');
    if (account) { // 檢查 account 是否存在
      let member = JSON.parse(account);
      if (member && member['m_no']) {
        this.m_no = member['m_no'];
        console.log(this.m_no);
      } else {
        console.log('Member information is not available');
      }
    } else {
      console.log('Account information is not available in localStorage');
    }
    this.fetchData();
  },

};
</script>
<template>
  <section>
    <div class="container">
      <div class="crumbs-product">
        <ul>
          <li>
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <li>
            <RouterLink to="/product">/ 商品 /</RouterLink>
          </li>
          <li class="current"><em aria-current="page">{{ displayData.p_name }}</em></li>
        </ul>
      </div>
      <div class="row">
        <div class="card">
          <div class="pic">
            <div class="main-pic">
              <img :src="mainImage" alt="">
            </div>
            <div class="second-pic">
              <img v-for="(img, index) in filteredImages" :key="index" :src="parsePic(img)"
                @click="changeMainImage(index)" alt="Secondary Image">
            </div>

          </div>
          <div class="into">
            <div class="category">
              <div class="title">
                <h2>{{ displayData.f_name }}-{{ displayData.p_name
                  }}
                </h2>
                <div class="under-scord">
                  <img src="../assets/image/product-underScord.svg" alt="">

                </div>

              </div>
              <div class="txt">
                <p>{{ displayData.p_info }}</p>


              </div>
            </div>
            <div class="price">
              <div class="under-scord-price">
                <img src="../assets/image/product-underScord2.svg" alt="">
              </div>
              <div class="unit">
                <p>單位:</p><span>{{ displayData.p_unit }}</span>
              </div>
              <div class="Charge">
                <p>售價:</p><span>{{ displayData.p_fee }}元</span>
              </div>
              <div class="quantity">
                <p>數量:</p>
                <div class="card-num">
                  <button @click="subtraction">-</button>
                  {{ this.count }}
                  <button @click="add">+</button>
                </div>
              </div>


              <div class="member-card">
                <button class="cart-shopping" @click="addCart()" v-if="displayData.isaddCart === false">
                  <i class="fa-solid fa-cart-shopping fa-xs"></i>加入購物車
                </button>
                <button class="cart-cancel-btn cart-shopping" @click="addCart()" v-if="displayData.isaddCart === true">
                  <i class="fa-solid fa-xmark"></i>取消
                </button>
                <button class="buy" @click="imAddCart()">
                  <router-link to="/cart">立即購買</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
*:focus {
  outline: none;
  box-shadow: none;
}

section {
  .container {

    .crumbs-product {
      font-family: $pFont;
      $line-height: $fontBase;
      font-size: $fontBase ;
      color: $darkGreen;

      ul {
        display: flex;

        li {
          a {
            text-decoration: none;
            font-family: $pFont;
            $line-height: $fontBase;
            font-size: $fontBase ;
            color: $darkGreen;

          }

        }
      }

    }

    .row {
      margin: auto;
      width: 100%;

      @include s2bmd() {
        display: flex;
        flex-direction: row;

      }

      .card {
        @include s2bmd() {
          display: flex;
          flex-direction: row;

        }

        .pic {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: auto;
          padding: 60px;
          box-sizing: border-box;

          @include s2bmd() {
            flex-direction: row;
            width: 50vw;
            justify-content: center;
            align-items: center;
            padding: 0;



          }

          .main-pic {
            margin: auto;
            width: 100%;
            padding: 10px 0;
            aspect-ratio: 1/0.7;
            object-fit: cover;

            @include s2bmd() {
              order: 2;
              max-width: 700px;
            }

            img {
              width: 100%;
              aspect-ratio: 1/0.7;
              object-fit: cover;

              @include s2bmd() {
                height: 100%;
                object-fit: cover;

              }

            }
          }

          .second-pic {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            margin: auto;



            @include s2bmd() {
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              order: 1;
              width: auto;
              height: 100%;
              padding: 0% 4%;
            }

            img {
              width: 33%;
              padding: 0 0.3%;
              aspect-ratio: 1/0.7;
              object-fit: cover;

              @include s2bmd() {
                padding: 10% 0;
                width: 103.3333px;
                height: 97px;
                object-fit: cover;

              }
            }

          }
        }

        //--------------------內容資訊----------------
        .into {
          margin: auto;
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;

          height: auto;

          @include s2bmd() {
            width: 50%;
          }


          .category {


            .title {
              text-align: center;
              font-size: map-get($title, h2);
              color: $darkGreen;
              font-family: $titleFont;
              margin: $mbbtwElement;

              @include s2bmd() {
                margin: 10px;

              }

              .under-scord {
                margin: auto;

                @include s2bmd() {
                  width: 50%;
                }

                img {
                  width: 100%;

                }
              }

            }

            .txt {
              margin: $mbbtwElement;

              @include s2bmd() {
                margin: 10px;
              }

              p {
                list-style-type: none;
                position: relative;
                padding-left: 15px;
                color: $darkGreen;
                font-family: $pFont;
                line-height: $lineheight;
                margin: 8px 0;

              }
            }
          }

          .price {
            margin: 0 $mbbtwElement;
            color: $darkGreen;
            font-family: $pFont;

            .under-scord-price {
              margin: $mbbtwElement 0;

              @include s2bmd() {
                margin: 10px;
              }

              img {
                width: 100%;
              }
            }

            .unit {
              display: flex;
              padding-bottom: 10px;

              p {
                margin-right: 5px;
              }
            }

            .Charge {
              display: flex;
              padding-bottom: 10px;

              p {
                margin-right: 5px;
              }

            }

            .quantity {
              display: flex;
              padding-bottom: 10px;

              .card-num {
                button {
                  font-size: $fontBase;
                  cursor: pointer;

                  background-color: transparent;
                  border: 0px;

                }
              }



              p {
                margin-right: 5px;
              }
            }

            .member-card {
              display: flex;
              gap: 30px;
              justify-content: center;
              align-items: end;
              margin: auto;

              @include s2bmd() {
                padding: 24px 10px;
                align-items: center;
                margin: auto;
              }

              .cart-shopping {
                padding: 1% 2%;
                font-family: $pFont;
                font-size: 0.9rem;
                color: #fff;
                background-color: $darkGreen;
                border-radius: 20px;
                border: 1px solid #000;

                &:hover {
                  background-color: $lightGreen;
                  border: 1px solid $darkGreen;
                  cursor: pointer;
                }

                i {
                  margin-right: 10px;
                }
              }

              .cart-cancel-btn {
                background-color: #eb3445;
                border-radius: 20px;
                border: none;

                i {
                  margin-right: 10px;
                }
              }

              .buy {
                padding: 1% 2%;
                font-family: $pFont;
                color: #fff;
                background-color: $darkGreen;
                border-radius: 20px;
                border: 1px solid #000;

                a {
                  text-decoration: none;
                  color: #fff
                }

                &:hover {
                  background-color: $lightGreen;
                  border: 1px solid $darkGreen;
                  cursor: pointer;
                }
              }

            }

          }
        }     }


    }
  }


}
</style>