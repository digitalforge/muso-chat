<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button disabled v-if="isPending">Signing Up...</button>
  </form>
</template>

<script>
import { ref } from "vue"
import useSignup from "@/composables/useSignup"
import { useRouter } from "vue-router"

export default {
  setup(props, context) {
    const email = ref("")
    const password = ref("")
    const displayName = ref("")
    const router = useRouter()
    const { signup, error, isPending } = useSignup()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        console.log("User Signed up")
        router.push({ name: "MyPlaylists" })
      }
    }

    return { email, password, displayName, error, handleSubmit, isPending }
  },
}
</script>

<style></style>
