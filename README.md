<div align="center">
  
<h1 style="font-size: 3rem; margin: 5px auto;">Talent Trade</h1>

### Connecting talents for mutual growth and learning.

<img style="margin: 8px auto;" src="/assets/logo.svg" alt="Talent Trade Logo" width="130">

</div>

Talent Trade is a platform for exchanging knowledge and skills between people. It connects those who want to learn something new with those willing to share their expertise. Users can create detailed profiles with contact information, photo, specialty, and a brief personal description, facilitating connections between people with complementary interests.

<h2>Motivation</h2>
<p>There are existing applications that allow you to connect with people for some specific purpose. Take <a href="https://tandem.net/es" target="_blank">Tandem</a> as an example for language exchange or <a href="https://www.couchsurfing.com/">Couchsurfing</a> for connecting travelers with hosts.</p>
<p>Our application aims to pair up people from a <b>wide</b> gamut of fields and specialties and allow for interaction between them so that they can <strong>exchange</strong> their knowledge and, additionally, see the chance of building a connection.</p>
<p>We make sure you're paired up with the right person by making sure your interests and specialties match with the other individual's interests and specialties.</p>

<h3>Use case example</h3>
Catriel knows HTML, CSS, and JavaScript, but he wants to improve his English. Owen is a native English speaker who wants to learn web development. They both hear about Talent Trade, give it a try and meet on that platform. Given that their specialties and interests match, they arrange a session to exchange knowledge, benefiting each other.

<h2>Features</h2>
<h3>Smart search</h3>
<p>You have the possibility of getting suggestions about exchange partners with complementary interests</p>
<h3>Rating system</h3>
<p>As soon as you've finally exchanged some knowledge with your exchange partner, you have the chance to rate them and express what that interaction was like.</p>
<h3>Customizable profile</h3>
<p>You can let others know about your personality! You can tell what your interests are, your own avatar, and a section that tells about you</p>
<h3>Chat rooms!</h3>
<p>When you're paired up with your exchange match, you can send messages to each other and let the communication flow. This chat is open up to 7 days.</p>

<h2>Tech stack</h2>
The technologies used to build this project are the following:
<h3>Frontend</h3>
<p>For our frontend, we opted for Next.js, which made routing pretty straightforward, and Tailwind CSS, which has predefined classes and lifts off styling overhead</p>
<div>
<img height="100" alt="Next.js" src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"/>
<img height="100" alt="Tailwind CSS" src="https://sudoaugustin.gallerycdn.vsassets.io/extensions/sudoaugustin/tailwindcss-transpiler/0.0.8/1637868312894/Microsoft.VisualStudio.Services.Icons.Default"/>
</div>

<h3>Backend</h3>
<p>For the backend side, we opted for Express.js (a lightweight framework good enough to get the work done) and TypeScript for enforcing correct type matching and custom interfaces for our database models. Mongoose came in handy for querying data to the database with built-in functions.</p>
<div>
  <img height="100" alt="Express.js" src="/assets/express.png"/>
  <img height="100" alt="TypeScript" src="https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png?f=webp&w=256"/>
  <img height="100" width="150" alt="Mongoose" src="https://thecodebarbarian.com/images/mongoose5.png"/>
</div>

<h3>Database</h3>
<p>For persistent data storage, we opted for MongoDB with MongoDB Atlas, which allows us to store data in the form of documents; pretty flexible for data schemas.</p>
<img height="100" alt="Mongoose" src="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-3521676-2945120.png?f=webp"/>

<h2>Getting started</h2>
Before you begin, make sure you have the following installed:
<h3>Prerrequisites</h3>
<ul>
  <li><b><a href="https://nodejs.org/en/download/package-manager">Node.js</a></b> (version 20 or higher)</li>
  <li><b><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git">Git</a></b></li>
  <li><b><a href="https://www.youtube.com/watch?v=gB6WLkSrtJk">MongoDB installed locally</a> or a <a href="https://www.mongodb.com/docs/atlas/getting-started/">MongoDB Atlas cluster</a> (Atlas UI) </b></li>
</ul>
<h3>Installation</h3>
<p>1. Clone the repository:</p>

```
git clone https://github.com/No-Country-simulation/c19-05-ft-node-react.git
```

<p>2. Go to backend directory and install dependencies. If you have a package manager different from NPM, you can run <code>yarn install</code> for Yarn or <code>pnpm install</code> for pnpm instead of <code>npm install</code>.</p>

```
cd backend
npm install
```

<p>3. Make a <code>.env</code> file by taking the template provided in <code>.env.template</code> </p>

```
cp .env.temmplate .env
```


<p>4. Fill the necessary data in your <code>.env</code> file. You can use a code editor such as Visual Studio Code, Sublime Text, or Vim. </p>

```

# base datos
DATABASE_URL = 

FRONTEND_URL =

SERVER_URL =

# nodemialer
SMTP_HOST = 
SMTP_PORT = 
SMTP_USER = 
SMTP_PASS = 


PORT = 4000


COOKIE_SECRETKEY = cookiesecret
JWT_SECRET = jwtsecret

BCRYPT_SALT = 10

#Gmail
GOOGLE_CLIENT_ID = 
GOOGLE_CLIENT_SECRET = 
GOOGLE_CALLBACK_URL = 


#Upload Avatar
CLOUDINARY_URL=
CLOUDINARY_NAME = 
CLOUDINARY_KEY = 
CLOUDINARY_SECRET =
```
<p>You can get the database URL either by your local server (might look something like <code>mongodb://localhost:27017</code>) or a database created in your MongoDB Atlas cluster (which might look something like <code>mongodb+srv://username:password@cluster0.6ywut5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0</code>)</p>
<p>Make sure you add the correct URI for the frontend so that there are no CORS issues. Trying it locally, we can add <code>http://localhost:3000</code> as our URI for the frontend.</p>
<p>Regarding to the <code>SMTP_</code> variables, you can create an account on <a href="https://mailtrap.io/">Mailtrap</a> and you get the credentials from there.</p>
<br>
<p>5. Run the backend</p>

```
npm run dev
```

<p>If you run it locally, you'll get your backend running on <code>http://localhost:PORT/</code>, where <code>PORT</code> is the port you defined on your <code>.env</code> file. To get a quick overview of the available endpoints, you can refer to the <a href="https://documenter.getpostman.com/view/36313081/2sA3e2eoff">API documentation</a>.</p>
<br>
<p>6. Open another terminal on the root of the project. If you opened the project with Visual Studio Code, you can open another terminal on the button at the top right and you'll get located on the root of it, just as indicated on the image below:</p>
<div align="center">
  <img alt="new terminal" src="/assets/new_terminal.png" height="250"/>
</div>

<br>

<p>7. Go to the frontend folder and install dependencies. If you have a package manager different from NPM, you can run <code>yarn install</code> for Yarn or <code>pnpm install</code> for pnpm instead of <code>npm install</code>.</p>

```
cd front
npm install
```

<p>8. Run the frontend</p>

```
npm run dev
```

<p>9. Open the <code>http://localhost:3000</code> URL on your web browser.</p>
<div align="center">
  <img height="130" alt="App URL" src="/assets/front_url.png"/>
</div>

<br>

<p>And voilà! You have your application running. :)</p>
<div align="center">
  <img height="250" alt="App working" src="/assets/main_page.png"/>
</div>
