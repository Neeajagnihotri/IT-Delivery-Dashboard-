
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { useState } from "react";

export const FiltersPanel = () => {
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    skills: "",
    experience: "",
    location: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (value && !activeFilters.includes(key)) {
      setActiveFilters(prev => [...prev, key]);
    }
  };

  const removeFilter = (key: string) => {
    setFilters(prev => ({ ...prev, [key]: "" }));
    setActiveFilters(prev => prev.filter(f => f !== key));
  };

  const clearAllFilters = () => {
    setFilters({
      department: "",
      status: "",
      skills: "",
      experience: "",
      location: ""
    });
    setActiveFilters([]);
  };

  return (
    <Card className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={filters.department} onValueChange={(value) => handleFilterChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="product">Product</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billable">Billable</SelectItem>
                <SelectItem value="benched">Benched</SelectItem>
                <SelectItem value="shadow">Shadow</SelectItem>
                <SelectItem value="associate">Associate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Select value={filters.skills} onValueChange={(value) => handleFilterChange("skills", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior (6-8 years)</SelectItem>
                <SelectItem value="lead">Lead (9+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Search location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterKey) => (
              <Badge key={filterKey} variant="secondary" className="flex items-center gap-1">
                {filterKey}: {filters[filterKey as keyof typeof filters]}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeFilter(filterKey)}
                />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
