# kaufholic

kaufholic is an e-commerce application focusing on shopping of various clothing brands. kaufholic provides seamless experience for buyers and sellers to buy and sell products. kaufholic is built using React JS for frontend and Express.js and MongoDB for the backend. kaufholic is developed inspired by the real world ecommerce applications and covers most of the features that a real world e-commerce application provides like user authentication, viewing products, adding reviews and ratings for the products, adding them to wishlist and shopping carts, placing orders at checkout, posting any concerns about any product or seller. 

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
