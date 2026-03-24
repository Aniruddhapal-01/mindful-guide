import { AlertTriangle } from "lucide-react";

const DisclaimerBanner = () => (
  <div className="border-b bg-wellness-peach/20 px-4 py-2.5 text-center text-sm text-foreground/80">
    <AlertTriangle className="mr-1.5 inline h-4 w-4 text-wellness-rose" />
    This platform provides general wellness insights and is not a medical diagnosis tool. Please consult a professional for clinical concerns.
  </div>
);

export default DisclaimerBanner;
