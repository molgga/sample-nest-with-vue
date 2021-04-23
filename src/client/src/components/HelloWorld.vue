<template>
  <div class="hello-world">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="sample-code">
      <h2>Some api response</h2>
      <div class="code">curl 'http://localhost:8888/api/foo' -L compressed</div>
      <a href="http://localhost:8888/api/foo" target="_blank">/api/foo</a>
    </div>
    <div class="sample-code">
      <h2>Some SSR response</h2>
      <div class="code">
        curl 'http://localhost:8888/some-page' -H 'User-Agent: Googlebot' -L compressed
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {},
});
</script>

<style scoped lang="scss">
.hello-world {
  margin: 0 auto;
  padding: 20px 0;
  max-width: 1200px;
}
.sample-code {
  margin: 12px;
  padding: 12px;
  color: #222222;
  border-radius: 10px;
  background-color: #f5f5f5f5;
  h2 {
    margin: 0;
    padding: 5px;
  }
  .code {
    padding: 5px;
  }
}
</style>
