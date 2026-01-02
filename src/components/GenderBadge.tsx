import type { Gender } from '../types';

interface GenderBadgeProps {
    gender: Gender;
}

export const GenderBadge = ({ gender }: GenderBadgeProps) => {
    const styles = {
        Male: 'bg-red-50 text-red-500',
        Female: 'bg-blue-50 text-blue-500',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[gender]}`}>
            {gender}
        </span>
    );
};
