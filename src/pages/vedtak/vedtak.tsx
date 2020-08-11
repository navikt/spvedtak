import './vedtak.less'

import React, { useEffect } from 'react'
import { useParams } from 'react-router'

import Banner from '../../components/banner/banner'
import Begrunnelse from '../../components/begrunnelse/begrunnelse'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import Oppsummering from '../../components/oppsummering/oppsummering'
import SykmeldingOpplysninger from '../../components/sykmelding-opplysninger/sykmelding-opplysninger'
import Utbetalinger from '../../components/utbetalinger/utbetalinger'
import Utbetalingsoversikt from '../../components/utbetalingsoversikt/utbetalingsoversikt'
import VedtakStatus from '../../components/vedtak-status/vedtak-status'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule, Soknad, Sykmelding } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        sti: SEPARATOR,
        erKlikkbar: true
    }, {
        tittel: tekst('vedtak.sidetittel'),
        sti: '/vedtak',
        erKlikkbar: false
    }
]

export const infoStyle = {
    border: '1px solid gray',
    padding: '1rem 1.4rem',
    margin: '2rem 0',
}

const Vedtak = () => {
    const { id } = useParams()
    const { valgtVedtak, setValgtVedtak, vedtak, sykmeldinger, soknader } = useAppStore()

    useEffect(() => {
        setValgtVedtak(vedtak.find(a => a.id === id))
        setBodyClass('vedtak')
    }, [ id, setValgtVedtak, vedtak ])

    const hentSykmeldinger = (): Sykmelding[] => {
        const sykmeldingIder = valgtVedtak?.vedtak.dokumenter
            .filter(dok => dok.type === 'Sykmelding')
            .map(dok => dok.dokumentId)
        return sykmeldinger.filter(syk => sykmeldingIder?.includes(syk.id))
    }

    const hentSoknader = (): Soknad[] => {
        const soknadIder = valgtVedtak?.vedtak.dokumenter
            .filter(dok => dok.type === 'Søknad')
            .map(dok => dok.dokumentId)
        return soknader.filter(sok => soknadIder?.includes(sok.id))
    }

    return (
        <>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />

                <VedtakStatus />
                {hentSykmeldinger().map((syk, idx) =>
                    <SykmeldingOpplysninger ekspandert={false} sykmelding={syk} key={idx} />
                )}

                <Utbetalinger />

                <Begrunnelse />

                <Utbetalingsoversikt />

                {hentSoknader().map((sok, idx) =>
                    <Oppsummering ekspandert={false} soknad={sok} key={idx} />
                )}

                {/* <Klage /> */}
            </div>
        </>
    )
}

export default Vedtak
