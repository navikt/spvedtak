import './teaser.less'

import dayjs from 'dayjs'
import Alertstripe from 'nav-frontend-alertstriper'
import ModalWrapper from 'nav-frontend-modal'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'
import { InngangsHeader } from '../inngang/inngangspanel'
import {
    finnArbeidsgivernavn,
    hentTeaserStatustekst,
    SykepengesoknadTeaserProps
} from './teaser-util'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)


    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
            <button className="inngangspanel inngangspanel__btn pointer"
                onClick={() => setAapen(true)}>
                <div className='inngangspanel--inaktivt'>
                    <InngangsHeader
                        meta={getLedetekst(tekst('soknad.teaser.dato.fremtidig'), {
                            '%DATO%': dayjs(soknad.tom).add(1, 'day').format('DD.MM.YYYY'),
                        })}
                        tittel={soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
                            ? tekst('soknad.utland.teaser.tittel')
                            : tekst('soknad.teaser.tittel')}
                        status={hentTeaserStatustekst(soknad)}
                    />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className='inngangspanel__tekst'>
                            {getLedetekst(tekst('soknad.teaser.tekst'), {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                    <Normaltekst className='inngangspanel__undertekst'>
                        {finnArbeidsgivernavn(soknad)}
                    </Normaltekst>
                </div>
            </button>
            <ModalWrapper className="modal__teaser_popup" onRequestClose={() => setAapen(false)}
                contentLabel={'planlagt'}
                isOpen={aapen}
            >
                <Systemtittel tag="h3" className="modal__tittel">
                    {tekst('soknader.teaser.fremtidig.dato-tittel')}
                </Systemtittel>
                <Alertstripe type="info">{getLedetekst(tekst('soknader.teaser.fremtidig.dato-info'), {
                    '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))
                })}</Alertstripe>
                <button className="knapp knapp--hoved" onClick={() => setAapen(false)}>
                    Lukk
                </button>
            </ModalWrapper>
        </article>
    )
}

export default FremtidigeSoknaderTeaser