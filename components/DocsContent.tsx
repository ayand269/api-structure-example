//import liraries
import React from 'react';

type Props = {
    children: string
}
const DocsContent = ({ children }: Props) => {
    return (
        <div className='docs-content'>
            {children}
        </div>
    );
};

export default DocsContent;
