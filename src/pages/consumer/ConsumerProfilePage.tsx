import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { useAuth } from "../../contexts/AuthContext";
import { getConsumerProfile } from "../../services/userService";
import type { ConsumerProfile } from "../../types/firestore";

export default function ConsumerProfilePage() {
  const { currentUser, profile } = useAuth();
  const [consumer, setConsumer] = useState<ConsumerProfile | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    getConsumerProfile(currentUser.uid).then(setConsumer);
  }, [currentUser]);

  return (
    <section>
      <PageHeader
        eyebrow="Profile"
        title="Consumer profile"
        description="View account, address, dietary, allergy, and privacy settings. Editing is wired in a later focused pass."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold text-ink">Account</h2>
          <Input label="Full name" value={profile?.fullName ?? ""} readOnly />
          <Input label="Email" value={profile?.email ?? ""} readOnly />
          <Input label="Phone" value={profile?.phone ?? ""} readOnly />
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-bold text-ink">Preferences</h2>
          <Input label="Address" value={consumer?.address ?? ""} readOnly />
          <Input label="Culture" value={consumer?.culture ?? ""} readOnly />
          <Input label="Favorite foods" value={consumer?.favoriteFoods.join(", ") ?? ""} readOnly />
          <Input label="Dietary preferences" value={consumer?.dietaryPreferences.join(", ") ?? ""} readOnly />
          <Input label="Allergies" value={consumer?.allergies.join(", ") ?? ""} readOnly />
        </Card>
      </div>
    </section>
  );
}
