import { combineReducers } from "redux";
import { createLoginReducer, createRegisterReducer } from "./auth/reducer";
import { getProductReducer } from "./products/reducer";
import { getProfileReducer, updateProfileReducer, addressReducer } from "./profile/reducer";
import { getReviewsReducer, addReviewReducer } from "./reviews/reducer";
import { placeOrderReducer, orderHistoryReducer, orderDetailsReducer } from "./orders/reducer";
import { relatedProductsReducer, trendingProductsReducer, personalizedRecommendationsReducer } from "./recommendations/reducer";
import chatReducer from "./chat/reducer";
import { dashboardReducer, usersReducer, adminProductsReducer, adminOrdersReducer } from "./admin/reducer";

export default combineReducers({
  auth: createLoginReducer,
  register: createRegisterReducer,
  getProducts : getProductReducer,
  profile: getProfileReducer,
  updateProfile: updateProfileReducer,
  address: addressReducer,
  reviews: getReviewsReducer,
  addReview: addReviewReducer,
  placeOrder: placeOrderReducer,
  orderHistory: orderHistoryReducer,
  orderDetails: orderDetailsReducer,
  relatedProducts: relatedProductsReducer,
  trendingProducts: trendingProductsReducer,
  personalizedRecommendations: personalizedRecommendationsReducer,
  chat: chatReducer,
  // Admin reducers
  adminDashboard: dashboardReducer,
  adminUsers: usersReducer,
  adminProducts: adminProductsReducer,
  adminOrders: adminOrdersReducer,
});
