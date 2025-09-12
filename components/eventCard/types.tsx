export type TEventCard = {  
    timeRemaining : string, 
    taskTime : string, 
    title : string, 
    description : string, 
    bgColor : string,
    onEdit?: () => void;
};
