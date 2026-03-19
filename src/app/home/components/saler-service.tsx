'use client';

import Image from 'next/image';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RouterIcon from '@mui/icons-material/Router';
import TimerIcon from '@mui/icons-material/Timer';
import MapIcon from '@mui/icons-material/Map';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { agentsData as defaultAgents, whyChooseItems as defaultWhyChoose, processSteps as defaultSteps } from '@/src/data/agents';

/** Hook: returns true once the element enters the viewport */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Map icon names to MUI components
const iconMap: Record<string, (className: string) => ReactNode> = {
  Timer: (cls) => <TimerIcon className={cls} />,
  SupportAgent: (cls) => <SupportAgentIcon className={cls} />,
  Router: (cls) => <RouterIcon className={cls} />,
  Map: (cls) => <MapIcon className={cls} />,
  Checklist: (cls) => <ChecklistIcon className={cls} />,
  Engineering: (cls) => <EngineeringIcon className={cls} />,
};

function getIcon(name: string, className: string): ReactNode {
  return iconMap[name]?.(className) ?? <SupportAgentIcon className={className} />;
}

interface AgentFromDB {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  closedDeal: number;
  photoUrl?: string | null;
}

interface SalerServiceProps {
  agents?: AgentFromDB[];
  whyChooseData?: { iconName: string; title: string; desc: string }[];
  processStepsData?: { num: number; iconName: string; title: string; desc: string }[];
}

export default function SalerService({ agents, whyChooseData, processStepsData }: SalerServiceProps) {
  const { ref: agentRef, inView: agentInView } = useInView(0.1);
  const { ref: whyRef, inView: whyInView } = useInView(0.1);
  const { ref: stepsRef, inView: stepsInView } = useInView(0.1);

  // Use DB data with static fallbacks
  const agentsList = agents && agents.length > 0
    ? agents.map((a) => ({
        id: a.id,
        name: a.name,
        phoneNumber: a.phoneNumber,
        role: a.role,
        closedDeal: a.closedDeal,
        photo: a.photoUrl ?? "",
      }))
    : defaultAgents;

  const whyChooseItems = whyChooseData && Array.isArray(whyChooseData) && whyChooseData.length > 0
    ? whyChooseData
    : defaultWhyChoose;

  const processStepsList = processStepsData && Array.isArray(processStepsData) && processStepsData.length > 0
    ? processStepsData
    : defaultSteps;

  return (
    <section className="flex flex-col w-full bg-white pb-16 font-sans">

      {/* ── Hero Header ── */}
      <div className="relative bg-zinc-950 pt-20 pb-40 text-white text-center shadow-inner overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(224,43,32,0.6) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 3s ease-in-out infinite',
          }}
        />
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(224,43,32,0.18) 0%, transparent 65%)' }}
        />

        <p className="relative text-sm md:text-base font-semibold tracking-widest text-[#e02b20] uppercase mb-3 animate-pulse">
          พบกับทีมผู้เชี่ยวชาญของเรา
        </p>
        <h2 className="relative text-3xl md:text-5xl font-extrabold tracking-tight">
          ทีมงานมืออาชีพ{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600"
            style={{ animation: 'textGlow 2.5s ease-in-out infinite alternate' }}>
            พร้อมให้บริการ
          </span>
        </h2>
      </div>

      {/* ── Agent Cards ── */}
      <div ref={agentRef} className="max-w-6xl mx-auto px-4 -mt-24 relative z-10 w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {agentsList.map((agent, i) => (
            <div
              key={agent.id}
              className="relative flex flex-col items-center bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] transform transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(224,43,32,0.15)] hover:border-red-100 group"
              style={{
                opacity: agentInView ? 1 : 0,
                transform: agentInView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, box-shadow 0.4s ease, border-color 0.4s ease`,
              }}
            >
              <div className="w-full h-72 md:h-80 relative bg-zinc-50 flex items-end justify-center pt-8 border-b border-gray-100">
                <Image
                  src={agent.photo || '/assets/mock/agent.png'}
                  alt={agent.name}
                  width={300}
                  height={400}
                  className="object-contain h-full w-auto drop-shadow-sm transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="w-full bg-white text-zinc-900 p-6 text-center z-20">
                <h4 className="font-extrabold text-xl tracking-tight mb-1 transition-colors duration-300 group-hover:text-zinc-800">
                  {agent.name}
                </h4>
                <p className="text-sm font-bold text-[#e02b20] mb-3">{agent.phoneNumber}</p>
                <div
                  className="h-[2px] mx-auto my-3 rounded-full"
                  style={{
                    width: '2rem',
                    background: 'linear-gradient(90deg, #e02b20, #ff6b6b, #e02b20)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmerBar 2s linear infinite',
                    transition: 'width 0.4s ease',
                  }}
                />
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{agent.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose Section ── */}
      <div ref={whyRef} className="max-w-6xl mx-auto px-4 mt-16 text-center w-full">
        <p
          className="text-sm md:text-base font-semibold tracking-widest text-[#e02b20] uppercase mb-2"
          style={{
            opacity: whyInView ? 1 : 0,
            transform: whyInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          ทำไมถึงต้องเลือกใช้บริการเรา
        </p>
        <h3
          className="text-2xl md:text-4xl font-extrabold text-zinc-900 mb-16 tracking-tight"
          style={{
            opacity: whyInView ? 1 : 0,
            transform: whyInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          เหนือกว่าด้วยคุณภาพและบริการ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {whyChooseItems.map((item: { iconName: string; title: string; desc: string }, i: number) => (
            <div
              key={i}
              className="flex flex-col items-center group"
              style={{
                opacity: whyInView ? 1 : 0,
                transform: whyInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.55s ease ${0.2 + i * 0.15}s, transform 0.55s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="text-zinc-900 mb-6 p-5 rounded-2xl bg-zinc-50 border border-gray-100 transition-all duration-300 group-hover:bg-red-50 group-hover:text-[#e02b20] group-hover:border-red-200 group-hover:shadow-[0_10px_20px_rgba(224,43,32,0.1)] group-hover:-translate-y-2">
                {getIcon(item.iconName, "!text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3")}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-3 transition-colors duration-300 group-hover:text-[#e02b20]">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-[250px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Process Steps ── */}
      <div ref={stepsRef} className="max-w-5xl mx-auto px-4 mt-32 text-center w-full pb-10">
        <p
          className="text-sm md:text-base font-semibold tracking-widest text-[#e02b20] uppercase mb-2"
          style={{
            opacity: stepsInView ? 1 : 0,
            transform: stepsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          ขั้นตอนการให้บริการ
        </p>
        <h3
          className="text-2xl md:text-4xl font-extrabold text-zinc-900 mb-20 tracking-tight"
          style={{
            opacity: stepsInView ? 1 : 0,
            transform: stepsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          สะดวก ทันใจ ใน 3 ขั้นตอน
        </h3>

        <div className="relative flex flex-col md:flex-row justify-between items-start">
          <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent -z-10"></div>

          {processStepsList.map((step: { num: number; iconName: string; title: string; desc: string }, i: number) => (
            <div
              key={step.num}
              className={`flex flex-col items-center w-full md:w-1/3 ${i < 2 ? 'mb-12 md:mb-0' : ''} relative bg-white group hover:-translate-y-2 transition-all duration-300`}
              style={{
                opacity: stepsInView ? 1 : 0,
                transform: stepsInView ? 'translateY(0) scale(1)' : 'translateY(35px) scale(0.96)',
                transition: `opacity 0.55s ease ${0.2 + i * 0.15}s, transform 0.55s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="w-10 h-10 rounded-full border border-zinc-200 bg-white text-zinc-400 flex items-center justify-center font-bold text-lg absolute top-0 left-[50%] md:left-[25%] -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:-ml-10 z-10 shadow-sm group-hover:border-[#e02b20] group-hover:text-[#e02b20] group-hover:bg-red-50 transition-all duration-300 group-hover:scale-110">
                {step.num}
              </div>
              <div className="text-zinc-800 mb-5 p-4 bg-zinc-50 rounded-2xl inline-block mt-5 md:mt-2 border border-gray-50 group-hover:shadow-[0_8px_20px_rgba(224,43,32,0.12)] group-hover:bg-red-50 group-hover:-translate-y-1 group-hover:text-[#e02b20] transition-all duration-300 group-hover:border-red-100">
                {getIcon(step.iconName, "!text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3")}
              </div>
              <h3 className="text-base font-bold text-zinc-900 mb-2 transition-colors duration-300 group-hover:text-[#e02b20]">{step.title}</h3>
              <p className="text-zinc-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes shimmerSweep {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shimmerBar {
          0%   { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes textGlow {
          from { filter: drop-shadow(0 0 4px rgba(224,43,32,0.3)); }
          to   { filter: drop-shadow(0 0 14px rgba(224,43,32,0.7)); }
        }
      `}</style>
    </section>
  );
}
