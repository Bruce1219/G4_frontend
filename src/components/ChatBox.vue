<template>
  <!-- chat robot -->
  <div class="chat-robot">
    <div class="chat-robot-btn" @click="chatToggle()">
      <img class="chat-icon" src="../assets/image/news-img/chat-icon.svg" alt="對話圖示" />
    </div>
    <!-- <div class="close-chat-btn"></div> -->
    <!-- chat field -->
    <div class="chat-field" v-show="isrobBtn === true">
      <div class="chat-intro-field">
        <h2 class="chat-title">客服小助手</h2>
        <p class="chat-intro">您好!如果有任何問題或要求，請隨時跟我們聯絡。</p>
      </div>
      <!-- 新增user按enter訊息就會送出功能 -->
      <input
        type="text"
        name=""
        placeholder="請輸入關鍵字"
        v-model="chatMeg"
        required
        @keyup.enter="userMeg"
      />
      <button class="submit-btn" v-on:click.prevent="userMeg()">
        <i class="fa-solid fa-paper-plane" style="color: #144433"></i>
      </button>
      <div class="chat-area" id="chat-area">
        <div
          class="text"
          v-for="item in chatData"
          :key="item"
          :class="{ user: item.author === 'user', robot: item.author !== 'user' }" v-html ="item.message">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isrobBtn: false,
      chatMeg: '',
      chatData: [
        {
          message:'您好!歡迎來到果籽!我是客服小幫手。<br><ul>關鍵字如下:<li>取消訂單</li><li>報名活動</li><li>結帳方式</li><li>關於果籽</li></ul>',
          author:'robot'
        }
      ],
      responeData:[//客服回應資料庫
        `您好！如果您想取消訂單，請按照以下步驟操作。我們目前僅在訂單出貨前接受取消請求並處理退款。所有退款將退還至您的信用卡。請提供您的訂單號碼以便我們查詢訂單狀態。感謝您提供訂單號。我們正在確認您的訂單狀態。`,
        `您的訂單未出貨。我們可以為您取消並處理退款。您的訂單已成功取消。我們將在3-5個工作日內將退款退還至您的信用卡。<br/>若您的訂單已經出貨。我們無法取消已出貨的訂單。如果您對訂單有任何問題，請在收到商品後聯繫我們的客服團隊。<br>如果您有任何其他問題或需要進一步的幫助，請隨時聯繫我們的客服團隊：<br><br>客服電話：123-456-7890<br/>
        電子郵件：support@example.com<br/><br/>我們很樂意為您提供幫助您！`,
        `您好！歡迎報名活動。我們有兩個部分可供選擇：市集和講座。請根據您的需求選擇報名項目。請點擊近期活動來挖掘更多有趣的活動!如果您有任何其他問題或需要進一步的幫助，請隨時聯繫我們的客服團隊：<br><br>客服電話：123-456-7890<br>電子郵:support@example.com<br>
        <br>我們很樂意為您提供幫助！`,
        `結帳方式步驟如下:<br>我們目前僅接受信用卡支付。請輸入信用卡號碼、有效期和安全碼（CVV）。<br><br>(1) 確認並提交付款資訊後，系統將處理您的支付。<br>(2) 若付款成功，您將收到確認訊息和訂單號碼。<br>(3) 若付款失敗，請檢查您的信用卡資訊並再試一次。如果問題持續存在，請聯繫您的信用卡發行銀行或我們的客服團隊尋求幫助。請隨時聯繫我們的客服團隊：<br><br>
        客服電話：123-456-7890<br>
        電子郵件：support@example.com<br><br>
        感謝您的購買！我們期待為您提供優質的服務！`,
        `我們提供多種優惠券，讓您在購物時享有不同的折扣優惠。以下是優惠券的類型及說明：<br><br>
        1. **9折優惠券**<br>- 使用此優惠券可享受購物金額9折的優惠。<br>- 優惠券僅限使用一次。<br>- 優惠券可通過遊戲獲得。<br><br>
        2. **85折優惠券**<br>- 使用此優惠券可享受購物金額85折的優惠。<br>- 優惠券僅限使用一次。<br>- 優惠券可通過遊戲獲得。<br><br>
        3. **8折優惠券**<br>- 使用此優惠券可享受購物金額8折的優惠。
        <br>- 優惠券僅限使用一次。
        <br>- 優惠券可通過遊戲獲得。<br><br>
        ### 如何獲得優惠券<br>您可以通過參加我們的遊戲活動獲得不同折扣的優惠券。遊戲活動內容豐富有趣，完成指定任務後即可獲得相應的優惠券。<br><br>
        ### 使用說明<br>
        1. 在結帳頁面，選擇“使用優惠券”選項。<br>
        2. 輸入您獲得的優惠券代碼。<br>
        3. 確認優惠已應用至您的訂單總金額。<br>
        4. 繼續完成結帳流程。<br><br>### 注意事項<br>- 每張優惠券僅限使用一次。<br>- 優惠券不可與其他優惠活動同時使用。<br>- 優惠券有使用期限，請在有效期內使用。<br>
        - 優惠券僅適用於符合條件的商品，部分商品可能不適用。<br><br>如有任何問題或需要進一步的幫助，請隨時聯繫我們的客服團隊：<br>
        客服電話：123-456-7890<br>
        電子郵件：support@example.com<br><br>感謝您的支持與參與，祝您購物愉快！`,
        `歡迎來到關於果籽！我們致力於以下兩大目標：<br><br>
        1. 增加小農收入：我們提供一個平台，讓小農可以直接將他們的農產品銷售給消費者，避免中間商，從而增加他們的收入。無論是有機蔬菜、新鮮水果還是手工農產品，您都可以在我們的平台找到來自小農的高品質商品。<br><br>
        2.增加民眾的食農知識：我們不僅提供農產品的銷售服務，還致力於教育民眾有關食農的知識。我們的網站提供有關不同農作物種植、有機農業、食品安全等主題的信息和教育資源。我們希望通過這些資訊，幫助消費者更了解他們所食用的食物的背景和來源，從而促進健康飲食和可持續農業發展。<br><br>我們的承諾<br>我們致力於建立一個支持小農和消費者之間直接連接的平台，為小農提供更多的銷售機會和更穩定的收入來源。同時，我們希望透過提供食農知識和教育，讓更多人關注食物的品質和來源，並支持可持續的農業實踐。<br><br>如果您有任何建議、疑問或想要了解更多信息，請隨時聯繫我們。我們期待與您一起為小農和健康生活努力！<br><br>
        - 聯繫我們:support@smallfarmplatform.com
        <br>- 客服熱線：123-456-7890`,
      ],
    }
  },
  methods: {
    userMeg() {
      if (this.chatMeg === '') {
        return
      } else {
        this.chatData.push({ message: this.chatMeg, author: 'user' })
        this.responeChatMsg();
        this.chatMeg = ''
        console.log(this.chatData)
      }
    },
    chatToggle() {
      this.isrobBtn = !this.isrobBtn
    },
    responeChatMsg() {
      for(let i = 0;i<this.responeData.length;i++) {
      if (this.responeData[i].match(this.chatMeg) != null){
      this.chatData.push({message:this.responeData[i],author:'robot'})
      console.log(this.responeData[1])
      break;
      }
    }
    }
  },
  computed: {},
  updated() {
    let container = document.getElementById('chat-area')
      container.scrollTop = container.scrollHeight // For instant scroll
      container.scrollTop = container.scrollHeight // For smooth scroll

      // Smooth scroll alternative
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  },
}
</script>
<style lang="scss" scoped>
.chat-robot {
  position: fixed;
  left: 20px;
  bottom: 10px;
  width: 110px;
  height: 110px;
  z-index: 101;

  .chat-robot-btn {
    position: relative;
    width: 95px;
    height: 95px;
    border-radius: 100%;
    border: 1px solid $darkGreen;
    background-color: #fff;
    background-image: url(../assets/image/news-img/chat-robot-img.svg);
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    .chat-icon {
      position: absolute;
      right: 12px;
      top: 15px;
      cursor: pointer;
    }
  }
}

// chat field
.chat-field {
  width: 450px;
  bottom: 120px;
  left: 15px;
  position: absolute;
  border-radius: 20px;
  @include sm() {
    width: 370px;
  }
  @include bp(390px) {
    width: 300px;
  }
  .chat-intro-field {
    text-align: center;
    background-color: $darkGreen;
    color: #fff;
    padding: 30px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    overflow: hidden;
    scroll-margin-top: 60px;
    .chat-title {
      margin-bottom: 15px;
      font-size: $fontBase;
      font-family: inherit;
    }

    .chat-intro {
      font-size: 12px;
    }
  }

  input[type='text'] {
    position: absolute;
    top: 95px;
    right: 50%;
    transform: translateX(50%);
    width: 80%;
    padding: 10px 25px 10px 10px;
    border-radius: 5px;
    border: 1px solid #eee;
  }

  .submit-btn {
    position: absolute;
    top: 105px;
    right: 30px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .chat-area {
    width: 100%;
    height: 280px;
    overflow: auto;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    border: 1px solid $darkGreen;
    &::-webkit-scrollbar {
      display: none;
    }
    .text {
      background-color: $lightGreen;
      color: #fff;
      width: 100%;
      height: auto;
      padding: 20px;
      display: block;
      word-wrap: break-word;
      margin-bottom: 10px;
      border-radius: 60px;
      line-height: 1.2;
      border-bottom-right-radius: 0px;
      box-sizing: border-box;
      font-size: $fontBase;
    }

    .robot {
      border-bottom-right-radius: 60px;
      border-bottom-left-radius: 0px;
      background-color: #fff;
      border: 1px solid $darkGreen;
      color: black;
    }
  }
}
</style>
