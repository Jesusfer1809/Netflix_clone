# Netflix Clone

**A clone of thhe landing page of Netflix, that serves data from TMDB and shows lists of movies, some description about them**

**Click here to see the live demo &rarr;** [Netflix Clone site](https://netflix-clone-jesusfer1809.vercel.app "Netflix Clone site")

![](https://i.imgur.com/Zu1Scyf.jpg)

---

## About the project

This is a full-stack project. It has the following functionalities:

- You sign into your email account via Next auth. Then, you get redirected to the home page, where you must buy a subscription to be able to access the content.

- To do this, you get redirected a Stripe checkout page. Use the test card Stripe provides (4242 4242 4242 4242), an expiring date in the future, and a 3 digit number for the CVC.

- Once you have completed your subscription, you have acces to the movies content.

- In the page you can see the movies that are avilable, as well as a modal that shows their info.

---

#### This project was created with:

<p align="left">  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>       <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>   <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </p>

- HTML/CSS
- Tailwind
- Javascript
- React
- NextJs
- MongoDb

#### Key concepts:

- Axios
- Connection with TMDB API
- Integrate MongoDb with Nextjs
- Next Auth
- Stripe checkout and webhooks

#### TODOS:

There are some features to implement in the future, to give the user the best experience possible.

- Make that input in /login page work XD.
- The users can change their name and profile picture.
- Implement a success page to be redirected to once your Stripe payment has been complete. It will welcome you to the page.
- Refactor the code, implement good practices that I learn on the way.
- Implement a modal for the movies info in /index page.
- Have a better understand in Nextjs Image component, and how to implement a placeholder while the image is loading.
- Add React query to the page, for better API calls.
