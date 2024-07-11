<script>
import { useAdminStore } from '@/stores/userLogin.js'; // 引入 Pinia store
import md5 from 'js-md5';
import Swal from 'sweetalert2' //引用sweetalert2
export default {
  data() {
    return {
      userData: {},
      name: '',
      account: '',
      password: '',
      phone: '',
      birth: '',
      add: '',
      old_psw: '',
      psw: '',
      dbpsw: '',
      // userData: '',
      m_birth: '',
      m_add: '',
      m_no: '',
      member: []

    }


  },
  methods: {
    fetchMemberInfo() {
      // 檢查是否有 m_no
      if (!this.m_no) {
        console.error("m_no is not available");
        return;
      }

      fetch(`${import.meta.env.VITE_API_URL}/userInfo.php`, {
        method: 'POST',
        body: JSON.stringify({ m_no: this.m_no }) // 將 m_no 作為字串發送
      })
        .then((res) => res.json())
        .then((json) => {
          this.member = json['data'];
          this.name = this.member.m_name;
          this.account = this.member.m_account;
          this.phone = this.member.m_phone;
          this.m_birth = this.member.m_birth;
          this.m_add = this.member.m_add;
          this.password = this.member.m_password;
          console.log(json);
          console.log(this.member);
          console.log(this.phone);
          console.log("password", this.password)
        })
    },
    checkname() {
      if (this.name == "") {
        Swal.fire({
          title: "姓名必須填寫!",
          icon: "warning",
        });
      }
    },
    checkphone() {
      const phonerule = /09\d{8}/;
      if (!phonerule.test(this.phone)) {
        Swal.fire({
          title: "電話號碼格式錯誤!",
          icon: "warning",
        });
      }
    },
    checkoldpsw() {
      if (md5(this.old_psw) != this.member.m_password) {
        Swal.fire({
          title: "舊密碼錯誤!",
          icon: "warning",
        });
        return false;
      } else {
        return true;
      }
    },
    checkNewpsw() {
      const pswlimit = /^(?=.*[A-Z])[a-zA-Z0-9]{6,12}$/g; //正規表達式：密碼長度6-12位，至少一個大寫字母
      if (this.psw == this.old_psw) {
        Swal.fire({
          title: "新密碼不得與舊密碼相同!",
          icon: "warning",
        });
        return false;
      } else {
        if (!pswlimit.test(this.psw)) {
          Swal.fire({
            title: "請輸入6-12位，至少一大寫字母!",
            icon: "warning",
          });
          return false;
        } else {
          return true;
        }
      }
    },
    dbcheckpsw() {
      if (this.psw !== this.dbpsw) {
        Swal.fire({
          title: "兩者密碼不相同，請重新輸入!",
          icon: "warning",
        });
        return false;
      } else {
        return true;
      }
    },
    submit() {
      if (this.psw != '' || this.old_psw != '' || this.dbpsw != '') {
        if (this.psw == '' || this.old_psw == '' || this.dbpsw == '') {
          Swal.fire({
            title: "請填寫完整密碼資料!",
            icon: "warning",
          });
          return false;
        }

        if (!this.checkNewpsw() || !this.checkoldpsw() || !this.dbcheckpsw()) {
          Swal.fire({
            title: "請填寫完整密碼資料!",
            icon: "warning",
          });
          return false;
        }
      }

      // const url = `http://localhost/php_G4/revise_member.php`
      const url = `${import.meta.env.VITE_API_URL}/revise_member.php`

      let body = {
        "m_id": this.userData.m_id,
        "name": this.name,
        "phone": this.phone,
        "m_birth": this.m_birth,
        "m_add": this.m_add,
      }
      if (this.psw != '') {
        body.psw = this.psw
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(
          json => {
            this.data = json
            this.old_psw = '';
            this.psw = '';
            this.dbpsw = '';
            if (this.data["msg"]) {
              Swal.fire({
                title: this.data["msg"],
                icon: "success", // 根據需要調整圖示
              });
              const store = useAdminStore();
              // store.setCurrentUser();
              store.triggerFetchMemberInfo(); // 觸發更新
            } else {
              Swal.fire({
                title: "資料錯誤",
                icon: "warning",
              });
            }
            this.fetchMemberInfo();

          }
        );
    }
  },
  //存取是否登入
  mounted() {
    const store = useAdminStore();
    const isLogin = store.isLoggedIn();
    if (!isLogin) {
      this.$router.push('/user');
    }
    const user = localStorage.getItem('currentUser');
    console.log(user);//抓回localStorage
    if (user) {
      this.userData = JSON.parse(user);
      this.m_no = this.userData.m_no;
    }
    this.fetchMemberInfo(); // 確保 m_no 被設置後再調用 fetchData

  },
}
</script>

<template>
  <div class="userdata">
    <router-link to="/userlayout"><button class="cancel"><i class="fa-solid fa-xmark"></i></button></router-link>
    <h2>個人資料</h2>
    <form @submit.prevent="submitForm">
      <div class="name">
        <label for="name">姓名</label>
        <input type="text" v-model="name" @change="checkname()">
      </div>
      <div class="account">
        <label for="account">帳號</label>
        <input type="email" name="m_account" :value="this.userData.m_account" disabled>
      </div>
      <div>
        <label for="phone">電話</label>
        <input type="tel" v-model="phone" name="m_phone" @change="checkphone()">
      </div>
      <div class="birth">
        <label for="birth">生日</label>
        <input type="date" v-model="m_birth" name="m_birth" class="m_birth">
      </div>
      <div class="address">
        <label for="add">地址</label>
        <input type="email" v-model="m_add" name="m_add">
      </div>
      <hr style="color: #144433; width: 100%;">
      <div class="oldpsw">
        <label for="old_psw">舊密碼</label>
        <input type="password" v-model="old_psw" @change="checkoldpsw()">
      </div>
      <div class="newpsw">
        <label for="new_psw">新密碼</label>
        <input type="password" name="" v-model="psw" @change="checkNewpsw()">
      </div>
      <div class="dbpsw">
        <label for="dbc_psw">確認新密碼</label>
        <input type="password" name="" v-model="dbpsw" @change="dbcheckpsw()">
      </div>
    </form>
  </div>
  <button @click="submit()">儲存</button>
</template>

<style lang="scss" scoped>
.userdata {
  width: 80%;
  margin: 0 auto;

  @include md() {
    width: 90%;
  }

  .cancel {
    position: absolute;
    right: 0;
    top: 3;
    padding: 8px 10px;
    margin: 0 4px;
    border-radius: 50%;

    @include s2bmd() {
      display: none;
    }

    a {
      color: #fff;
    }
  }

  h2 {
    text-align: center;
    color: #144433;
    margin: 20px 0;
    padding-bottom: 10px;
    font-family: $titleFont;
    font-size: 24px;
    font-weight: 500;
    border-bottom: solid 1px $darkGreen;

    @include md() {
      font-size: 20px;
    }
  }

  form {
    margin-top: 30px;
  }

  div {
    width: 80%;
    margin: 0 auto 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include md() {
      width: 90%;
    }
  }

  // .m_birth {
  //   // width: 55%;

  //   @include md() {
  //     width: 57%;
  //   }
  // }

}



input {
  background-color: #eee;
  border: 1px solid #144433;
  outline: none;
  padding: 8px 15px;
  // width: calc(100% - 30px);
  overflow: hidden;
  flex: 0 0 55%;
  height: 15px;

  &:focus {
    outline: none;
    background-color: #fff;
  }

  @include md() {
    font-size: 13px;
    padding: 6px 10px;

  }
}

label {
  color: #144433;
  font-weight: 500;

  @include md() {
    font-size: 13px;
  }
}



button {
  display: block;
  margin: 30px auto 0;
  border-radius: 25px;
  border: 1px solid #eee;
  background-color: #144433;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 55px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform .1s ease-in;
  transition: .5s;

  &:active {
    transform: scale(.9);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #fff;
    color: $darkGreen;
    border: 1px solid $darkGreen;
  }

  @include md() {
    font-size: 13px;
    padding: 8px 40px;
    margin-bottom: 15px;
  }
}
</style>
