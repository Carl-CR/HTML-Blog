<template>
  <div class="total_container">
    <div class="card">
      <header class="card-header">
        <div class="card-header-container">
          <p class="card-header-title">{{ title }}</p>
          <p class="card-header-date">{{ date }}</p>
          <p class="card-header-username">{{ username }}</p>
        </div>
      </header>
      <div class="card-content">
        <div class="content">
          <div v-if="!isEditing">{{ text }}</div>
          <div v-else>
            <textarea v-model="editedText" class="textarea"></textarea>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button v-if="!isEditing" class="card-footer-item" @click="onEdit">Edit</button>
        <button v-if="!isEditing" class="card-footer-item" @click="onDelete">Delete</button>
        <button v-if="!isEditing" class="card-footer-item" @click="onShare">Share
          <span v-if="!isEditing" class="icon share-btn">
            <i class="fa fa-share fa-lg" ></i>
          </span>
        </button>
        <button v-if="isEditing" class="card-footer-item" @click="onSave">Save</button>
        <button v-if="isEditing" class="card-footer-item" @click="onCancel">Cancel</button>       
      </footer>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'BlogPost',
    props: {
      title: String,
      text: String, 
      date: String,
      username: String
    },
    data() {
      return {
        isEditing: false,
        editedText: ''
      };
    },
    methods: {
      onEdit() {
        this.isEditing = true;
        this.editedText = this.text;
      },
      onSave() {
        this.isEditing = false;
        this.$emit('edit', this.editedText);
      },
      onCancel() {
        this.isEditing = false;
        this.editedText = this.text;
      },
      onShare(){
        this.isEditing = false;
        console.log("sharing as an email!");

        const emailSubject = `Blog post sent from BLOGO!`;

        const recipient = window.prompt('Enter email address:');
        if (recipient) {
          const emailContent = `Hey! I'm sharing this blog post with you: ${this.text}`;
          window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${emailContent}`;
        }
      }, 
      onDelete(){ 
        if (confirm("Are you sure you want to delete this post?")){ 
          this.$emit('delete');
        }
      }

    }
  };
</script>
  
<style scoped>
  .total_container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding-top: 50px;
  }

  .card {
    background-color: #d3d3d3;
  }

  .card-header-container {
    display: flex;
    align-items: center;
  }

  .card-header-title {
    font-size: 24px;
    flex-grow: 1;
  }

  .card-header-date {
    font-size: 14px;
    color: gray;
    flex-grow: 1;
  }

  .card-header-username {
    padding-left: 5px;
    font-size: 14px;
    font-weight: bold;
    float: right;
    color: rgb(0, 0, 0);
    flex-grow: 1;
  }

  .content {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 1.5;
  }

  .textarea {
    resize: none;
    width: 100%;
    height: 100px;
  }

</style>