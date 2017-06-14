<template>
  <section class="container">
    <div>
      <dashboard/>
    </div>
  </section>
</template>

<script>
import dashboard from '~components/Dashboard.vue'

export default {
  components: {
    dashboard
  }
}
</script>

<style lang="scss">
  body {
    color: #fff;
    background-color: #121D2E;
    font-family: Montserrat, sans-serif;
    font-weight: 200;
  }
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .dashboard__header {
    font-size: 20px;
  }
</style>
