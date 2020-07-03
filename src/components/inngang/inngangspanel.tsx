import './inngangspanel.less'

import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React from 'react'
import { Link } from 'react-router-dom'

import Vis from '../vis'

interface InngangsIkonProps {
    ikon: string;
    ikonHover?: string;
}

export const InngangsIkon = ({ ikon, ikonHover }: InngangsIkonProps) => {
    return (
        <>
            <span className='inngangspanel__ikon inngangspanel__ikon--normal'>
                <img alt='' src={ikon} />
            </span>
            <Vis hvis={ikonHover !== undefined}>
                <span className='inngangspanel__ikon inngangspanel__ikon--hover'>
                    <img alt='' src={ikonHover || ikon} />
                </span>
            </Vis>
        </>
    )
}

interface InngangsProps {
    to: string;
    children: React.ReactNode;
}

export const Inngangspanel = ({ to, children, }: InngangsProps) => {
    return (
        <Link to={to} className='inngangspanel'>
            {children}
        </Link>
    )
}

interface InngangsHeaderProps {
    meta: string;
    tittel: string;
    status: string;
}

export const InngangsHeader = ({ meta, tittel, status }: InngangsHeaderProps) => {
    return (
        <header className='inngangspanel__header'>
            <Normaltekst className='inngangspanel__meta'>
                {meta}
            </Normaltekst>
            <Vis hvis={status !== null}>
                <Normaltekst className='inngangspanel__status'>{status}</Normaltekst>
            </Vis>
            <Systemtittel tag='h3' className='inngangspanel__tittel'>
                {tittel}
            </Systemtittel>
        </header>
    )
}