import type { ReactNode, PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import styles from "../../styles/pagelayout.module.less";

type PageLayoutProps = PropsWithChildren<{
    id?: string;
    style?: React.CSSProperties;
    className?: string;
    header?: ReactNode | null;
    footer?: ReactNode | null;
    headerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
}>;

const PageLayout: React.FC<PageLayoutProps> = ({ id, className, style, header, footer, headerClassName, contentClassName, footerClassName, children }) => {
    return (
        <div className={classNames(styles.pageLayout, className)} id={id} style={style}>
            {header === null || header === undefined ? null : <div className={classNames(styles.pageLayoutHeader, headerClassName)}>{header}</div>}
            <div className={classNames(styles.pageLayoutContent, contentClassName)}>{children}</div>
            {footer === null || header === undefined ? null : <div className={classNames(styles.pageLayoutFooter, footerClassName)}>{footer}</div>}
        </div>
    );
};

export default PageLayout;
