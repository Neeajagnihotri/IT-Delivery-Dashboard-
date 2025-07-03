
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Monitor,
  Mail,
  Calendar,
  Globe,
  Lock,
  Users,
  Building,
  CreditCard,
  Download,
  Upload,
  BarChart3,
  Activity,
  Zap,
  FileText,
  Cloud,
  Smartphone,
  Palette,
  Layout,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const EnterpriseSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Account & Profile
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    
    // Security & Privacy
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true,
    
    // Display & Interface
    darkMode: false,
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12",
    
    // Data & Analytics
    dataRetention: "365",
    analyticsTracking: true,
    performanceMetrics: true,
    errorReporting: true,
    
    // Integrations
    slackIntegration: true,
    teamsIntegration: false,
    jiraIntegration: true,
    
    // Advanced
    apiAccess: true,
    webhooks: false,
    auditLogs: true,
    dataExport: true
  });

  const [showApiKey, setShowApiKey] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Show feedback for important changes
    if (key === 'twoFactorAuth' || key === 'darkMode' || key === 'apiAccess') {
      toast({
        title: "Setting Updated",
        description: `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} has been ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'updated'}.`,
      });
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "All your preferences have been saved successfully.",
    });
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to default');
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleDownloadData = () => {
    console.log('Downloading user data');
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    toast({
      title: "Account Deletion",
      description: "Please contact support to proceed with account deletion.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-light-bg min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-deep-blue">Enterprise Settings</h1>
            <p className="text-slate text-lg">Manage your platform preferences and configurations</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleResetSettings} 
            className="border-slate text-slate hover:border-slate hover:bg-slate hover:text-white rounded-xl"
          >
            Reset to Default
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-teal hover:to-deep-blue rounded-xl"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-deep-blue/20 rounded-2xl p-2 shadow-lg">
          <TabsTrigger value="account" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-teal data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-teal data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="interface" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-teal data-[state=active]:text-white">
            <Monitor className="h-4 w-4 mr-2" />
            Interface
          </TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-teal data-[state=active]:text-white">
            <Zap className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-deep-blue data-[state=active]:to-teal data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Account & Notifications */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Email Notifications</Label>
                    <p className="text-sm text-slate">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(value) => handleSettingChange("emailNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Push Notifications</Label>
                    <p className="text-sm text-slate">Browser push notifications</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications}
                    onCheckedChange={(value) => handleSettingChange("pushNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">SMS Notifications</Label>
                    <p className="text-sm text-slate">Critical alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={(value) => handleSettingChange("smsNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Marketing Emails</Label>
                    <p className="text-sm text-slate">Product updates and newsletters</p>
                  </div>
                  <Switch 
                    checked={settings.marketingEmails}
                    onCheckedChange={(value) => handleSettingChange("marketingEmails", value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <User className="h-5 w-5" />
                  <span>Profile Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Display Name</Label>
                  <Input placeholder="Enter your display name" className="bg-white border-deep-blue/20 focus:border-teal focus:ring-teal rounded-xl" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Email Address</Label>
                  <Input placeholder="user@company.com" type="email" className="bg-white border-deep-blue/20 focus:border-teal focus:ring-teal rounded-xl" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Department</Label>
                  <Select defaultValue="engineering">
                    <SelectTrigger className="bg-white rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security & Privacy */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-slate">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={settings.twoFactorAuth ? "bg-teal text-white" : "bg-slate text-white"}>
                      {settings.twoFactorAuth ? "Active" : "Inactive"}
                    </Badge>
                    <Switch 
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(value) => handleSettingChange("twoFactorAuth", value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Session Timeout</Label>
                  <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange("sessionTimeout", value)}>
                    <SelectTrigger className="bg-white rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Password Expiry</Label>
                  <Select value={settings.passwordExpiry} onValueChange={(value) => handleSettingChange("passwordExpiry", value)}>
                    <SelectTrigger className="bg-white rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select expiry" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Lock className="h-5 w-5" />
                  <span>Privacy & Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Login Notifications</Label>
                    <p className="text-sm text-slate">Alert on new device logins</p>
                  </div>
                  <Switch 
                    checked={settings.loginNotifications}
                    onCheckedChange={(value) => handleSettingChange("loginNotifications", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Data Retention</Label>
                  <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange("dataRetention", value)}>
                    <SelectTrigger className="bg-white rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-deep-blue/20 text-deep-blue hover:border-teal hover:bg-teal hover:text-white rounded-xl"
                    onClick={handleDownloadData}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white border-slate text-slate hover:bg-slate hover:text-white rounded-xl"
                    onClick={handleDeleteAccount}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Interface & Display */}
        <TabsContent value="interface" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Palette className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Dark Mode</Label>
                    <p className="text-sm text-slate">Switch to dark theme</p>
                  </div>
                  <Switch 
                    checked={settings.darkMode}
                    onCheckedChange={(value) => handleSettingChange("darkMode", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                    <SelectTrigger className="rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger className="rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      <SelectItem value="JST">Japan Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Layout className="h-5 w-5" />
                  <span>Display Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                    <SelectTrigger className="rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Time Format</Label>
                  <Select value={settings.timeFormat} onValueChange={(value) => handleSettingChange("timeFormat", value)}>
                    <SelectTrigger className="rounded-xl border-deep-blue/20 focus:border-teal focus:ring-teal">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl">
                      <SelectItem value="12">12-hour</SelectItem>
                      <SelectItem value="24">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Performance Metrics</Label>
                    <p className="text-sm text-slate">Show performance indicators</p>
                  </div>
                  <Switch 
                    checked={settings.performanceMetrics}
                    onCheckedChange={(value) => handleSettingChange("performanceMetrics", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-deep-blue">
                <Zap className="h-5 w-5" />
                <span>Connected Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-deep-blue/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-6 w-6 text-teal" />
                      <span className="font-medium text-deep-blue">Slack</span>
                    </div>
                    <Switch 
                      checked={settings.slackIntegration}
                      onCheckedChange={(value) => handleSettingChange("slackIntegration", value)}
                    />
                  </div>
                  <p className="text-sm text-slate">Team communication and notifications</p>
                </div>
                
                <div className="p-4 border border-deep-blue/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Users className="h-6 w-6 text-teal" />
                      <span className="font-medium text-deep-blue">Microsoft Teams</span>
                    </div>
                    <Switch 
                      checked={settings.teamsIntegration}
                      onCheckedChange={(value) => handleSettingChange("teamsIntegration", value)}
                    />
                  </div>
                  <p className="text-sm text-slate">Video calls and collaboration</p>
                </div>
                
                <div className="p-4 border border-deep-blue/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-teal" />
                      <span className="font-medium text-deep-blue">Jira</span>
                    </div>
                    <Switch 
                      checked={settings.jiraIntegration}
                      onCheckedChange={(value) => handleSettingChange("jiraIntegration", value)}
                    />
                  </div>
                  <p className="text-sm text-slate">Project management and tracking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Database className="h-5 w-5" />
                  <span>API & Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">API Access</Label>
                    <p className="text-sm text-slate">Enable REST API access</p>
                  </div>
                  <Switch 
                    checked={settings.apiAccess}
                    onCheckedChange={(value) => handleSettingChange("apiAccess", value)}
                  />
                </div>
                
                {settings.apiAccess && (
                  <div className="space-y-2">
                    <Label className="text-deep-blue font-medium">API Key</Label>
                    <div className="flex space-x-2">
                      <Input 
                        type={showApiKey ? "text" : "password"}
                        value="zpcom_api_key_***************"
                        readOnly
                        className="bg-white border-deep-blue/20 rounded-xl"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="bg-white border-deep-blue/20 text-deep-blue hover:border-teal hover:bg-teal hover:text-white rounded-xl"
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Webhooks</Label>
                    <p className="text-sm text-slate">Real-time event notifications</p>
                  </div>
                  <Switch 
                    checked={settings.webhooks}
                    onCheckedChange={(value) => handleSettingChange("webhooks", value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-deep-blue">
                  <Activity className="h-5 w-5" />
                  <span>System & Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Audit Logs</Label>
                    <p className="text-sm text-slate">Track all user activities</p>
                  </div>
                  <Switch 
                    checked={settings.auditLogs}
                    onCheckedChange={(value) => handleSettingChange("auditLogs", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Analytics Tracking</Label>
                    <p className="text-sm text-slate">Usage analytics and insights</p>
                  </div>
                  <Switch 
                    checked={settings.analyticsTracking}
                    onCheckedChange={(value) => handleSettingChange("analyticsTracking", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-deep-blue font-medium">Error Reporting</Label>
                    <p className="text-sm text-slate">Automatic error collection</p>
                  </div>
                  <Switch 
                    checked={settings.errorReporting}
                    onCheckedChange={(value) => handleSettingChange("errorReporting", value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-white border-deep-blue/20 text-deep-blue hover:border-teal hover:bg-teal hover:text-white rounded-xl"
                  onClick={() => console.log('Opening system logs')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View System Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
