import { ReactNode } from 'react';
declare type Props = {
    debounceDelay?: number;
    scrollBehavior?: 'auto' | 'smooth';
    offset?: number;
    children: ReactNode;
};
export declare const ScrollingProvider: ({ debounceDelay, scrollBehavior, offset, children, }: Props) => JSX.Element;
export {};
