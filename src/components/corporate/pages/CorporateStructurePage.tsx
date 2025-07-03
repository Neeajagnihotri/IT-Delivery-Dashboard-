
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CorporateStructurePage = () => {
  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Corporate Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate">Corporate structure management coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateStructurePage;
