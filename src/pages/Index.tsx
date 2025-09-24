import { useState } from "react"
import AgeVerification from "@/components/AgeVerification"
import LoveHero from "@/components/LoveHero"
import PositionSelector from "@/components/PositionSelector"
import ScratchCards from "@/components/ScratchCards"
import LoveCategories from "@/components/LoveCategories"

const Index = () => {
  const [isVerified, setIsVerified] = useState(false)

  if (!isVerified) {
    return <AgeVerification onVerified={() => setIsVerified(true)} />
  }

  return (
    <div className="min-h-screen">
      <LoveHero />
      <PositionSelector />
      <ScratchCards />
      <LoveCategories />
    </div>
  );
};

export default Index;
