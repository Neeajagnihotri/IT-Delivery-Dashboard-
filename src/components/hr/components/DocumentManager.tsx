
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload, Download, Search, Eye, Trash2, FolderOpen, Calendar, User } from "lucide-react";

const mockDocuments = [
  {
    id: 1,
    name: "Employee_Handbook_2024.pdf",
    type: "Policy",
    uploadedBy: "HR Admin",
    uploadDate: "2024-01-15",
    size: "2.3 MB",
    category: "Company Policy",
    status: "Active"
  },
  {
    id: 2,
    name: "John_Smith_Offer_Letter.pdf",
    type: "Offer Letter",
    uploadedBy: "Sarah Wilson",
    uploadDate: "2024-02-20",
    size: "145 KB",
    category: "HR Letters",
    status: "Active"
  },
  {
    id: 3,
    name: "Q1_Performance_Reviews.xlsx",
    type: "Performance",
    uploadedBy: "Mike Johnson",
    uploadDate: "2024-03-31",
    size: "1.8 MB",
    category: "Performance",
    status: "Active"
  },
  {
    id: 4,
    name: "Training_Certificate_AWS.pdf",
    type: "Certificate",
    uploadedBy: "John Smith",
    uploadDate: "2024-03-15",
    size: "890 KB",
    category: "Training",
    status: "Active"
  }
];

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDocumentIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-deep-blue" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Company Policy': 'bg-deep-blue text-white',
      'HR Letters': 'bg-teal text-white',
      'Performance': 'bg-charcoal text-white',
      'Training': 'bg-slate text-white'
    };
    return colors[category as keyof typeof colors] || 'bg-light-bg text-deep-blue';
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
              <Input
                placeholder="Search documents by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-soft-silver/40 focus:border-teal"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 border-soft-silver/40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Company Policy">Company Policy</SelectItem>
                <SelectItem value="HR Letters">HR Letters</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-deep-blue hover:bg-deep-blue/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-deep-blue">Upload New Document</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-soft-silver/40 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-slate mx-auto mb-4" />
                    <p className="text-slate mb-2">Drag and drop files here, or click to browse</p>
                    <Input type="file" className="hidden" id="file-upload" />
                    <Button variant="outline" className="border-deep-blue text-deep-blue">
                      Choose Files
                    </Button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Category</label>
                    <Select>
                      <SelectTrigger className="border-soft-silver/40">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Company Policy</SelectItem>
                        <SelectItem value="letters">HR Letters</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-deep-blue hover:bg-deep-blue/90">
                      Upload
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Document Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-light-bg p-4 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-deep-blue rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate">Total Documents</p>
                  <p className="text-xl font-bold text-deep-blue">1,234</p>
                </div>
              </div>
            </div>
            <div className="bg-light-bg p-4 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal rounded-lg">
                  <FolderOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate">Categories</p>
                  <p className="text-xl font-bold text-teal">12</p>
                </div>
              </div>
            </div>
            <div className="bg-light-bg p-4 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-charcoal rounded-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate">This Month</p>
                  <p className="text-xl font-bold text-charcoal">45</p>
                </div>
              </div>
            </div>
            <div className="bg-light-bg p-4 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate rounded-lg">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate">Downloads</p>
                  <p className="text-xl font-bold text-slate">892</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-3">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="border border-soft-silver/30 hover:border-teal/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-light-bg rounded-lg">
                        {getDocumentIcon(document.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-blue">{document.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate mt-1">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{document.uploadedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{document.uploadDate}</span>
                          </div>
                          <span>{document.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-deep-blue text-deep-blue">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-teal text-teal">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate text-slate">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
