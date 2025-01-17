# kaufholic

kaufholic is an e-commerce application focusing on shopping of various clothing brands. kaufholic provides seamless experience for buyers and sellers to buy and sell products. kaufholic is built using React JS for frontend and Express.js and MongoDB for the backend. kaufholic is developed inspired by the real world ecommerce applications and covers most of the features that a real world e-commerce application provides like user authentication, viewing products, adding reviews and ratings for the products, adding them to wishlist and shopping carts, placing orders at checkout, posting any concerns about any product or seller.  The application has three types of users - Buyer , Seller and Admin. Buyers can view different products, post reviews and ratings, add their favourite products to wishlist, add products to cart, place orders and can post any concerns about product or sellers. Seller can add and edit products that they wish to sell in the platform, they can confirm the orders placed by the buyers, by assigning delivery dates for incoming orders. Admin can view the list of buyers,sellers,products added and orders placed. Admin can also view any complaints posted by the buyers and has the right to take action against sellers and buyers by deactivating and activating their accounts respectively. Additionaly, sellers can access the application only when the admin approves their sign in request. 

#### Number of Pages 

1. Pages common for buyer and seller

  - Landing Page
  - Sign up Page
  - Login Page
  - Profile Page
  - Profile Editing Page

2. Pages for Buyer

  - Home Page
  - Product Listing Page(view all products)
  - Product description Page(view single product page=> it should include features of add to cart, wishlist, buy option, view other users review)
    - add to wishlist(and remove from woshlist)
  - report complaints against sellers
  - Logout

3. Seller( seller must have a seller dashboard)
   Once seller logins , seller should be redirected to dashboard page
   - Add product Page(form => form fields are product details, images,
     product price, title, description,category(dropdown eg: electronics,clothes, furniture,etc))
   - View Orders
   - Logout

4. Admin ( must have a dashboard)

   - View all users
   - View all sellers(after signup admin should approve seller)
   - View all products
   - View all orders
   - Take actions(view complaints ->take action against sellers)
   - Remove/Deactivate seller or user
   - Logout
