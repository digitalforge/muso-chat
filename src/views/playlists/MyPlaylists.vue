<template>
  <div class="user-playlists">
    <h1>My Playlists</h1>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <div v-else>
      <h4>You don't currently have any Playlists created</h4>
    </div>
    <br />
    <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
      >Create Playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection"
import getUser from "@/composables/getUser"
import ListView from "@/components/ListView"

export default {
  components: { ListView },
  setup(props, context) {
    const { user } = getUser()
    const { documents: playlists, error } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ])

    return { playlists }
  },
}
</script>

<style scoped></style>
