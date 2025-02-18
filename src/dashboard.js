import { Client, Account } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject(PROJECTKEY); // Replace with your Appwrite Project ID

const account = new Account(client);

// Logout Function
document.getElementById("logoutBtn").addEventListener("click", () => {
  account.deleteSession("current")
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "/index.html"; // Redirect to the homepage
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      alert("Logout failed: " + error.message);
    });
});


account.get()
  .then((user) => {
    console.log("User is logged in:", user);
  })
  .catch(() => {
    // Redirect to login page if not logged in
    alert("Please log in first!");
    window.location.href = "/index.html";
  });
