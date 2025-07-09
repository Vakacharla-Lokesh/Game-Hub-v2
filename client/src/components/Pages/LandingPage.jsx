import LandingHero from "../LandingHero";
import ProfileSection from "../ProfileSection";
import Footer from "../layout/Footer";

export default function LandingPage() {
  return (
    <div className="bg-black text-yellow-400">
      <LandingHero />
      <ProfileSection />
      <Footer />
    </div>
  );
}
