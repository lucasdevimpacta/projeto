<template>
  <li class="li-event-list-component">
    <div class="display-image-component-container">
      <DisplayImage
        :urlImage="['../statics/img/calendar_icon_parte_1.svg']"
        :imageHeight="['40%']"
        classNames="header-calendar-icon"
      />
      <DisplayImage
        :urlImage="['../statics/img/calendar_icon_parte_2.svg']"
        :imageHeight="['104%']"
        classNames="body-calendar-icon"
      />
      <span class="body-calendar-position">{{date[0]}}</span>
      <span class="header-calendar-position">{{date[1]}}</span>
    </div>
    <p class="text-cotent"><a :href="link">{{text}}</a></p>
  </li>
</template>

<script>
import DisplayImage from "./DisplayImage";

export default {
  name: "LiEventList",
  components: {
    DisplayImage
  },
  props: {
    date: {
      required: true,
      type: Array
    },
    text: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
  }
};
</script>

<style lang="scss">
$distanciaParaCriarDivisor: 20px;
.li-event-list-component {
  padding-bottom: $distanciaParaCriarDivisor;
  margin-bottom: $distanciaParaCriarDivisor;
  border-bottom: 1px solid #0000001a;
  display: flex;
  a{
      color: #272727;
  }
  .display-image-component-container {
    width: 50px;
    min-width: 50px;
    height: 50px;
    position: relative;

    .header-calendar-position,.body-calendar-position{
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
    }
    .header-calendar-position{
        top: 0;
        font-size: 12px;
        line-height: 145%;
        color: white;
        font-weight: 500;
    }
    .body-calendar-position{
        bottom: 0;
        font-size: 20px;
        line-height: 150%;
        color: #364B60;
        font-weight: 500;
    }
  }
  .header-calendar-icon {
    background-position-y: top;
  }
  .body-calendar-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -10;
  }
  .text-cotent{
      margin-left: 16px;
      font-size: 15px;
      margin-bottom: 0;
  }
}
</style>