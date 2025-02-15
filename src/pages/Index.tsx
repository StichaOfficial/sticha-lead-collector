
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Star, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-to-ac', {
        body: { email },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Thank you for joining our waitlist!",
      });
      setEmail("");
      navigate("/thank-you");
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32 text-center">
        <div className="space-y-6 animate-fadeIn">
          <img 
            src="/lovable-uploads/448467b8-6c7f-42c5-9c32-c284b08e7da9.png" 
            alt="Sticha - Tailors, on demand." 
            className="mx-auto mb-8 w-48 md:w-64"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
            Transform Your Tailoring Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join the future of bespoke tailoring. Streamline your workflow, enhance client experience, and grow your business.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-accent hover:bg-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Streamlined Operations</h3>
              <p className="text-gray-600">Automate measurements, orders, and client management</p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enhanced Client Experience</h3>
              <p className="text-gray-600">Provide a premium digital experience for your clients</p>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
              <Star className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Growth</h3>
              <p className="text-gray-600">Expand your reach and increase your revenue</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose Sticha?
          </h2>
          <div className="space-y-3">
            {[
              "Digital measurement records and client profiles",
              "Automated order tracking and management",
              "Seamless client communication",
              "Advanced analytics and reporting",
              "Mobile-friendly interface",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary transition-colors">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-base text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Be Among the First to Experience Sticha
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our exclusive waitlist and get early access to the future of tailoring.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg bg-white/90"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-lg bg-white text-accent hover:bg-white/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
