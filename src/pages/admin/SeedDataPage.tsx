import { useState } from "react";
import { Database, Leaf } from "lucide-react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { db } from "../../config/firebase";

export default function SeedDataPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSeeding, setIsSeeding] = useState(false);

  async function seedData() {
    setMessage("");
    setError("");
    setIsSeeding(true);

    try {
      const now = serverTimestamp();

      await setDoc(doc(db, "users", "demo_consumer_001"), {
        uid: "demo_consumer_001",
        role: "consumer",
        fullName: "Demo Consumer",
        email: "consumer.demo@freshtively.local",
        phone: "814-555-0101",
        photoURL: "",
        status: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "users", "demo_cooker_001"), {
        uid: "demo_cooker_001",
        role: "cooker",
        fullName: "Ayesha Rahman",
        email: "ayesha.demo@freshtively.local",
        phone: "814-555-0102",
        photoURL: "",
        status: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "users", "demo_delivery_001"), {
        uid: "demo_delivery_001",
        role: "delivery",
        fullName: "John Driver",
        email: "driver.demo@freshtively.local",
        phone: "814-555-0103",
        photoURL: "",
        status: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "users", "demo_admin_001"), {
        uid: "demo_admin_001",
        role: "admin",
        fullName: "Demo Admin",
        email: "admin.demo@freshtively.local",
        phone: "814-555-0104",
        photoURL: "",
        status: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "consumers", "demo_consumer_001"), {
        uid: "demo_consumer_001",
        address: "100 State St",
        city: "Erie",
        state: "PA",
        zipCode: "16501",
        countryOfOrigin: "United States",
        culture: "Bangladeshi-American",
        favoriteFoods: ["Biryani", "Tehari", "Kebab"],
        preferredCuisines: ["Bangladeshi", "Indian", "Pakistani"],
        dietaryPreferences: ["Halal"],
        allergies: [],
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "cookers", "demo_cooker_001"), {
        uid: "demo_cooker_001",
        address: "240 Peach St",
        city: "Erie",
        state: "PA",
        zipCode: "16507",
        countryOfOrigin: "Bangladesh",
        culturalCookingBackground: "Ayesha Rahman prepares Bangladeshi homemade food rooted in family recipes.",
        specialDishes: ["Homemade Beef Biryani", "Chicken Tehari"],
        yearsOfExperience: 12,
        foodSafetyCertificateNumber: "FS-DEMO-AYESHA-001",
        certificateExpiryDate: "2027-12-31",
        kitchenPhotos: [],
        fridgePhotos: [],
        sampleFoodPhotos: [],
        isAvailable: true,
        missedRequestCount: 0,
        rating: 4.9,
        totalOrders: 128,
        bankStatus: "verified",
        verificationStatus: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "deliveryPersons", "demo_delivery_001"), {
        uid: "demo_delivery_001",
        address: "500 Parade St",
        city: "Erie",
        state: "PA",
        zipCode: "16503",
        drivingLicenseNumber: "PA-DEMO-DRIVER-001",
        licenseExpiryDate: "2028-06-30",
        vehicleType: "car",
        vehicleMakeModel: "Toyota Corolla",
        vehicleYear: 2021,
        vehiclePlateNumber: "FD-1023",
        vehiclePhoto: "",
        licensePhoto: "",
        insuranceDocument: "",
        isAvailable: true,
        missedRequestCount: 0,
        rating: 4.8,
        totalDeliveries: 96,
        bankStatus: "verified",
        verificationStatus: "approved",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "dishes", "dish_demo_001"), {
        dishId: "dish_demo_001",
        cookerId: "demo_cooker_001",
        cookerName: "Ayesha Rahman",
        name: "Homemade Beef Biryani",
        description: "Slow-cooked beef biryani with fragrant rice, warm spices, and homemade raita.",
        cuisine: "Bangladeshi",
        culture: "Bengali",
        category: "Dinner",
        ingredients: ["Beef", "Basmati rice", "Yogurt", "Saffron", "Spices"],
        allergens: ["Dairy"],
        imageURL: "",
        price: 16.99,
        quantityAvailable: 10,
        preparationTimeMinutes: 55,
        isAvailable: true,
        rating: 4.9,
        totalReviews: 42,
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "dishes", "dish_demo_002"), {
        dishId: "dish_demo_002",
        cookerId: "demo_cooker_001",
        cookerName: "Ayesha Rahman",
        name: "Chicken Tehari",
        description: "Classic Bangladeshi chicken tehari with mustard oil aroma and tender potatoes.",
        cuisine: "Bangladeshi",
        culture: "Bengali",
        category: "Lunch",
        ingredients: ["Chicken", "Rice", "Potato", "Mustard oil", "Spices"],
        allergens: [],
        imageURL: "",
        price: 13.99,
        quantityAvailable: 12,
        preparationTimeMinutes: 45,
        isAvailable: true,
        rating: 4.8,
        totalReviews: 35,
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "orders", "order_demo_001"), {
        orderId: "order_demo_001",
        consumerId: "demo_consumer_001",
        consumerName: "Demo Consumer",
        cookerId: "demo_cooker_001",
        cookerName: "Ayesha Rahman",
        deliveryPersonId: "demo_delivery_001",
        deliveryPersonName: "John Driver",
        items: [{ dishId: "dish_demo_001", name: "Homemade Beef Biryani", quantity: 1, price: 16.99 }],
        status: "delivery_assigned",
        subtotal: 16.99,
        deliveryFee: 4.99,
        serviceFee: 1.36,
        tax: 1.51,
        cookerTip: 3,
        deliveryTip: 4,
        total: 31.85,
        deliveryAddress: "100 State St, Erie, PA 16501",
        pickupAddress: "240 Peach St, Erie, PA 16507",
        estimatedReadyTime: "35 minutes",
        paymentStatus: "paid",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "notifications", "notification_demo_001"), {
        notificationId: "notification_demo_001",
        userId: "demo_consumer_001",
        title: "Delivery assigned",
        message: "John Driver accepted your delivery for Ayesha Rahman's biryani.",
        type: "order",
        isRead: false,
        relatedOrderId: "order_demo_001",
        createdAt: now,
      });

      await setDoc(doc(db, "reviews", "review_demo_001"), {
        reviewId: "review_demo_001",
        orderId: "order_demo_001",
        consumerId: "demo_consumer_001",
        cookerId: "demo_cooker_001",
        deliveryPersonId: "demo_delivery_001",
        cookerRating: 5,
        deliveryRating: 5,
        cookerReview: "Rich, homemade flavor and generous portion.",
        deliveryReview: "Careful handoff and friendly delivery.",
        createdAt: now,
      });

      await setDoc(doc(db, "supportTickets", "ticket_demo_001"), {
        ticketId: "ticket_demo_001",
        userId: "demo_consumer_001",
        userRole: "consumer",
        category: "Order",
        subject: "Demo order question",
        message: "This sample ticket validates support ticket reads and admin workflows.",
        status: "open",
        assignedTo: "",
        createdAt: now,
        updatedAt: now,
      });

      await setDoc(doc(db, "payments", "payment_demo_001"), {
        paymentId: "payment_demo_001",
        orderId: "order_demo_001",
        consumerId: "demo_consumer_001",
        cookerId: "demo_cooker_001",
        deliveryPersonId: "demo_delivery_001",
        subtotal: 16.99,
        deliveryFee: 4.99,
        serviceFee: 1.36,
        tax: 1.51,
        cookerTip: 3,
        deliveryTip: 4,
        total: 31.85,
        cookerPayout: 17.44,
        deliveryPayout: 8.99,
        platformFee: 3.91,
        status: "paid",
        createdAt: now,
      });

      await setDoc(doc(db, "platformSettings", "fees"), {
        serviceFeeRate: 0.08,
        defaultDeliveryFee: 4.99,
        taxRate: 0.08875,
        cookerCommissionRate: 0.15,
        deliveryBaseFee: 5,
        updatedAt: now,
      });

      setMessage("Demo records created with fixed IDs for users, profiles, dishes, order, notification, review, ticket, payment, and fees.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to seed data.");
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Admin tools"
        title="Seed Firestore data"
        description="Create minimal development records for validating Firestore reads, writes, and admin-only settings."
      />

      <Card className="mt-8 max-w-2xl">
        <Database className="text-emerald" size={32} />
        <h2 className="mt-5 text-xl font-bold text-ink">Development seed</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          This writes `platformSettings/fees` and a sample available dish. It is intentionally small so it can be
          replaced with a safer scripted seeding flow later.
        </p>

        {message ? (
          <p className="mt-5 rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">
            {message}
          </p>
        ) : null}
        {error ? <p className="mt-5 rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}

        <Button className="mt-6" onClick={seedData} isLoading={isSeeding} leftIcon={<Leaf size={18} />}>
          Seed sample data
        </Button>
      </Card>
    </section>
  );
}
