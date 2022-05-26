<template>
  <div class="home">
    <ListView :playlists="documents" />
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from "@/composables/getCollection"
import ListView from "../components/ListView.vue"

import { ref } from "vue"
export default {
  name: "Home",
  components: { ListView },
  setup(props, context) {
    const { documents, error } = getCollection("playlists")

    return { documents, error }
  },
}
</script>
