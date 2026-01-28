// ...existing code...
import { HiUserCircle, HiLogout } from 'react-icons/hi';
import { cn } from '../../lib/utils';

export const UserProfile = ({ user }) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full space-y-4 rounded-2xl border',
        'border-white/10 bg-white/5 p-4 backdrop-blur-md',
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={cn(
            'rounded-xl border border-indigo-500/30 bg-indigo-500/20',
            'p-2 text-indigo-400',
          )}
        >
          <HiUserCircle size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-sm leading-tight font-bold text-white">
            {user?.name} {user?.surname}
          </h3>
          <p className="text-xs text-slate-400">@{user?.username}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {user?.roles?.map((role) => (
          <span
            key={role}
            className={cn(
              'rounded-lg border border-indigo-500/10 bg-indigo-500/20',
              'px-2 py-0.5 text-[10px] font-semibold text-indigo-400',
            )}
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};
