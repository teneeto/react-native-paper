import type { EllipsizeProp, InternalTheme } from 'src/types';
declare type Description = React.ReactNode | ((props: {
    selectable: boolean;
    ellipsizeMode: EllipsizeProp | undefined;
    color: string;
    fontSize: number;
}) => React.ReactNode);
export declare const getLeftStyles: (alignToTop: boolean, description: Description, isV3: boolean) => {
    marginLeft: number;
    marginRight: number;
};
export declare const getRightStyles: (alignToTop: boolean, description: Description, isV3: boolean) => {
    marginRight: number;
};
export declare const getAccordionColors: ({ theme, isExpanded, }: {
    theme: InternalTheme;
    isExpanded?: boolean | undefined;
}) => {
    titleColor: string;
    descriptionColor: string;
    titleTextColor: string;
    rippleColor: string;
};
export {};
//# sourceMappingURL=utils.d.ts.map