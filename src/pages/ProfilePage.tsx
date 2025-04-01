
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Settings, BookOpen, BrainCircuit, Calculator, PenLine, BarChart4, Download, Edit, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// Mock data for the profile
const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  role: "ML Engineer",
  joinDate: new Date("2023-06-15"),
  activities: [
    { id: 1, type: "interview", title: "ML Engineer Interview", score: 82, date: new Date("2023-10-10") },
    { id: 2, type: "interview", title: "Data Scientist Interview", score: 76, date: new Date("2023-09-28") },
    { id: 3, type: "math", title: "Linear Algebra Problems", date: new Date("2023-10-05") },
    { id: 4, type: "note", title: "ML Algorithms Notes", date: new Date("2023-10-01") },
    { id: 5, type: "interview", title: "AI Researcher Interview", score: 88, date: new Date("2023-09-15") },
  ],
  stats: {
    interviews: 8,
    mathProblems: 42,
    notes: 15,
    averageScore: 82,
  },
  skills: [
    { name: "Machine Learning", level: 85 },
    { name: "Data Analysis", level: 78 },
    { name: "Python", level: 92 },
    { name: "Neural Networks", level: 70 },
    { name: "Statistics", level: 82 },
  ],
};

const ProfilePage = () => {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="flex flex-col space-y-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10">
                <img
                  src={mockUserData.profileImage}
                  alt={mockUserData.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md invisible group-hover:visible transition-all">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{mockUserData.name}</h1>
              <p className="text-muted-foreground">{mockUserData.email}</p>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {mockUserData.role}
                </span>
                <span className="text-sm text-muted-foreground">
                  Member since {mockUserData.joinDate.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 md:w-[400px] mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <BarChart4 className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <BrainCircuit className="h-4 w-4" />
              <span>Skills</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="col-span-4 md:col-span-1"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stats Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <BrainCircuit className="h-4 w-4 mr-2 text-primary" />
                          Interviews
                        </span>
                        <span className="font-medium">{mockUserData.stats.interviews}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Calculator className="h-4 w-4 mr-2 text-primary" />
                          Math Problems
                        </span>
                        <span className="font-medium">{mockUserData.stats.mathProblems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <PenLine className="h-4 w-4 mr-2 text-primary" />
                          Notes
                        </span>
                        <span className="font-medium">{mockUserData.stats.notes}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <BarChart4 className="h-4 w-4 mr-2 text-primary" />
                          Average Score
                        </span>
                        <span className="font-medium">{mockUserData.stats.averageScore}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-4 md:col-span-3"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUserData.activities.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-2 hover:bg-muted rounded-md transition-colors">
                          <div className="flex-shrink-0">
                            {activity.type === "interview" ? (
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <BrainCircuit className="h-5 w-5 text-primary" />
                              </div>
                            ) : activity.type === "math" ? (
                              <div className="h-10 w-10 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                                <Calculator className="h-5 w-5 text-brand-cyan" />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                <PenLine className="h-5 w-5 text-brand-orange" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.date.toLocaleDateString()}
                            </p>
                          </div>
                          {activity.score && (
                            <div className="flex-shrink-0">
                              <div className="text-sm font-medium p-1.5 rounded-md bg-muted">
                                Score: {activity.score}%
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skill Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {mockUserData.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span>{skill.name}</span>
                            <span className="font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <div className="h-32 w-32 relative">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="10"
                            strokeDasharray="283"
                            strokeDashoffset="56.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl font-bold">80%</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Overall Skill Level</h3>
                        <p className="text-sm text-muted-foreground">Based on your activities and assessments</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <BrainCircuit className="h-4 w-4" />
                        <span>Take Skill Assessment</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <BrainCircuit className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-medium mb-1">Advanced ML Interview</h3>
                      <p className="text-sm text-muted-foreground">Practice advanced machine learning concepts in a simulated interview.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <Calculator className="h-8 w-8 text-brand-cyan mb-3" />
                      <h3 className="font-medium mb-1">Statistics Problems</h3>
                      <p className="text-sm text-muted-foreground">Challenge yourself with statistical problems common in ML interviews.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <BookOpen className="h-8 w-8 text-brand-orange mb-3" />
                      <h3 className="font-medium mb-1">Neural Network Guide</h3>
                      <p className="text-sm text-muted-foreground">Review this comprehensive guide on neural network architectures.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Activity tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">A detailed view of your learning activities and performance over time.</p>
                
                <div className="text-center py-12">
                  <BarChart4 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Activity charts and visualizations</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This page will display charts and statistics about your usage of the platform over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Monitor your progress and development across different technical skills.</p>
                
                <div className="text-center py-12">
                  <BrainCircuit className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Skills development tracking</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This page will show detailed skill breakdowns, growth over time, and recommendations for improvement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm">Full Name</label>
                      <input type="text" value={mockUserData.name} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Email</label>
                      <input type="email" value={mockUserData.email} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Professional Title</label>
                      <input type="text" value={mockUserData.role} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Location</label>
                      <input type="text" value="San Francisco, CA" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <label className="text-sm">Email Notifications</label>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <label className="text-sm">Push Notifications</label>
                      </div>
                      <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <label className="text-sm">Weekly Summary</label>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">App Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Dark Mode</label>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Enable Animations</label>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Show Performance Metrics</label>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data & Privacy</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full sm:w-auto flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Your Data</span>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      You can download all of your data, including interview recordings, notes, and performance metrics.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
