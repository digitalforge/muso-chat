<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" :alt="playlist.title" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.desription }}</p>
      <button class="btn" v-if="ownership" @click="handleDelete">
        Delete Playlist
      </button>
    </div>

    <!-- Song List -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No Songs have been added to this playlist yet.
      </div>
      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
          <button v-if="ownership" @click="songDelete(song.id)">Delete</button>
        </div>
      </div>
      <AddSong :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import useDocument from "@/composables/useDocument"
import useStorage from "@/composables/useStorage"
import getDocument from "@/composables/getDocument"
import getUser from "@/composables/getUser"
import { computed } from "@vue/runtime-core"
import AddSong from "@/components/AddSong"
import { useRouter } from "vue-router"

export default {
  props: ["id"],
  components: { AddSong },
  setup(props, context) {
    const { document: playlist, error } = getDocument("playlists", props.id)
    const { user } = getUser()
    const { removeDoc } = useDocument("playlists", props.id)
    const { deleteImage } = useStorage()
    const { updateDocument } = useDocument("playlists", props.id)
    const router = useRouter()

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      )
    })

    const handleDelete = async () => {
      await removeDoc()
      await deleteImage(playlist.value.filePath)

      router.push({ name: "Home" })
    }

    const songDelete = (id) => {
      const filteredSongs = playlist.value.songs.filter(
        (song) => song.id !== id
      )

      updateDocument([...filteredSongs]).then(() => {
        console.log("Song deleted")
      })
    }

    return { playlist, error, ownership, handleDelete, songDelete }
  },
}
</script>

<style></style>
