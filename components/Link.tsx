//import liraries
import React from 'react';

type Props = {
    children: string;
    href: string
}
const Link = ({ children, href }: Props) => {
    return (
        <a className='body-link' href={href}>{children}</a>
    );
};

export default Link;
