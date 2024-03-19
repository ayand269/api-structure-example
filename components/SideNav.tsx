import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Switch from './Switch';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type SidebarItem = {
    title: string;
    expandable?: boolean;
    expanded?: boolean;
    href?: string;
    children?: SidebarItem[]
}
export function SideNav() {
    const router = useRouter();
    const [items, setItems] = useState<Array<SidebarItem>>([
        {
            title: 'Introduction',
            href: '/'
        },
        {
            title: 'Authentication',
            href: '/docs'
        },
        {
            title: 'Section 1',
            expandable: true,
            expanded: true,
            children: [
                {
                    title: 'Payment Intent',
                    href: '/docs/payment-intent',
                    expanded: false,
                    children: [
                        {
                            title: 'Create Payment Intent',
                            href: '/docs/payment-intent/create'
                        },
                        {
                            title: 'Update Payment Intent',
                            href: '/docs/payment-intent/update'
                        },
                        {
                            title: 'Get All Payment Intent',
                            href: '/docs/payment-intent/get-all'
                        },
                        {
                            title: 'Delete Payment Intent',
                            href: '/docs/payment-intent/delete'
                        }
                    ]
                },
                {
                    title: 'Balance',
                    href: '/docs/balance',
                    expanded: false
                }
            ]
        }
    ])

    const findHref = (path: string, elements: Array<SidebarItem>, parentIndex: Array<number> | null = null): Array<number> | undefined => {
        let index = elements.findIndex(it => it.href === path);
        if (index >= 0) {
            if (parentIndex) {
                return parentIndex;
            }
            return [index];
        } else {
            for (let i = 0; i < elements.length; i++) {
                const children = elements[i].children ?? [];

                let finalIndex = findHref(path, children, parentIndex ? [...parentIndex, i] : [i])

                if (finalIndex) {
                    return finalIndex
                }
            }
        }
    }

    const updateExpanded = (indexes: Array<number>, elements: Array<SidebarItem>, executableIndex: number) => {
        let isLastIndex = ((indexes.length - 1) === executableIndex)

        if (isLastIndex) {
            elements[indexes[executableIndex]].expanded = true

            return elements
        } else {
            let data = updateExpanded(indexes, elements[indexes[executableIndex]].children ?? [], executableIndex + 1)
            if(data){
                elements[indexes[executableIndex]].children = data

                return elements
            }
            
        }
    }

    useEffect(() => {
        let indexes = findHref('/docs/payment-intent/create', items);
        if(indexes){
            let data = updateExpanded(indexes, items, 0)
            setItems(JSON.parse(JSON.stringify(data)))
        }
    }, [])

    return (
        <nav className="sidenav">
            <div className='side-header'>
                <Image
                    src={'/assets/logo.png'}
                    alt='Logo'
                    height={32}
                    width={100}
                />

                <Switch />
            </div>
            <div className='side-nav-items'>
                {items.map((item, index) => (
                    <div key={item.title}>
                        {
                            item.expandable ?
                                <>
                                    <div
                                        className='sidebar-item expandable'
                                        onClick={() => {
                                            setItems(state => {
                                                state[index].expanded = !state[index].expanded
                                                return JSON.parse(JSON.stringify(state))
                                            })
                                        }}
                                    >
                                        <span>{item.title}</span>

                                        <FontAwesomeIcon icon={item.expanded ? faChevronDown : faChevronUp} />
                                    </div>

                                    <div
                                        style={{
                                            marginLeft: 10
                                        }}
                                    >
                                        {
                                            item.expanded && item.children?.map((it, ind) => {
                                                return (
                                                    <div key={it.title}>
                                                        <Link
                                                            className={`sidebar-item ${router.pathname === it.href ? 'active' : ''}`}
                                                            href={it.href ?? ''}
                                                            onClick={() => {
                                                                setItems(state => {
                                                                    let data = state[index].children
                                                                    if (data) data[ind].expanded = true

                                                                    return JSON.parse(JSON.stringify(state))
                                                                })
                                                            }}
                                                        >
                                                            <span>{it.title}</span>
                                                        </Link>

                                                        <div
                                                            style={{
                                                                marginLeft: 15
                                                            }}
                                                        >
                                                            {
                                                                it.expanded && it.children?.map((element) => {
                                                                    return (
                                                                        <Link
                                                                            className={`sidebar-item ${router.pathname === element.href ? 'active' : ''}`}
                                                                            href={element.href ?? ''}
                                                                            key={element.title}
                                                                        >
                                                                            <span>{element.title}</span>
                                                                        </Link>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                                :
                                <Link
                                    className={`sidebar-item ${router.pathname === item.href ? 'active' : ''}`}
                                    href={item.href ?? ''}
                                >
                                    <span>{item.title}</span>
                                </Link>
                        }

                    </div>
                ))}
            </div>
        </nav>
    );
}
