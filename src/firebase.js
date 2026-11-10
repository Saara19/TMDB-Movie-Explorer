import { initializeApp } from "firebase/app";
/*
import: استيراد.
initializeApp: دالة توفرها مكتبة Firebase لتهيئة التطبيق.
"firebase/app": المسار الذي نستورد منه الدالة داخل المكتبة.
*/
 export const firebaseConfig = {
  apiKey: "AIzaSyBHQ5UdlM-rc4Ce-dp67lgLO7g9E0BAn6U",
  authDomain: "movie-explorer-76217.firebaseapp.com",
  projectId: "movie-explorer-76217",
  storageBucket: "movie-explorer-76217.firebasestorage.app",
  messagingSenderId: "42358321256",
  appId: "1:42358321256:web:89e26e445dc22bf6e9cbdd",
  measurementId: "G-6D8FY7S4H9"
};
initializeApp(firebaseConfig)