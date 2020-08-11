import 'nav-frontend-tabell-style'

import dayjs from 'dayjs'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { erHelg, getDuration } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import Vis from '../vis'
import calendarHover from './calendar-hover.svg'
import calendar from './calendar.svg'

interface UtbetalingerProps {
    ekspandert: boolean;
}

const Utbetalingsoversikt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    const utbetalingslinje =
        valgtVedtak?.vedtak.utbetalinger.flatMap((utbetalinger) =>
            utbetalinger.utbetalingslinjer
        ).slice(-1)[ 0 ]

    if (utbetalingslinje === undefined) {
        return null
    }

    const utbetalingsdager = []
    const duration = getDuration(new Date(utbetalingslinje!.fom), new Date(utbetalingslinje!.tom))
    for (let i = 0; i < duration; i++) {
        utbetalingsdager.push(dayjs(utbetalingslinje!.fom).add(i, 'day').format('MM.DD.YYYY'))
    }
    return (
        <Utvidbar className={'oppsummering ekspander hvit' + (ekspandert ? ' apen' : '')}
            erApen={ekspandert} ikon={calendar} ikonHover={calendarHover}
            tittel={tekst('vedtak.utbetalingsoversikt.tittel')}
            ikonAltTekst="">
            <table className="tabell">
                <thead>
                    <tr>
                        <th>Sykmeldingsdato</th>
                        <th>{''}</th>
                        <th>Gradering</th>
                        <th>Utbetaling</th>
                    </tr>
                </thead>
                <tbody>
                    {utbetalingsdager.map((utbetalingsdato, i) => {
                        const utbetalingsgradIProsent = (Math.ceil((utbetalingslinje!.grad * 100) * 10)) / 10

                        return <tr key={i}>
                            <td>{dayjs(utbetalingsdato).format('DD.MM.YYYY')}</td>
                            <Vis hvis={erHelg(utbetalingsdato)}>
                                <td>{'Helg'}</td>
                                <td>{''}</td>
                                <td>{''}</td>
                            </Vis>
                            <Vis hvis={!erHelg(utbetalingsdato)}>
                                <td>{''}</td>
                                <td>{utbetalingsgradIProsent}%</td>
                                <td>{utbetalingslinje!.dagsats} kr</td>
                            </Vis>
                        </tr>
                    })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td><h3>SUM</h3></td>
                        <td>{''}</td>
                        <td>{''}</td>
                        <td><h3>{utbetalingslinje!.beløp}</h3></td>
                    </tr>
                </tfoot>
            </table>
        </Utvidbar>
    )
}

export default Utbetalingsoversikt
