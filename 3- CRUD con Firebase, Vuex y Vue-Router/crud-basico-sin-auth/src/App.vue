<template>
  <div id="app" class="container mt-3">
    <div class="row">
      <div class="col-12 text-center">
        <router-link :to="{name: 'Home'}">
          <img alt="Vue logo" src="@/assets/logo.png" class="my-3">
        </router-link>
      </div>
      <div class="col-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>


<style lang="scss">

</style>
