
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Database, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: true,
    refreshInterval: "30",
    language: "en",
    timezone: "UTC",
    dataRetention: "90",
    exportFormat: "csv"
  });
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
    onOpenChange(false);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: `Data export in ${settings.exportFormat.toUpperCase()} format has been initiated.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-deep-blue">
            <Shield className="h-5 w-5" />
            Settings & Preferences
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* General Settings */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                <Shield className="h-5 w-5" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-deep-blue">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-deep-blue">Enable Notifications</Label>
                  <div className="text-sm text-slate-600">Receive alerts for important updates</div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(value) => handleSettingChange("notifications", value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-deep-blue">Auto Refresh</Label>
                  <div className="text-sm text-slate-600">Automatically update dashboard data</div>
                </div>
                <Switch
                  checked={settings.autoRefresh}
                  onCheckedChange={(value) => handleSettingChange("autoRefresh", value)}
                />
              </div>
              
              {settings.autoRefresh && (
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval" className="text-deep-blue">Refresh Interval (seconds)</Label>
                  <Select value={settings.refreshInterval} onValueChange={(value) => handleSettingChange("refreshInterval", value)}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-white border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-200">
              <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-deep-blue">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-retention" className="text-deep-blue">Data Retention (days)</Label>
                <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange("dataRetention", value)}>
                  <SelectTrigger className="bg-white border-slate-200">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="export-format" className="text-deep-blue">Export Format</Label>
                  <Select value={settings.exportFormat} onValueChange={(value) => handleSettingChange("exportFormat", value)}>
                    <SelectTrigger className="bg-white border-slate-200">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleExportData} variant="outline" className="w-full border-deep-blue/30 text-deep-blue hover:bg-teal hover:text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Dashboard Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-deep-blue/30 text-deep-blue hover:bg-light-bg"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-teal hover:to-deep-blue">
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
