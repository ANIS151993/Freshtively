import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { Select } from "../../components/forms/Select";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { registerWithRole, type RoleSignupInput } from "../../services/authService";
import { getFriendlyAuthError } from "../../utils/authErrors";

type SignupRole = "consumer" | "cooker" | "delivery";

const defaultForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  countryOfOrigin: "",
  culture: "",
  favoriteFoods: "",
  preferredCuisines: "",
  dietaryPreferences: "",
  allergies: "",
  culturalCookingBackground: "",
  specialDishes: "",
  yearsOfExperience: "",
  foodSafetyCertificateNumber: "",
  certificateExpiryDate: "",
  drivingLicenseNumber: "",
  licenseExpiryDate: "",
  vehicleType: "",
  vehicleMakeModel: "",
  vehicleYear: "",
  vehiclePlateNumber: "",
};

export default function SignupPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const signupRole = isSignupRole(role) ? role : "consumer";
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = useMemo(() => {
    if (signupRole === "cooker") return "Cooker signup";
    if (signupRole === "delivery") return "Delivery signup";
    return "Consumer signup";
  }, [signupRole]);

  function updateField(name: keyof typeof defaultForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await registerWithRole(buildSignupInput(signupRole, form));
      await refreshProfile();
      navigate(signupRole === "consumer" ? "/consumer" : "/under-review", { replace: true });
    } catch (caughtError) {
      setError(getFriendlyAuthError(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Create account</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Your account creates a Firebase Auth user plus a base user profile and matching role profile.
      </p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Input label="Full name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} required />
        <Input label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
        <Input label="Password" type="password" minLength={6} value={form.password} onChange={(event) => updateField("password", event.target.value)} required />
        <Input label="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
        <Input label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} required />
        <Input label="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} required />
        <Input label="State" value={form.state} onChange={(event) => updateField("state", event.target.value)} required />
        <Input label="ZIP code" value={form.zipCode} onChange={(event) => updateField("zipCode", event.target.value)} required />

        {signupRole !== "delivery" ? (
          <>
            <Input label="Country of origin" value={form.countryOfOrigin} onChange={(event) => updateField("countryOfOrigin", event.target.value)} required />
            {signupRole === "consumer" ? (
              <Input label="Culture" value={form.culture} onChange={(event) => updateField("culture", event.target.value)} required />
            ) : null}
          </>
        ) : null}

        {signupRole === "consumer" ? (
          <>
            <Input label="Favorite foods" value={form.favoriteFoods} onChange={(event) => updateField("favoriteFoods", event.target.value)} placeholder="Biryani, tacos, pho" />
            <Input label="Preferred cuisines" value={form.preferredCuisines} onChange={(event) => updateField("preferredCuisines", event.target.value)} placeholder="Bangladeshi, Mexican" />
            <Input label="Dietary preferences" value={form.dietaryPreferences} onChange={(event) => updateField("dietaryPreferences", event.target.value)} placeholder="Halal, vegan" />
            <Input label="Allergies" value={form.allergies} onChange={(event) => updateField("allergies", event.target.value)} placeholder="Peanuts, dairy" />
          </>
        ) : null}

        {signupRole === "cooker" ? (
          <>
            <Input label="Food safety certificate number" value={form.foodSafetyCertificateNumber} onChange={(event) => updateField("foodSafetyCertificateNumber", event.target.value)} required />
            <Input label="Certificate expiry date" type="date" value={form.certificateExpiryDate} onChange={(event) => updateField("certificateExpiryDate", event.target.value)} required />
            <Input label="Years of experience" type="number" min="0" value={form.yearsOfExperience} onChange={(event) => updateField("yearsOfExperience", event.target.value)} />
            <Input label="Special dishes" value={form.specialDishes} onChange={(event) => updateField("specialDishes", event.target.value)} placeholder="Kacchi, pitha, curry" />
            <div className="md:col-span-2">
              <Textarea label="Cultural cooking background" value={form.culturalCookingBackground} onChange={(event) => updateField("culturalCookingBackground", event.target.value)} required />
            </div>
          </>
        ) : null}

        {signupRole === "delivery" ? (
          <>
            <Input label="Driving license number" value={form.drivingLicenseNumber} onChange={(event) => updateField("drivingLicenseNumber", event.target.value)} required />
            <Input label="License expiry date" type="date" value={form.licenseExpiryDate} onChange={(event) => updateField("licenseExpiryDate", event.target.value)} required />
            <Select
              label="Vehicle type"
              value={form.vehicleType}
              onChange={(event) => updateField("vehicleType", event.target.value)}
              required
              options={[
                { label: "Select vehicle", value: "" },
                { label: "Car", value: "car" },
                { label: "Bike", value: "bike" },
                { label: "Scooter", value: "scooter" },
              ]}
            />
            <Input label="Vehicle make/model" value={form.vehicleMakeModel} onChange={(event) => updateField("vehicleMakeModel", event.target.value)} required />
            <Input label="Vehicle year" type="number" value={form.vehicleYear} onChange={(event) => updateField("vehicleYear", event.target.value)} required />
            <Input label="Plate number" value={form.vehiclePlateNumber} onChange={(event) => updateField("vehiclePlateNumber", event.target.value)} required />
          </>
        ) : null}

        {error ? <p className="rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay md:col-span-2">{error}</p> : null}

        <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
          <Link className="text-sm font-semibold text-muted hover:text-emerald" to="/role-selection">
            Change role
          </Link>
          <Button type="submit" isLoading={isSubmitting}>
            Create account
          </Button>
        </div>
      </form>
    </Card>
  );
}

function isSignupRole(value: string | undefined): value is SignupRole {
  return value === "consumer" || value === "cooker" || value === "delivery";
}

function buildSignupInput(role: SignupRole, form: typeof defaultForm): RoleSignupInput {
  const base = {
    role,
    fullName: form.fullName,
    email: form.email,
    password: form.password,
    phone: form.phone,
    address: form.address,
    city: form.city,
    state: form.state,
    zipCode: form.zipCode,
  };

  if (role === "consumer") {
    return {
      ...base,
      role,
      countryOfOrigin: form.countryOfOrigin,
      culture: form.culture,
      favoriteFoods: form.favoriteFoods,
      preferredCuisines: form.preferredCuisines,
      dietaryPreferences: form.dietaryPreferences,
      allergies: form.allergies,
    };
  }

  if (role === "cooker") {
    return {
      ...base,
      role,
      countryOfOrigin: form.countryOfOrigin,
      culturalCookingBackground: form.culturalCookingBackground,
      specialDishes: form.specialDishes,
      yearsOfExperience: form.yearsOfExperience,
      foodSafetyCertificateNumber: form.foodSafetyCertificateNumber,
      certificateExpiryDate: form.certificateExpiryDate,
    };
  }

  return {
    ...base,
    role,
    drivingLicenseNumber: form.drivingLicenseNumber,
    licenseExpiryDate: form.licenseExpiryDate,
    vehicleType: form.vehicleType,
    vehicleMakeModel: form.vehicleMakeModel,
    vehicleYear: form.vehicleYear,
    vehiclePlateNumber: form.vehiclePlateNumber,
  };
}
