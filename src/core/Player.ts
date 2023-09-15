export default class Player {
    constructor(
        id: string = '',
        name: string | null,
        username: string,
        email: string | null,
        photo?: string | null,
        friends: Record<string, any> = {},
        games: Record<string, any> = {}
    ) {
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

    get name(): string | null {
        return this._name;
    }

    set name(value: string | null) {
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

    get email(): string | null {
        return this._email;
    }

    set email(value: string | null) {
        this._email = value;
    }

    private _photo: string | null | undefined;

    get photo(): string | null | undefined {
        return this._photo;
    }

    set photo(value: string | null | undefined) {
        this._photo = value;
    }

    private _friends: Record<string, any>;

    get friends(): Record<string, any> {
        return this._friends;
    }

    set friends(value: Record<string, any>) {
        this._friends = value;
    }

    private _games: Record<string, any>;

    get games(): Record<string, any> {
        return this._games;
    }

    set games(value: Record<string, any>) {
        this._games = value;
    }

    static fromJSON(json: any): Player {
        return new Player(
            json._id,
            json.name,
            json.username,
            json.email,
            json.photo,
            json.friends,
            json.games
        );
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
        };
    }
}
