declare class Webpack {

  static require(id: string): Object;
  static define(exports: Object, definition: { [key: string]: () => any }): void;
  static export(key: string, definition: any): void;

}

export declare class Platfoem {

  static main(
    proc: () => void,
    onError?: (err: any) => void
  );

  static onLoad(
    proc: (ev: Event) => void,
    onError?: (err: any) => void
  );

  static isBodyLoaded(): boolean;
  static getBody(): HTMLElement;
  static clearBody(): void;

  static isBrowser(): boolean;
  static isEdge(): boolean;
  static isTrident(): boolean;
  static isBlink(): boolean;
  static isWebkit(): boolean;
  static isIos(): boolean;
  static isFirefox(): boolean;
  static isAndroid(): boolean;
  static isSafari(): boolean;

  static supportsPassiveEventListeners(): boolean;
  static supportsScrollBehavior(): boolean;
  static isNode(): boolean;

  static installChunk(
    chunkId: string,
    modules: { [key: string]: (exports: Object, webpack: Webpack) => void }, 
    runtime?: (webpackp: Webpack) => void
  );

  static import(): void;

  static enableConsoleLogging(): void;
  static disableConsoleLogging(): void;

}
