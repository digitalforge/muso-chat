<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png" alt="" />
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <span>Welcome {{ user.displayName }}</span>
          <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <router-link class="btn" :to="{ name: 'MyPlaylists' }"
            >My Playlist</router-link
          >
          <button class="btn" @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Signup' }" class="btn"
            >Sign Up</router-link
          >
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout"
import { useRouter } from "vue-router"
import getUser from "@/composables/getUser"

export default {
  setup(props, context) {
    const { logout, error } = useLogout()
    const router = useRouter()
    const { user } = getUser()

    console.log(user.value.uid)

    const handleClick = async () => {
      const res = logout()
      if (!error.value) {
        router.push({ name: "Login" })
      }
    }
    return { handleClick, user }
  },
}
</script>

<style scoped>
span {
  font-size: 14px;
  display: inline-block;
  marign-right: 16px;
  padding-right: 16px;
  border-right: 1px solid #eee;
}
</style>
