import { createBrowserRouter, Navigate } from "react-router-dom";
import { Activity, AlertTriangle, BarChart3, Bell, DollarSign, FileCheck, ShieldCheck, Users } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import ConsumerLayout from "../layouts/ConsumerLayout";
import CookerLayout from "../layouts/CookerLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import PublicLayout from "../layouts/PublicLayout";
import AccountStatePage from "../pages/auth/AccountStatePage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import SignupPage from "../pages/auth/SignupPage";
import HomePage from "../pages/public/HomePage";
import CreatorProfilePage from "../pages/public/CreatorProfilePage";
import DeveloperPortalPage from "../pages/public/DeveloperPortalPage";
import PublicInfoPage from "../pages/public/PublicInfoPage";
import { PlaceholderPage } from "../pages/PlaceholderPage";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { RoleProtectedRoute } from "../components/auth/RoleProtectedRoute";
import SeedDataPage from "../pages/admin/SeedDataPage";
import {
  AdminDashboardPage,
  AdminAccountControlPage,
  AdminDeveloperControlPage,
  AdminDishesPage,
  AdminMoneyControlPage,
  AdminOrdersPage,
  AdminPaymentsPage,
  AdminPromotionsPage,
  AdminReviewsPage,
  AdminSettingsPage,
  AdminStaticPage,
  AdminSupportPage,
  AdminUsersPage,
  AdminVerificationPage,
} from "../pages/admin/AdminPages";
import CartPage from "../pages/consumer/CartPage";
import CheckoutPage from "../pages/consumer/CheckoutPage";
import ConsumerDiscoverPage from "../pages/consumer/ConsumerDiscoverPage";
import ConsumerHomePage from "../pages/consumer/ConsumerHomePage";
import ConsumerProfilePage from "../pages/consumer/ConsumerProfilePage";
import DishDetailsPage from "../pages/consumer/DishDetailsPage";
import NotificationsPage from "../pages/consumer/NotificationsPage";
import OrdersPage from "../pages/consumer/OrdersPage";
import OrderTrackingPage from "../pages/consumer/OrderTrackingPage";
import SupportPage from "../pages/consumer/SupportPage";
import {
  CheckoutStepPage,
  ConsumerSettingsPage,
  CookerProfilePage,
  FoodCategoryPage,
  NearbyCookersPage,
  NearbyMapPage,
  RatingReviewPage,
  ReorderPage,
} from "../pages/consumer/ConsumerUtilityPages";
import CookerDashboardPage from "../pages/cooker/CookerDashboardPage";
import CookerOrdersPage from "../pages/cooker/CookerOrdersPage";
import DishFormPage from "../pages/cooker/DishFormPage";
import MenuManagementPage from "../pages/cooker/MenuManagementPage";
import {
  CookerEarningsPage,
  CookerNotificationsPage,
  CookerPlaceholderWorkflowPage,
  CookerProfilePage as CookerOwnProfilePage,
  CookerReviewsPage,
  CookerSupportPage,
  CookerVerificationPage,
} from "../pages/cooker/CookerUtilityPages";
import ActiveDeliveriesPage from "../pages/delivery/ActiveDeliveriesPage";
import DeliveryDashboardPage from "../pages/delivery/DeliveryDashboardPage";
import DeliveryRequestsPage from "../pages/delivery/DeliveryRequestsPage";
import {
  DeliveryDocumentsPage,
  DeliveryEarningsPage,
  DeliveryMapPage,
  DeliveryNotificationsPage,
  DeliveryPlaceholderWorkflowPage,
  DeliveryProfilePage,
  DeliveryRatingsPage,
  DeliverySupportPage,
} from "../pages/delivery/DeliveryUtilityPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "discover", element: <PublicInfoPage kind="discover" /> },
      { path: "about", element: <PublicInfoPage kind="about" /> },
      { path: "founder", element: <CreatorProfilePage /> },
      { path: "developer", element: <DeveloperPortalPage /> },
      { path: "developer-panel", element: <DeveloperPortalPage /> },
      { path: "how-it-works", element: <PublicInfoPage kind="how" /> },
      { path: "safety", element: <PublicInfoPage kind="safety" /> },
      { path: "become-a-cooker", element: <PublicInfoPage kind="cooker" /> },
      { path: "become-a-delivery-person", element: <PublicInfoPage kind="delivery" /> },
      { path: "help", element: <PublicInfoPage kind="help" /> },
      { path: "contact", element: <PublicInfoPage kind="contact" /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "role-selection", element: <RoleSelectionPage /> },
      { path: "signup/:role", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      {
        path: "under-review",
        element: (
          <AccountStatePage
            title="Account under review"
            description="Your account was created. Cooker and delivery accounts need document verification before full access."
            actionLabel="Go home"
          />
        ),
      },
      {
        path: "access-denied",
        element: (
          <AccountStatePage
            title="Access denied"
            description="Your account does not have permission to view that role area."
            actionLabel="Return to my dashboard"
          />
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleProtectedRoute allowedRoles={["consumer", "admin"]} />,
        children: [
          {
            path: "/consumer",
            element: <ConsumerLayout />,
            children: [
              { index: true, element: <ConsumerHomePage /> },
              { path: "discover", element: <ConsumerDiscoverPage /> },
              { path: "categories", element: <FoodCategoryPage /> },
              { path: "categories/:category", element: <FoodCategoryPage /> },
              { path: "cookers", element: <NearbyCookersPage /> },
              { path: "cookers/map", element: <NearbyMapPage /> },
              { path: "cookers/:cookerId", element: <CookerProfilePage /> },
              { path: "dishes/:dishId", element: <DishDetailsPage /> },
              { path: "cart", element: <CartPage /> },
              { path: "checkout", element: <CheckoutPage /> },
              { path: "checkout/address", element: <CheckoutStepPage step="address" /> },
              { path: "checkout/payment", element: <CheckoutStepPage step="payment" /> },
              { path: "checkout/review", element: <CheckoutStepPage step="review" /> },
              { path: "order-confirmation", element: <CheckoutStepPage step="confirmation" /> },
              { path: "orders", element: <OrdersPage /> },
              { path: "orders/:orderId", element: <OrderTrackingPage /> },
              { path: "orders/:orderId/review", element: <RatingReviewPage /> },
              { path: "reorder", element: <ReorderPage /> },
              { path: "notifications", element: <NotificationsPage /> },
              { path: "profile", element: <ConsumerProfilePage /> },
              { path: "edit-profile", element: <ConsumerProfilePage /> },
              { path: "addresses", element: <ConsumerSettingsPage kind="addresses" /> },
              { path: "payment-methods", element: <ConsumerSettingsPage kind="payment-methods" /> },
              { path: "dietary", element: <ConsumerSettingsPage kind="dietary" /> },
              { path: "privacy", element: <ConsumerSettingsPage kind="privacy" /> },
              { path: "support", element: <SupportPage /> },
              { path: "report-issue", element: <SupportPage /> },
              { path: "favorites", element: <PlaceholderPage area="consumer" title="Favorites" description="Favorite dishes and cookers placeholder." /> },
              { path: "messages", element: <PlaceholderPage area="consumer" title="Messages" description="Messaging placeholder for future cooker and delivery coordination." /> },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <RoleProtectedRoute allowedRoles={["cooker", "admin"]} />,
    children: [
      {
        path: "/cooker",
        element: <CookerLayout />,
        children: [
          { index: true, element: <CookerDashboardPage /> },
          { path: "incoming-order", element: <CookerPlaceholderWorkflowPage title="Incoming order request" description="Focused order request view for accept/reject and estimated ready time." /> },
          { path: "active-order", element: <CookerOrdersPage /> },
          { path: "food-ready", element: <CookerPlaceholderWorkflowPage title="Food ready confirmation" description="Modal workflow placeholder for confirming a prepared meal." /> },
          { path: "handoff", element: <CookerPlaceholderWorkflowPage title="Order handoff" description="Delivery pickup handoff workflow placeholder." /> },
          { path: "menu", element: <MenuManagementPage /> },
          { path: "menu/new", element: <DishFormPage /> },
          { path: "menu/:dishId/edit", element: <DishFormPage /> },
          { path: "menu/:dishId/preview", element: <DishDetailsPage /> },
          { path: "inventory", element: <MenuManagementPage /> },
          { path: "availability", element: <CookerDashboardPage /> },
          { path: "schedule", element: <CookerPlaceholderWorkflowPage title="Availability schedule" description="Schedule management placeholder." /> },
          { path: "earnings", element: <CookerEarningsPage /> },
          { path: "payouts", element: <CookerEarningsPage /> },
          { path: "orders", element: <CookerOrdersPage /> },
          { path: "order-history", element: <CookerOrdersPage /> },
          { path: "reviews", element: <CookerReviewsPage /> },
          { path: "notifications", element: <CookerNotificationsPage /> },
          { path: "profile", element: <CookerOwnProfilePage /> },
          { path: "edit-profile", element: <CookerOwnProfilePage /> },
          { path: "verification", element: <CookerVerificationPage /> },
          { path: "documents", element: <CookerVerificationPage /> },
          { path: "bank-account", element: <CookerEarningsPage /> },
          { path: "support", element: <CookerSupportPage /> },
          { path: "report-issue", element: <CookerSupportPage /> },
          { path: "missed-request-warning", element: <CookerDashboardPage /> },
        ],
      },
    ],
  },
  {
    element: <RoleProtectedRoute allowedRoles={["delivery", "admin"]} />,
    children: [
      {
        path: "/delivery",
        element: <DeliveryLayout />,
        children: [
          { index: true, element: <DeliveryDashboardPage /> },
          { path: "request", element: <DeliveryRequestsPage /> },
          { path: "requests", element: <DeliveryRequestsPage /> },
          { path: "active-pickup", element: <ActiveDeliveriesPage /> },
          { path: "confirm-pickup", element: <DeliveryPlaceholderWorkflowPage title="Confirm pickup" description="Modal workflow placeholder for pickup confirmation." /> },
          { path: "active-drop-off", element: <ActiveDeliveriesPage /> },
          { path: "completion", element: <DeliveryPlaceholderWorkflowPage title="Delivery completion" description="Delivery completion confirmation placeholder." /> },
          { path: "map", element: <DeliveryMapPage /> },
          { path: "deliveries", element: <ActiveDeliveriesPage /> },
          { path: "earnings", element: <DeliveryEarningsPage /> },
          { path: "payouts", element: <DeliveryEarningsPage /> },
          { path: "history", element: <ActiveDeliveriesPage /> },
          { path: "ratings", element: <DeliveryRatingsPage /> },
          { path: "notifications", element: <DeliveryNotificationsPage /> },
          { path: "profile", element: <DeliveryProfilePage /> },
          { path: "edit-profile", element: <DeliveryProfilePage /> },
          { path: "vehicle", element: <DeliveryProfilePage /> },
          { path: "documents", element: <DeliveryDocumentsPage /> },
          { path: "verification", element: <DeliveryDocumentsPage /> },
          { path: "bank-account", element: <DeliveryEarningsPage /> },
          { path: "support", element: <DeliverySupportPage /> },
          { path: "report-issue", element: <DeliverySupportPage /> },
          { path: "missed-request-warning", element: <DeliveryDashboardPage /> },
        ],
      },
    ],
  },
  {
    element: <RoleProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "developer", element: <AdminDeveloperControlPage /> },
          { path: "live-monitoring", element: <AdminStaticPage title="Live monitoring" description="Operational monitoring for current orders, availability, and support load." icon={<Activity />} /> },
          { path: "users", element: <AdminUsersPage /> },
          { path: "account-control", element: <AdminAccountControlPage /> },
          { path: "consumers", element: <AdminUsersPage role="consumer" /> },
          { path: "cookers", element: <AdminUsersPage role="cooker" /> },
          { path: "delivery-persons", element: <AdminUsersPage role="delivery" /> },
          { path: "cooker-verification", element: <AdminVerificationPage type="cooker" /> },
          { path: "delivery-verification", element: <AdminVerificationPage type="delivery" /> },
          { path: "orders", element: <AdminOrdersPage /> },
          { path: "orders/:orderId", element: <AdminOrdersPage /> },
          { path: "dishes", element: <AdminDishesPage /> },
          { path: "payments", element: <AdminPaymentsPage /> },
          { path: "money-control", element: <AdminMoneyControlPage /> },
          { path: "promotions", element: <AdminPromotionsPage /> },
          { path: "refunds", element: <AdminStaticPage title="Refund management" description="Refund review workflow placeholder connected to payment records later." icon={<DollarSign />} /> },
          { path: "disputes", element: <AdminStaticPage title="Dispute management" description="Dispute queue and resolution workflow placeholder." icon={<AlertTriangle />} /> },
          { path: "safety", element: <AdminStaticPage title="Safety and compliance" description="Safety reports, verification alerts, and compliance workflow placeholder." icon={<ShieldCheck />} /> },
          { path: "support", element: <AdminSupportPage /> },
          { path: "support/:ticketId", element: <AdminSupportPage /> },
          { path: "notifications", element: <AdminStaticPage title="Notification management" description="Broadcast and operational notification workflow placeholder." icon={<Bell />} /> },
          { path: "reviews", element: <AdminReviewsPage /> },
          { path: "analytics", element: <AdminStaticPage title="Analytics" description="Marketplace metrics, growth, conversion, and operational health." icon={<BarChart3 />} /> },
          { path: "settings", element: <AdminSettingsPage /> },
          { path: "audit-log", element: <AdminStaticPage title="Audit log" description="Administrative action log placeholder." icon={<FileCheck />} /> },
          { path: "roles", element: <AdminStaticPage title="Role and permission" description="Role management placeholder. Admin role remains controlled by users/{uid}.role." icon={<Users />} /> },
          { path: "system-health", element: <AdminStaticPage title="System health" description="Firebase, storage, queue, notification, and deployment health placeholder." icon={<Activity />} /> },
          { path: "seed-data", element: <SeedDataPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
