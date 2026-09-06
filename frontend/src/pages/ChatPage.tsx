import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/chat/Sidebar';
import ChatSection from '../components/chat/ChatSection';
import ArtifactsSection from '../components/chat/ArtifactsSection';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { getCurrentUser } from '../features/user';
import { setUser } from '../redux/userSlice';

export const ChatPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector((state) => state.user);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [showArtifacts, setShowArtifacts] = useState(false);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            if (!isAuthenticated || !user) {
                try {
                    const currentUser = await getCurrentUser();
                    if (currentUser) {
                        dispatch(setUser(currentUser));
                    } else {
                        navigate('/auth', { replace: true });
                    }
                } catch (err) {
                    navigate('/auth', { replace: true });
                }
            }
        };
        checkUser();
    }, [isAuthenticated, user, dispatch, navigate]);

    return (
        <div className="flex h-screen w-screen bg-[#0a0c10] text-zinc-100 font-sans overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
            {/* ChatGPT-style Collapsible Sidebar with API Conversations */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
                activeConversationId={activeConversationId}
                onSelectConversation={(id) => setActiveConversationId(id)}
                onNewChat={(newConv) => {
                    if (newConv) {
                        setActiveConversationId(newConv._id);
                    } else {
                        setActiveConversationId(null);
                    }
                }}
            />

            {/* Main Chat Feed Area with API Message Persistence */}
            <ChatSection
                activeConversationId={activeConversationId}
                onConversationCreated={(id) => setActiveConversationId(id)}
                isSidebarCollapsed={isSidebarCollapsed}
                onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
                onToggleArtifacts={() => setShowArtifacts(prev => !prev)}
                showArtifacts={showArtifacts}
            />

            {/* Slide-over Live Code Artifact Panel */}
            {showArtifacts && (
                <ArtifactsSection onClose={() => setShowArtifacts(false)} />
            )}
        </div>
    );
};

export default ChatPage;
