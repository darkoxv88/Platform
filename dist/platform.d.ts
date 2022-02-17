declare class Webpack {

  static require(id: string): Object;
  static define(exports: Object, definition: { [key: string]: () => any }): void;
  static export(key: string, definition: any): void;

}

declare class PlatformUtility {

  public isUndef(v: any): boolean;
  public isDef(v: any): boolean;
  public isTrue(v: any): boolean;
  public isFalse(v: any): boolean;
  public isPrimitive(v: any): boolean;
  public isObject(obj: any): boolean;
  public isPlainObject(obj: any): boolean;
  public isRegExp(v: any): boolean;
  public isValidArrayIndex(val: number): boolean;
  public isPromise(v: any): boolean;
  public noop(): void;
  public no(): false;
  public hasProperty(obj: Object, prop: string): boolean;

}

export declare class Platform {

  static main(proc: (ev: Event) => void, onError?: (err: any) => void): void;

  static isBodyLoaded(): boolean;
  static getRoot(): Window | Object;

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

  static usePlatformUtility(): PlatformUtility;

  static installChunk(
    chunkId: string,
    modules: { [key: string]: (exports: Object, webpack: typeof Webpack) => void }, 
    exe?: (webpackp: typeof Webpack) => void
  ): void;

  static import(exe?: (importName: string, importValue: any) => void): void;

  static enableConsoleLogging(): void;
  static disableConsoleLogging(): void;

}
