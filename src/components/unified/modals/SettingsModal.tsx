
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Database, Download, Users } from "lucide-react";
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
    dataRetention: "90",
    exportFormat: "csv",
    userManagement: false,
    rolePermissions: "standard"
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
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Notifications</Label>
                  <div className="text-sm text-slate-500">Receive alerts for important updates</div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(value) => handleSettingChange("notifications", value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Refresh</Label>
                  <div className="text-sm text-slate-500">Automatically update dashboard data</div>
                </div>
                <Switch
                  checked={settings.autoRefresh}
                  onCheckedChange={(value) => handleSettingChange("autoRefresh", value)}
                />
              </div>
              
              {settings.autoRefresh && (
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Refresh Interval</Label>
                  <Select value={settings.refreshInterval} onValueChange={(value) => handleSettingChange("refreshInterval", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
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

          {/* Role & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-permissions">Permission Level</Label>
                <Select value={settings.rolePermissions} onValueChange={(value) => handleSettingChange("rolePermissions", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permission level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="elevated">Elevated</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">User Management</Label>
                  <div className="text-sm text-slate-500">Enable user role management features</div>
                </div>
                <Switch
                  checked={settings.userManagement}
                  onCheckedChange={(value) => handleSettingChange("userManagement", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention Period</Label>
                <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange("dataRetention", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
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
                  <Label htmlFor="export-format">Export Format</Label>
                  <Select value={settings.exportFormat} onValueChange={(value) => handleSettingChange("exportFormat", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleExportData} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Platform Data
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
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
