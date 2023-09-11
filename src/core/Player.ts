export default class Player {
    constructor(id: string = '', name: string | null, username: string, email: string | null, photo?: string | null, friends: string[] = [], games: string[] = []) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._email = email;
        this._photo = photo;
        this._friends = friends;
        this._games = games;
    }

    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _name: string | null;

    get name(): string {
        return <string>this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _username: string;

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    private _email: string | null;

    get email(): string {
        return <string>this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    private _photo: string | null | undefined;

    get photo(): string {
        return <string>this._photo;
    }

    set photo(value: string) {
        this._photo = value;
    }

    private _friends: string[];

    get friends(): string[] {
        return this._friends;
    }

    set friends(value: string[]) {
        this._friends = value;
    }

    private _games: string[];

    get games(): string[] {
        return this._games;
    }

    set games(value: string[]) {
        this._games = value;
    }

    static fromJSON(json: any): Player {
        return new Player(json.id, json.name, json.username, json.email, json.photo, json.friends, json.games);
    }

    toJSON(): any {
        return {
            _id: this.id,
            name: this.name,
            username: this.username,
            email: this.email,
            photo: this.photo,
            friends: this.friends,
            games: this.games
        }
    }
}