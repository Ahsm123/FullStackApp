<template>
  <NavBar :user="user" />
  <div class="page-wrap">
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { watchAuthState } from "@/services/authService";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  setup() {
    const user = ref(null);

    onMounted(() => {
      watchAuthState((newUser) => {
        user.value = newUser;
      });
    });

    return { user };
  },
};
</script>
