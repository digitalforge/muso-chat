<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <input type="text" placeholder="Song Title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button v-if="isPending === false">Add</button>
      <button disabled v-if="isPending">Adding Songs</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue"
import useDocument from "@/composables/useDocument"

export default {
  props: ["playlist"],
  setup(props, context) {
    const showForm = ref(false)
    const title = ref("")
    const artist = ref("")

    const { updateDocument, isPending } = useDocument(
      "playlists",
      props.playlist.id
    )

    const handleSubmit = () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000),
      }

      updateDocument([...props.playlist.songs, newSong]).then(() => {
        title.value = ""
        artist.value = ""
      })
    }

    return { showForm, title, artist, handleSubmit, isPending }
  },
}
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}

form {
  max-width: 100%;
  text-align: left;
}
</style>
