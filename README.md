# kaufholic

kaufholic is an e-commerce application focusing on shopping of various clothing brands. kaufholic provides seamless experience for buyers and sellers to buy and sell products. kaufholic is built using React JS for frontend and Express.js and MongoDB for the backend. kaufholic is developed inspired by the real world ecommerce applications and covers most of the features that a real world e-commerce application provides like user authentication, viewing products, adding reviews and ratings for the products, adding them to wishlist and shopping carts, placing orders at checkout, posting any concerns about any product or seller.

## Table of Contents

- [Types of Users](#types-of-users)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Frontend](#frontend)
  - [Pages and Components](#pages-and-components)
  - [Setup](#frontend-setup)
- [Backend](#backend)
  - [Routes](#routes)
  - [Environment Variables](#environment-variables)
  - [Setup](#backend-setup)

### Types of users

The application has three types of users - Buyer , Seller and Admin.

#### Buyers

- View different products
- Post reviews and ratings,
- Add/Remove their favourite products to wishlist,
- Add/Remove products to/from shopping cart,
- Place orders at checkout
- Can post any concerns about product or sellers.

#### Sellers

- Seller can add and edit products that they wish to sell in the platform
- Can confirm the orders placed by the buyers, by assigning delivery dates for incoming orders

#### Admin

- Admin can view the list of buyers,sellers,products added and orders placed.
- Admin can also view any complaints posted by the buyers and has the right to take action against sellers and buyers by deactivating and activating their accounts respectively. Additionaly, sellers can access the application only when the admin approves their sign in request.

## Features

- User Authentication (Includes Google authentication for buyers)
- Secure User Authentication using JWT Access Token
- Password Encryption using Bcrypt library
- Search By Debounce
- Pagination for PLP(Product Listing Page)
- User Details and Payment details management using Redux
- Responsive Design

## Folder Structure

```
Kaufholic
├── client
|   |──kaufholic
│   |  ├── node_modules
|   |  ├── public
|   |  ├──src
|   |  |  ├── components
|   |  |  |   ├── about-us
|   |  |  |   |   ├── AboutUs.jsx
|   |  |  |   |   ├── aboutus.module.css
|   |  |  |   ├── admin
|   |  |  |   |   ├── admindashboard
|   |  |  |   |   |   ├── AdminDashboard.jsx
|   |  |  |   |   |   ├── admindashboard.module.css
|   |  |  |   |   ├── adminpages
|   |  |  |   |   |   ├── sellerlist
|   |  |  |   |   |   |    ├── sellerlist.module.css
|   |  |  |   |   |   |    ├── SellerList.jsx
|   |  |  |   |   |   ├── BuyerComplaints.jsx
|   |  |  |   |   |   ├── Buyers.jsx
|   |  |  |   |   |   ├── Deactivate.jsx
|   |  |  |   |   |   ├── Products.jsx
|   |  |  |   |   |   ├── Sellers.jsx
|   |  |  |   |   |   ├── Tables.jsx
|   |  |  |   |   |   ├── TotalOrders.jsx
|   |  |  |   |   ├── AdminSignin.jsx
|   |  |  |   |   ├── adminsignin.module.css
|   |  |  |   ├── buyer
|   |  |  |   |   ├── complaints
|   |  |  |   |   |    ├── Complaints.jsx
|   |  |  |   |   |    ├── complaints.module,css
|   |  |  |   |   |    ├── Contact.jsx
|   |  |  |   |   |    ├── contact.module.css
|   |  |  |   |   |    ├── contactcomplaint.module.css
|   |  |  |   |   |    ├── ContactComplaintWrapper.jsx
|   |  |  |   |   ├── orders
|   |  |  |   |   |    ├── OrderCategories.jsx
|   |  |  |   |   |    ├── Orders.jsx
|   |  |  |   |   |    ├── orders.module.css
|   |  |  |   |   ├── profile
|   |  |  |   |   |    ├── BuyerProfile.jsx
|   |  |  |   |   |    ├── buyerprofile.module.css
|   |  |  |   |   ├── signin
|   |  |  |   |   |    ├── BuyerSignIn.jsx
|   |  |  |   |   |    ├── buyersignin.module.css
|   |  |  |   |   ├── signup
|   |  |  |   |   |    ├── BuyerSignUp.jsx
|   |  |  |   |   |    ├── buyersignup.module.css
|   |  |  |   ├── cards
|   |  |  |   |   ├── category-cards
|   |  |  |   |   |    ├── category.module.css
|   |  |  |   |   |    ├── CategoryCard.jsx
|   |  |  |   |   |    ├── CategoryCardWrapper.jsx
|   |  |  |   |   |    ├── categorywrapper.module.css
|   |  |  |   |   ├── deal-cards
|   |  |  |   |   |    ├── DealCard.jsx
|   |  |  |   |   |    ├── dealcard.module.css
|   |  |  |   |   |    ├── DealCardWrapper.jsx
|   |  |  |   |   |    ├── dealcardwrapper.module.css
|   |  |  |   |   ├── product-view-cards
|   |  |  |   |   |    ├── PaginationButton.jsx
|   |  |  |   |   |    ├── paginationbutton.module.css
|   |  |  |   |   |    ├── ProductCard.jsx
|   |  |  |   |   |    ├── productcard.module.css
|   |  |  |   |   |    ├── ProductCardWrapper.jsx
|   |  |  |   |   |    ├── productwrapper.module.css
|   |  |  |   |   ├── trending-cards
|   |  |  |   |   |    ├── TrendingCard.jsx
|   |  |  |   |   |    ├── trendingcard.module.css
|   |  |  |   |   |    ├── TrendingCardWrapper.jsx
|   |  |  |   |   |    ├── trendingcardwrapper.module.css
|   |  |  |   |   ├── wishlist-cards
|   |  |  |   |   |    ├── WishlistWrapper.jsx
|   |  |  |   |   |    ├── wishlistwrapper.module.css
|   |  |  |   ├── carousal
|   |  |  |   |   ├── LandingCarousal.jsx
|   |  |  |   |   ├── landingcarousal.module.css
|   |  |  |   ├── cartandpayment
|   |  |  |   |   ├── cart
|   |  |  |   |   |   ├── CartPage.jsx
|   |  |  |   |   |   ├── cartpage.module.css
|   |  |  |   |   |   ├── QuantityCounter.jsx
|   |  |  |   |   |   ├── quantitycounter.module.css
|   |  |  |   |   ├── customerdetails
|   |  |  |   |   |   ├── CustomerDetails.jsx
|   |  |  |   |   |   ├── customerdetails.module.css
|   |  |  |   |   |   ├── CustomerDetailsSlice.js
|   |  |  |   |   ├── paymentpage
|   |  |  |   |   |   ├── paymentcard.module.css
|   |  |  |   |   |   ├── PaymentCardDetails.jsx
|   |  |  |   |   ├── CartPaymentTab.jsx
|   |  |  |   |   ├── cartpaymenttab.module.css
|   |  |  |   ├── footer
|   |  |  |   |    ├── Footer.jsx
|   |  |  |   |    ├── footer.module.css
|   |  |  |   ├── forgotpassword
|   |  |  |   |    ├──forgotpass.module.css
|   |  |  |   |    ├── ForgotPassword.jsx
|   |  |  |   ├── landing-page
|   |  |  |   |    ├── LandingPageWrapper.jsx
|   |  |  |   |    ├── landingpagewrapper.module.css
|   |  |  |   ├── navbar
|   |  |  |   |    ├── landingnavbar
|   |  |  |   |    |    ├── LandingNavbar.jsx
|   |  |  |   |    |    ├── landingnavbar.module.css
|   |  |  |   |    ├── usernavbar
|   |  |  |   |    |    ├── buyernavbar
|   |  |  |   |    |    |   ├── BuyerNav.jsx
|   |  |  |   |    |    |   ├── buyernav.module.css
|   |  |  |   |    |    |   ├── buyerSlice.js
|   |  |  |   ├── pdp
|   |  |  |   |   ├── productfirstdetail
|   |  |  |   |   |   ├── ProductDetail.jsx
|   |  |  |   |   |   ├── productdetail.module.css
|   |  |  |   |   ├── productTab
|   |  |  |   |   |   ├── ProductDetails.jsx
|   |  |  |   |   |   ├── productdetails.module.css
|   |  |  |   |   |   ├── ProductTab.jsx
|   |  |  |   |   |   ├── producttab.module.css
|   |  |  |   |   |   ├── Review.jsx
|   |  |  |   |   |   ├── review.module.css
|   |  |  |   ├── protectedroutes
|   |  |  |   |   ├── ProtectedPages.jsx
|   |  |  |   ├── seller
|   |  |  |   |   ├──dashboard
|   |  |  |   |   |  ├──SellerDashboard.jsx
|   |  |  |   |   |  ├──sellerdashboard.module.css
|   |  |  |   |   ├──pages
|   |  |  |   |   |  ├──ConfirmedOrders.jsx
|   |  |  |   |   |  ├──confirmedorders.module.css
|   |  |  |   |   |  ├──DeliveredOrders.jsx
|   |  |  |   |   |  ├──deliveredorders.module.css
|   |  |  |   |   |  ├──PendingOrders.jsx
|   |  |  |   |   |  ├──pendingorderds.module.css
|   |  |  |   |   |  ├──ReceivedOrders.jsx
|   |  |  |   |   |  ├──SellerAddProduct.jsx
|   |  |  |   |   |  ├──selleraddproduct.module.css
|   |  |  |   |   |  ├──SellerHome.jsx
|   |  |  |   |   |  ├──sellerhome.module.css
|   |  |  |   |   |  ├──SellerProductEdit.jsx
|   |  |  |   |   |  ├──sellerproductedit.module.css
|   |  |  |   |   |  ├──SellerProductView.jsx
|   |  |  |   |   |  ├──sellerproductview.module.css
|   |  |  |   |   |  ├──SellerProfile.jsx
|   |  |  |   |   |  ├──sellerprofile.module.css
|   |  |  |   |   ├──sidebar
|   |  |  |   |   |  ├──Sidebar.jsx
|   |  |  |   |   |  ├──sidebar.module.css
|   |  |  |   |   ├──signin
|   |  |  |   |   |  ├──SignIn.jsx
|   |  |  |   |   |  ├──signin.module.css
|   |  |  |   |   ├──signup
|   |  |  |   |   |  ├──Signup.jsx
|   |  |  |   |   |  ├──signup.module.css
|   |  |  ├── redux
|   |  |  |   ├──store.js
|   |  |  ├── App.css
|   |  |  ├── App.jsx
|   |  |  ├── index.css
|   |  |  ├── main.jsx
|   |  |  ├── App.css
|   |  ├──.gitignore
|   |  ├──eslint.config.js
|   |  ├──index.html
|   |  ├──package-lock.json
|   |  ├──package.json
├── server
|   |──controller
|   |──middlewares
|   |──model
|   |──node_modules
|   |──routes
|   |──upload
|   |──utils
|   |──.env
|   |──.gitignore
|   |──connectDB.js
|   |──index.js
|   |──package-lock.json
|   |──package.json
```

## Frontend

The frontend of kaufholic is built using React. It provides a user friendly and engaging shopping experience.

### Pages and Components

1. Pages common for buyer and seller

- Landing Page
- Sign up Page
- Sign in Page
- Profile Page
- Profile Editing Page
- About us Page
- Contact us Page

2. Pages for Buyer

- Product Listing Page(view all products, search(debounce), filter by category, price , sort by price and customer ratings, add to wishlist)
- Product description Page(view single product page- it includes features of add to cart, buy option, view other users review)
- Wishlist Page-(add to wishlist and remove from wishlist)
- Register Complaints Page
- Logout

3. Seller

   - Seller Dashboard Page
   - Dashboard Home page showing metrics such as total buyers, total products added , total orders placed
   - Add product Page (Seller adds product details with image)
   - Edit Product Details (Seller can edit the added product details)
   - View Orders Page
   - Logout

4. Admin
   - View all buyers
   - View all sellers(after seller ignup admin should approve seller)
   - View all products
   - View all orders
   - Take actions(view complaints ->take action against sellers)
   - Remove/Deactivate seller or buyer
   - Logout

### Frontend Setup

1. Clone the repository.
2. Navigate to the `client` directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev`.

## Backend

The backend of kaufholic is built using express.js and it interacts with the MongoDB database. It handles buyer and seller authentication,product catalog, cart and wishlist management, checkout and payment processes, products sale management, admin user management

### Routes

- Buyer Routes

  - `/buyer/signup` - Buyer Registration
  - `/buyer/signin` - Buyer Login
  - `/buyer/googlesignup` - Google Registration
  - `/buyer/googlesignin` - Google Sign in
  - `/buyer/fetchCurrentBuyer/:id` - Get Buyer by id
  - `/buyer/currentuser/:id` - Get Buyer by token
  - `/buyer/update/:buyerId` - Update buyer details
  - `/buyer/allBuyers` - Get all buyers
  - `/buyer/buyerAccountStatus` - Get Buyers based on Active or Inactive Status

- Seller Routes

  - `/seller/signup` - Seller Registration
  - `/seller/signin` - Seller Login
  - `/seller/sellerprofile/:sellerId` - Get Seller
  - `/seller/update/:sellerId` - Update Seller details
  - `/seller/metrics/:sellerId` - Get Total buyers, Total Orders , Total Products Added
  - `/seller/getSeller` - Get Sellers based on account status
  - `/seller/updateApproval/:sellerId` - Update seller account status
  - `/seller/allSellers` - Get all sellers

- Admin Routes

  - `/admin/signin` - Admin Login in

- Product Routes

  - `/product/addProduct` - Adding Products by Seller to the application
  - `/product/editProductDetails/:productId` - Edit or Update added product details
  - `/product/fetchProduct/:sellerId` - Get products based on sellers
  - `/product/viewall` - Get all products
  - `/product/productDetail/:productId` - Get details of a particular product
  - `/product/addRating/:buyerId/:productId` - Add rating for a particular product by a buyer
  - `/product/reviews/:productId`- Get reviews
  - `/product/sortByLowToHigh` - Sort Products by price ascending
  - `/product/sortByHighToLow` - Sort Products by price descending
  - `/product/sortByRating` - Sort Products by ratings descending
  - `/product/filterByCategory`- Filter products catalog by category
  - `/product/priceRange` - Filter products by price range
  - `/product/search` - Search Products

- Wishlist Routes

  - `/wishlist/addtowishlist/:buyerId/:productId` - Add Product to Wishlist
  - `/wishlist/viewwishlist/:buyerId` - Get Products in Wishlist
  - `/wishlist/removefromwishlist/:buyerId/:productId`- Remove product from wishlist

- Cart Routes

  - `cart/addToCart/:buyerId/:productId` - Add Product to Cart
  - `cart/getCartItems/:buyerId` - Get Products added in cart
  - `cart/removefromcart/:buyerId/:productId` - Remove products from cart

- Order Routes

  - `orders/new/:buyerId` - Place a new order
  - `orders/listOrders/:buyerId` - Get Pending Orders placed by a buyer
  - `orders/listPastOrders/:buyerId` - Get delivered orders placed by a buyer
  - `orders/sellerOrders/:sellerId` - Get orders for a particular seller
  - `orders/setdeliverydate/:orderId/:productId` - Assign delivery date for incoming orders by seller
  - `orders/confirmedorders/:sellerId` - Get orders of which delivery status has been confirmed by seller
  - `orders/deliveredorders/:sellerId` - Get delivered orders
  - `orders/allOrders` - Get all orders

- Buyer Complaints Routes

  - `complaints/savecomplaints` - Register Complaints
  - `complaints/getComplaints` - Get the complaints

- Forgot Password Management Routes

  - `auth/resetpassword` - Reset Password for buyer and seller
  - `auth/updateAccountStatus/:id` - Activate and Deactivate account of buyer and seller

### Environment Variables

- `PORT` - Port number of server
- `TOKEN_SECRET_KEY` - Secret key for JWT Token generation

### Backend Setup

1. Clone the repository
2. Navigate to `server` directory
3. Install dependencies using `npm install`
4. Create a `.env` file and add the necessary environment variables
5. Start the server using `npm start`
