
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <img 
          src="/lovable-uploads/448467b8-6c7f-42c5-9c32-c284b08e7da9.png" 
          alt="Sticha - Tailors, on demand." 
          className="mx-auto mb-12 w-32 md:w-48"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          Thank You for Joining!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We're excited to have you on board. We'll keep you updated about our launch and send you exclusive early-access information.
        </p>
        <Link to="/">
          <Button className="bg-accent hover:bg-accent/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
