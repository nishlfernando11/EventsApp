<h1 align="center"> Event Management System</h1>
Welcome to our automated event management system, where you can easily organize events, manage registrations, and book tickets, all with just a few clicks. This system provides a hassle-free experience for both event organizers and attendees, making event management a breeze.
<br>

<h1>Technologies Used</h1>
<ul>
<li><strong>Next.js:</strong> A React-based framework for building server-side rendered applications.</li>
<li><strong>Tailwind CSS:</strong> A utility-first CSS framework for building responsive and customizable user interfaces.</li>
<li><strong>JavaScript:</strong> A programming language used for client-side and server-side scripting.</li>
<li><strong>Node.js:</strong> A JavaScript runtime environment used for building scalable and efficient server-side applications.</li>
<li><strong>Express:</strong> A minimalist web framework for building server-side applications with Node.js.</li>
<li><strong>MongoDB:</strong> A NoSQL document-oriented database used for storing and retrieving data.</li>
</ul>

<h1>Architecture</h1>
Our event management system is built on a microservice architecture. This allows for scalability, flexibility, and efficient communication between different components of the system. The interactions between client and server take place via API calls, providing a seamless experience for both the organizers and attendees.
<br>
<br>
<h1>🚀 Getting Started (Locally)</h1>


<h3>Navigate to the project's root directory</h3>
<p>Once you have downloaded or cloned the repository, navigate to the project's root directory. The project consists of three folders: client, server, and developer.</p>
<h3>Install dependencies</h3>
<p>Before starting the servers, make sure to install the dependencies by running the command:</p>
<pre><code class="language-bash">npm install</code></pre>
<b>in all three folders: client, server, and developer.</b>
<h3>Set up environment variables</h3>
<p>Before running the servers, you need to set up the following environment variables:</p>
<h4>For the client-side:</h4>
<p>Create a <b>.env.local</b> file in the client folder with the following variables:</p>
<pre><code class="language-php">NEXT_PUBLIC_BASE_URL - the base URL of the API server (e.g. http://localhost:3000)
NEXT_PUBLIC_STRIPE_KEY - the public key for your Stripe account
NEXT_PUBLIC_API_URL - the URL of the API server (e.g. http://localhost:5000)</code></pre>
<h4>For the server-side:</h4>
<p>Create a <b>.env</b> file in the server folder with the following variables:</p>
<pre><code class="language-rust">MONGO_ATLAS_URI - the connection string for your MongoDB Atlas database
STRIPE_KEY - the secret key for your Stripe account
NODE_MAILER_USER - the email address to use for sending email notifications
NODE_MAILER_PASS - the password for the email address to use for sending email notifications
JWT_SECRET - the secret key to use for JWT token generation</code></pre>
<h3>Start the servers</h3>
<p>To start the servers, run the following commands:</p>
<p>For the client-side:</p>
<pre><code class="language-arduino">npm run dev</code></pre>
<p>For the server-side:</p>
<pre><code>nodemon index.js</code></pre>
<p>For the developer-side:</p>
<pre><code class="language-arduino">npm run dev</code></pre>
<h4>Note: Make sure to follow the exact steps mentioned above to avoid any errors or issues.</h4>
<br>

<h1>👉 How to use the site</h1>
Our event management system has three main components:

<ul>
  <li><strong>User:</strong> Users can sign in or sign up and access the user dashboard to view and register for events.</li>
  <li><strong>Admin:</strong> Admins can log in to create events, view their events, and manage registrations for their events.</li>
  <li><strong>Developer:</strong> Developers can access the developer site to create new admins (later this feature will be available only to product managers).</li>
</ul>
