import { GooeyToaster, type GooeyToasterProps } from 'goey-toast';

export interface AppToasterProps extends GooeyToasterProps {}

/**
 * Global Toaster component wrapper for goey-toast
 */
export const AppToaster = (props: AppToasterProps) => {
    return (
        <GooeyToaster
            position="top-right"
            theme="dark"
            bounce={0.4}
            preset="bouncy"
            closeButton
            showProgress
            {...props}
        />
    );
};

export default AppToaster;
