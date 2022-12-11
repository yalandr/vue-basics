<template>
<div class="main-wrapper">
  <div class="container">
    <h2 class="page-heading">Posts Page</h2>
    <div class="control-panel flex center just-btwn">
      <MyButton @click="showDialog">
        Create post
      </MyButton>
      <MyInput v-model="searchQuery" placeholder="Search..." />
      <MySelect v-model="SelectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="isDialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <p v-else class="loading-message">
      Loading ...
    </p>
  </div>
</div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      isDialogVisible: false,
      isPostsLoading: false,
      SelectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By Title'},
        {value: 'body', name: 'By Body'},
      ],
      searchQuery: ''
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.isDialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(item => item.id !== post.id)
    },
    showDialog() {
      this.isDialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
          this.isPostsLoading = false;
        }, 1000)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.SelectedSort]?.localeCompare(post2[this.SelectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
    }
  },
  watch: {
    // SelectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
  }
}
</script>

<style>

</style>
