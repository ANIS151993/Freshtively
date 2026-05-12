export type UserRole = "consumer" | "cooker" | "delivery" | "admin";
export type VerificationStatus = "pending" | "approved" | "rejected" | "suspended";
export type BankStatus = "not_added" | "pending" | "verified";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "placed"
  | "cooker_accepted"
  | "cooker_rejected"
  | "preparing"
  | "delivery_searching"
  | "delivery_assigned"
  | "food_ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled"
  | "refunded";
export type NotificationType = "order" | "payment" | "verification" | "system" | "promotion";
export type SupportTicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface BaseProfile {
  uid: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  photoURL?: string;
  status: VerificationStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Dish {
  dishId: string;
  cookerId: string;
  cookerName: string;
  name: string;
  description: string;
  cuisine: string;
  culture: string;
  category: string;
  ingredients: string[];
  allergens: string[];
  imageURL: string;
  price: number;
  quantityAvailable: number;
  preparationTimeMinutes: number;
  isAvailable: boolean;
  rating: number;
  totalReviews: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface OrderItem {
  dishId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  consumerId: string;
  consumerName: string;
  cookerId: string;
  cookerName: string;
  deliveryPersonId: string;
  deliveryPersonName: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  cookerTip: number;
  deliveryTip: number;
  total: number;
  deliveryAddress: string;
  pickupAddress: string;
  estimatedReadyTime: string;
  paymentStatus: PaymentStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface NotificationDocument {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedOrderId: string;
  createdAt?: unknown;
}

export interface Review {
  reviewId: string;
  orderId: string;
  consumerId: string;
  cookerId: string;
  deliveryPersonId: string;
  cookerRating: number;
  deliveryRating: number;
  cookerReview: string;
  deliveryReview: string;
  createdAt?: unknown;
}

export interface SupportTicket {
  ticketId: string;
  userId: string;
  userRole: UserRole;
  category: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  assignedTo: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface PaymentRecord {
  paymentId: string;
  orderId: string;
  consumerId: string;
  cookerId: string;
  deliveryPersonId: string;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  cookerTip: number;
  deliveryTip: number;
  total: number;
  cookerPayout: number;
  deliveryPayout: number;
  platformFee: number;
  status: PaymentStatus;
  createdAt?: unknown;
}

export interface PlatformFees {
  serviceFeeRate: number;
  defaultDeliveryFee: number;
  taxRate: number;
  cookerCommissionRate: number;
  deliveryBaseFee: number;
  updatedAt?: unknown;
}

export interface ConsumerProfile {
  uid: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  countryOfOrigin: string;
  culture: string;
  favoriteFoods: string[];
  preferredCuisines: string[];
  dietaryPreferences: string[];
  allergies: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CookerProfile {
  uid: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  countryOfOrigin: string;
  culturalCookingBackground: string;
  specialDishes: string[];
  yearsOfExperience: number;
  foodSafetyCertificateNumber: string;
  certificateExpiryDate: string;
  kitchenPhotos: string[];
  fridgePhotos: string[];
  sampleFoodPhotos: string[];
  isAvailable: boolean;
  missedRequestCount: number;
  rating: number;
  totalOrders: number;
  bankStatus: BankStatus;
  verificationStatus: VerificationStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface DeliveryPersonProfile {
  uid: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  drivingLicenseNumber: string;
  licenseExpiryDate: string;
  vehicleType: string;
  vehicleMakeModel: string;
  vehicleYear: number;
  vehiclePlateNumber: string;
  vehiclePhoto: string;
  licensePhoto: string;
  insuranceDocument: string;
  isAvailable: boolean;
  missedRequestCount: number;
  rating: number;
  totalDeliveries: number;
  bankStatus: BankStatus;
  verificationStatus: VerificationStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}
