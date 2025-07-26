




export const API_BASE_URL = window.location.protocol === 'https:' 
  ? "https://v1-api-6rdd.onrender.com"
  : "http://localhost:3000";

// export const API_BASE_URL = "https://v1-api-6rdd.onrender.com"



  // Stripe publishable key (plain, with protocol check)
export const STRIPE_PUBLISHABLE_KEY =
typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? 'pk_live_51RTqbk2M4WBVH3k2qWtWUBjBoCCDUffofAXePbga1zGVbEqEv7vPG1kXsDxuu8Axz74uWQPtvcGxmqERMYo1qMfw008X7RW3AT'
  : 'pk_test_51RTqbk2M4WBVH3k2rAnZZrWbgKgzhwF6JJfEYIVWuRQBHmIGIC4fzreB200PcvulUQoeGeuUqoZqZPHgdUoy41Ts00POQROUG3';
  