export type Class = {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    currentCoach: number;
    originalCoach: number
};

export type ClassListDisplay = {
    name: string;
    startTime: string;
    endTime: string;
    currentCoachName: string;
}