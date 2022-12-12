<template>
<div class="main-wrapper">
  <div class="container">
    <h2 class="page-heading">Posts Page</h2>
    <div class="control-panel flex center just-btwn">
      <MyButton @click="showDialog">
        Create post
      </MyButton>
      <MyInput v-focus v-model="searchQuery" placeholder="Search..." />
      <MySelect v-model="SelectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:show="isDialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <p v-else class="loading-message">
      Loading ...
    </p>
    <!-- ENDLESS POSTS SCROLLING -->
    <div v-intersection="loadMorePosts" class="observer flex center just-center">
      Scroll observer
    </div>
    <!-- <div ref="observer" class="observer flex center just-center">
      Scroll observer
    </div> -->
    <!-- PAGINATION -->
    <!-- <div class="pagination flex center just-center">
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
    </div> -->
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
    // IF ENDLESS LOADING WITH SCROLL
    async loadMorePosts() {
      try {
        this.pageNumber += 1;
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.pageNumber,
            _limit: this.postsPerPage
          }
        });
        this.totalPagesCount = Math.ceil(response.headers['x-total-count'] / this.postsPerPage);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log(e)
      } finally {
        this.isPostsLoading = false;
      }
    },
    // PAGINATION
    // switchPage(page) {
    //   this.pageNumber = page;
    // }
  },
  mounted() {
    this.fetchPosts();
    // Scroll observer
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.pageNumber < this.totalPagesCount) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
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
    // PAGINATION
    // pageNumber() {
    //   this.fetchPosts();
    // },
    // SelectedSort(newValue) {
    //   this.posts.sort((post1, post2) => {
    //     return post1[newValue]?.localeCompare(post2[newValue])
    //   })
    // }
  }
}
</script>

<style>
/* PAGINATION */
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
/* SCROLL OBSERVER */
.observer {
  height: 2rem;
  background-color: rgb(213, 146, 245);
  font-weight: 700;
  border-radius: 4px;
}
</style>
