import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Plus,
    MessageSquare,
    PanelLeft,
    SquarePen,
    Search,
    LogOut,
    Home,
    Loader2,
    Trash2
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { clearUser } from '../../redux/userSlice';
import showToast from '../../utils/toast';
import {
    fetchConversations,
    createNewConversation,
    deleteConversationApi,
    type ConversationItem
} from '../../features/chat';
import { logoutUser } from '../../features/user';
import { setConversations, addConversation, setSelectedConversation, deleteConversationFromList } from '../../redux/conversationSlice';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isCollapsed,
    setIsCollapsed
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);
    const appName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || "Agentrix";

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const { conversations, selectedConversation } = useAppSelector((state) => state.conversations);

    // Load conversations from API on mount
    const loadConversations = async () => {
        setIsLoading(true);
        try {
            const data: ConversationItem[] = await fetchConversations();
            dispatch(setConversations(data));
            if (data.length > 0 && !selectedConversation) {
                dispatch(setSelectedConversation(data[0]));
            }
        } catch (err) {
            console.error("Error loading conversations in sidebar:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadConversations();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error("Error logging out:", err);
        }
        dispatch(clearUser());
        dispatch(setConversations([]));
        dispatch(setSelectedConversation(null));
        showToast.success("Signed Out", "Successfully logged out of your session.");
        navigate('/');
    };

    // Handle Create New Conversation via API
    const handleNewChat = async () => {
        setIsCreating(true);
        try {
            const newConv: ConversationItem | null = await createNewConversation();
            if (newConv) {
                dispatch(addConversation(newConv));
                dispatch(setSelectedConversation(newConv));
                showToast.success("New Conversation", "Chat thread created.");
            } else {
                showToast.error("Error", "Could not create new conversation thread.");
            }
        } catch (err) {
            console.error("Error creating conversation in sidebar:", err);
        } finally {
            setIsCreating(false);
        }
    };

    // Handle Delete Conversation via API
    const handleDeleteConversation = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        try {
            const success = await deleteConversationApi(id);
            if (success) {
                dispatch(deleteConversationFromList(id));
                showToast.success("Deleted", "Conversation thread deleted.");
            } else {
                showToast.error("Error", "Failed to delete conversation.");
            }
        } catch (err) {
            console.error("Error deleting conversation:", err);
            showToast.error("Error", "An unexpected error occurred.");
        }
    };

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 64 : 260 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="relative h-full bg-[#0c0e13] border-r border-white/[0.07] flex flex-col justify-between shrink-0 select-none overflow-hidden z-30"
        >
            {/* Top Bar Header */}
            <div className="p-3 space-y-3">
                {/* Header Row: Toggle Icon, Brand Name, Plan Badge, New Chat Icon */}
                <div className="flex items-center justify-between h-9 px-1">
                    <div className="flex items-center gap-2.5 truncate">
                        <button
                            onClick={() => setIsCollapsed(prev => !prev)}
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer shrink-0"
                        >
                            <PanelLeft className="w-5 h-5 text-zinc-300" />
                        </button>

                        {!isCollapsed && (
                            <Link to="/" className="flex items-center gap-2 truncate group">
                                <span className="text-base font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors truncate">
                                    {appName}
                                </span>
                                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 shrink-0">
                                    v2.0
                                </span>
                            </Link>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button
                            onClick={handleNewChat}
                            disabled={isCreating}
                            title="New Chat"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                        >
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin text-emerald-400" /> : <SquarePen className="w-4 h-4 text-zinc-300" />}
                        </button>
                    )}
                </div>

                {/* Primary + New Chat Button with Home Page Gradient Theme */}
                {!isCollapsed ? (
                    <button
                        onClick={handleNewChat}
                        disabled={isCreating}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                        {isCreating ? (
                            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        ) : (
                            <Plus className="w-4 h-4 stroke-[3]" />
                        )}
                        <span>{isCreating ? "Creating..." : "New Chat"}</span>
                    </button>
                ) : (
                    <button
                        onClick={handleNewChat}
                        disabled={isCreating}
                        title="New Chat"
                        className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-zinc-950 font-extrabold flex items-center justify-center shadow-lg cursor-pointer disabled:opacity-50"
                    >
                        {isCreating ? (
                            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                        ) : (
                            <Plus className="w-4 h-4 stroke-[3]" />
                        )}
                    </button>
                )}

                {/* Search Bar when expanded */}
                {!isCollapsed && (
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search chats..."
                            className="w-full pl-8 pr-3 py-1.5 bg-zinc-900/90 border border-white/5 focus:border-emerald-500/40 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 outline-none transition-colors"
                        />
                    </div>
                )}
            </div>

            {/* Chat History Section */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {!isCollapsed ? (
                    <>
                        <div className="px-2 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                            <span>Recent Conversations</span>
                            {isLoading && <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />}
                        </div>

                        {conversations.length === 0 && !isLoading ? (
                            <div className="px-2 py-6 text-[11px] text-zinc-600 font-mono text-center">
                                NO RECENT CONVERSATIONS
                            </div>
                        ) : (
                            conversations
                                .filter(t => (t.title || 'Untitled Chat').toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((t) => {
                                    const isActive = selectedConversation?._id === t._id;
                                    return (
                                        <div
                                            key={t._id}
                                            onClick={() => dispatch(setSelectedConversation(t))}
                                            className={`group relative p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-all ${isActive
                                                ? 'bg-zinc-900 border border-emerald-500/40 text-white shadow-md'
                                                : 'hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5 truncate pr-2">
                                                <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                                                <div className="truncate font-medium">
                                                    {t.title || 'Untitled Chat'}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDeleteConversation(e, t._id)}
                                                title="Delete conversation"
                                                className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shrink-0"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    );
                                })
                        )}
                    </>
                ) : (
                    /* Collapsed Icon-Only Thread Indicators */
                    <div className="flex flex-col items-center space-y-2 py-2">
                        {conversations.slice(0, 5).map((t) => (
                            <button
                                key={t._id}
                                onClick={() => dispatch(setSelectedConversation(t))}
                                title={t.title || 'Untitled Chat'}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${selectedConversation?._id === t._id
                                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom User Profile Section */}
            <div className="p-3 border-t border-white/[0.07] bg-[#090b0e]">
                {!isCollapsed ? (
                    <div className="p-2 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 truncate">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shrink-0">
                                <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center font-bold text-xs text-emerald-400 uppercase">
                                    {(user?.name || user?.email || 'U')[0]}
                                </div>
                            </div>
                            <div className="truncate text-xs">
                                <div className="font-bold text-white truncate">{user?.name || 'Developer'}</div>
                                <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span>Free Plan</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Link
                                to="/"
                                title="Landing Page"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                                <Home className="w-3.5 h-3.5" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                title="Sign Out"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Collapsed Icon-Only User Footer */
                    <div className="flex flex-col items-center gap-2">
                        <div
                            title={user?.name || user?.email || "User Profile"}
                            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] cursor-pointer"
                        >
                            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-emerald-400 uppercase">
                                {(user?.name || user?.email || 'U')[0]}
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Sign Out"
                            className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

        </motion.aside>
    );
};

export default Sidebar;