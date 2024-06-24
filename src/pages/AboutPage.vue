<template>
    <div class="container">
        <h1 style="font-weight: bold;" class="title">About Us</h1>
        <p>Welcome to our site!</p>
        <p>We are Shay Harling and Shahar Revivo, Software and Information Systems Engineering students at Ben Gurion University.</p>
        <p>We met somewhere in 2021 in the first year of the degree and since then we have been inseparable - </p>
        <p>studying together, doing all the assignments together and in the last year even sharing an apartment.</p>
        <p>Beyond our love for code, we share an inexplicable love for food, especially Italian food.</p>
        <p>On our website we will show you our best recipes that comfort us in moments of crisis in studies (and no, there are no shortage of them).</p>
        <p>We invite you to enter the kitchen and enjoy yourself too </p>
        <p> ♡ </p>
        <!-- Adding three photos -->
        <div class="photos">
            <img src="@/assets/hayot_be_seret.jpeg" alt="First Image Description">
            <img src="@/assets/hayot_be_seret_3.jpeg" alt="Third Image Description">
            <img src="@/assets/hayot_be_seret_2.jpeg" alt="Second Image Description">
        </div>
    </div>

</template>

<style scoped>
    
    .container {
        margin-top: 50px;
        font-family: 'Calibri Light', 'Calibri';
        font-size: large;
        color: #000000;
        
        display: flex;
        flex-direction: column;
        justify-content: center; /* Centers vertically */
        align-items: center; /* Centers horizontally */
        
    }
    .title {
        font-family: 'Calibri Light', 'Calibri';
        color: #000000;
        align-items: center;
        
    }

    .photos {
        display: flex;
        justify-content: space-around; /* Adjust spacing between images */
        margin-top: 20px;
        margin-bottom: 20px; /* Adjust margin as needed */
    }

    .photos img {
        width: 25%;
        border-radius: 8px; /* Optional: Add border radius for rounded corners */
    }
</style>