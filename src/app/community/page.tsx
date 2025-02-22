"use client";
import React, { useState } from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/footer';
import { Users, MessageSquare, Star, ThumbsUp, Share2, Newspaper, PenTool, Image as ImageIcon, Link2 } from 'lucide-react';

interface BlogPost {
 title: string;
 author: string;
 date: string;
 category: string;
 likes: number;
 comments: number;
}

interface CommunitySection {
 icon: React.ElementType;
 title: string;
 description: string;
 count: number;
 color: string;
}

const CommunityPage = () => {
 const [activeTab, setActiveTab] = useState('community');
 const [blog, setBlog] = useState({
   title: '',
   content: '',
   category: '',
   tags: ''
 });

 const sections: CommunitySection[] = [
   {
     icon: Newspaper,
     title: "Technical Blogs",
     description: "Share your knowledge and experiences through detailed technical articles",
     count: 450,
     color: "from-blue-500 to-blue-600"
   },
   {
     icon: MessageSquare,
     title: "Discussion Forums",
     description: "Engage in discussions about programming, tech trends, and challenges",
     count: 1200,
     color: "from-purple-500 to-purple-600"
   },
   {
     icon: Users,
     title: "Study Groups",
     description: "Join or create study groups for collaborative learning",
     count: 85,
     color: "from-green-500 to-green-600"
   },
   {
     icon: Star,
     title: "Project Showcase",
     description: "Showcase your projects and get feedback from peers",
     count: 320,
     color: "from-orange-500 to-orange-600"
   }
 ];

 const recentBlogs: BlogPost[] = [
   {
     title: "Understanding System Design: A Beginner's Guide",
     author: "Rahul Kumar",
     date: "2024-02-08",
     category: "System Design",
     likes: 234,
     comments: 45
   },
   {
     title: "Best Practices for React Performance Optimization",
     author: "Priya Singh",
     date: "2024-02-07",
     category: "Web Development",
     likes: 189,
     comments: 32
   },
   {
     title: "Introduction to Machine Learning Algorithms",
     author: "Alex Johnson",
     date: "2024-02-06",
     category: "Machine Learning",
     likes: 312,
     comments: 56
   }
 ];

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   console.log('Blog submitted:', blog);
   // Add your submission logic here
 };

 return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     <Navbar />
     
     <div className="pt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
         <div className="text-center">
           <h1 className="text-4xl md:text-5xl font-bold mb-6">
             Join Our Community
           </h1>
           <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
             Connect, share, and grow with fellow developers
           </p>
           <div className="flex flex-wrap justify-center gap-8 text-gray-300">
             <div className="flex items-center">
               <Users className="h-5 w-5 mr-2" />
               <span>5000+ Members</span>
             </div>
             <div className="flex items-center">
               <MessageSquare className="h-5 w-5 mr-2" />
               <span>Active Discussions</span>
             </div>
             <div className="flex items-center">
               <PenTool className="h-5 w-5 mr-2" />
               <span>450+ Blogs</span>
             </div>
           </div>
         </div>
       </div>
     </div>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <div className="flex space-x-4 mb-8">
         <button
           onClick={() => setActiveTab('community')}
           className={`px-6 py-3 rounded-lg font-medium transition-colors ${
             activeTab === 'community'
               ? 'bg-blue-600 text-white'
               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
           }`}
         >
           Community
         </button>
         <button
           onClick={() => setActiveTab('write')}
           className={`px-6 py-3 rounded-lg font-medium transition-colors ${
             activeTab === 'write'
               ? 'bg-blue-600 text-white'
               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
           }`}
         >
           Write Blog
         </button>
       </div>

       {activeTab === 'community' ? (
         <>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
             {sections.map((section) => {
               const Icon = section.icon;
               return (
                 <div 
                   key={section.title}
                   className="group relative transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl opacity-50 blur group-hover:opacity-60 transition-opacity duration-300"></div>
                   <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${section.color} mb-4`}>
                       <Icon className="h-6 w-6 text-white" />
                     </div>
                     <h3 className="text-xl font-semibold mb-2 dark:text-white">{section.title}</h3>
                     <p className="text-gray-600 dark:text-gray-300 mb-4">{section.description}</p>
                     <span className="text-gray-500 dark:text-gray-400">{section.count} active now</span>
                   </div>
                 </div>
               );
             })}
           </div>

           <div className="mb-8">
             <h2 className="text-2xl font-bold mb-6 dark:text-white">Recent Blog Posts</h2>
             <div className="grid grid-cols-1 gap-6">
               {recentBlogs.map((blog) => (
                 <div 
                   key={blog.title}
                   className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                 >
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h3 className="text-xl font-semibold mb-2 dark:text-white">{blog.title}</h3>
                       <p className="text-gray-600 dark:text-gray-400 text-sm">
                         By {blog.author} Â· {new Date(blog.date).toLocaleDateString()}
                       </p>
                     </div>
                     <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                       {blog.category}
                     </span>
                   </div>
                   <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                     <div className="flex items-center">
                       <ThumbsUp className="h-4 w-4 mr-1" />
                       {blog.likes}
                     </div>
                     <div className="flex items-center">
                       <MessageSquare className="h-4 w-4 mr-1" />
                       {blog.comments}
                     </div>
                     <button className="ml-auto flex items-center hover:text-blue-600 dark:hover:text-blue-400">
                       <Share2 className="h-4 w-4 mr-1" />
                       Share
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </>
       ) : (
         <div className="max-w-4xl mx-auto">
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
             <h2 className="text-2xl font-bold mb-8 dark:text-white">Write a Blog</h2>
             
             <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                 <input
                   type="text"
                   placeholder="Blog Title"
                   className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                   value={blog.title}
                   onChange={(e) => setBlog({...blog, title: e.target.value})}
                 />
               </div>

               <div>
                 <select 
                   className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                   value={blog.category}
                   onChange={(e) => setBlog({...blog, category: e.target.value})}
                 >
                   <option value="">Select Category</option>
                   <option value="web-development">Web Development</option>
                   <option value="data-structures">Data Structures</option>
                   <option value="algorithms">Algorithms</option>
                   <option value="system-design">System Design</option>
                   <option value="machine-learning">Machine Learning</option>
                 </select>
               </div>

               <div className="flex space-x-4">
                 <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                   <ImageIcon className="h-5 w-5 mr-2" />
                   Add Image
                 </button>
                 <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                   <Link2 className="h-5 w-5 mr-2" />
                   Add Link
                 </button>
               </div>

               <div>
                 <textarea
                   rows={15}
                   placeholder="Write your blog content here..."
                   className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                   value={blog.content}
                   onChange={(e) => setBlog({...blog, content: e.target.value})}
                 />
               </div>

               <div>
                 <input
                   type="text"
                   placeholder="Add tags (comma separated)"
                   className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                   value={blog.tags}
                   onChange={(e) => setBlog({...blog, tags: e.target.value})}
                 />
               </div>

               <div className="flex justify-end space-x-4">
                 <button
                   type="button"
                   className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                 >
                   Save Draft
                 </button>
                 <button
                   type="submit"
                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800"
                 >
                   Publish Blog
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}
     </div>
     
     <Footer />
   </div>
 );
};

export default CommunityPage;