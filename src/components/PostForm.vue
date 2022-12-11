<template>
    <form class="form">
        <h4 class="form-heading">
            Post creating
        </h4>
        <MyInput type="text" placeholder="Name" v-model="post.title" />
        <MyInput type="text" placeholder="Description" v-model="post.body" />
        <MyButton class="btn" @click="formBtnClick">
            Create
        </MyButton>
    </form>
</template>

<script>
export default {
    name: 'PostForm',
    components: {
        
    },
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        formBtnClick(e) {
            e.preventDefault();
            this.post.id = Date.now();
            if (this.title !== '') {
                this.$emit('create', this.post);
            }
            this.post = {
                title: '',
                body: ''
            }
        }
    },
    watch: {
        post: {
            handler(newVal) {
                console.log(newVal);
            },
            deep: true
        }
    }
}
</script>

<style>
.form {
  padding: 1rem 2rem;
  border-radius: 5px;
  border: 1px solid rgb(145, 223, 145);
  margin-bottom: 2rem;
}

.form-heading {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}


</style>