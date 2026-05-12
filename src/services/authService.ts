import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import {
  createBaseUserProfile,
  createConsumerProfile,
  createCookerProfile,
  createDeliveryPersonProfile,
} from "./firestoreService";
import type { ConsumerProfile, CookerProfile, DeliveryPersonProfile, UserRole } from "../types/firestore";

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export interface BaseSignupInput {
  role: Exclude<UserRole, "admin">;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export type ConsumerSignupInput = BaseSignupInput & {
  role: "consumer";
  countryOfOrigin: string;
  culture: string;
  favoriteFoods: string;
  preferredCuisines: string;
  dietaryPreferences: string;
  allergies: string;
};

export type CookerSignupInput = BaseSignupInput & {
  role: "cooker";
  countryOfOrigin: string;
  culturalCookingBackground: string;
  specialDishes: string;
  yearsOfExperience: string;
  foodSafetyCertificateNumber: string;
  certificateExpiryDate: string;
};

export type DeliverySignupInput = BaseSignupInput & {
  role: "delivery";
  drivingLicenseNumber: string;
  licenseExpiryDate: string;
  vehicleType: string;
  vehicleMakeModel: string;
  vehicleYear: string;
  vehiclePlateNumber: string;
};

export type RoleSignupInput = ConsumerSignupInput | CookerSignupInput | DeliverySignupInput;

export async function registerWithRole(input: RoleSignupInput) {
  const credentials = await createUserWithEmailAndPassword(auth, input.email, input.password);

  await updateProfile(credentials.user, {
    displayName: input.fullName,
  });

  await createBaseUserProfile({
    uid: credentials.user.uid,
    role: input.role,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    photoURL: "",
    status: input.role === "consumer" ? "approved" : "pending",
  });

  if (input.role === "consumer") {
    const profile: ConsumerProfile = {
      uid: credentials.user.uid,
      address: input.address,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      countryOfOrigin: input.countryOfOrigin,
      culture: input.culture,
      favoriteFoods: splitList(input.favoriteFoods),
      preferredCuisines: splitList(input.preferredCuisines),
      dietaryPreferences: splitList(input.dietaryPreferences),
      allergies: splitList(input.allergies),
    };
    await createConsumerProfile(profile);
  }

  if (input.role === "cooker") {
    const profile: CookerProfile = {
      uid: credentials.user.uid,
      address: input.address,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      countryOfOrigin: input.countryOfOrigin,
      culturalCookingBackground: input.culturalCookingBackground,
      specialDishes: splitList(input.specialDishes),
      yearsOfExperience: Number(input.yearsOfExperience) || 0,
      foodSafetyCertificateNumber: input.foodSafetyCertificateNumber,
      certificateExpiryDate: input.certificateExpiryDate,
      kitchenPhotos: [],
      fridgePhotos: [],
      sampleFoodPhotos: [],
      isAvailable: false,
      missedRequestCount: 0,
      rating: 0,
      totalOrders: 0,
      bankStatus: "not_added",
      verificationStatus: "pending",
    };
    await createCookerProfile(profile);
  }

  if (input.role === "delivery") {
    const profile: DeliveryPersonProfile = {
      uid: credentials.user.uid,
      address: input.address,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
      drivingLicenseNumber: input.drivingLicenseNumber,
      licenseExpiryDate: input.licenseExpiryDate,
      vehicleType: input.vehicleType,
      vehicleMakeModel: input.vehicleMakeModel,
      vehicleYear: Number(input.vehicleYear) || 0,
      vehiclePlateNumber: input.vehiclePlateNumber,
      vehiclePhoto: "",
      licensePhoto: "",
      insuranceDocument: "",
      isAvailable: false,
      missedRequestCount: 0,
      rating: 0,
      totalDeliveries: 0,
      bankStatus: "not_added",
      verificationStatus: "pending",
    };
    await createDeliveryPersonProfile(profile);
  }

  await sendEmailVerification(credentials.user).catch(() => undefined);

  return credentials;
}

export function logout() {
  return signOut(auth);
}

export function sendPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
