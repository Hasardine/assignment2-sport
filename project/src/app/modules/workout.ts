import { Exercise } from './exercise';

export class Workout {
    _id?: string;
    name: string;
    exercisesList: Array<Exercise>
}