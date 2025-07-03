
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./AuthContext";
import { Building2, User, Lock, ArrowRight } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock authentication - in real app, this would call an API
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg via-slate-50 to-light-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white rounded-2xl shadow-xl border border-soft-silver/30">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-deep-blue">
              Zapcom IT Platform
            </CardTitle>
            <p className="text-slate mt-2">Enterprise Delivery Management</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-deep-blue font-medium">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-soft-silver focus:border-teal focus:ring-teal focus:ring-2 focus:ring-opacity-50 rounded-xl bg-white text-deep-blue"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-deep-blue font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-soft-silver focus:border-teal focus:ring-teal focus:ring-2 focus:ring-opacity-50 rounded-xl bg-white text-deep-blue"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-deep-blue to-teal hover:from-teal hover:to-deep-blue text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            <div className="text-center text-sm text-slate">
              Demo credentials: any email/password
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
