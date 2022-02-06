<template>
  <div class="app">
    <div class="user"
         @click="$router.push('/home/userHome')">
      <div class="user-txt">
        <span>美好生活</span>
        <span>尽在掌握</span>
        <span class="sp1"><i class="el-icon-school"></i></span>
      </div>
      <img src="../assets/images/welcome.jpg" alt="">
    </div>
    <div class="change user"
         ref="change"
         :style="{opacity: changeOp,transform:tr1}"
         @click="$router.push('/home/change')">
    </div>
    <div class="box"
         ref="box"
         :style="{opacity: boxOp}">
      <div class="sp"
           v-for="i in box"
           :key="i.id"
           @click="$router.push(i.path)"
           :style="{backgroundColor:i.bgc,color:i.color}">
        <div><i :class="i.icon"></i></div>
        <div>{{ i.name }}</div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
