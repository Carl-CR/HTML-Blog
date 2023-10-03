<template>
    <!-- code from blogo.html - start page -->

    <!-- welcome message  -->
    <div class="mode-change">
        <div>
            <h1 id="welcome_msg">Welcome to BLOGO - your personal blog!</h1>
            <!-- <h2 id="instructions"> Login or Signup to begin blogging! </h2> -->
            <!-- <h2 class="instructions">Existing User? Login to begin blogging!</h2> -->
            <!-- <h2 class="instructions">New User? Sign up and create and account to begin blogging</h2> -->
        </div>

        <!-- Blog site rules -->
        <div id="blog_rules">
        <h3 id="rules_title">RULES</h3>
        <p id="rules_instructions">Hello! &#128075;</p>
        <p id="rules_instructions">Welcome to BLOGO, your online space for documenting your thoughts! We're really glad you're here! Now, before you start blogging, we'd like to remind you of some of the rules of BLOGO:</p>

        <ol id="rules">
            <li>Treat everyone with respect. Absolutely no harassment, sexism, racism, or hate speech will be tolerated.</li>
            <!-- <li>No posting of any type of explicit material.</li> -->
            <li>No posting phishing or scam links, misinformation, or malicious material.</li>
            <li>No engaging in any acts of racism, sexism, homophobia, or bigotry of any kind.</li>
        </ol>

        <p class="get_started"><b>Already have an account?</b> Click <a href="http://localhost:8080/login">here</a> to get started! </p>
        <p class="get_started"><b>New User?</b> Click <a href="http://localhost:8080/signup">here</a> to get started! </p>

        <h3 id="rules_title">WE CAN'T WAIT TO SEE WHAT STORIES YOU CREATE &#10084;&#65039;</h3>

        </div>
    </div>
</template>

<style>
    body{
        background-color: white;

        /* add for background-colour showing on entire page */
        width: 100%;
        min-height: 100vh;

        font-family: 'Bad Script', cursive;
    }

    .mode-change {
        color: black;
    }

    #welcome_msg {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        padding-top: 50px;
        font-size: 50px;  
    }

    .instructions {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        font-size: 30px;  
    }

    #blog_rules {
        /* background-color: #a9a9a9; */
        align-items: center;
        margin: auto;
        border-radius: 10px;
        width: 60%;
        height: 600px;
        font-family: 'PT Mono', monospace;
    }

    #rules_title {
        font-weight: bold;
        font-size: 40px;
        text-align: center;
        align-items: center;
        margin: auto;
        padding-bottom: 10px;
    }

    #rules_instructions {
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
    }

    #rules {
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 45px;
    }

    .get_started {
        padding-left: 20px;
    }
</style>