<template>
  <div class="card">
    <div class="cardimg">
      <img src="../assets/image/logo002.svg" alt="" />
    </div>
    <div class="cardtext">
      <p>OOPS~</p>
      <p>此頁無內容!!!!</p>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.card {
  width: 50%;
  aspect-ratio: 16/9;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(20, 68, 51,);
  color: azure;
  border-radius: 20px;
  padding: 20px; /* 添加內邊距增加卡片與內容的間距 */

  .cardimg {
    width: 30%;
    aspect-ratio: 1/1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: top;
      animation: moveUpDown 1s ease-in-out infinite alternate; /* 添加動畫效果 */
    }
  }
}
.cardtext {
  p {
    text-align: center;
    font-size: 2em;
    margin-top: 20px; /* 文字與圖片的間距 */
    @include lg() {
      font-size: 1.75em;
    }
    @include md() {
      font-size: 1.5em;
    }
    @include sm() {
      font-size: 1em;
    }
  }
}

@keyframes moveUpDown {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(-20px); /* 控制向上移動的距離 */
  }
}
</style>
