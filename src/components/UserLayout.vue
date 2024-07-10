<!-- router每次到userlayout頁面時，會透過classname改變z-index -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const hideChild = computed(() => {
  return route.name === 'UserLayout'
})
</script>

<script>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { useAdminStore } from '@/stores/userLogin.js'; // 引入 Pinia store
import Swal from 'sweetalert2' //引用sweetalert2

export default {
  data() {
    return {
      m_name: '',
      m_no: '',
      userData: '',
      member: [],
      displayData: [],
      m_img: null,
      file: null,
      oldFileName: '',

    }
  },
  methods: {
    fetchMemberInfo() {
      // 檢查是否有 m_no
      if (!this.m_no) {
        console.error("m_no is not available");
        return;
      }

      fetch('http://localhost/php_g4/userInfo.php', {
        method: 'POST',
        body: JSON.stringify({ m_no: this.m_no }) // 將 m_no 作為字串發送
      })
        .then((res) => res.json())
        .then((json) => {
          this.member = json['data'];
          // console.log(json);
          // console.log(this.member);
        })
    },
    parsePic(file) {
      return new URL(`../assets/image/${file}`, import.meta.url).href
    },
    getfile(event) {
      this.file = event.target.files[0]
      this.m_img = this.file.name
      this.editConfirm()
    },
    updateImage() {
      let formData = new FormData();
      formData.append('m_img', this.file)//建立新的formdata
      const url = `http://localhost/php_G4/addUserImg.php`
      // const url = `../../php_G4/addEventImage.php`
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json)
        .then((json) => {
          this.member = json;
        })
    },
    deleteImage() {
      this.oldFileName = '../G4_frontend/src/assets/image/' + this.member.m_img
      let body = {
        oldFileName: this.oldFileName
      }
      fetch(`http://localhost/php_G4/deleteUserImg.php`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => res.json)
        .then((json) => {
          this.member = json;
        })
    },
    editConfirm() {
      this.updateImage()
      this.deleteImage()
      const url = `http://localhost/php_G4/editUserImg.php`
      let body = {
        m_no: this.m_no,
        m_img: this.m_img,
        oldFileName: this.oldFileName
      }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((json) => {
          this.data = json
          if (
            this.data != null ||
            this.m_img_no != null
          ) {
            Swal.fire({
              title: "編輯成功",
              icon: "success",
            });
            this.fetchMemberInfo()
          } else {
            alert(this.data.msg)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    async memsignout() {
      try {
        const store = useAdminStore() // 獲取 Pinia store
        store.clearCurrentUser() // 設置當前用戶到 Pinia
        alert('已登出')
        this.$router.push('/')
      } catch (error) {
        console.error('發生錯誤:', error)
        alert('發生錯誤')
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
  mounted() {
    const store = useAdminStore() // 獲取 Pinia store
    this.m_name = store.currentAccount;
    const user = localStorage.getItem('currentUser');
    // console.log(user);
    if (user) {
      this.userData = JSON.parse(user);
      this.m_no = this.userData.m_no;
      this.fetchMemberInfo(); // 確保 m_no 被設置後再調用 fetchData
    }
  },

  beforeUnmount() {
    // vue實體銷毀前，關掉這一頁面
    if (this.timer) {
      clearInterval(this.timer) // 防止記憶體洩漏，清除定時器
    }
  },
  setup() {
    const router = useRouter();
    const handleResize = () => {
      if (window.innerWidth > 768) {
        console.log('change');
        router.push('/userlayout/userfavorite')
      }
    };
    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

  }
}
</script>

<template>
  <!-- {{ route }}
    {{ hideChild }} -->
  <!-- {{ countDown }} -->
  <section>
    <div class="wrapper">
      <div class="member-context">
        <div class="member-pic">
          <div class="member-img">
            <img :src="parsePic(member.m_img)" alt="userhead" />
          </div>
          <input type="file" ref="fileInput" @change="getfile($event)">
          <button class="edit" type="button" @click="triggerFileInput"><i
              class="fa-solid fa-pen-to-square"></i></button>
        </div>
        <span class="member-name">{{ m_name }}</span>
        <div class="btn-selection">
          <router-link to="/userlayout/userdata"><button class="btn-info">個人資料</button></router-link>
          <router-link to="/userlayout/userfavorite"><button class="btn-like">收藏項目</button></router-link>
          <router-link to="/userlayout/userorder"><button class="btn-order">訂單紀錄</button></router-link>
          <router-link to="/userlayout/useractivity"><button class="btn-activity">活動紀錄</button></router-link>
        </div>
        <div class="logout">
          <button class="btn-logout" @click="memsignout">
            登出<i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </div>
      <div class="router-content">
        <router-view></router-view>
      </div>
    </div>
  </section>

  <section>
    <div class="mb-memberContext">
      <div class="member-pic">
        <div class="member-img">
          <img :src="parsePic(member.m_img)" alt="userhead" />
        </div>
        <input type="file" ref="fileInput" @change="getfile($event)">
        <button class="edit" type="button" @click="triggerFileInput"><i class="fa-solid fa-pen-to-square"></i></button>
      </div>
      <span class="member-name">{{ m_name }}</span>
      <div class="btn-selection">
        <router-link to="/userlayout/userdata"><button class="btn-info">個人資料</button></router-link>
        <router-link to="/userlayout/userfavorite"><button class="btn-like">收藏項目</button></router-link>
        <router-link to="/userlayout/userorder"><button class="btn-order">訂單紀錄</button></router-link>
        <router-link to="/userlayout/useractivity"><button class="btn-activity">活動紀錄</button></router-link>
      </div>
      <div class="logout">
        <button class="btn-logout" @click="memsignout">登出<i class="fa-solid fa-arrow-right-from-bracket"></i></button>
      </div>
      <div class="mb-routerContent" :class="{ invisible: hideChild }">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  max-width: 768px;
  min-width: 300px;
  width: 100%;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2);
  background-color: #f5f4ea;
  box-sizing: border-box;
  margin: 0 auto;

  @include md() {
    display: none;
  }
}

.mb-memberContext {
  position: relative;
  padding: 20px 0;
  width: 350px;
  height: 500px;
  margin: 0 auto;
  background-color: #144433;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.2),
    0 10px 10px rgba(0, 0, 0, 0.2);

  @include s2bmd() {
    display: none;
  }
}

.mb-routerContent {
  position: absolute;
  top: 0;
  background-color: #f5f4ea;
  width: 100%;
  height: 120%;
}

.member-context {
  position: absolute;
  width: 300px;
  height: 100%;
  left: 0;
  background-color: #144433;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-selection {
  margin: 20px 0 30px;
}

.member-pic {
  position: relative;
  margin-bottom: 25px;

  .member-img {
    width: 125px;
    height: 125px;
    overflow: hidden;
    border-radius: 500px;

    img {
      width: 100%;
      vertical-align: top;
      // object-fit: contain;
      border-radius: 1000px;

    }
  }

  input {
    display: none;
  }

  .edit {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0;
    border-radius: 0;
    background-color: transparent;

    i {
      transition: .5s;

      &:hover {
        scale: 1.5;
      }
    }
  }
}

.member-name {
  font-size: 24px;
  font-family: $titleFont;
  color: #fff;
}

button {
  border-radius: 25px;
  border: none;
  // border: 1px solid #eee;
  background-color: #144433;
  color: #fff;
  font-size: 15px;
  font-family: $titleFont;
  // font-weight: bold;
  padding: 6px 30px;
  display: block;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  margin: 6px 0;

  &:hover {
    background-color: #357a56;
  }

  &:focus {
    outline: none;
  }
}

.btn-logout {
  background-color: #e76900;
  border: 1px solid #666;
  padding: 6px 30px;

  &:hover {
    background-color: #e76900;
  }

  i {
    font-size: 12px;
    margin: 0 3px;
  }
}

.router-content {
  position: absolute;
  width: 468px;
  height: 120%;
  right: 0;
}

a {
  text-decoration: none;
}

.invisible {
  z-index: -1;
}
</style>
