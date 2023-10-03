<template>
  <div>
    <BlogPost
      v-for="(post, index) in posts"
      :key="index" 
      :title="post.title"
      :text="post.text || post.bodytext"
      :date="post.date"
      :username="post.username"
      @edit="onEdit(index, $event)"
      @delete="onDelete(index)"
    />
  </div>
</template>

<script>
import BlogPost from '../../src/components/BlogPost.vue'
import axios from 'axios'; 

export default {
  name: 'Blogfeed',
  components: {
    BlogPost
  },
  data() {
    return {
      posts:[]
    }
  },
  methods: {
    onEdit(index, newText) {
      console.log('New Text:', newText);
      this.posts[index].text = newText;
      
      console.log("Post ID:", this.posts[index]._id);
      axios.put("http://localhost:3500/modifyPost/" + this.posts[index]._id, {
        bodytext: newText
        //text: newText
        //bodytext: bodytext
      })
      .then(response => { 
        console.log("Update Success:", response.data)
      })
      .catch(error => { 
        console.log('Error updating post:', error)
      }) 
    }, 

    onDelete(index){
      console.log("Post ID: ", this.posts[index]._id); 
      axios.delete("http://localhost:3500/deletePost/" + this.posts[index]._id, {}) 
        .then(response => { 
          this.posts.splice(index, 1);
          console.log("Delete Success:", response.data)
        })
        .catch(error => { 
          console.log('Error deleting post:', error);
        });
      /*
      console.log("Post ID: ", this.posts[index]._id);
      if (this.posts[index]){ 
        this.posts.splice(index,1);
      }*/ //Working delete in case it goes wrong
    },
    //Fetching the data
    fetchData(){ 
      axios.get("http://localhost:3500/CreateBlog")
        .then(response => { 
          //console.log(response.data);
          this.posts = response.data.data;
          //console.log("Posts:", this.posts);
          //console.log("Type of posts:", typeof this.posts);
          for(let key in this.posts) {
            //console.log("Title:", this.posts[key].title);
            
            //console.log("Date:", this.posts[key].date);
            let postText = this.posts[key].text ? this.posts[key].text : this.posts[key].bodytext;
            console.log("Text:", postText);
            //console.log("Post ID:", this.posts[key]._id);
          }
        })
        .catch(error =>{ 
          console.log(error);
        });
    }
  }, 
  mounted(){ 
    this.fetchData();
  }
}
</script>

<style>

    body{
        /*background-color: white;

        /* add for background-colour showing on entire page */
        width: 100%;
        min-height: 100vh;

        /* font-family: 'Delicious Handrawn', cursive; */
        font-family: 'Bad Script', cursive;
    }

</style>
