<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Title" v-model="title" />
    <textarea
      required
      placeholder="Playlist Description"
      v-model="description"
    ></textarea>
    <label>Upload playlist image</label>
    <input @change="handleChange" type="file" />
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <button v-if="!isPending">Add Playlist</button>
    <button v-else disabled>Adding Playlist ...</button>
  </form>
</template>

<script>
import { ref } from "vue"
import { timestamp } from "@/firebase/config"
import useStorage from "@/composables/useStorage"
import useCollection from "@/composables/useCollection"
import getUser from "@/composables/getUser"
import { useRouter } from "vue-router"

export default {
  setup(props, context) {
    const title = ref("")
    const description = ref("")
    const file = ref(null)
    const fileError = ref(null)
    const { user } = getUser()
    const router = useRouter()

    const { error, filePath, uploadImage, url } = useStorage()
    const { addDocument, isPending } = useCollection("playlists")

    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value)
        const res = await addDocument({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp,
        })
        if (!error.value) {
          console.log(res.id)
          router.push({ name: "PlaylistDetails", params: { id: res.id } })
        }
      }
    }

    //allowed file types
    const types = ["image/png", "image/jpeg", "image/jpg"]

    const handleChange = (e) => {
      const selected = e.target.files[0]
      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = "Please upload PNG or JPG only"
      }
    }

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    }
  },
}
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
