import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { getLedetekst, tekst } from '../../utils/tekster'
import { getUrlTilVedtak } from '../../utils/url-utils'
import { InngangsHeader, InngangsIkon, Inngangspanel } from '../inngang/inngangspanel'
import avkryssetHover from './avkrysset-hover.svg'
import avkrysset from './avkrysset.svg'
import { SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ vedtak }: SykepengesoknadTeaserProps) => {
    const { sykmeldinger } = useAppStore()
    const [ undertekst, setUndertekst ] = useState('')
    const sykmeldingIder = vedtak?.vedtak.dokumenter.filter(dok => dok.type === 'Sykmelding').map(dok => dok.dokumentId)
    const hentsm = sykmeldinger.filter(syk => sykmeldingIder?.includes(syk.id))

    useEffect(() => {
        setUndertekst(lagUndertekst())
        // eslint-disable-next-line
    }, [])

    const lagUndertekst = () => {
        let txt = ''
        hentsm.forEach(sm => {
            const linje = getLedetekst(tekst('spvedtak.teaser.sykmeldt'),
                {
                    '%PROSENT%': sm.stillingsprosent,
                    '%ARBEIDSGIVER%': sm.arbeidsgiver,
                    '%DAGER%': vedtak.vedtak.forbrukteSykedager
                }
            )
            txt += hentsm.length > 1 ? '<li>' + linje + '</li>' : linje
        })
        return hentsm.length > 1 ? '<ul>' + txt + '</ul>' : txt
    }

    return (
        <article aria-labelledby={`soknader-header-${vedtak.id}`}>
            <Inngangspanel to={getUrlTilVedtak(vedtak)}>
                <div className="inngangspanel__venstre">
                    <InngangsIkon ikon={avkrysset} ikonHover={avkryssetHover} />
                    <div className="inngangspanel__innhold">
                        <InngangsHeader
                            meta={
                                dayjs(vedtak.vedtak.fom).format('DD. MMM') + ' - ' +
                                dayjs(vedtak.vedtak.tom).format('DD. MMM YYYY')
                            }
                            tittel={tekst('spvedtak.teaser.tittel')}
                            status={undertekst}
                        />
                    </div>
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser
