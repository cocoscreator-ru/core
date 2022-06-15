export class Route {
    private static _currentURL: Nullable<string>;
    private static _currentURLParams: Nullable<URLSearchParams>;

    public static GetParam(key: string): Nullable<string> {
        const windowURL = window.location.search;

        if (this._currentURL !== windowURL) {
            this._currentURL = windowURL;
            this._currentURLParams = new URLSearchParams(windowURL);
        }

        if (!this._currentURLParams)
            throw new Error("Invalid url params object");

        return this._currentURLParams.get(key);
    }
}