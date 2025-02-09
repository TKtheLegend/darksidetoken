import { ReactNode } from 'react';

interface QuestItemProps {
  number: number;
  title: string;
  description: string;
  children: ReactNode;
  completedCount: number;
  totalCount: number;
  isCompleted: boolean;
}

export function QuestItem({
  number,
  title,
  description,
  children,
  completedCount,
  totalCount,
  isCompleted
}: QuestItemProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/30 [animation:pulse-glow-box_3s_ease-in-out_infinite] hover:[animation:pulse-glow-box_2s_ease-in-out_infinite] hover:bg-white/[0.05] transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
          <span className="text-sm">{number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-white/60 mt-1">{description}</p>
          <div className="flex gap-4 mt-4">
            {children}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${isCompleted ? 'text-green-400' : 'text-white/40'}`}>
            {completedCount}/{totalCount}
          </span>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
            isCompleted 
              ? 'border-green-400 text-green-400'
              : 'border-white/20 text-white/40'
          }`}>
            <span>✓</span>
          </div>
        </div>
      </div>
    </div>
  );
} 