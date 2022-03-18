/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.Platform;

**/

declare class Webpack {

  static require(id: string): Object;
  static define(exports: Object, definition: { [key: string]: () => any }): void;
  static export(key: string, definition: any): void;

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

  static installChunk(
    chunkId: string,
    modules: { [key: string]: (exports: Object, webpack: typeof Webpack) => void }, 
    exe?: (webpackp: typeof Webpack) => void
  ): void;

  static import(exe?: (importName: string, importValue: any) => void): void;

  static enableConsoleLogging(): void;
  static disableConsoleLogging(): void;

  static width(): number;
  static height(): number;

  static get sm(): number;
  static get md(): number;
  static get lg(): number;
  static get xl(): number;
  static get xxl(): number;

}
