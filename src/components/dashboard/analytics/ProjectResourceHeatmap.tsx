
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// Mock data for project-resource allocation
const heatmapData = [
  { project: "E-commerce Platform", department: "Engineering", allocated: 8, total: 12, utilization: 67 },
  { project: "E-commerce Platform", department: "Design", allocated: 2, total: 3, utilization: 67 },
  { project: "E-commerce Platform", department: "QA", allocated: 3, total: 4, utilization: 75 },
  { project: "Mobile Banking App", department: "Engineering", allocated: 6, total: 8, utilization: 75 },
  { project: "Mobile Banking App", department: "Design", allocated: 1, total: 2, utilization: 50 },
  { project: "Mobile Banking App", department: "QA", allocated: 2, total: 3, utilization: 67 },
  { project: "AI Analytics Dashboard", department: "Engineering", allocated: 3, total: 5, utilization: 60 },
  { project: "AI Analytics Dashboard", department: "Data Science", allocated: 2, total: 3, utilization: 67 },
  { project: "IoT Management", department: "Engineering", allocated: 12, total: 15, utilization: 80 },
  { project: "IoT Management", department: "DevOps", allocated: 4, total: 5, utilization: 80 },
  { project: "Blockchain Wallet", department: "Engineering", allocated: 4, total: 6, utilization: 67 },
  { project: "Blockchain Wallet", department: "Design", allocated: 1, total: 2, utilization: 50 }
];

const projects = [...new Set(heatmapData.map(d => d.project))];
const departments = [...new Set(heatmapData.map(d => d.department))];

// 3D Cube component for heatmap
function HeatmapCube({ position, utilization, allocated, total }: { 
  position: [number, number, number], 
  utilization: number, 
  allocated: number, 
  total: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const color = useMemo(() => {
    if (utilization >= 80) return '#10b981'; // Green
    if (utilization >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }, [utilization]);

  const height = useMemo(() => {
    return (utilization / 100) * 2; // Scale height based on utilization
  }, [utilization]);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, height, 0.8]} />
      <meshStandardMaterial color={color} />
      <Text
        position={[0, height / 2 + 0.3, 0]}
        fontSize={0.15}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        {allocated}/{total}
      </Text>
    </mesh>
  );
}

export const ProjectResourceHeatmap = () => {
  const maxUtilization = Math.max(...heatmapData.map(d => d.utilization));
  const avgUtilization = Math.round(heatmapData.reduce((sum, d) => sum + d.utilization, 0) / heatmapData.length);
  const totalAllocated = heatmapData.reduce((sum, d) => sum + d.allocated, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Allocated</p>
                <p className="text-2xl font-bold text-blue-600">{totalAllocated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Utilization</p>
                <p className="text-2xl font-bold text-purple-600">{avgUtilization}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Max Utilization</p>
                <p className="text-2xl font-bold text-emerald-600">{maxUtilization}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Projects</p>
                <p className="text-2xl font-bold text-cyan-600">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3D Heatmap */}
      <Card className="enterprise-glass">
        <CardHeader>
          <CardTitle className="enterprise-title">3D Project vs Resource Allocation Heatmap</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Height represents utilization percentage. Green = High (80%+), Orange = Medium (60-79%), Red = Low (&lt;60%)
          </p>
        </CardHeader>
        <CardContent>
          <div className="three-container">
            <Canvas camera={{ position: [10, 8, 10], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              
              {heatmapData.map((item, index) => {
                const xIndex = projects.indexOf(item.project);
                const zIndex = departments.indexOf(item.department);
                return (
                  <HeatmapCube
                    key={index}
                    position={[xIndex * 2 - 4, 0, zIndex * 2 - 2]}
                    utilization={item.utilization}
                    allocated={item.allocated}
                    total={item.total}
                  />
                );
              })}
              
              {/* Project Labels */}
              {projects.map((project, index) => (
                <Text
                  key={`project-${index}`}
                  position={[index * 2 - 4, -1, -4]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  fontSize={0.2}
                  color="#374151"
                  anchorX="center"
                  anchorY="middle"
                >
                  {project.split(' ')[0]} {/* First word only for space */}
                </Text>
              ))}
              
              {/* Department Labels */}
              {departments.map((dept, index) => (
                <Text
                  key={`dept-${index}`}
                  position={[-6, -1, index * 2 - 2]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  fontSize={0.2}
                  color="#374151"
                  anchorX="center"
                  anchorY="middle"
                >
                  {dept}
                </Text>
              ))}
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Allocation Table */}
      <Card className="enterprise-glass">
        <CardHeader>
          <CardTitle className="enterprise-title">Project Resource Allocation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <h4 className="font-semibold enterprise-title text-lg mb-3">{project}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heatmapData
                    .filter(item => item.project === project)
                    .map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded border">
                        <div>
                          <p className="font-medium">{item.department}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.allocated} of {item.total} allocated
                          </p>
                        </div>
                        <Badge 
                          variant={
                            item.utilization >= 80 ? "default" : 
                            item.utilization >= 60 ? "secondary" : "destructive"
                          }
                        >
                          {item.utilization}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
