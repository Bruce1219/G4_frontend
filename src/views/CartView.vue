<script>
export default {
  data() {
    return {
      carts: [],
      responseData: [],
      selected: '', // 添加 selected 属性来存储选择的优惠券
      m_no: '',// 确保有 m_no 属性
      coupon: '', // 添加 coupon 属性来存储选择的优惠券
    }
  },
  computed: {
    totalprice() {
      let total = 0;//加總總和 
      for (let i = 0; i < this.cartItem.length; i++) {
        const price = this.cartItem[i].p_fee * this.cartItem[i].count;
        total += price
      }
      // 應用優惠券折扣
      if (this.selected == 'CCC8888') {
        this.coupon = Math.floor(total * 0.2); // 8折
      }
      if (this.selected == 'CCC8585') {
        this.coupon = Math.floor(total * 0.15); // 85折

      }
      if (this.selected == 'CCC9999') {
        this.coupon = Math.floor(total * 0.1); // 9折
      }
      total = Math.ceil(total);
      return total; // 返回總價
    },

    cartItem() {
      let cart = [];
      if (!this.responseData) {
        return cart;
      }
      for (let i = 0; i < this.responseData.length; i++) {
        cart.push(this.responseData[i]);
      }
      return cart;
    }
  },
  methods: {
    fetchData() {
      let body = {
        "userNo": this.m_no,
      }
      fetch(`http://localhost/php_g4/cartView.php`, {
        method: 'post',
        body: JSON.stringify(body)

      })
        .then((res) => res.json())
        .then((json) => {
          this.carts = json['data']['list'];
          this.responseData = this.carts;
          if (!this.responseData) {
            alert("購物車內無品項，請先選購商品")
            this.$router.push('/product')
            return;
          }
          this.responseData.forEach((element, index) => {
            let elementcount = parseInt(0);
            elementcount = localStorage.getItem(this.m_no + 'product' + element.p_no)
            this.responseData[index]['count'] = 1;
            if (elementcount != null) {
              this.responseData[index]['count'] = elementcount;
              console.log(this.responseData[index])
            }

          });
        })
    },
    parsePic(file) {
      return new URL(`../assets/image/${file}`, import.meta.url).href
    },
    add(index) {
      this.cartItem[index].count = parseInt(this.cartItem[index].count) + 1;
      console.log(this.cartItem[index].count)
      localStorage.setItem(this.m_no + `product` + this.cartItem[index].p_no, this.cartItem[index].count);
    },
    subtraction(index) {
      if (this.cartItem[index].count === 1) {
        this.cartItem[index].count = 0;
        this.deleteItem(index);
      } else {
        this.cartItem[index].count -= 1;
        localStorage.setItem(this.m_no + `product` + this.cartItem[index].p_no, this.cartItem[index].count);
      }
    },
    deleteItem(index) {
      if (confirm("確定刪除？")) {
        localStorage.removeItem(this.m_no + `product` + this.cartItem[index].p_no);

        let body = {
          "isaddCart": false,
          "userNo": this.m_no,
          "p_no": this.cartItem[index].p_no
        }
        fetch('http://localhost/php_G4/addcartandfavorite.php', {
          method: 'POST',
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
          });


        this.fetchData();
        // this.cartItem[index].isaddCart = false;
        console.log(this.cartItem[index])
        // localStorage.setItem(`user1`, JSON.stringify(this.responseData))
      } else {
        return this.cartItem[index].count = 1;

      }
    },
  },
  created() {

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
    // }
  }
}

</script>




<template>
  <section>
    <div class="container">
      <div class="title">
        <h2>購物車</h2>
        <div class="under-scord">
          <img src="../assets/image/product-underScord2.svg" alt="">
        </div>
      </div>
      <div class="list-card-shopping">
        <nav class="list-title">
          <ul>
            <li>商品圖片</li>
            <li>商品名稱</li>
            <li>單價</li>
            <li>數量</li>
          </ul>

        </nav>
        <div class="card-list">
          <div class="card" v-for="(Item, index) in cartItem" :key="Item.id">
            <picture>
              <img :src="parsePic(Item.p_img[0])" alt="">
            </picture>
            <div class="product">
              <div class="product-into">
                <div class="name">
                  <span>{{ Item.f_name }}</span>-
                  <p>{{ Item.p_name }}</p>
                </div>
                <div class="unit">
                  <span>單位:</span>
                  <p>{{ Item.unit }}</p>
                </div>
              </div>
              <div class="price">
                <span>NT.{{ Item.p_fee }}</span>
              </div>
            </div>
            <div class="quantity">
              <button @click="subtraction(index)">-</button>
              {{ Item.count }}
              <button @click="add(index)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 付款表格 -->
      <div class="pay">
        <!-- 優惠券 -->
        <div class="information">
          <div class="discount">
            <p>優惠券</p>
            <!-- <label for="">
              <input type="select" placeholder="請輸入優惠券碼">
            </label> -->
            <select name="" id="" v-model="selected">請選擇優惠券
              <option value="CCC8888">CCC8888</option>
              <option value="CCC8585">CCC8585</option>
              <option value="CCC9999">CCC9999</option>
            </select>
          </div>
          <!-- 付款資訊 -->
          <div class="receive">
            <p>收件地點</p>
            <div class="postal">
              <span>郵遞區號:</span>
              <label for="">
                <input type="text">
              </label>
            </div>

            <span>縣市:</span>
            <select>
              <option value="">台北市</option>
              <option value="">新北市</option>
              <option value="">基隆市</option>
              <option value="">新竹縣</option>
              <option value="">臺中市</option>
              <option value="">苗栗縣</option>
              <option value="Changhua">彰化縣</option>
              <option value="Nantou">南投縣</option>
              <option value="Yunlin">雲林縣</option>
              <option value="Kaohsiung">高雄市</option>
              <option value="Tainan">臺南市</option>
              <option value="Chiayi">嘉義市</option>
              <option value="Chiayi-County">嘉義縣</option>
              <option value="Pingtung">屏東縣</option>
              <option value="Penghu">澎湖縣</option>
              <option value="Hualien">花蓮縣</option>
              <option value="Taitung">台東縣</option>
              <option value="Yilan">宜蘭縣</option>
              <option value="Taoyuan">桃園市</option>
            </select>

            <span>地址:</span>
            <label for="">
              <input type="text" placeholder="請輸入地址">
            </label>


          </div>
        </div>

        <!-- 總計 -->
        <div class="total">
          <p>總計:</p>
          <div class="Product-name">
            <span>商品:</span>
            <span>NT.{{ totalprice }}</span>
          </div>
          <div class="Product-name" v-if="this.coupon">
            <span>優惠卷:</span>
            <span>— NT.{{ this.coupon }}</span>
          </div>
          <div class="freight">
            <span>運費:</span>
            <span>NT.60</span>

          </div>
          <div class="alltotal">
            <span>總計:</span>
            <span>NT.{{ totalprice - coupon + 60 }}</span>
          </div>
          <div class="Checkout">
            <button class="shopping">
              <RouterLink to="/product">繼續購物</RouterLink>
            </button>
            <button class="Checkout-pay">
              <RouterLink to="/shoppingcart">結帳</RouterLink>
            </button>
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

    // width: 100vw;
    .title {
      //上端標題
      font-size: map-get($title, h2);
      font-family: $pFont;
      $line-height: $fontBase;
      color: $darkGreen;
      display: inline-block;
      position: relative;
      width: 9rem;
      text-align: center;
      margin-bottom: 20px;

      .under-scord {
        position: relative;
        top: -15px;
        width: 9rem;

        img {
          width: 100%;
        }
      }
    }

    .list-card-shopping {
      margin: auto;

      //購物清單
      .list-title {
        display: none;

        @include s2bmd() {
          display: block;
          width: 90%;
          margin: auto;
          margin-bottom: 15px;
        }

        //清單名稱
        ul {
          @include s2bmd() {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          li {}
        }
      }

      .card-list {

        // margin: 15px 0;
        .card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid $darkGreen;
          padding: 15px 0;

          &:nth-child(1) {
            border-top: 1px solid $darkGreen;
          }

          @include s2bmd() {
            padding: 15px 30px;
          }

          picture {
            width: 25%;

            @include s2bmd() {
              width: 20%;
            }

            img {
              width: 100%;

              @include s2bmd() {
                width: 50%;
              }
            }
          }

          .product {
            @include s2bmd() {
              display: flex;
              flex-grow: 1;
              padding: 0 20px;
              position: relative;
              right: 45px;
              justify-content: space-evenly;
              align-items: center;

            }

            //產品名稱資訊
            .product-into {

              //產品名稱
              .name {
                display: flex;
                padding: 5px;

              }

              .unit {
                display: flex;
                padding: 5px;
              }
            }

            .price {
              padding: 20px;
            }
          }

          .quantity {
            display: flex;
            padding-bottom: 10px;
            position: relative;
            top: 35px;

            @include s2bmd() {
              top: auto;
            }

            button {
              font-size: $fontBase;
              cursor: pointer;
              background-color: transparent;
              border: 0px;

              @include s2bmd() {
                margin: 0 10px;
              }
            }
          }
        }
      }
    }

    // -------付款表格----------
    .pay {
      width: 100%;
      margin: 15px 0;
      box-sizing: border-box;

      @include s2bmd() {
        display: flex;
        gap: 10%;
        justify-content: space-between;
      }

      .information {
        .discount {
          //優惠券
          margin-bottom: 10px;
          padding: 20px;
          border: 1px solid $darkGreen;

          p {
            font-family: $pFont;
            $line-height: $fontBase;
            color: $darkGreen;
          }

          input {
            margin-top: 15px;
            background-color: $bcgw;
            border: 1px solid $darkGreen;
            width: 300px;
            height: 35px;
            padding: 0 10px;
          }

          select {
            margin: 15px 0;
            background-color: $bcgw;
            width: 300px;
            height: 35px;

            option {
              background-color: $bcgw;
            }
          }
        }

        .receive {
          //付款資訊
          display: flex;
          flex-direction: column;
          padding: 20px;
          margin: 15px 0;
          border: 1px solid $darkGreen;

          p,
          span {
            font-family: $pFont;
            $line-height: $fontBase;
            color: $darkGreen;
          }

          p {
            padding-bottom: 10px;
            border-bottom: 1.5px solid $darkGreen ;
          }

          .postal {
            display: flex;
            flex-direction: column;
            padding: 10px 0;

            input[type="text"] {
              margin-top: 15px;
              background-color: $bcgw;
              border: 0;
              border: 1px solid $darkGreen;
              width: 50px;
              height: 35px;
              padding: 0 10px;
            }
          }

          input[type="text"] {
            margin-top: 15px;
            background-color: $bcgw;
            border: 0;
            border: 1px solid $darkGreen;
            width: 90%;
            height: 35px;
            padding: 0 10px;
          }

          select {
            margin: 15px 0;
            background-color: $bcgw;
            width: 300px;
            height: 35px;

            option {
              background-color: $bcgw;
            }
          }
        }
      }



      .total {
        //總計
        padding: 20px;
        margin: 15px 0;
        border: 1px solid $darkGreen;

        @include s2bmd() {
          margin: 0;
          width: 50%;
          padding: 35px;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        p,
        span {
          font-family: $pFont;
          $line-height: $fontBase;
          color: $darkGreen;
        }

        p {
          padding-bottom: 10px;
          border-bottom: 1.5px solid $darkGreen ;
        }

        .Product-name,
        .freight,
        .alltotal {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }

        .Checkout {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;

          button {
            width: 50%;
            margin: 10px 5px 5px 5px;
            padding: 10px 15px;
            font-family: $pFont;
            $line-height: $fontBase;
            color: $darkGreen;
            letter-spacing: $letterSpacing;

            a {
              text-decoration: none;
              display: block;
            }
          }

          .shopping {
            background-color: transparent;
            border: 0;
            border: 1px solid $lightGreen;

            a {
              color: $darkGreen;
            }
          }

          .Checkout-pay {
            border: 0;
            border: 1px solid $lightGreen;
            background-color: $darkGreen;

            a {
              color: #fff;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>