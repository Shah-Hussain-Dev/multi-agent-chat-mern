import React, { useState } from 'react';
import { Code2, Check, Copy, Terminal, BookOpen } from 'lucide-react';

interface CodeSnippet {
    id: string;
    lang: string;
    filename: string;
    code: string;
}

const SNIPPETS: CodeSnippet[] = [
    {
        id: 'ts',
        lang: 'TypeScript SDK',
        filename: 'swarm-deploy.ts',
        code: `import { AgentrixClient, SwarmGraph } from '@agentrix/sdk';

// Initialize Agentrix Client
const client = new AgentrixClient({
    apiKey: process.env.AGENTRIX_API_KEY,
    cluster: 'eu-central-1'
});

// Construct Multi-Agent Graph
const swarm = new SwarmGraph({
    router: 'langgraph-fast',
    agents: ['coder', 'web_researcher', 'security_sentinel'],
    memory: { redisState: true, vectorStore: 'pinecone' }
});

// Dispatch Autonomous Swarm Task
const stream = await client.swarms.execute({
    swarm,
    prompt: "Design & verify a resilient multi-tenant authentication microservice.",
    onArtifact: (artifact) => console.log('Live UI Artifact:', artifact)
});`
    },
    {
        id: 'python',
        lang: 'Python SDK',
        filename: 'swarm_cluster.py',
        code: `from agentrix import AgentrixSwarm, AgentNode
import os

# Initialize Swarm Instance
swarm = AgentrixSwarm(api_key=os.getenv("AGENTRIX_API_KEY"))

# Register Agent Swarm Mesh
swarm.add_nodes([
    AgentNode("router", model="gpt-4o-mini", role="intent_router"),
    AgentNode("coder", model="claude-3-5-sonnet", role="react_builder"),
    AgentNode("tester", model="agentrix-sentinel-v2", role="security_audit")
])

# Stream Graph Execution Events
async for event in swarm.stream_task("Audit Express JWT auth middleware"):
    if event.type == "ARTIFACT_RENDER":
        print(f"New Artifact Created: {event.artifact.title}")`
    },
    {
        id: 'curl',
        lang: 'cURL REST API',
        filename: 'request.sh',
        code: `curl -X POST https://api.agentrix.ai/v2/swarms/execute \\
  -H "Authorization: Bearer $AGENTRIX_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Synthesize competitor market research report",
    "graph_topology": ["router", "researcher", "synthesizer"],
    "stream_artifacts": true
  }'`
    }
];

export const CodeSdkSection: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('ts');
    const [copied, setCopied] = useState(false);
    const activeSnippet = SNIPPETS.find(s => s.id === selectedTab) || SNIPPETS[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(activeSnippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="sdk" className="py-20 md:py-28 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Info Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                            <Code2 className="w-3.5 h-3.5" />
                            Developer Experience
                        </div>

                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Deploy Swarms in 5 Lines of Code
                        </h2>

                        <p className="text-zinc-400 text-base leading-relaxed">
                            Integrate autonomous multi-agent graphs into your existing stack using our TypeScript SDK, Python SDK, or native REST endpoints.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                                <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />
                                <div className="text-xs font-mono text-zinc-200 flex-1 truncate">
                                    npm install @agentrix/sdk
                                </div>
                                <span className="text-[10px] text-zinc-500 uppercase font-mono">Package</span>
                            </div>

                            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                                <BookOpen className="w-5 h-5 text-teal-400 shrink-0" />
                                <div className="text-xs text-zinc-300">
                                    Comprehensive OpenAPI specs &amp; interactive API playground.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Snippet Editor Column */}
                    <div className="lg:col-span-7 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
                        
                        {/* Tab Switcher */}
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                                {SNIPPETS.map((snippet) => (
                                    <button
                                        key={snippet.id}
                                        onClick={() => setSelectedTab(snippet.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            selectedTab === snippet.id
                                                ? 'bg-zinc-800 text-emerald-400 shadow-md'
                                                : 'text-zinc-400 hover:text-white'
                                        }`}
                                    >
                                        {snippet.lang}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleCopy}
                                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-emerald-400">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy Code</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Code Display */}
                        <div className="relative font-mono text-xs p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-200 overflow-x-auto leading-relaxed max-h-96">
                            <span className="text-[10px] text-zinc-600 block mb-2 font-mono">
                                // {activeSnippet.filename}
                            </span>
                            <pre>
                                <code>{activeSnippet.code}</code>
                            </pre>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default CodeSdkSection;
