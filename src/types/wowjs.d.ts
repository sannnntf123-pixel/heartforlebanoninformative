declare module "wowjs" {
  interface WOWOptions {
    boxClass?: string;
    animateClass?: string;
    offset?: number;
    mobile?: boolean;
    live?: boolean;
  }

  export class WOW {
    constructor(options?: WOWOptions);
    init(): void;
    sync(): void;
  }

  const wowjs: { WOW: typeof WOW };
  export default wowjs;
}
