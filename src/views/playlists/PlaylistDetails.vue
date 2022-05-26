<template>
  <Playlist :id="id" />
</template>

<script>
import Playlist from "@/components/Playlist"

export default {
  props: ["id"],
  components: { Playlist },
}
</script>

<style></style>
