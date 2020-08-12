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

interface Utbetalingslinje {
    dato: string;
    dagsats: number;
    grad: number;
}

const Utbetalingsoversikt = ({ ekspandert }: UtbetalingerProps) => {
    const { valgtVedtak } = useAppStore()

    const utbetalingslinjer =
        valgtVedtak?.vedtak.utbetalinger.flatMap((utbetalinger) =>
            utbetalinger.utbetalingslinjer
        )

    if (utbetalingslinjer === undefined) {
        return null
    }
    const alleBetalinger: Utbetalingslinje[] = []
    let totaltUtbetalt = 0

    utbetalingslinjer.forEach(linje => {
        const varighet = getDuration(new Date(linje!.fom), new Date(linje!.tom))
        for (let i = 0; i < varighet; i++) {
            const betaling: Utbetalingslinje = {
                dato: (dayjs(linje!.fom).add(i, 'day').format('MM.DD.YYYY')),
                dagsats: linje!.dagsats,
                grad: linje!.grad
            }
            alleBetalinger.push(betaling!)
        }
        totaltUtbetalt += linje!.beløp
    })

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
                    {alleBetalinger.map((utbetaling, i) => {
                        const utbetalingsgradIProsent = (Math.ceil((utbetaling.grad * 100) * 10)) / 10

                        return <tr key={i}>
                            <td>{dayjs(utbetaling!.dato).format('DD.MM.YYYY')}</td>
                            <Vis hvis={erHelg(utbetaling!.dato)}>
                                <td>{'Helg'}</td>
                                <td>{''}</td>
                                <td>{''}</td>
                            </Vis>
                            <Vis hvis={!erHelg(utbetaling!.dato)}>
                                <td>{''}</td>
                                <td>{utbetalingsgradIProsent}%</td>
                                <td>{utbetaling!.dagsats} kr</td>
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
                        <td><h3>{totaltUtbetalt}</h3></td>
                    </tr>
                </tfoot>
            </table>
        </Utvidbar>
    )
}

export default Utbetalingsoversikt
