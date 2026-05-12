import { FirebaseError } from "firebase/app";

const authErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/missing-password": "Enter your password.",
  "auth/weak-password": "Use a password with at least 6 characters.",
  "auth/user-not-found": "No account was found for that email.",
  "auth/wrong-password": "The email or password is incorrect.",
};

export function getFriendlyAuthError(error: unknown) {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? "Authentication failed. Check your information and try again.";
  }

  return "Something went wrong. Try again.";
}
