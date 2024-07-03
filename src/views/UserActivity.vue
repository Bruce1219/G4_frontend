<script>
export default {
  data() {
    return {
      activityorders: [],
      userData:'',
      m_no:''
    }
  },
  methods: {
    fetchData() {
      // 檢查是否有 m_no
      if (!this.m_no) {
        console.error("m_no is not available");
        return;
      }
      
      fetch('http://localhost/php_g4/userActivity.php', {
        method: 'POST',
        body: JSON.stringify({ m_no: this.m_no }) // 將 m_no 作為字串發送
      })
      .then((res) => res.json())
      .then((json) => {
        this.activityorders = json['data']['list'];
        console.log(json);
        console.log(this.activityorders);
      })
    },
    formatTime(dateTime) {
      return dateTime.split(' ')[0]; // 提取時間部分
    }
  },
  mounted() {
    const user = localStorage.getItem('currentUser');
    console.log(user);
    console.log(user);
    if (user) {
      this.userData = JSON.parse(user);
      this.m_no = this.userData.m_no;
      this.fetchData(); // 確保 m_no 被設置後再調用 fetchData
    }
  },
}
</script>
<template>
  <div class="useractivity">
    <router-link to="/userlayout"><button class="cancel"><i class="fa-solid fa-xmark"></i></button></router-link>
    <h2>活動訂單查詢</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">報名日期</th>
          <!-- <th scope="col">編號</th> -->
          <th scope="col">活動日期</th>
          <th scope="col">狀態</th>
          <th scope="col">取消報名</th>
          <th scope="col">報名詳情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in activityorders" :key="index">
          <td>{{ formatTime(order.ao_ordertime) }}</td>
          <!-- <td>{{ order.ao_no }}</td> -->
          <td>{{ order.a_date }}</td>
          <td>
            <span v-if="order.ao_status == 1">正常</span>
            <span v-if="order.ao_status == 0">取消</span>
          </td>
          <td><button>取消</button></td>
          <td><router-link :to="{ name: 'ActivityDetail', params: { activityId: order.ao_no } }">
              <button>查看</button>
            </router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.useractivity {
  width: 95%;
  margin: 0 auto;
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
    font-family: $titleFont;
    font-size: 24px;
    font-weight: 500;

    @include md() {
      font-size: 20px;
    }
  }

  table {
    display: grid;
    thead {
      border-top: 1px solid #144433;
      border-bottom: 1px solid #144433;
    }
    tbody{
      overflow-y: scroll;
      height: 450px;
      &::-webkit-scrollbar{
        width: 1px;
      }
    }
    tr {
      line-height: 2.5;
      text-align: center;
      display: grid;
      grid-template-columns: 1fr  1fr .5fr .8fr .8fr;
      align-items: center;
      @include md(){
      line-height: 2;

      }
      th {
        color: #144433;
        font-size: 14px;
        padding: 4px 4px;
        @include md() {
          font-size: 12px;
          line-height: 1;
        }
      }

      td {
        font-size: 12px;
        margin: 0 3px;
        text-align: center;
        // flex-basis: 16.6%;
      }
    }
  }
}

button {
  display: block;
  margin: 0 auto;
  border-radius: 25px;
  border: 1px solid #eee;
  background-color: #144433;
  color: #fff;
  font-size: 12px;
  padding: 1px 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform .1s ease-in;

  &:active {
    transform: scale(.9);
  }

  &:focus {
    outline: none;
  }

  @include md() {
    font-size: 12px;
    padding: 1px 6px;
  }
}
</style>
