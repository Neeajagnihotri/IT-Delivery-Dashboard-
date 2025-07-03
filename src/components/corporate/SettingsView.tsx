
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Settings, User, Globe, Eye, EyeOff, Save, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthContext";

export const SettingsView = () => {
  const { user } = useAuth();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@zapcom.com"
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Show password toggles
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Regional settings
  const [regionalSettings, setRegionalSettings] = useState({
    timezone: "Asia/Kolkata",
    currency: "INR"
  });

  const handleProfileSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    console.log("Saving profile:", profileData);
    toast.success("Profile updated successfully");
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    console.log("Changing password");
    toast.success("Password changed successfully");
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleRegionalSettingsSave = () => {
    console.log("Saving regional settings:", regionalSettings);
    toast.success("Regional settings updated successfully");
  };

  return (
    <div className="min-h-screen bg-light-bg p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-white border border-deep-blue/10 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-xl shadow-sm">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-deep-blue">Settings</h1>
                <p className="text-slate text-sm">Manage your account preferences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Accordions */}
        <Card className="bg-white border border-deep-blue/10 shadow-sm">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Profile Information Section */}
              <AccordionItem value="profile" className="border border-slate/10 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-deep-blue" />
                    <span className="text-deep-blue font-medium">Profile Information</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-deep-blue text-sm font-medium">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-deep-blue text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleProfileSave}
                      className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-teal hover:to-deep-blue rounded-lg h-10 px-6"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </Button>

                    {/* Change Password Section within Profile */}
                    <div className="border-t border-slate/10 pt-6 mt-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lock className="h-4 w-4 text-deep-blue" />
                        <h3 className="text-deep-blue font-medium">Change Password</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-deep-blue text-sm font-medium">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="current-password"
                              type={showPasswords.current ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                              className="pr-10 bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10"
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate hover:text-teal"
                              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                            >
                              {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-deep-blue text-sm font-medium">New Password</Label>
                            <div className="relative">
                              <Input
                                id="new-password"
                                type={showPasswords.new ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="pr-10 bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10"
                                placeholder="Enter new password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate hover:text-teal"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                              >
                                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-deep-blue text-sm font-medium">Confirm Password</Label>
                            <div className="relative">
                              <Input
                                id="confirm-password"
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="pr-10 bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10"
                                placeholder="Confirm new password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate hover:text-teal"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                              >
                                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={handlePasswordChange}
                          className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-teal hover:to-deep-blue rounded-lg h-10 px-6"
                        >
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Regional Settings Section */}
              <AccordionItem value="regional" className="border border-slate/10 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-deep-blue" />
                    <span className="text-deep-blue font-medium">Regional Settings</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-deep-blue text-sm font-medium">Time Zone</Label>
                      <Select value={regionalSettings.timezone} onValueChange={(value) => setRegionalSettings({ ...regionalSettings, timezone: value })}>
                        <SelectTrigger className="bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-lg">
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                          <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-deep-blue text-sm font-medium">Preferred Currency</Label>
                      <Select value={regionalSettings.currency} onValueChange={(value) => setRegionalSettings({ ...regionalSettings, currency: value })}>
                        <SelectTrigger className="bg-white border-slate/20 focus:border-teal focus:ring-teal/20 rounded-lg h-10">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-lg">
                          <SelectItem value="INR">₹ Indian Rupees (INR)</SelectItem>
                          <SelectItem value="USD">$ US Dollars (USD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleRegionalSettingsSave}
                      className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-teal hover:to-deep-blue rounded-lg h-10 px-6"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
