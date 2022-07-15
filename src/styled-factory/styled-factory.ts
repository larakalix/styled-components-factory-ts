import { createElement } from 'react';
import { tags } from '../tags/tags';

const HEAD: HTMLHeadElement =
  document.head || document.getElementsByTagName('head')[0];
const STYLE: any = document.createElement('style');
HEAD.appendChild(STYLE);

const genRandomName = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 5);

const defaultTemplateLiteralFunction = (
  strings: React.CSSProperties[],
  props: any,
  ...values: Function | any
) => {
  return strings.reduce((acc, key, index) => {
    acc += key;
    if (!values[index]) {
      acc += '';
      return acc;
    }

    acc +=
      typeof values[index] === 'function'
        ? values[index](props)
        : values[index];
    return acc;
  }, '');
};

const appendCss = (styles: string, type: string) => {
  const cssClassName = `${type}tag-${genRandomName()}`;
  const css = `.${cssClassName}{${styles}}`;

  if (STYLE.styleSheet) STYLE.styleSheet.cssText = css;
  else STYLE.appendChild(document.createTextNode(css));

  return cssClassName;
};

export const styled = tags.reduce(
  (acc, { tag: key }) =>
    Object.assign(acc, {
      [key]: (strings: React.CSSProperties[], ...values: Function | any) => {
        return (props: any): JSX.Element | null => {
          const styles = defaultTemplateLiteralFunction(
            strings,
            props,
            ...values
          )
            .trim()
            .replace(/\n/gi, '');

          if (!styles) return null;

          return createElement(key, {
            ...props,
            className: appendCss(styles, key),
          });
        };
      },
    }),
  {}
);
