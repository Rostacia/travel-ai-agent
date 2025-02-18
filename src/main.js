// import './style.css'
import { Client, Account } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(PROJECTKEY); 

const account = new Account(client);

// Signup Function
async function signUp(email, password) {
    try {
        const response = await account.create('unique()', email, password);
        console.log('User signed up:', response);
        alert('Sign-up successful! You can now log in.');
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}
// Login Function
async function logIn(email, password) {
  try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('User logged in:', response);
      alert('Login successful!');
      window.location.href = "/dashboard.html"; // Redirect to dashboard after login
  } catch (error) {
      console.error(error.message);
      alert(error.message);
  }
}

// Logout Function
async function logOut() {
  try {
      await account.deleteSession('current');
      alert('Logged out successfully!');
      window.location.href = "/index.html"; // Redirect to login page after logout
  } catch (error) {
      console.error(error.message);
      alert(error.message);
  }
}

// Check if User is Logged In
async function checkLoginStatus() {
  try {
      const user = await account.get();
      console.log('User:', user);
      document.getElementById('authStatus').innerText = `Logged in as: ${user.email}`;
      document.getElementById('logout-btn').style.display = 'block';

      // If on login page and already logged in, redirect to dashboard
      if (window.location.pathname === "/index.html") {
          window.location.href = "/dashboard.html";
      }
  } catch (error) {
      console.log('No user logged in');
      document.getElementById('authStatus').innerText = 'Not logged in';
      document.getElementById('logout-btn').style.display = 'none';

      // If on dashboard but not logged in, redirect to login page
      if (window.location.pathname === "/dashboard.html") {
          window.location.href = "/index.html";
      }
  }
}

// Run check on page load
checkLoginStatus();



// Event Listeners
document.addEventListener('DOMContentLoaded', checkLoginStatus);

document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    signUp(email, password);
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    logIn(email, password);
});

document.getElementById('logout-btn')?.addEventListener('click', logOut);
