//import liraries
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

type Props = {
    children: string;
    method: methods;
    endpoint: string;
    headers: string;
    data: string;
}

enum methods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

const ApiCalling = ({ children, method, endpoint, headers, data }: Props) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) Prism.highlightElement(ref.current, false);
    }, [children]);

    const generateCurlCommand = (url: string, method: methods = methods.GET, headers: any = {}, data: any = {}) => {
        let curlCmd = `curl -X ${method.toUpperCase()} ${url} `;

        for (let header in headers) {
            curlCmd += `\\${'\n'} -H '${header}: ${headers[header]}' `;
        }

        for (let key in data) {
            const value = data[key];
            if (typeof value === 'object') {
                for (let subKey in value) {
                    curlCmd += ` -d '${key}[${subKey}]=${value[subKey]}'`;
                }
            } else {
                curlCmd += `\\${'\n'} -d '${key}=${value}' `;
            }
        }

        return curlCmd;
    }

    const copyToClipboard = async (): Promise<void> => {
        await navigator.clipboard.writeText(generateCurlCommand(endpoint, method, JSON.parse(headers), JSON.parse(data)))
    }

    return (
        <div className='code api-calling-block' aria-live="polite">
            <div className='header'>
                <div style={{display: 'flex'}}>
                    <p className='method'>{method}</p>
                    <p className='endpoint'>{endpoint}</p>
                </div>

                <FontAwesomeIcon 
                    icon={faClipboard} 
                    color='#fff' 
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={copyToClipboard}
                />
            </div>
            <div
                className='code-body'
            >
                <pre
                    ref={ref}
                    className={`language-bash`}
                >
                    {generateCurlCommand(endpoint, method, JSON.parse(headers), JSON.parse(data))}
                </pre>
            </div>
        </div>
    );
};

export default ApiCalling;