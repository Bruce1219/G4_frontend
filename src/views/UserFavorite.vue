<script>
export default {
  data() {
    return {
      m_no: '',
      userData: '',
      productlist: [
      ],
      msg: ''
    }
  },
  methods: {
    parsePic(file) {
      return `${import.meta.env.VITE_FILE_URL}${file}`
    },
    deleteitem(index) {
      // console.log(this.productlist);
      let items = []
      items.push(this.productlist[index].p_no)
      console.log(items)
      this.productlist.splice(index, 1);
      let body = {
        "m_no": this.m_no,
        "p_noList": items,
        "type": 1 //取消收藏
      }
      fetch(`${import.meta.env.VITE_API_URL}/userFavoriteUpdate`, {
        method: "POST",
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((json) => { })
      if (this.productlist.length === 0) {
        this.msg = "尚無收藏商品";
      } else {
        this.msg = "";
      }
    },
    addCart() {
      // 找出已選中的商品的 p_no
      let selectedItems = this.productlist.filter(item => item.checked).map(item => item.p_no);
      console.log(selectedItems);
      let body = {
        m_no: this.m_no,
        p_noList: selectedItems,
        type: 2 // 添加到購物車
      };
      fetch(`${import.meta.env.VITE_API_URL}/userFavoriteUpdate`, {
        method: "POST",
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('Add to cart response:', json);
        });
      this.fetchData();
    },
    fetchData() {
      if (!this.m_no) {
        console.error("m_no is not available");
        return;
      }

      fetch(`${import.meta.env.VITE_API_URL}/userFavorite`, {
        method: 'POST',
        body: JSON.stringify({ m_no: this.m_no })
      })
        .then((res) => res.json())
        .then((json) => {
          this.productlist = json['data']['list'];
        })
      if (this.productlist.length === 0) {
        this.msg = "尚無收藏商品";
      } else {
        this.msg = "";
      }
    }
  },
  mounted() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.userData = JSON.parse(user);
      this.m_no = this.userData.m_no;
      this.fetchData(); // 確保 m_no 被設置後再調用 fetchData
    }
  }
}
</script>
<template>
  <div class="userFavorite">
    <router-link to="/userlayout"><button class="cancel1"><i class="fa-solid fa-xmark"
          style="color: #FFF;"></i></button></router-link>
    <h2>收藏</h2>
    <hr>
    <div class="productlist">
      <ul v-show="productlist.length > 0">
        <li v-for="(item, index) in productlist" :key="item.p_name">
          <div class="list">
        <li><input type="checkbox" :id="'checkbox' + (index)" v-model="item.checked">
          <label :for="'checkbox' + (index)" id="checkbox"></label>
        </li>
        <li>
          <div class="pic"><img :src="parsePic(item.pi_img)"></div>
        </li>
        <li>
          <div class="text">
            <h3>{{ item.f_name }} {{ item.p_name }}</h3>
            <p>{{ item.unit }}</p>
          </div>
        </li>
        <li class="price">單價<span class="pricetxt">{{ item.p_fee }}</span></li>
        <li class="cancelmark"><button class="cancel" @click="deleteitem(index)"><i
              class="fa-solid fa-xmark"></i></button>
        </li>
    </div>
    <hr>
    </li>
    </ul>
    <ul v-show="productlist.length == 0" class="no-items">
      <p style="text-align: center;margin-top: 30px">尚無收藏商品</p>
    </ul>

    <div class="btn">
      <router-link to="/product"><button class="routebtn">更多商品<i
            class="fa-solid fa-arrow-right"></i></button></router-link>
      <button class="routebtn" @click=addCart()>加入購物車<i class="fa-solid fa-cart-shopping"></i></button>
    </div>
  </div>
  </div>

</template>

<style lang="scss" scoped>
.cancel1 {
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px 10px;
  margin: 4px 4px;
  border-radius: 50%;
  background-color: #144433;
  border: 1px solid #eee;
  cursor: pointer;

  @include s2bmd() {
    display: none;
  }
}

h2 {
  // text-align: center;
  color: #144433;
  margin: 20px 0 0 8px;
  font-family: $titleFont;
  font-size: 24px;
  font-weight: 500;

  @include md() {
    font-size: 20px;
  }
}

ul {
  height: 370px;
  overflow-y: scroll;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px $bcgr;
  background-color: #F5F5F5;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  background-color: #144433;
}


.list {
  display: flex;
  gap: 7%;
  justify-content: center;
  margin: 8px 0;
  line-height: 1.4;
  align-items: center;

  @include md() {
    gap: 0;
    justify-content: space-evenly;
  }

  .cancelmark {
    @include md() {
      // order: -1;
    }
  }
}

li {
  position: relative;

  input[type="checkbox"] {
    opacity: 0;
    top: 0;
    position: absolute;
  }

  input[type="checkbox"]+label::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #144433;


  }


  input:checked+label::before {
    background-image: url("../assets/image/Vector\ 176.png");
    background-size: cover;
  }

  .pic {
    width: 70px;
    height: 60px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: top;
    }
  }

  .text {
    width: 150px;

    p {
      font-size: 14px;
    }
  }

  .price {
    width: 35px;
    text-align: center;

    .pricetxt {
      font-size: 14px;
    }
  }

  .cancel {
    width: fit-content;
    height: fit-content;
    border: none;
    cursor: pointer;
    background-color: #F5F4EA;

    @include md() {
      order: 1;
    }
  }
}

hr {
  width: 95%;
  margin: 8px auto;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
}

.routebtn {
  width: 120px;
  background-color: $darkGreen;
  color: #fff;
  padding: 8px 15px;
  border: none;
  letter-spacing: 1.3px;
  cursor: pointer;
}
</style>