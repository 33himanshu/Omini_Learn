
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FolderPlus, Search, X, Pencil, PenLine, Save, Trash2, AlignLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the notes
const mockNotes = [
  {
    id: "1",
    title: "Machine Learning Basics",
    content: "# Machine Learning Fundamentals\n\n## Supervised Learning\n- Classification: predict a categorical response\n- Regression: predict a continuous response\n\n## Unsupervised Learning\n- Clustering\n- Dimensionality Reduction\n\n## Key Concepts\n- Training data vs. test data\n- Overfitting vs. underfitting\n- Feature engineering",
    category: "ML",
    createdAt: new Date("2023-09-10"),
  },
  {
    id: "2",
    title: "Neural Network Architectures",
    content: "# Neural Network Types\n\n## Feedforward Neural Networks\n- Most basic type\n- Data flows in one direction\n\n## Convolutional Neural Networks (CNNs)\n- Ideal for image processing\n- Uses convolution operation\n\n## Recurrent Neural Networks (RNNs)\n- Good for sequential data\n- LSTM and GRU variants",
    category: "ML",
    createdAt: new Date("2023-09-15"),
  },
  {
    id: "3",
    title: "Interview Questions: Classification",
    content: "# Common Classification Interview Questions\n\n1. Explain the difference between precision and recall.\n2. What is ROC curve and how do you interpret it?\n3. How would you handle class imbalance in a dataset?\n4. Explain the bias-variance tradeoff.\n5. When would you use logistic regression vs random forest?",
    category: "Interviews",
    createdAt: new Date("2023-10-01"),
  },
];

// Note categories
const categories = [
  { id: "ML", name: "Machine Learning", color: "from-brand-purple to-brand-blue" },
  { id: "Interviews", name: "Interview Prep", color: "from-brand-pink to-brand-purple" },
  { id: "Algorithms", name: "Algorithms", color: "from-brand-blue to-brand-cyan" },
  { id: "Projects", name: "Projects", color: "from-brand-orange to-brand-yellow" },
];

const NotesOrganizerPage = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<typeof mockNotes[0] | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter notes based on search term and active category
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <motion.h1 
              className="text-3xl font-display font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Notes Organizer
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Organize your learning materials with markdown support
            </motion.p>
          </div>
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" className="flex items-center space-x-2">
              <FolderPlus className="h-4 w-4" />
              <span>New Category</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>New Note</span>
            </Button>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories and notes list */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search notes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="all">All Notes</TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="m-0">
                    <div className="space-y-2 h-[500px] overflow-y-auto pr-2">
                      {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                          <div
                            key={note.id}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedNote?.id === note.id
                                ? "bg-primary/10"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => {
                              setSelectedNote(note);
                              setEditMode(false);
                            }}
                          >
                            <h3 className="font-medium truncate">{note.title}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-muted-foreground">
                                {note.createdAt.toLocaleDateString()}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${
                                  categories.find(c => c.id === note.category)?.color
                                }`}
                              >
                                {categories.find(c => c.id === note.category)?.name}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                          <AlignLeft className="h-12 w-12 mb-4" />
                          <p>No notes found</p>
                          <p className="text-sm">Try adjusting your search or create a new note</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="m-0">
                      <div className="space-y-2 h-[500px] overflow-y-auto pr-2">
                        {filteredNotes.length > 0 ? (
                          filteredNotes.map((note) => (
                            <div
                              key={note.id}
                              className={`p-3 rounded-md cursor-pointer transition-colors ${
                                selectedNote?.id === note.id
                                  ? "bg-primary/10"
                                  : "hover:bg-muted"
                              }`}
                              onClick={() => {
                                setSelectedNote(note);
                                setEditMode(false);
                              }}
                            >
                              <h3 className="font-medium truncate">{note.title}</h3>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {note.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <AlignLeft className="h-12 w-12 mb-4" />
                            <p>No notes in this category</p>
                            <Button variant="outline" className="mt-4">
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Create Note
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Note editor */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full">
              {selectedNote ? (
                <>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>
                        {editMode ? (
                          <Input
                            defaultValue={selectedNote.title}
                            className="font-bold text-lg"
                          />
                        ) : (
                          selectedNote.title
                        )}
                      </CardTitle>
                      <CardDescription>
                        {categories.find(c => c.id === selectedNote.category)?.name} •{" "}
                        {selectedNote.createdAt.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {editMode ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setEditMode(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon"
                            onClick={() => setEditMode(false)}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => {}}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setEditMode(true)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <textarea
                        defaultValue={selectedNote.content}
                        className="w-full h-[500px] p-3 rounded-md border resize-none bg-background"
                      />
                    ) : (
                      <div className="prose max-w-none dark:prose-invert h-[500px] overflow-y-auto pr-2">
                        <pre className="whitespace-pre-wrap font-sans">{selectedNote.content}</pre>
                      </div>
                    )}
                  </CardContent>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[600px] text-center text-muted-foreground p-6">
                  <PenLine className="h-16 w-16 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No note selected</h3>
                  <p>Select a note from the list or create a new one</p>
                  <Button className="mt-6">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Note
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <PenLine className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Markdown Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Format your notes with markdown for better readability and organization
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FolderPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Categorize & Tag</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize notes into categories and add tags for easy filtering and searching
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Advanced Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Quickly find notes with our powerful search functionality across all content
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotesOrganizerPage;
