<template>
  <div class="solar-syst">
    <div class="sun"></div>
    <div class="mercury"></div>
    <div class="venus"></div>
    <div class="earth"></div>
    <div class="mars"></div>
    <div class="jupiter"></div>
    <div class="saturn"></div>
    <div class="uranus"></div>
    <div class="neptune"></div>
    <div class="pluto"></div>
    <div class="asteroids-belt"></div>
  </div>
  <h1>欢迎你来到这里哇！</h1>
  <div class="userinfo">
    <router-link to="/home">
      <h2>中微子</h2>
    </router-link>
    <router-link to="/home">
      <img src="/avatar.png" />
    </router-link>
    <div class="contact">
      <a v-for="v in contact" :key="v.name" :href="v.link" target="_blank">
        <i :class="`iconfont icon-${v.name}`"></i>
      </a>
    </div>
  </div>
  <address>
    第四可观测宇宙 - 双鱼/鲸鱼座超星系团复合体 - 拉尼亚凯亚超星系团 -
    室女座星系团 - 本星系群 - 银河系 - 太阳系 - 地球 - 中国 - 云南
  </address>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { useStore } from "vuex";

const contact = [
  {
    name: "github",
    link: "https://github.com/DSzhongweizi",
  },
  {
    name: "toutiao",
    link: "https://www.toutiao.com/c/user/token/MS4wLjABAAAAZ4Yz9x5SYQcuIZ7ksZJdtVnNDitZgmtZxTB6vh9WXs0/",
  },
  {
    name: "weibo",
    link: "https://weibo.com/6509356364/profile?rightmod=1&wvr=6&mod=personinfo",
  },
];
</script>
<style lang="scss" scoped>
@use "sass:math";
@use "sass:string";
$year-in-second: 30; // 1 Earth year = 30 sec
h1 {
  background: linear-gradient(120deg, #155799, #159957);
  -webkit-background-clip: text;
  color: transparent;
}
a {
  color: #fff;
}
.userinfo {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
  h2 {
    cursor: pointer;
  }
  img {
    width: 100px;
    margin: 1em;
    border-radius: 50%;
    animation: avatar 4s infinite alternate;
    transition: transform 2s;
    &:hover {
      transform: rotate(360deg);
    }
  }
  @keyframes avatar {
    from {
      width: 100px;
    }
    to {
      width: 120px;
    }
  }
  .contact {
    display: flex;
    .iconfont {
      font-size: 3em;
      padding: 0.5em;
    }
  }
}
address {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  opacity: 0.5;
}

@function revolution($pl-year-in-days) {
  // @return $pl-year-in-days * $year-in-second / 365.2563 + s;
  @return math.div($pl-year-in-days * $year-in-second, 365.2563) + s;
}
@function alphaRandom() {
  @return math.random(1000) * 0.001;
}
@function stars($s, $max-area, $min-area: 0, $star-size: 0) {
  $stars: #{$min-area + math.random($max-area)}px #{$min-area +
    math.random($max-area)}px 0 #{$star-size}px
    rgba(255, 255, 255, alphaRandom());
  @for $i from 1 to $s {
    $stars: "#{$stars} , #{$min-area + math.random($max-area)}px #{$min-area + math.random($max-area)}px 0 #{$star-size}px rgba(255,255,255, #{alphaRandom()})";
  }
  @return string.unquote($stars);
}

$sun: 40px;
$mercury-orb: 70px;
$mercury-pl: 4px;
$venus-orb: 100px;
$venus-pl: 8px;
$earth-orb: 145px;
$earth-pl: 6px;
$mars-orb: 190px;
$mars-pl: 6px;
$jupiter-orb: 340px;
$jupiter-pl: 18px;
$saturn-orb: 440px;
$saturn-pl: 12px;
$uranus-orb: 520px;
$uranus-pl: 10px;
$neptune-orb: 630px;
$neptune-pl: 10px;
$pluto-orb: 780px;
$pluto-pl: 3px;

$asteroids-belt-orb: 300px;
$asteroids-belt-pl: 210px;

*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.solar-syst {
  pointer-events: none; /* 事件穿透到下层 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at bottom, #1c2837 0%, #050608 100%);
  background-attachment: fixed;
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    width: 2px;
    top: -2px;
    background: white;
    box-shadow: stars(500, 2000, -1000);
    border-radius: 100px;
  }

  div {
    border-radius: 1000px;
    top: 50%;
    left: 50%;
    position: absolute;
    z-index: 999;
    &:not(.sun) {
      border: 1px solid rgba(102, 166, 229, 0.12);
      &:before {
        left: 50%;
        border-radius: 100px;
        content: "";
        position: absolute;
      }
    }
    &:not(.asteroids-belt) {
      &:before {
        box-shadow: inset 0 6px 0 -2px rgba(0, 0, 0, 0.25);
      }
    }
  }
}

.sun {
  background: radial-gradient(
    ellipse at center,
    #ffd000 1%,
    #f9b700 39%,
    #f9b700 39%,
    #e06317 100%
  );
  height: $sun;
  width: $sun;
  margin-top: math.div(-$sun, 2);
  margin-left: math.div(-$sun, 2);
  background-clip: padding-box;
  border: 0 !important;
  background-position: -28px -103px;
  background-size: 175%;
  box-shadow: 0 0 10px 2px rgba(255, 107, 0, 0.4),
    0 0 22px 11px rgba(255, 203, 0, 0.13);
}

.mercury {
  height: $mercury-orb;
  width: $mercury-orb;
  margin-top: math.div(-$mercury-orb, 2);
  margin-left: math.div(-$mercury-orb, 2);
  animation: orb revolution(87.5) linear infinite;
  &:before {
    height: $mercury-pl;
    width: $mercury-pl;
    background: #9f5e26;
    margin-top: math.div(-$mercury-pl, 2);
    margin-left: math.div(-$mercury-pl, 2);
  }
}

.venus {
  height: $venus-orb;
  width: $venus-orb;
  margin-top: math.div(-$venus-orb, 2);
  margin-left: math.div(-$venus-orb, 2);
  animation: orb revolution(224.7) linear infinite;
  &:before {
    height: $venus-pl;
    width: $venus-pl;
    background: #beb768;
    margin-top: math.div(-$venus-pl, 2);
    margin-left: math.div(-$venus-pl, 2);
  }
}

.earth {
  height: $earth-orb;
  width: $earth-orb;
  margin-top: math.div(-$earth-orb, 2);
  margin-left: math.div(-$earth-orb, 2);
  animation: orb revolution(365.2563) linear infinite;
  &:before {
    height: $earth-pl;
    width: $earth-pl;
    background: #11abe9;
    margin-top: math.div(-$earth-pl, 2);
    margin-left: math.div(-$earth-pl, 2);
  }
  &:after {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 50%;
    top: 0px;
    margin-left: -9px;
    margin-top: -9px;
    border-radius: 100px;
    box-shadow: 0 -10px 0 -8px grey;
    animation: orb revolution(27.3216) linear infinite;
  }
}
.mars {
  height: $mars-orb;
  width: $mars-orb;
  margin-top: math.div(-$mars-orb, 2);
  margin-left: math.div(-$mars-orb, 2);
  animation: orb revolution(687) linear infinite;
  &:before {
    height: $mars-pl;
    width: $mars-pl;
    background: #cf3921;
    margin-top: math.div(-$mars-pl, 2);
    margin-left: math.div(-$mars-pl, 2);
  }
}

.jupiter {
  height: $jupiter-orb;
  width: $jupiter-orb;
  margin-top: math.div(-$jupiter-orb, 2);
  margin-left: math.div(-$jupiter-orb, 2);
  animation: orb revolution(4331) linear infinite;
  &:before {
    height: $jupiter-pl;
    width: $jupiter-pl;
    background: #c76e2a;
    margin-top: math.div(-$jupiter-pl, 2);
    margin-left: math.div(-$jupiter-pl, 2);
  }
}
.saturn {
  height: $saturn-orb;
  width: $saturn-orb;
  margin-top: math.div(-$saturn-orb, 2);
  margin-left: math.div(-$saturn-orb, 2);
  animation: orb revolution(10747) linear infinite;
  &:before {
    height: $saturn-pl;
    width: $saturn-pl;
    background: #e7c194;
    margin-top: math.div(-$saturn-pl, 2);
    margin-left: math.div(-$saturn-pl, 2);
  }
  &:after {
    position: absolute;
    content: "";
    height: 2.34%;
    width: 4.676%;
    left: 50%;
    top: 0px;
    transform: rotateZ(-52deg);
    margin-left: -2.3%;
    margin-top: -1.2%;
    border-radius: 50% 50% 50% 50%;
    box-shadow: 0 1px 0 1px #987641, 3px 1px 0 #987641, -3px 1px 0 #987641;
    animation: orb revolution(10747) linear infinite;
    animation-direction: reverse; // compensate to reverse main orbit animation
    transform-origin: 52% 60%;
  }
}

.uranus {
  height: $uranus-orb;
  width: $uranus-orb;
  margin-top: math.div(-$uranus-orb, 2);
  margin-left: math.div(-$uranus-orb, 2);
  animation: orb revolution(30589) linear infinite;
  &:before {
    height: $uranus-pl;
    width: $uranus-pl;
    background: #b5e3e3;
    margin-top: math.div(-$uranus-pl, 2);
    margin-left: math.div(-$uranus-pl, 2);
  }
}

.neptune {
  height: $neptune-orb;
  width: $neptune-orb;
  margin-top: math.div(-$neptune-orb, 2);
  margin-left: math.div(-$neptune-orb, 2);
  animation: orb revolution(59802) linear infinite;
  &:before {
    height: $neptune-pl;
    width: $neptune-pl;
    background: #175e9e;
    margin-top: math.div(-$neptune-pl, 2);
    margin-left: math.div(-$neptune-pl, 2);
  }
}

.asteroids-belt {
  opacity: 0.7;
  border-color: transparent !important;
  height: $asteroids-belt-orb;
  width: $asteroids-belt-orb;
  margin-top: math.div(-$asteroids-belt-orb, 2);
  margin-left: math.div(-$asteroids-belt-orb, 2);
  animation: orb revolution(2191) linear infinite;
  overflow: hidden;
  &:before {
    top: 50%;
    height: $asteroids-belt-pl;
    width: $asteroids-belt-pl;
    margin-left: math.div(-$asteroids-belt-pl, 2);
    margin-top: math.div(-$asteroids-belt-pl, 2);
    background: transparent;
    border-radius: 140px !important;
    box-shadow: stars(390, 290, math.div(-290, 2), -104);
  }
}

.pluto {
  height: $pluto-orb;
  width: $pluto-orb;
  margin-top: math.div(-$pluto-orb, 2) + -60;
  margin-left: math.div(-$pluto-orb, 2) + 70;
  animation: orb revolution(90580) linear infinite;
  &:before {
    height: $pluto-pl;
    width: $pluto-pl;
    background: #fff;
    margin-top: math.div(-$pluto-pl, 2);
    margin-left: math.div(-$pluto-pl, 2);
  }
}

@keyframes orb {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
