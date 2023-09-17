export default class Player {
    private _id: string;
    private _name: string | null | undefined;
    private _username: string | undefined;
    private _email: string | null | undefined;
    private _photo?: string | null;
    private _userFriends: object;
    private _userGames: object;

    constructor(
        id: string = '',
        name: string | null,
        username: string,
        email: string | null,
        photo?: string | null,
        userFriends: object = {},
        userGames: object = {}
    ) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._email = email;
        this._photo = photo;
        this._userFriends = userFriends;
        this._userGames = userGames;
    }


    get id(): string {
        return this._id;
    }

    get name(): string | null | undefined {
        return this._name;
    }

    get username(): string | undefined {
        return this._username;
    }

    get email(): string | null | undefined {
        return this._email;
    }

    get photo(): string | null | undefined {
        return this._photo;
    }

    get userFriends(): object {
        return this._userFriends;
    }

    get userGames(): object {
        return this._userGames;
    }

    static fromJSON(json: any): Player {
        return new Player(
            json._id,
            json.name,
            json.username,
            json.email,
            json.photo,
            json.userFriends,
            json.userGames
        );
    }

    toJSON(): any {
        return {
            _id: this.id,
            name: this._name,
            username: this._username,
            email: this._email,
            photo: this._photo ? this._photo : '',
            userFriends: this._userFriends,
            userGames: this._userGames
        };
    }
}
