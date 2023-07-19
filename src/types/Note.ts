export interface NoteType {
    heading: string;
    body: string;
    tags: string[];
    priority: NotePriority;
    color: NoteColors;
    pinned: boolean;
    created: string;
    _id: string;
}

export type NoteColors = "default" | "red" | "yellow" | "green" | "blue";
export type NotePriority = "High" | "Medium" | "Low";
