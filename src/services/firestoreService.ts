import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type {
  BaseProfile,
  ConsumerProfile,
  CookerProfile,
  DeliveryPersonProfile,
  Dish,
  NotificationDocument,
  Order,
  OrderStatus,
  PaymentRecord,
  PlatformFees,
  Promotion,
  Review,
  SupportTicket,
} from "../types/firestore";

const withTimestamps = <T extends Record<string, unknown>>(data: T) => ({
  ...data,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
});

export async function createBaseUserProfile(profile: BaseProfile) {
  await setDoc(doc(db, "users", profile.uid), withTimestamps(profile as unknown as Record<string, unknown>));
}

export async function createConsumerProfile(profile: ConsumerProfile) {
  await setDoc(doc(db, "consumers", profile.uid), withTimestamps(profile as unknown as Record<string, unknown>));
}

export async function createCookerProfile(profile: CookerProfile) {
  await setDoc(doc(db, "cookers", profile.uid), withTimestamps(profile as unknown as Record<string, unknown>));
}

export async function createDeliveryPersonProfile(profile: DeliveryPersonProfile) {
  await setDoc(doc(db, "deliveryPersons", profile.uid), withTimestamps(profile as unknown as Record<string, unknown>));
}

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? (snapshot.data() as BaseProfile) : null;
}

export async function getConsumerProfile(uid: string) {
  return getTypedDoc<ConsumerProfile>("consumers", uid);
}

export async function getCookerProfile(uid: string) {
  return getTypedDoc<CookerProfile>("cookers", uid);
}

export async function getDeliveryPersonProfile(uid: string) {
  return getTypedDoc<DeliveryPersonProfile>("deliveryPersons", uid);
}

export async function updateUserProfile(uid: string, data: Partial<BaseProfile>) {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getAllUsers() {
  const snapshot = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
  return mapSnapshot<BaseProfile>(snapshot);
}

export async function getAllConsumers() {
  const snapshot = await getDocs(collection(db, "consumers"));
  return mapSnapshot<ConsumerProfile>(snapshot);
}

export async function getAllCookers() {
  const snapshot = await getDocs(collection(db, "cookers"));
  return mapSnapshot<CookerProfile>(snapshot);
}

export async function getAllDeliveryPersons() {
  const snapshot = await getDocs(collection(db, "deliveryPersons"));
  return mapSnapshot<DeliveryPersonProfile>(snapshot);
}

export async function updateCookerProfile(uid: string, data: Partial<CookerProfile>) {
  await updateDoc(doc(db, "cookers", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function updateDeliveryPersonProfile(uid: string, data: Partial<DeliveryPersonProfile>) {
  await updateDoc(doc(db, "deliveryPersons", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function createDish(dish: Omit<Dish, "dishId" | "createdAt" | "updatedAt">) {
  const reference = doc(collection(db, "dishes"));
  await setDoc(reference, {
    ...dish,
    dishId: reference.id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function getAvailableDishes() {
  const snapshot = await getDocs(
    query(collection(db, "dishes"), where("isAvailable", "==", true), orderBy("createdAt", "desc")),
  );

  return mapSnapshot<Dish>(snapshot);
}

export async function getAllDishes() {
  const snapshot = await getDocs(query(collection(db, "dishes"), orderBy("createdAt", "desc")));
  return mapSnapshot<Dish>(snapshot);
}

export async function getAvailableDishesByCategory(category: string) {
  const snapshot = await getDocs(
    query(
      collection(db, "dishes"),
      where("isAvailable", "==", true),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
    ),
  );

  return mapSnapshot<Dish>(snapshot);
}

export async function getFeaturedCookers(maxResults = 12) {
  const snapshot = await getDocs(
    query(
      collection(db, "cookers"),
      where("verificationStatus", "==", "approved"),
      where("isAvailable", "==", true),
      limit(maxResults),
    ),
  );

  return mapSnapshot<CookerProfile>(snapshot);
}

export async function getCookerDishes(cookerId: string) {
  const snapshot = await getDocs(
    query(collection(db, "dishes"), where("cookerId", "==", cookerId), orderBy("createdAt", "desc")),
  );

  return mapSnapshot<Dish>(snapshot);
}

export async function getDishById(dishId: string) {
  return getTypedDoc<Dish>("dishes", dishId);
}

export async function updateDish(dishId: string, data: Partial<Omit<Dish, "dishId" | "createdAt">>) {
  await updateDoc(doc(db, "dishes", dishId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDish(dishId: string) {
  await deleteDoc(doc(db, "dishes", dishId));
}

export async function createOrder(order: Omit<Order, "orderId" | "createdAt" | "updatedAt">) {
  const reference = await addDoc(collection(db, "orders"), {
    ...order,
    orderId: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    orderId: reference.id,
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function getOrderById(orderId: string) {
  return getTypedDoc<Order>("orders", orderId);
}

export async function getAllOrders() {
  const snapshot = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
  return mapSnapshot<Order>(snapshot);
}

export async function getConsumerOrders(consumerId: string) {
  return getOrdersByField("consumerId", consumerId);
}

export async function getCookerOrders(cookerId: string) {
  return getOrdersByField("cookerId", cookerId);
}

export async function getDeliveryOrders(deliveryPersonId: string) {
  return getOrdersByField("deliveryPersonId", deliveryPersonId);
}

export async function getOpenDeliveryRequests() {
  const snapshot = await getDocs(
    query(collection(db, "orders"), where("status", "in", ["delivery_searching", "food_ready"])),
  );

  return mapSnapshot<Order>(snapshot).filter((order) => !order.deliveryPersonId);
}

export async function acceptDeliveryRequest(order: Order, deliveryPersonId: string, deliveryPersonName: string) {
  await updateDoc(doc(db, "orders", order.orderId), {
    deliveryPersonId,
    deliveryPersonName,
    status: "delivery_assigned",
    updatedAt: serverTimestamp(),
  });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await updateDoc(doc(db, "orders", orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function createNotification(
  notification: Omit<NotificationDocument, "notificationId" | "createdAt">,
) {
  const reference = await addDoc(collection(db, "notifications"), {
    ...notification,
    notificationId: "",
    createdAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    notificationId: reference.id,
  });

  return reference.id;
}

export async function getUserNotifications(userId: string) {
  const snapshot = await getDocs(
    query(collection(db, "notifications"), where("userId", "==", userId), orderBy("createdAt", "desc")),
  );

  return mapSnapshot<NotificationDocument>(snapshot);
}

export async function markNotificationAsRead(notificationId: string) {
  await updateDoc(doc(db, "notifications", notificationId), {
    isRead: true,
  });
}

export async function createReview(review: Omit<Review, "reviewId" | "createdAt">) {
  const reference = await addDoc(collection(db, "reviews"), {
    ...review,
    reviewId: "",
    createdAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    reviewId: reference.id,
  });

  return reference.id;
}

export async function getAllReviews() {
  const snapshot = await getDocs(query(collection(db, "reviews"), orderBy("createdAt", "desc")));
  return mapSnapshot<Review>(snapshot);
}

export async function createSupportTicket(ticket: Omit<SupportTicket, "ticketId" | "createdAt" | "updatedAt">) {
  const reference = await addDoc(collection(db, "supportTickets"), {
    ...ticket,
    ticketId: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    ticketId: reference.id,
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function getUserSupportTickets(userId: string) {
  const snapshot = await getDocs(
    query(collection(db, "supportTickets"), where("userId", "==", userId), orderBy("createdAt", "desc")),
  );

  return mapSnapshot<SupportTicket>(snapshot);
}

export async function getAllSupportTickets() {
  const snapshot = await getDocs(query(collection(db, "supportTickets"), orderBy("createdAt", "desc")));
  return mapSnapshot<SupportTicket>(snapshot);
}

export async function updateSupportTicket(ticketId: string, data: Partial<SupportTicket>) {
  await updateDoc(doc(db, "supportTickets", ticketId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function createPaymentRecord(payment: Omit<PaymentRecord, "paymentId" | "createdAt">) {
  const reference = await addDoc(collection(db, "payments"), {
    ...payment,
    paymentId: "",
    createdAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    paymentId: reference.id,
  });

  return reference.id;
}

export async function getAllPayments() {
  const snapshot = await getDocs(query(collection(db, "payments"), orderBy("createdAt", "desc")));
  return mapSnapshot<PaymentRecord>(snapshot);
}

export async function updatePaymentRecord(paymentId: string, data: Partial<PaymentRecord>) {
  await updateDoc(doc(db, "payments", paymentId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getPlatformFees() {
  const fees = await getTypedDoc<PlatformFees>("platformSettings", "fees");

  return (
    fees ?? {
      serviceFeeRate: 0.08,
      defaultDeliveryFee: 4.99,
      taxRate: 0.08875,
      cookerCommissionRate: 0.15,
      deliveryBaseFee: 5,
    }
  );
}

export async function upsertPlatformFees(fees: PlatformFees) {
  await setDoc(doc(db, "platformSettings", "fees"), {
    ...fees,
    updatedAt: serverTimestamp(),
  });
}

export async function createPromotion(promotion: Omit<Promotion, "promotionId" | "createdAt" | "updatedAt">) {
  const reference = await addDoc(collection(db, "promotions"), {
    ...promotion,
    promotionId: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    promotionId: reference.id,
    updatedAt: serverTimestamp(),
  });

  return reference.id;
}

export async function getAllPromotions() {
  const snapshot = await getDocs(query(collection(db, "promotions"), orderBy("createdAt", "desc")));
  return mapSnapshot<Promotion>(snapshot);
}

export async function updatePromotion(promotionId: string, data: Partial<Promotion>) {
  await updateDoc(doc(db, "promotions", promotionId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function createAccountControlAction(action: {
  targetUserId: string;
  targetEmail: string;
  actionType: "approve" | "suspend" | "reject" | "restore" | "manual_adjustment" | "note";
  amount: number;
  note: string;
  createdBy: string;
}) {
  const reference = await addDoc(collection(db, "accountActions"), {
    ...action,
    actionId: "",
    createdAt: serverTimestamp(),
  });

  await updateDoc(reference, {
    actionId: reference.id,
  });

  return reference.id;
}

async function getTypedDoc<T>(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.exists() ? (snapshot.data() as T) : null;
}

async function getOrdersByField(fieldName: "consumerId" | "cookerId" | "deliveryPersonId", value: string) {
  const snapshot = await getDocs(
    query(collection(db, "orders"), where(fieldName, "==", value), orderBy("createdAt", "desc")),
  );

  return mapSnapshot<Order>(snapshot);
}

function mapSnapshot<T>(snapshot: { docs: Array<{ data: () => unknown }> }) {
  return snapshot.docs.map((documentSnapshot) => documentSnapshot.data() as T);
}
