<template>
  <div class="post-list">
    <h2 class="section-heading">
        Posts
    </h2>
    <div class="posts-wrapper" v-if="posts.length > 0">
        <transition-group name="post-list">
            <PostItem :post="post" v-for="post in posts" :key="post.id" @remove="$emit('remove', post)" />
        </transition-group>
    </div>
    <p v-else class="no-posts-message">
        There's no posts yet...
    </p>
  </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';

export default {
    name: 'PostList',
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>
.post-list-move, /* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-leave-active {
  position: absolute;
}
</style>