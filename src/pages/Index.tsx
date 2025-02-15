import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Check, Star, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Error",
        description: "Please enter both your name and email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-to-ac', {
        body: { email, name },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Thank you for joining our waitlist!",
      });
      setEmail("");
      setName("");
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
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 md:pt-20 pb-24 md:pb-32 text-center">
        <div className="space-y-8 animate-fadeIn">
          <img 
            src="/lovable-uploads/448467b8-6c7f-42c5-9c32-c284b08e7da9.png" 
            alt="Sticha - Tailors, on demand." 
            className="mx-auto mb-8 w-40 md:w-64 animate-float"
          />
          <h1 className="text-3xl md:text-6xl font-bold text-primary tracking-tight leading-tight">
            The #1 Tailor-as-a-Service Platform
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with Expert Tailors Worldwide. Experience bespoke tailoring without boundaries.
          </p>
          <Card className="max-w-md mx-auto p-6 shadow-lg bg-white/80 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg bg-white"
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg bg-white"
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-accent hover:bg-accent/90 transform transition-all duration-200 hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join the Waitlist"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 backdrop-blur py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-gray-600">Access expert tailors from around the world, anytime</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
              <Users className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Seamless Connection</h3>
              <p className="text-gray-600">Connect with the perfect tailor for your specific needs</p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
              <Star className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-gray-600">Experience world-class tailoring and craftsmanship</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose Sticha?
          </h2>
          <div className="space-y-3">
            {[
              "Access to global network of expert tailors",
              "Real-time communication and collaboration",
              "Secure payment and project management",
              "Quality assurance and satisfaction guarantee",
              "Advanced measurement and fitting technology",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-base text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-accent text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Join the Future of Global Tailoring
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Be among the first to experience the world's leading Tailor-as-a-Service platform.
          </p>
          <Card className="max-w-md mx-auto p-6 bg-white/10 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg bg-white"
                  disabled={isSubmitting}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg bg-white"
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-white text-accent hover:bg-white/90 transform transition-all duration-200 hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join the Waitlist"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
