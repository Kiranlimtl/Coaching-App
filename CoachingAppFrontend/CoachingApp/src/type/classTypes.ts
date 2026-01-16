export type Class = {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    duration: {
        hours: number;
        minutes: number;
    }
    currentCoach: number;
    originalCoach: number;
    createdAt: string;
    updatedAt: string;
};

export type ClassListDisplay = {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    duration: {
        hours: number;
        minutes: number;
    }
    currentCoachName: string;
    isClassOver: boolean;
}