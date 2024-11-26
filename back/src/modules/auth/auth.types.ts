export interface User {
    id: number;
    nom: string;
    email: string;
    mot_de_passe: string;
    date_creation: string;
    projects: number[],
    tasks: number[]
}