
// hash.js
import bcrypt from "bcrypt";

const plainPassword = "mypassword123"; // You can change this to any password you like

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log("Use this hashed password in your database:");
  console.log(hash);
}) .catch((err)=> {
    console.error("error hashing password:", err.message);
});
