import React, { createElement } from "react";
import { genRandomName } from "../helpers/helpers";

import { Tag, tags } from "../tags/tags";

const HEAD: HTMLHeadElement =
    document.head || document.getElementsByTagName("head")[0];
const STYLE: any = document.createElement("style");
HEAD.appendChild(STYLE);

const defaultTemplateLiteralFunction = (
    strings: TemplateStringsArray,
    props: any,
    ...values: Function | any
) => {
    return strings.reduce((acc, key, index) => {
        acc += key;
        if (!values[index]) {
            acc += "";
            return acc;
        }

        acc +=
            typeof values[index] === "function"
                ? values[index](props)
                : values[index];
        return acc;
    }, "");
};

const appendCss = (styles: string, type: string) => {
    const cssClassName = `${type}tag-${genRandomName()}`;
    const css = `.${cssClassName}{${styles}}`;

    if (STYLE.styleSheet) STYLE.styleSheet.cssText = css;
    else STYLE.appendChild(document.createTextNode(css));

    return cssClassName;
};

const init = (tags: Tag[]) => {
    return tags.reduce(
        (acc, { tag: key }) =>
            Object.assign(acc, {
                [key]: (
                    strings: TemplateStringsArray,
                    ...values: Function | any
                ) => {
                    return (props: any): JSX.Element | null => {
                        const styles = defaultTemplateLiteralFunction(
                            strings,
                            props,
                            ...values
                        )
                            .trim()
                            .replace(/\n/gi, "");

                        if (!styles) return null;

                        return createElement(key, {
                            ...props,
                            key: `${key}-${genRandomName()}`,
                            className: appendCss(styles, key),
                        }) as JSX.Element;
                    };
                },
            }),
        {}
    );
};

interface Style {
    [key: string]: (
        strings: TemplateStringsArray,
        ...values: Function | any
    ) => React.FC<any>;
}

export const styled: Style = init(tags);
