<template>
    <div class="post flex just-btwn">
        <div class="post-content">
            <h3 class="post-name">
                {{post.id}}. {{post.title}}
            </h3>
            <p class="post-body">
                {{post.body}}
            </p>
        </div>
        <div class="action-btns">
            <MyButton class="btn-delete" @click="$emit('remove', post)">Del</MyButton>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostItem',
    components: {
        
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.post {
  background-color: #2C2C2C;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
}
.post-name {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #555;
  margin-bottom: 0.5rem;
}
</style>