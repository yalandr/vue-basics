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
    <div class="pagination flex center just-center">
      <div 
        v-for="page in totalPagesCount" 
        :key="page" 
        class="page-number flex center just-center" 
        :class="{
          'current' : pageNumber === page
        }"
        @click="switchPage(page)"
        >
        {{page}}
      </div>
    </div>
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
      searchQuery: '',
      pageNumber: 1,
      postsPerPage: 10,
      totalPagesCount: 0
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
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.pageNumber,
              _limit: this.postsPerPage
            }
          });
          this.totalPagesCount = Math.ceil(response.headers['x-total-count'] / this.postsPerPage);
          this.posts = response.data;
          this.isPostsLoading = false;
        }, 500)
      } catch (e) {
        console.log(e)
      }
    },
    switchPage(page) {
      this.pageNumber = page;
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
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    pageNumber() {
      this.fetchPosts();
    },
    // SelectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
  }
}
</script>

<style>
.page-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #555;
  color: #ccc;
  cursor: pointer;
  margin: 0 .2rem;
  transition: .1s
}
.page-number:hover {
  background-color: #777;
}
.page-number.current {
  background-color: rgb(78, 157, 247);
}
</style>
