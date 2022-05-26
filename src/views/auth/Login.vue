<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button disabled v-if="isPending">Logging In...</button>
  </form>
</template>

<script>
import { ref } from "vue"
import useLogin from "@/composables/useLogin"
import { useRouter } from "vue-router"

export default {
  setup(props, context) {
    const email = ref("")
    const password = ref("")
    const router = useRouter()
    const { login, error, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: "CreatePlaylist" })
      }
    }

    return { email, password, error, handleSubmit, isPending }
  },
}
</script>

<style></style>
