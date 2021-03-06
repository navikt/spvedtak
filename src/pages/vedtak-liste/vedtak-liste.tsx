import './vedtak-liste.less'

import React, { useEffect } from 'react'

import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Teasere from '../../components/teaser/teasere'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'


const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('vedtak-liste.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ]

const VedtakListe = () => {
    const { vedtak, setValgtVedtak } = useAppStore()
    const uleste = vedtak.filter(v => v.lest === false)
    const leste = vedtak.filter(v => v.lest === true)

    useEffect(() => {
        setBodyClass('vedtak-liste')
    }, [])

    useEffect(() => {
        setValgtVedtak(undefined)
    }, [ setValgtVedtak ])

    return (
        <>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                <Teasere
                    className="vedtak__teasere vedtak--uleste"
                    vedtak={uleste}
                    tittel={tekst('spvedtak.teaser.uleste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-soknader')}
                />
                <Teasere
                    className="vedtak__teasere vedtak--leste"
                    vedtak={leste}
                    tittel={tekst('spvedtak.teaser.leste')}
                    tomListeTekst={tekst('vedtak-liste.ingen-soknader')}
                    kanSorteres={false}
                />
            </div>
        </>
    )
}

export default VedtakListe
