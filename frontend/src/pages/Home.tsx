import React, { useEffect } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { SwarmPlayground } from '../components/landing/SwarmPlayground';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { ArchitectureSection } from '../components/landing/ArchitectureSection';
import { CodeSdkSection } from '../components/landing/CodeSdkSection';
import { MetricsSection } from '../components/landing/MetricsSection';
import { PricingSection } from '../components/landing/PricingSection';
import { FaqSection } from '../components/landing/FaqSection';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';

import { getCurrentUser } from '../features/user';
import { useAppDispatch } from '../redux/store';
import { setUser } from '../redux/userSlice';

export const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                if (data) {
                    dispatch(setUser(data));
                }
            } catch (err) {
                // Silent fail if unauthenticated on public landing page
            }
        };
        fetchUser();
    }, [dispatch]);

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden">
            {/* Navigation Header */}
            <Navbar />

            {/* Main Product Landing Sections */}
            <main>
                <HeroSection />
                <SwarmPlayground />
                <FeaturesGrid />
                <ArchitectureSection />
                <CodeSdkSection />
                <MetricsSection />
                <PricingSection />
                <FaqSection />
                <CtaBanner />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;