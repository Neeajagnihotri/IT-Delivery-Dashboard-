
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-blue via-teal to-charcoal flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-xl">
              <img 
                src="/lovable-uploads/0b182268-2014-40ef-ab6e-302382df73dc.png" 
                alt="Zapcom Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-deep-blue">
            IT Delivery Dashboard
          </CardTitle>
          <p className="text-slate mt-2">Sign in to access your dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-deep-blue font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-soft-silver focus:border-teal placeholder:text-deep-blue"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-deep-blue font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-soft-silver focus:border-teal placeholder:text-deep-blue"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-deep-blue hover:bg-teal text-white font-medium transition-colors"
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate">
            <p>Demo credentials:</p>
            <p className="text-deep-blue font-medium">admin / password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
